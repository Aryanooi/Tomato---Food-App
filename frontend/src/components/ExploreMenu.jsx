import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../assets/assets'
const ExploreMenu = ({category,setCategory}) => {
  return (
    <div className='explore-menu flex flex-col gap-[20px] ' id='explore-menu'>
      <h1 className='text-[#262626] font-[600]'>Explore our menu</h1>
      <p className='explore-menu-text max-w-[60%] text-[#808080]'>Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise.Satisfy your cravings and elevate your dining experience, one delicious meal at a time</p>
      <div className="explore-menu-list flex justify-between items-center text-center !my-[20px] !mx-[0px] gap-[30px] overflow-x-scroll ">
        {menu_list.map((item, index) => {
          return (
            <div onClick={()=>{setCategory(prev=>prev===item.menu_name?"All":item.menu_name)}} className="explore-menu-item" key={index}>
              <img className={`w-[7.5vw] min-w-[80px] cursor-pointer rounded-[50%] transition-[0.2s]  ${category!==item.menu_name?"All":"expore-menu-active"}`}  src={item.menu_image} alt={item.menu_name} />
              <h2 className={`!mt-[10px] text-[#747474] text-[max(1.4vw,16px)] cursor-pointer`}>{item.menu_name}</h2>
            </div>
          );
        })}
      </div>
      <hr className='!my-[10px] h-[2px] bg-[#e2e2e2] border-none' />
    </div>
  )
}

export default ExploreMenu
