import React, { useState } from 'react';
import { API_URL } from '../../data/apiPath';
const AddFirm = () => {
  const [category, setCategory] = useState([]);
  const [region, setRegion] = useState([]);
  const [firmName,setFirmName] = useState("");
  const [area,setArea] = useState("");
  const [offer,setOffer] = useState("");
  const [file,setFile]=useState(null);

  // handle category checkbox change
  const handleCategoryChange = (event) => {
   const value = event.target.value;
   if(category.includes(value)){
    setCategory(category.filter((item)=> item !== value))
   }else{
    setCategory([...category,value])
   }

  };

  // handle region checkbox change
  const handleRegionChange = (event) => {
     const value = event.target.value;
   if(region.includes(value)){
    setRegion(region.filter((item)=> item !== value))
   }else{
    setRegion([...region,value])
   }
  };

  const handleImageUpload = (event)=>{
    const selectedImage = event.target.files[0]
    setFile(selectedImage)
  }



  const handleSubmit = async (e) => {
    e.preventDefault();
   try{
    const loginToken = localStorage.getItem('LoginToken');
    if(!loginToken){
      console.error("user not athenticated")
    }
    const formData = new FormData();
    formData.append('firmName',firmName)
    formData.append('area',area)
    formData.append('offer',offer)

    category.forEach((value)=>{
      formData.append('category',value)
    })
    region.forEach((value)=>{
      formData.append('region',value)
    })
    formData.append('image',file);

    const response = await fetch(`${API_URL}/api/firm/addFirm`,{
      method:"POST",
      headers:{
        'token':`${loginToken}`
      },
      body:formData
    })
    const data = await response.json()
    if(response.ok){
      console.log(data);
      alert("firm added suceessfully")
      setCategory([]);
      setOffer("")
      setFile(null)
      setRegion([])
      setFirmName("")
      setArea("")
      localStorage.setItem('firmId',data.firmId)
      localStorage.setItem('vendorFirmName',data.firmNamenew)
      
    }else if(data.message ===  "firm already exits"){
      console.log("firm already exists , only one 1 firm for one vendor")
      alert("firm already exists , only one 1 firm for one vendor")
    } else{
      alert("failed to add firm")
    }
  
   }catch(error){
    console.log("firm is not added",error)
   }
  };

  return (
    <div className='loginSection'>
      <form className='loginForm' onSubmit={handleSubmit}>
        <h3>Add Firm</h3>

        {/* Firm Name */}
        <label htmlFor='firmName'>Firm Name</label>
        <input type='text' id='firmName' name='firmName'  value={firmName} onChange={(e)=>setFirmName(e.target.value)} placeholder='Enter your firm name' required />

        {/* Area */}
        <label htmlFor='area'>Area</label>
        <input type='text' id='area' name='area' placeholder='Enter your area' required  value={area} onChange={(e)=>setArea(e.target.value)} />

        {/* Category */}
        <label>Category</label>
        <div className='checkboxGroup'>
          <label>
            <input
              type='checkbox'
              value="veg"
              checked={category.includes('veg')}
              onChange={handleCategoryChange}
            />
            Veg
          </label>
          <label>
            <input
              type='checkbox'
              value="non-veg"
              checked={category.includes('non-veg')}
              onChange={handleCategoryChange}
            />
            Non-Veg
          </label>
        </div>

        {/* Region */}
        <label>Region</label>
        <div className='checkboxGroup'>
          <label>
            <input
              type='checkbox'
              value="south-indian"
              checked={region.includes('south-indian')}
              onChange={handleRegionChange}
            />
            South-Indian
          </label>
          <label>
            <input
              type='checkbox'
              value="north-indian"
              checked={region.includes('north-indian')}
              onChange={handleRegionChange}
            />
            North-Indian
          </label>
          <label>
            <input
              type='checkbox'
              value="chinese"
              checked={region.includes('chinese')}
              onChange={handleRegionChange}
            />
            Chinese
          </label>
          <label>
            <input
              type='checkbox'
              value="bakery"
              checked={region.includes('bakery')}
              onChange={handleRegionChange}
            />
            Bakery
          </label>
        </div>

        {/* Offer */}
        <label htmlFor='offer' >Offer</label>
        <input type='text' id='offer' name='offer' placeholder='Enter your offer' value={offer} onChange={(e)=>setOffer(e.target.value)} />

        {/* Firm Image */}
        <label htmlFor='firmImage'>Firm Image</label>
        <input type='file'  onChange={handleImageUpload}/>

        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default AddFirm;
