import React, { useContext, useState, useRef, useEffect } from 'react'
import './Navbar.css'
import { assets } from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../context/StoreContext'
const Navbar = ({ setShowLogin }) => {
    const [menu, setmenu] = useState("home");
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);
    const { token, setToken, getTotalCartAmount } = useContext(StoreContext);  
    const dropdownRef = useRef(null); 
    const toggleDropdown = () => {
        setShowDropdown(prev => !prev);
    };
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    const logut = () => {
        localStorage.removeItem("token");
        setToken("");
        navigate("/")
    }
    return (
        <div className='navbar !px-5 !py-4 flex justify-between items-center '>
            <Link to='/'> <img src={assets.logo} alt="" className='logo w-[150px]' srcset="" /></Link>
            <ul className='navbar-menu flex style-none gap-5 text-[#49557e] text-[18px] '>
                <Link to="/" onClick={() => setmenu("home")} className={menu === "home" ? "active" : ""}>home</Link>
                <a href='#explore-menu' onClick={() => setmenu("menu")} className={menu === "menu" ? "active" : ""}>menu</a>
                <a href='#app-download' onClick={() => setmenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>mobile-app</a>
                <a href='#footer' onClick={() => setmenu("Contact-us")} className={menu === "Contact-us" ? "active" : ""}>contact us</a>
            </ul>
            <div className="navbar-right flex gap-10 items-center">
                <img src={assets.search_icon} alt="" srcset="" />
                <div className="navbar-search-icon relative">
                    <Link className='cursor-pointer' to="/cart" ><img src={assets.basket_icon} alt="" srcset="" /></Link>
                    <div className={` ${getTotalCartAmount() === 0 ? "" : " dot absolute h-[10px] w-[10px] bg-red-400 rounded-[5px] top-[-8px] right-[-8px]"}`}></div>
                </div>
                {!token ?
                    <button
                        onClick={() => setShowLogin(true)}
                        className="signIn w-[100px] h-[40px] rounded-[50px] bg-gray-200 flex items-center justify-center text-sm text-[#49557e] border border-black"
                    >
                        Sign in
                    </button>
                    :
                    <div className="navbar-profile relative" ref={dropdownRef} >
                        <img
                            src={assets.profile_icon}
                            alt=""
                            className="cursor-pointer"
                            onClick={toggleDropdown} // ✅ for mobile click
                        />
                        <ul
                            className={`nav-profile-dropdown absolute right-0 z-10 bg-[#fff2df] border border-tomato rounded-md shadow-md
                                 flex-col gap-2 p-3 transition-all duration-300 ease-in-out
                                 ${showDropdown ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}
                        >


                            <Link to="/myorders" className="!pr-[10px] flex items-center gap-[10px] cursor-pointer">
                                <img src={assets.bag_icon} alt="" />
                                Order
                            </Link>
                            <hr />
                            <li className="!pr-[10px] flex items-center gap-[10px] cursor-pointer" onClick={logut}>
                                <img src={assets.logout_icon} alt="" />
                                <p>LogOut</p>
                            </li>
                        </ul>
                    </div>
                }
            </div>
        </div>
    )
}

export default Navbar
