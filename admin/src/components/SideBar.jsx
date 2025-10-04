import React from 'react';
import { assets } from '../assets/assets';
import './SideBar.css'; // Make sure you import the CSS file
import { NavLink } from 'react-router-dom';

const SideBar = () => {
  return (
    // We'll leave the container styles in Tailwind for this example
    <div className='sidebar w-[18%] min-h-[100vh] border-solid border-[#a9a9a9] border-[1.5px] border-t-0 text-[max(1vw,10px)]'>
      <div className="sidebar-options !pt-[50px] !pl-[20%] flex flex-col gap-[20px]">
        
        <NavLink 
          to="/add" 
          className={({ isActive }) => isActive ? "side-option active" : "side-option"}
        >
          <img src={assets.add_icon} alt="" />
          <p>Add Items</p>
        </NavLink>
        
        <NavLink 
          to="/list" 
          className={({ isActive }) => isActive ? "side-option active" : "side-option"}
        >
          <img src={assets.order_icon} alt="" />
          <p>List Items</p>
        </NavLink>
        
        <NavLink 
          to="/order" 
          className={({ isActive }) => isActive ? "side-option active" : "side-option"}
        >
          <img src={assets.order_icon} alt="" />
          <p>Orders</p>
        </NavLink>

      </div>
    </div>
  );
};

export default SideBar;