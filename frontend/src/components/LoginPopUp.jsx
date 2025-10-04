import React, { useState, useContext} from 'react'
import { assets } from '../assets/assets'
import { StoreContext } from '../context/StoreContext';
import axios from "axios";
const LoginPopUp = ({ setShowLogin }) => {
    const {URL,setToken}=useContext(StoreContext);
    const [currState, setCurrState] = useState("LogIn");
    const [data, setdata] = useState({ name: "", email: "", password: "" });
    const onChangeHandler = (e) => {
        setdata(data=>({ ...data, [e.target.name]: e.target.value }))
    }
    const onLogin=async(e)=>{
        let payload;
        e.preventDefault();
        let newURL=URL;
        if(currState==="LogIn"){
            newURL+="/api/user/login";
            payload={email:data.email,password:data.password}
        }else{ 
            payload={name:data.name,email:data.email,password:data.password}
            newURL+="/api/user/register";
        }

        const response=await axios.post(newURL,payload);
        if(response.data.success){
            setToken(response.data.token);
            localStorage.setItem("token",response.data.token);
            setShowLogin(false);
        }else{
            alert(response.data.message); 
        }
    }
    return (
        <div className='login-popup absolute z-10 w-full h-full bg-[#00000090] grid'>
            <form onSubmit={onLogin} className="login-popup-container flex self-center justify-self-center w-[max(23vw,330px)] text-[#808080] bg-white   flex-col gap-[25px] !py-[25px] !px-[30px] rounded-[8px] text-[14px] ">
                <div className="login-popup-title flex justify-between items-center text-black">
                    <h2>{currState}</h2>
                    <img className='w-[16px] cursor-pointer' onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" srcset="" />
                </div>
                <div className="login-popup-input flex flex-col gap-[20px]">
                    {currState === "LogIn" ? <></> : <input onChange={onChangeHandler} value={data.name} name='name' id='name' className='border-[1px_solid_#c9c9c9] !p-[10px] rounded-[4px]' type="text" placeholder='Your name' required />}

                    <input value={data.email} onChange={onChangeHandler} className='border-[1px_solid_#c9c9c9] !p-[10px] rounded-[4px]' type="email" placeholder='Your email' name="email" id="email" required />
                    <input onChange={onChangeHandler} className='border-[1px_solid_#c9c9c9] !p-[10px] rounded-[4px]' type="password" placeholder='Your password' name="password" value={data.password} id="password" required />
                </div>
                <button type='submit'  className='!p-[10px] rounded-[4px] text-white bg-red-400 text-[15px] cursor-pointer '>{currState === "SignUp" ? "Create account" : "LogIn"}</button>
                <div className="login-popup-condition flex items-start gap-[8px] !mt-[-10px]">
                    <input className='!mt-[5px]' type="checkbox" name="" id="" required />
                    <p>By continuing, i agree to the terms of use & privacy policy.</p>

                </div>
                {currState === "LogIn" ?
                    <p>Create a new account? <span className='text-red-400 font-[500] cursor-pointer' onClick={() => setCurrState("SignUp")}>Click here</span> </p> :
                    <p>Already have an account?<span className='text-red-400 font-[500] cursor-pointer' onClick={() => setCurrState("LogIn")}>Click here</span></p>
                }
            </form>
        </div>
    )
}

export default LoginPopUp
