import React from 'react'
import { assets } from '../assets/assets'
import './Footer.css'
const Footer = () => {
  return (
    <div className='footer text-[#d9d9d9] bg-[#323232] flex flex-col items-center gap-[20px] !px-[8vw] !py-[20px] !pt-[80px] !mt-[100px]' id='footer'>
        <div className="footer-content w-full grid grid-cols-[2fr_1fr_1fr] gap-[80px]">
            <div className="footer-left flex flex-col items-start gap-[20px] ">
                <img src={assets.logo} alt="" srcset="" />
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae ducimus reiciendis, fuga quos obcaecati repellat asperiores quo quam nobis magnam aliquid neque cum eum provident animi, mollitia fugit, magni sequi?</p>    
                <div className="footer-social-icons w-[40px]  flex gap-x-3.5">
                    <img src={assets.facebook_icon} alt="" className=''/>
                    <img src={assets.twitter_icon} alt="" className='' />
                    <img src={assets.linkedin_icon} alt=""  className=''/>
                </div>
              </div>
            <div className="footer-center flex flex-col items-start gap-[20px]">
                <h2 className='text-white text-[24px] font-bold'>COMPANY</h2>
                <ul className='gap-2'>
                    <li className='cursor-pointer'>Home</li>
                    <li className='cursor-pointer'>About us</li>
                    <li className='cursor-pointer'>Delivery</li>
                    <li className='cursor-pointer'>Privacy policy</li>
                </ul> 
            </div>
            <div className="footer-right flex flex-col items-start gap-[20px]">
                <h2 className='text-white text-[24px] font-bold'>GET IN TOUCH</h2>
                    <ul className='gap-2'>
                        <li className='cursor-pointer'>+91 9090909099</li>
                        <li className='cursor-pointer'>contact@tomato.com</li>
                    </ul>
            </div>
        </div>
        <hr className='w-full h-[2px] !mx-[0] !my-[20px] bg-gray-600 border-none' />
        <p className='footer-copyright'>Copyright 2025 &copy; Tomato.com - All  Rights Reserved. </p>
    </div>
  )
}

export default Footer
