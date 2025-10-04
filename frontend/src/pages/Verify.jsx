import React, { useContext,useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../context/StoreContext';
import  './Verify.css'

import axios from 'axios';
const Verify = () => {
    const [searchParams,setSearchParams]=useSearchParams();
    const success=searchParams.get("success");
    const orderId=searchParams.get("orderId");
    const {URL}=useContext(StoreContext);
    const navigate=useNavigate();
    const verifyPayment=async()=>{
        const response=await axios.post(URL+'/api/order/verify',{success,orderId});
        if(response.data.success){
            navigate("/myorders");
        }else{
            navigate("/")
        }
    }
    useEffect(() => {
      verifyPayment()
    }, [])
    
    return (
    <div className='verify min-h-[60vh] grid'>
        <div className="spinner w-[100px] h-[100px] place-self-center  border-[5px] border-solid border-[#bdbdbd] border-t-red-400 rounded-[50%]"></div>
    </div>
  )
}

export default Verify
