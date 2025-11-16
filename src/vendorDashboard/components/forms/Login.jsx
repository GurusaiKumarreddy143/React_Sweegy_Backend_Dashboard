import React, { useState } from 'react';
import { API_URL } from '../../data/apiPath';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
const Login = ({setShowLogOut,setFirmName,setFirmTitle }) => {
const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);

  const [email,setEmail] = useState("")
  const [password,setpassword] = useState("");


  const handleSubmit = async (e)=>{
    e.preventDefault();
   try{
     const response = await fetch(`${API_URL}/api/vendor/login`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({email,password})
    })
    const data = await response.json();

    if(response.ok){
      console.log(data);      
      alert("vendor login sucessfully")
      localStorage.setItem('LoginToken',data.token);
      setShowLogOut(true)
      setEmail("");
      setpassword("")
      navigate('/dashboard')
      
    }
    const decoded  = jwtDecode(data.token)
    const vendorId = decoded.vendorId;
   

    const vendorResponse = await fetch(`${API_URL}/api/vendor/single-vendor/${vendorId}`)
    const vendorData = await vendorResponse.json()
    if(vendorResponse.ok){
      const vendorFirmId = vendorData.vendorFirmId;
      console.log("checking firmId",vendorFirmId)
        const vendorFirmName = vendorData.vendor.firm[0].firmName;
        localStorage.setItem('vendorFirmName',vendorFirmName)
        console.log(vendorFirmName)
          setFirmName(vendorFirmName);
      localStorage.setItem('firmId',vendorFirmId)
     setFirmTitle("")
      navigate('/dashboard')
   
    }
   }catch(error){
    console.error("vendor login failed",error)
    alert("vendor login failed")
   }

  } 



  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <div className='loginSection'>
      <form className='loginForm' onSubmit={handleSubmit}>
        <h3>Vendor Login</h3>

        <label htmlFor='email'>Email</label>
        <input type='email'
         placeholder='Enter your email'
         name="email"
         value={email}
         onChange={(e)=>setEmail(e.target.value)}
            />

        <label htmlFor='password'>Password</label>

        <div className='passwordField'>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder='Enter your password'
            name ='password'
            value={password}
             onChange={(e)=>setpassword(e.target.value)}
          />
          <span
            className='material-symbols-outlined eyeIcon'
            onClick={togglePassword}
          >
            {showPassword ? 'visibility_off' : 'visibility'}
          </span>
        </div>

        <button type='submit'>Login</button>
      </form>
    </div>
  );
};

export default Login;
