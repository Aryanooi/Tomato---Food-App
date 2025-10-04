import React, { useContext, useState, useEffect } from 'react'
import { StoreContext } from '../context/StoreContext'
import './Myorders.css'
import { assets } from '../assets/assets'
import axios from 'axios'
const Myorders = () => {
  const [data, setdata] = useState([]);
  const { token, URL } = useContext(StoreContext);
  const fetchOrders = async () => {
    console.log(token);
    const response = await axios.post(URL + "/api/order/orders", {}, { headers: { token } })
    if (response.data.success) {
      setdata(response.data.data);
    } else {
      console.error("API Error:", response.data.message);
    }
  }
  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token])

  return (
    <div className='my-orders !mx[0px] !my-[50px]'>
      <h2 className='text-[25px] font-bold'>My Orders</h2>
      <div className="containerr flex flex-col  gap-[20px] !mt-[30px]">
        {data.map((order, index) => {
          return (
            <div key={index} className="my-orders-order grid grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr] self-center gap-[30px] text-[14px] !py-[10px] !px-[20px] text-[#454545] border-[1px] border-solid border-red-400 ">
              <img className='w-[50px]' src={assets.parcel_icon} alt="" srcset="" />
              <p>{order.items.map((item, index) => {
                if (index == order.items.length - 1) {
                  return item.name + " x " + item.quantity;
                } else {
                  return item.name + " x " + item.quantity + ", ";

                }
              })}
              </p>
              <p>${order.amount}.00</p>
              <p>Items:{order.items.length}</p>
              <p><span className='text-red-400'>&#x25cf;</span><b className='font-[500] text-[#454545]'>{order.status}</b></p>
              <button onClick={fetchOrders} className='hidden !px-0 !py-[12px] rounded-[4px] bg-[#ffe1e1] cursor-pointer text-[#454545]'>Track Order</button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Myorders
