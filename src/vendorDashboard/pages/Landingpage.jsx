import React,{useState,useEffect} from 'react'
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import Login from '../components/forms/Login';
import Register  from '../components/forms/Register';
import AddFirm from '../components/forms/AddFirm'
import AddProduct from '../components/forms/AddProduct';
import Welcome from '../components/Welcome'
import AllProducts from '../components/AllProducts'
import '../../../src/App.css';
import { useNavigate } from 'react-router-dom';
const Landingpage = ({ firmName, setFirmName }) => {
  const navigate = useNavigate()
  const [showLogin,setShowLogin]= useState(false);

    const [showRegister,setShowRegister] = useState(false)
    const [showFirm,setShowFirm]= useState(false)
  const [showProduct,setShowProduct]= useState(false)
  const [showFirmTitle,setShowFirmTitle]= useState(true)
  // const [showWelcome,setShowWelcome]= useState(false)
  const [showAllProducts,setShowAllProducts] = useState(false)
const [showLogOut,setShowLogOut] = useState(false)
const [firmTitle,setFirmTitle]= useState(true)
    const showLoginhandler = ()=>{
      setShowLogin(true)
      setShowRegister(false)
      setShowProduct(false)
      setShowFirm(false)
      //  setShowWelcome(false)
       setShowAllProducts(false)

    }

    const showRegisterHandler = ()=>{
      setShowRegister(true)
      setShowLogin(false)
      setShowProduct(false)
      setShowFirm(false)
      //  setShowWelcome(false)
       setShowAllProducts(false)
    }
     const showFirmHandler = ()=>{
      if(showLogOut){
        setShowFirm(true)
      setShowRegister(false)
      setShowLogin(false)
      setShowProduct(false)
      //  setShowWelcome(false)
       setShowAllProducts(false)
      }
     else{
      alert('please login , you are not loged in')
      setShowLogin(true)
     }
    }

     const showProductHandler = ()=>{
      if(showLogOut){
         setShowProduct(true)
      setShowFirm(false)
      setShowRegister(false)
      setShowLogin(false)
      //  setShowWelcome(false)
       setShowAllProducts(false)
      }
      else{
      alert('please login , you are not loged in')
      setShowLogin(true)
     }
      
     
    }

    // const showWelcomeHandler =()=>{
    //   setShowWelcome(true)
    //   setShowProduct(false)
    //   setShowFirm(false)
    //   setShowRegister(false)
    //   setShowLogin(false)
    //   setShowAllProducts(false)
    // }

    const showAllProductsHandler =()=>{
      if(showLogOut){
        setShowProduct(false)
      setShowFirm(false)
      setShowRegister(false)
      setShowLogin(false)
      setShowAllProducts(true)
       //  setShowWelcome(false)
      }
     
       else{
      alert('please login , you are not loged in')
      setShowLogin(true)
     }
        
    }

  useEffect(()=>{
    const loginToken =  localStorage.getItem("LoginToken");
    if(loginToken){
      setShowLogOut(true)
    }
  },[])

useEffect(()=>{
  const firmName = localStorage.getItem('vendorFirmName')
  if(firmName){
    setFirmTitle(false)
  }

},[])




  


const handleLogOut = () => {
  const isConfirm = confirm("Are you sure to logout?");
  
  if (!isConfirm) {
    return;
  }
  localStorage.removeItem('LoginToken');
  localStorage.removeItem('firmId');
  localStorage.removeItem('vendorFirmName')
  setShowLogOut(false);
 
  navigate('/')
};


  return (
    <>
    <section className='landingSection'>
    <NavBar showLoginhandler={showLoginhandler} showRegisterHandler={showRegisterHandler} showLogOut={showLogOut} handleLogOut={handleLogOut} firmName={firmName}/>
    <SideBar showFirmHandler={showFirmHandler} showProductHandler={showProductHandler}  firmTitle={firmTitle} showAllProductsHandler={showAllProductsHandler}/>
    <div className="mainContent">

        {showLogin &&  <Login   showLoginhandler={showLoginhandler}   setShowLogOut={setShowLogOut}  setFirmName={setFirmName} setFirmTitle={setFirmTitle}  />}
        {showRegister && <Register showLoginhandler={showLoginhandler} /> }


</div>
<div>
  {showFirm && showLogOut &&  <AddFirm/>}
</div>
<div>
 {showProduct &&  showLogOut && <AddProduct />} 
</div>



<div>
  {showAllProducts && showLogOut && <AllProducts />}
</div>



    </section>


    </>
  )
}

export default Landingpage