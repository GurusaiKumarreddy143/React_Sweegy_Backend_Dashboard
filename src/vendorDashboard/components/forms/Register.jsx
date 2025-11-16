import React, { useState } from 'react';
import '../../../App.css';
import { API_URL } from '../../data/apiPath';
const Register = ({showLoginhandler}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const togglePassword = () => setShowPassword(!showPassword);


  const handleSubmit = async(e)=>{
    e.preventDefault();
    try{
      const response = await fetch(`${API_URL}/api/vendor/register`,{
        method:"POST",
        headers:{
         "Content-Type" :"application/json"
        },
        body: JSON.stringify({username,email,password})
      })
      const data = await response.json();
      if(response.ok){
      console.log(data);
      setEmail("");
      setUserName("");
      setpassword("");
      alert("vendor register sucessfully")
      showLoginhandler()
      }
     
     
     
    }catch(error){
      console.error("vender register failed ",error);
      alert("vendor register failed")
    }
  }


  return (
    <div className='loginSection'>

      <form className='loginForm' onSubmit={handleSubmit}>
        <h3>Vendor Register</h3>
        <label htmlFor='username'>UserName</label>
        <input type='text' 
        placeholder='Enter your userName' 
        name='username' 
        value={username} 
        onChange={(e)=>setUserName(e.target.value)}
        />

        <label htmlFor='email'>Email</label>
        <input type='email'
         placeholder='Enter your email' 
         name='email' 
         value={email} 
         onChange={(e)=>setEmail( e.target.value)}
         />

        <div className='passwordField'>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder='Enter your password'
            name='password'
            value={password}
            onChange={(e)=> setpassword(e.target.value)}
          />
          <span
            className='material-symbols-outlined eyeIcon'
            onClick={togglePassword}
          >
            {showPassword ? 'visibility_off' : 'visibility'}
          </span>
        </div>
        <button type='submit' >Register</button>
      </form>
    </div>
  );
};

export default Register;
