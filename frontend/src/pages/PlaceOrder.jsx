import React, { useState, useEffect } from 'react'
import { useContext } from 'react'
import { StoreContext } from '../context/StoreContext';
import "./PlaceOrder.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const navigate = useNavigate();
  const minimum_order_amount = 50;
  const { getTotalCartAmount, token, food_list, carItems, URL } = useContext(StoreContext);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: ""
  })
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }))
  }
  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.forEach((item) => {
      if (carItems[item._id] > 0) {
        const itemInfo = { ...item, quantity: carItems[item._id] };
        orderItems.push(itemInfo);
      }
    });
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    }
    let response = await axios.post(URL + "/api/order/place", orderData, { headers: { token } });
    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    } else {
      alert("Error");
    }
  }
  useEffect(() => {
    if (!token) {
      navigate("/cart");
    } else if (getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  }, [token])

  return (
    <form onSubmit={placeOrder} className='place-order flex items-start justify-between gap-[50px] !mt-[100px]'>
      <div className="place-order-left w-full max-w-[max(30%,500px)] ">
        <p className="title text-[30px] font-[600] !mb-[50px]">Delivery Information</p>
        <div className="multi-fields flex gap-[10px]">
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} className='!mb-[15px] w-full border-[1px] border-solid border-[#c5c5c5] rounded-[4px] outline-red-400' type="text" placeholder='First name' />
          <input required name='lastName' onChange={onChangeHandler} value={data.lastName} className='!mb-[15px] w-full border-solid border-[#c5c5c5] rounded-[4px] outline-red-400' type="text" placeholder='Last name' />
        </div>
        <input required name='email' onChange={onChangeHandler} value={data.email} className='!mb-[15px] w-full border-solid border-[#c5c5c5] rounded-[4px] outline-red-400' type="text" placeholder='Email address' />
        <input required name='street' onChange={onChangeHandler} value={data.street} className='!mb-[15px] w-full border-solid border-[#c5c5c5] rounded-[4px] outline-red-400' type="text" placeholder='street' />
        <div className="multi-fields flex gap-[10px]">
          <input required name='city' onChange={onChangeHandler} value={data.city} className='!mb-[15px] w-full border-solid border-[#c5c5c5] rounded-[4px] outline-red-400' type="text" placeholder='City' />
          <input required name='state' onChange={onChangeHandler} value={data.state} className='!mb-[15px] w-full border-solid border-[#c5c5c5] rounded-[4px] outline-red-400' type="text" placeholder='State' />
        </div>
        <div className="multi-fields flex gap-[10px]">
          <input required name='zipCode' onChange={onChangeHandler} value={data.zipCode} className='!mb-[15px] w-full border-solid border-[#c5c5c5] rounded-[4px] outline-red-400' type="text" placeholder='Zip code' />
          <input required name='country' onChange={onChangeHandler} value={data.country} className='!mb-[15px] w-full border-solid border-[#c5c5c5] rounded-[4px] outline-red-400' type="text" placeholder='Country' />
        </div>
        <input required name='phone' onChange={onChangeHandler} value={data.phone} className='!mb-[15px] w-full border-solid border-[#c5c5c5] rounded-[4px] outline-red-400' type="text" placeholder='phone' />
      </div>
      <div className="place-order-right w-full max-w-[max(40%,500px)] ">
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
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr className='!my-[10px]' />
            <div className="cart-total-details flex justify-between text-[#555]">
              <b>Total</b><b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button type='submit' disabled={getTotalCartAmount() < minimum_order_amount} className='!mt-[30px] text-white bg-red-400 w-[max(15vw,200px)] !py-[0px] !px-[12px] rounded-[4px] cursor-pointer '>PROCEED TO PAYMENT</button>
          {getTotalCartAmount() > 0 && getTotalCartAmount() < minimum_order_amount && (

            <p className="text-red-500 mt-2 text-center">Minimum order value is ${minimum_order_amount}.</p>
          )}
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
