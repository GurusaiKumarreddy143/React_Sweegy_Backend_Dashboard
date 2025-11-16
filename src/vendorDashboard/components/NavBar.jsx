import React from 'react'
import "../../App.css"
const NavBar = ({showLoginhandler,showRegisterHandler,showLogOut,handleLogOut}) => {
    const handleRegisterForm = ()=>{
       props.setInitialForm(1);
    }
    const handleLoginForm  = ()=>{
         props.setInitialForm(0);
    }
    const vendorFirmName = localStorage.getItem('vendorFirmName')
  return (
    <div className="navSection">
        <div className='company'>
            vendor Dashboard
        </div>
        <div>
          <p style={{textTransform:"capitalize",fontSize:"28px"}}> FirmName : {vendorFirmName}</p>
        </div>
        <div className="userAuth">
          {!showLogOut ? <>
           <span className='authLink' onClick={showLoginhandler}>Login / </span>
            <span className='authLink' onClick={showRegisterHandler}>Register</span></> : 
             <span className='authLink' onClick={handleLogOut}>Logout </span>}
           

        </div>
    </div>
  )
}

export default NavBar