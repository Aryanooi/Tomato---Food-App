import React from 'react'
import { assets } from '../assets/assets'

const AppDownload = () => {
  return (
    <div className='app-download  !mt-[100px] text-[max(3vw,20px)] flex flex-col items-center justify-center font-[500]' id='app-download'>
      <p className='text-center'>For Better Experience Download <br />Tomato App</p>
        <div className="app-download-platforms flex flex-row  gap-x-[max(2vw,10px)] !mt-[10px] w-[max(30vw,120px)] max-w-[180px]  duration-[0.5s] cursor-pointer ">
            <img className='hover:scale-[1.05] duration-[0.5s]' src={assets.play_store} alt="" srcset="" />
            <img className='hover:scale-[1.05] duration-[0.5s]' src={assets.app_store} alt="" srcset="" />
        </div>
    </div>
  )
}

export default AppDownload
