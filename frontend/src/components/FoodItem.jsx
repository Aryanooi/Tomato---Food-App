import React,{useContext, useState} from 'react'
import { assets } from '../assets/assets'
import { StoreContext } from '../context/StoreContext';

const FoodItem = ({id,name,price,description,image}) => {
    const {carItems,addToCart,removeFromCart,URL}=useContext(StoreContext);
   
  return (
    <div className='food-item w-full !m-auto rounded-[15px] shadow-[0_0_10px_#00000015] cursor-pointer ' >
        <div className="food-item-image-container relative">
            <img className='food-item-image w-full rounded-[15px_15px_0px_0px]' src={URL+"/images/"+image} alt="" />
            {!carItems[id]
            ?<img className='add w-[35px] absolute bottom-[15px] right-[15px] cursor-pointer rounded-[50%] ' onClick={()=>addToCart(id)} src={assets.add_icon_white}/>
            :<div className='food-item-counter absolute bottom-[15px] right-[15px] flex items-center gap-[10px] !p-[6px] rounded-[50px] bg-white'>
                <img className='w-[30px]' onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} alt="" srcset="" />
                <p>{carItems[id]}</p>
                <img className='w-[30px]' onClick={()=>addToCart(id)} src={assets.add_icon_green} alt="" srcset="" />
             </div>}
        </div>
        <div className="food-item-info !p-[20px]">
            <div className="food-item-name-rating flex justify-between items-center !mb-[10px]">
                <p className='text-[20px] font-[500]'>{name}</p>
                <img className='w-[70px]' src={assets.rating_starts} alt="" />
            </div>
            <p className="food-item-desc text-[#676767] text-[12px]">{description}</p>
            <p className="food-item-price text-red-400 font-[500] !my-[10px] !mx-0">${price}</p>
        </div>
    </div>
  )
}

export default FoodItem
