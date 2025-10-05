import React from 'react'
import './Header.css'
const Header = () => {
  return (
    <div className='header h-[34vw] mx-auto my-[30px] bg-[url("/header_img.png")] bg-no-repeat bg-contain relative'>
        <div className="header-contents absolute flex flex-col gap-[1.5vw] max-w-[50%] bottom-[10%] left-[6vw]">
            <h2 className='font-[500] text-white text-[max(4.5vw,22px)] '>Order your favourite food here</h2>
            <p className='text-white text-[1vw]'>Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise.Satisfy your cravings and elevate your dining experience, one delicious meal at a time</p>
            <button className='border-none text-[#747474] !px-[1vw] !py-[1vw] bg-white text-[max(1vw,13px)] rounded-[50px] w-fit'>View Menu</button>
        </div>
    </div>
  )
} 

export default Header
