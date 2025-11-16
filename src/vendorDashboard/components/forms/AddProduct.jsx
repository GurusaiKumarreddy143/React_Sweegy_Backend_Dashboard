import React, { useState } from 'react'
import { API_URL } from '../../data/apiPath';

const AddProduct = () => {
  const [category, setCategory] = useState([]);
  const [productName, setProductName] = useState("")
  const [price, setPrice] = useState("");
  const [file, setFile] = useState(null)
  const [bestSeller, setBestseller] = useState(false);
  const [discription, setDiscription] = useState("");


  const handleCategoryChange = (event) => {
    const value = event.target.value;
    if (category.includes(value)) {
      setCategory(category.filter((item) => item !== value));
    } else {
      setCategory([...category,value]);
    }
  };

  // handle region checkbox change
  const handleBestsellerChange = (event) => {
  setBestseller(event.target.value === 'yes')
  };


  const handleImageUploade = (e)=>{
    const value = e.target.files[0]
    setFile(value)
  }

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const loginToken = localStorage.getItem('LoginToken');
    const firmId = localStorage.getItem('firmId');

    // ✅ Stop execution if auth data missing
    if (!firmId || !loginToken) {
      alert("Invalid authentication");
      console.log("User not authenticated");
      return;
    }

    const formData = new FormData();
    formData.append('productName', productName);
    formData.append('price', price);
    category.forEach((value) => formData.append('category', value));
    formData.append('discription', discription);
    formData.append('image', file);
    formData.append('bestSeller', bestSeller);

    const response = await fetch(`${API_URL}/api/product/add-product/${firmId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${loginToken}`,
      },
      body: formData,
    });

    const data = await response.json();
    if (response.ok) {
      alert("Product added successfully");
      setBestseller(false);
      setProductName("");
      setPrice("");
      setCategory([]);
      setFile(null);
      setDiscription("")
    } else {
      alert(data.message || "Failed to add product");
    }

  } catch (error) {
    console.error("Product not added:", error);
    alert("Failed to add product");
  }
};

   


  return (
    <div className='loginSection'>
      <form className='loginForm'  onSubmit={handleSubmit}>
        <h3>Add Product</h3>

        <label htmlFor='productName'>ProductName</label>
        <input type='text' placeholder='Enter your ProductName' name='productName' value={productName} onChange={(e)=>setProductName(e.target.value)} />

        <label htmlFor='price'>Price</label>
        <input
          type='text'
          value={price}
        
          name="price"
          onChange={(e)=>setPrice(e.target.value)}
          placeholder='Enter product price '
        />

        {/* Category */}
        <label>Category</label>
        <div className='checkboxGroup'>
          <label>
            <input
              type='checkbox'
              value='veg'
              checked={category.includes('veg')}
              onChange={handleCategoryChange}
            />
            Veg
          </label>
          <label>
            <input
              type='checkbox'
              value='non-veg'
              checked={category.includes('non-veg')}
              onChange={handleCategoryChange}
            />
            Non-Veg
          </label>
        </div>

        <div style={{ display: "flex", gap: "50px", marginTop: "20px" }}>
          <div>
            <label>Bestseller</label>
          </div>
          <div className='checkboxGroup'>
            <div style={{ display: 'flex', gap: "20px", justifyContent: "center" }}>
              <div>
                <label>Yes</label>
              </div>
              <div>
                <input

                  type='radio'
                  name='bestSeller'
                  value='yes'
                   checked={bestSeller === true}
                  onChange={handleBestsellerChange}
                  style={{

                    transform: 'scale(1.5)',
                    marginTop: '10px',
                    cursor: 'pointer',
                    accentColor: '#1976d2',

                  }}

                />
              </div>
            </div>
            <div style={{ display: 'flex', gap: "20px", justifyContent: "center" }}>
              <div>
                <label>No</label>
              </div>
              <div>
                <input type="radio" value='no'name='bestSeller' onChange={handleBestsellerChange}  checked={bestSeller === false} style={{

                  transform: 'scale(1.5)',
                  marginTop: '10px',
                  cursor: 'pointer',
                  accentColor: '#1976d2'
                }} />
              </div>
            </div>
          </div>

        </div>


        <label htmlFor='description'>description</label>
        <input type='text' placeholder='Enter product description' value={discription} name='discription' onChange={(e)=>setDiscription(e.target.value)} />

        <label htmlFor='image' type="file">Image</label>
        <input
          type='file'
         onChange={handleImageUploade} 

        />


        <button type='submit' >Submit</button>
      </form>
    </div>
  )
}

export default AddProduct