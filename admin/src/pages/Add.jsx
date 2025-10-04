import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import axios from "axios";
import { toast } from 'react-toastify'; 
const Add = ({URL}) => {
  const [image, setImage] = useState(false);
  const [data, setdata] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad"
  })
  const onChangeHandler = async (e) => {
    setdata(data => ({ ...data, [e.target.name]: e.target.value }))
  }
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);
    const response = await axios.post(`${URL}/api/food/add`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.data.success) {
      setdata({
        name: "",
        description: "",
        price: "",
        category: "Salad"
      })
      setImage(false);
      toast.success(response.data.message);
    }
    else {
      toast.error(response.data.message);
     }
  }
  return (
    <div className='add w-[70%] !ml-[max(5vw,25px)] !mt-[50px] text-[#6d6d6d] text-[16px] '>
      <form onSubmit={onSubmitHandler} className='col-flex gap-[20px]'>
        <div className="add-img-upload ">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img className='w-[120px]' src={image ? window.URL.createObjectURL(image) : assets.upload_area} alt="" srcset="" />
          </label>

          <input onChange={(e) => { setImage(e.target.files[0]) }} type="file" name="" id="image" hidden required />
        </div>
        <div className="add-product-name col-flex w-[max(40%,280px)]">
          <p>Product name</p>
          <input onChange={onChangeHandler} value={data.name} className='!p-[10px]' type="text" name='name' placeholder='Type here' />
        </div>
        <div className="add-product-description col-flex w-[max(40%,280px)]">
          <p>Product description</p>
          <textarea onChange={onChangeHandler} value={data.description} className='!p-[10px]' name="description" rows={6} placeholder='Write content here' required></textarea>
        </div>
        <div className="add-category-price flex gap-[30px]">
          <div className="add-category col-flex">
            <p>Product Category</p>
            <select onChange={onChangeHandler} name="category" required>
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Desert">Desert</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure veg">Pure veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price col-flex">
            <p>Product price</p>
            <input onChange={onChangeHandler} value={data.price} type="number" name="price" placeholder='$20' id="" />
          </div>
        </div>
        <button type='submit' className='add-btn w-[200px] text-center border-none !p-[10px] bg-black text-white cursor-pointer flex self-center justify-center '>ADD</button>
      </form>
    </div>
  )
}

export default Add
