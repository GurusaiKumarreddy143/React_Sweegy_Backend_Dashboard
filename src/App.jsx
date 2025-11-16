import React,{useState} from 'react'
import Landingpage from './vendorDashboard/pages/Landingpage'
import { Route, Routes } from 'react-router-dom'
import WelcomePage from './vendorDashboard/pages/welcomePage'
import NotFound from './vendorDashboard/components/NotFound'

const App = () => {
  const [firmName, setFirmName] = useState(localStorage.getItem('vendorFirmName') || "");
  return (
    <div>
      <Routes>
        <Route path='/dashboard' element={ <Landingpage  firmName={firmName} setFirmName={setFirmName} />}></Route>
        <Route  path='/' element={<WelcomePage />} />
        <Route path ='/*' element={<NotFound />} />
      </Routes>

      
       
    </div>
   
  )
}

export default App