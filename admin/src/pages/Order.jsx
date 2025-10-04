import React,{useState,useEffect} from 'react'
import {toast} from "react-toastify";
import axios from 'axios'
import {assets} from "../assets/assets"
import './Order.css'
const Order = ({URL}) => {
  const [orders, setOrders] = useState([]);
  const fetchAllOrders=async()=>{
    const response=await axios.get(URL+"/api/order/list");
    if(response.data.success){
      setOrders(response.data.data);
      console.log(response.data.data);
    }else{
      toast.error("Error")
    }
  }
  const statusHandler=async(event,orderId)=>{
    const response=await axios.post(URL+"/api/order/status",{
      orderId,
      status:event.target.value
    })
    if(response.data.success){
      await fetchAllOrders();
    }
  }
  useEffect(() => {
    
    fetchAllOrders();
  }, [])
  
  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order,index)=>{
          return(
            <div key={index} className="order-item grid grid-cols-[0.5fr_2fr_1fr_1fr_1fr] self-start gap-[30px] border-[1px] border-solid border-red-400 !p-[20px] !mx-[0px] !my-[30px] text-[14px] text-[#505050] ">
              <img src={assets.parcel_icon} alt="" srcset="" />
              <div>
                <p className="order-item-food font-[600]  ">
                  {order.items.map((item,index)=>{
                    if(index==order.items.length-1){
                      return item.name+" x "+item.quantity;
                    }else{
                      return item.name+" x "+item.quantity+", ";
                    }
                  })}
                </p>
                <p className="order-item-name font-[600] !mt-[30px] !mb-[5px]">
                  {order.address.firstName+" "+order.address.lastName}
                </p>
                <div className="order-item-address !mb-[10px] ">
                  <p>{order.address.street+", "}</p>
                  <p>{order.address.city+", "}</p>
                  <p>{order.address.state+", "}</p>
                  <p>{order.address.country+", "}</p>
                  <p>{order.address.zipCode+", "}</p>
                </div>
                <p className="order-item-phone">
                  {order.address.phone}
                </p>
              </div>
              <p>Items: {order.items.length}</p>
              <p>${order.amount}</p>
              <select  onChange={(event)=>statusHandler(event,order._id)} value={order.status} className='bg-[#ffe8e4] border-[1px] border-solid border-red-400 w-[max(10vw,120px)] !p-[10px] outline-none' name="" id="">
                <option  value="Food Processing">Food Processing</option>
                <option value="Out for deleivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          )
        })}
      </div>

    </div>
  )
}

export default Order
