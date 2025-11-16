import React, { useState, useEffect } from 'react';
import { API_URL } from '../data/apiPath';
import '../../App.css'; // 👈 create this CSS file

const AllProducts = () => {
  const [products, setProducts] = useState([]);

  const productHandler = async () => {
    const firmId = localStorage.getItem('firmId');
    try {
      const response = await fetch(`${API_URL}/api/product/productById/${firmId}`);
      const newProductsData = await response.json();
      console.log(newProductsData);
      setProducts(newProductsData.products);
    } catch (error) {
      console.error('failed to fetch products', error);
      alert('failed to fetch products');
    }
  };

  const handleDelete = async (id)=>{
    const productId = id
     try{
        const response = await fetch(`${API_URL}/api/product/${productId}`,{
            method:"DELETE"
        })

     if (!response.ok) {
      throw new Error("Failed to delete the product");
    }

        const data = await response.json()

        console.log(data)
        alert("delete successfully")

        const newProducts = products.filter((item)=> item._id !== id )
        setProducts(newProducts)
        productHandler();

     } catch(error){

     }
  }

  useEffect(() => {
    productHandler();
    
  }, []);

  return (
    <div className="all-products-container">
      {products.length === 0 ? (
        <p className="no-products-text">No products added</p>
      ) : (
        <table className="product-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th>Image</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => (
              <tr key={item._id}>
                <td>{item.productName}</td>
                <td>{item.price}</td>
                <td>
                  {item.image && (
                    <img
                      src={`${API_URL}/uploads/${item.image}`}
                      alt={item.productName}
                      className="product-image"
                    />
                  )}
                </td>
                <td>
                  <button className="delete-btn" onClick={()=>handleDelete(item._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllProducts;
