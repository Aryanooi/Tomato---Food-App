import React from 'react'
import { useState } from 'react';
import "./List.css"
import axios from 'axios';
import { useEffect } from 'react';
import { toast } from 'react-toastify'; 
const List = ({URL}) => {
  const [list, setlist] = useState([]);
  const fetchList=async()=>{
    const response=await axios.get( `${URL}/api/food/list`);
    console.log(response.data.foods);
    if(response.data.success){

      setlist(response.data.foods);  
    }else{
      toast.error("Error");
    }
  }
  const removeFood=async(id)=>{
    const response = await axios.post(`${URL}/api/food/remove`,{id:id});
    if(response.data.success){
      toast.success("Food Removed");
      fetchList();
    }else{
      toast.error("Error");
    }
  }
  useEffect(() => {
    fetchList();
  }, [])
  
  return (
    <div>
      <div className="list add col-flex">
        <p>All Foods List</p>
         <div className="list-table">
          <div className="list-table-format  title">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Action</b>
          </div>
         </div>
         {list.map((item,index)=>{
          return(
              <div key={index} className="list-table-format ">
                <img className='w-[50px]'  src={`${URL}/images/`+item.image} alt="" srcset="" />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>{item.price}</p>
                <p onClick={()=>removeFood(item._id)} className='cursor-pointer'>X</p>
              </div>
          )
         })}
      </div>
    </div>
  )
}

export default List
