import React from 'react'
import Navbar from './components/Navbar'
import SideBar from './components/SideBar'
import { Routes,Route } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Order from './pages/Order'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  const URL="http://localhost:5000";
  return (
    <div>
      <ToastContainer position="top-right" autoClose={2000} />
      <Navbar />
      <hr />
      <div className="app-content flex ">
        <SideBar />
        <Routes>
          <Route path="/add" element={<Add URL={URL}/>}/>
          <Route path="/list" element={<List URL={URL}/>}/>
          <Route path="/order" element={<Order URL={URL}/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App
