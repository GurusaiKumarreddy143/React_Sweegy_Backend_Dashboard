import React, { useState, useEffect } from 'react';
import { API_URL } from '../data/apiPath';
import '../../App.css';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState(""); // message to show user

  const productHandler = async () => {
    const firmId = localStorage.getItem('firmId');

    // 1️⃣ No firm created
    if (!firmId || firmId === "null") {
      setMessage("Please add your firm first.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/product/productById/${firmId}`);

      if (!response.ok) {
        setMessage("No products added.");
        setProducts([]);
        return;
      }

      const data = await response.json();
      const items = data.products || [];

      if (items.length === 0) {
        setMessage("No products added.");
      }

      setProducts(items);

    } catch (error) {
      console.error("failed to fetch products", error);
      setMessage("Server error.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_URL}/api/product/${id}`, {
        method: "DELETE"
      });

      if (!response.ok) throw new Error("Delete failed");

      alert("Product deleted successfully");

      // Update UI
      setProducts(products.filter((p) => p._id !== id));

    } catch (error) {
      console.error(error);
      alert("Error deleting product");
    }
  };

  useEffect(() => {
    productHandler();
  }, []);

  return (
    <div className="all-products-container">

      {/* Show messages */}
      {message && (
        <p className="no-products-text">{message}</p>
      )}

      {/* Show table only if products exist */}
      {products.length > 0 && (
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
                  <button className="delete-btn" onClick={() => handleDelete(item._id)}>
                    Delete
                  </button>
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
