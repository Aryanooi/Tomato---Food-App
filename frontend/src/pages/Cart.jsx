import React, { useContext } from 'react'
import { StoreContext } from '../context/StoreContext';
import './Cart.css'
import { useNavigate } from 'react-router-dom';
const Cart = () => {
  const {URL, carItems,food_list,removeFromCart,getTotalCartAmount} = useContext(StoreContext);
  const navigate = useNavigate();
  return (
    <div className='cart !mt-[100px]'>
        <div className="cart-Items">
          <div className="cart-items-title grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr] align-items-center text-gray-600 text-[max(1vw,12px)] ">
            <p>Items</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>
          <br />
          <hr />
          {food_list.map((item,index)=>{
            if(carItems[item._id]>0){
              return (
                <div key={index}>
            
                <div className="cart-items-title  grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr] align-items-center text-gray-600 text-[max(1vw,12px)] cart-item-item !my-[10px] !mx-[0px] text-black]">
                  <img className='w-[50px]' src={URL+"/images/"+item.image} alt="" srcset="" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{carItems[item._id]}</p>
                  <p>${item.price*carItems[item._id]}</p>
                  <p onClick={()=>removeFromCart(item._id)} className='cross cursor-pointer'>x</p>
                </div>
                <hr className='h-[1px] bg-[#e2e2e2] border-none' />
                </div>
              )
            }
          })}
        </div>
        <div className="cart-bottom !mt-[80px] flex justify-between gap-[max(12vw,20px)]">

          <div className="cart-total flex-1 flex flex-col gap-[20px]">
            <h2 className='text-[20px] font-semibold'>Cart Totals</h2>
            <div>
              <div className="cart-total-details flex justify-between text-[#555]">
                <p>SubTotal</p>
                <p>${getTotalCartAmount()}</p>
              </div>
              <hr className='!my-[10px]' />
              <div className="cart-total-details flex justify-between text-[#555]">
                <p>Delivery Fee</p>
                <p>${getTotalCartAmount()===0?0:2}</p>
              </div>
              <hr className='!my-[10px]'/>
              <div className="cart-total-details flex justify-between text-[#555]">
                <b>Total</b><b>${getTotalCartAmount()===0?0: getTotalCartAmount()+2}</b>
              </div>
              
            </div>
            <button onClick={()=>navigate('/order')} className='text-white bg-red-400 w-[max(15vw,200px)] !py-[0px] !px-[12px] rounded-[4px] cursor-pointer '>PROCEED TO BUY</button>
          </div>
          <div className="promo-code flex-1 ">
            <div className="">
              <p className='text-[#555]'>if you have promo code, Enter it here</p>
              <div className="cart-promo-input flex !mt-[10px] justify-between items-center bg-[#eaeaea] rounded-[4px]">
                <input className='bg-transparent !pl-[10px]' type="text" placeholder='promo code' />
                <button className='w-[max(10vw,150px)] !py-[10px] !px-[5px] bg-black text-white rounded-[4px] '>Submit</button>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Cart
