import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Cart from './pages/Cart'
import PlaceOrder from './pages/PlaceOrder'
import Footer from './components/Footer'
import LoginPopUp from './components/LoginPopUp'
import Verify from './pages/Verify'
import Myorders from './pages/Myorders'
import Chatbox from './components/Chatbox'
function App() {
  const [showLogin, setShowLogin] = useState(false);
  return ( 
    <>
      {showLogin?<LoginPopUp setShowLogin={setShowLogin} />:<></>}
      <div className='w-[80%] !m-auto '>
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/cart' element={<Cart/>} />
          <Route path='/order' element={<PlaceOrder/>} />
          <Route path='/verify' element={<Verify/>} />
          <Route path='/myorders' element={<Myorders/>} />
        </Routes>
      </div>
      <Footer/>
      <Chatbox/>
    </> 
  )
} 

export default App
