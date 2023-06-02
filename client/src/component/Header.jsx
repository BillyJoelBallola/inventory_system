import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext';
import userImg from "../assets/user.webp";

const Header = () => {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const { currentUser, setCurrentUser } = useContext(UserContext);
    
    useEffect(() => {
        window.cookieStore.get('token')
          .then((token) => {
            const { value } = token; 
            if(!value) navigate("/login");
          })
          .catch((err) => {
            navigate("/login");
          })
      }, [])

    const handleLogout = async () => {
        const { data } = await axios.post("/logout");
        if(data) {
            navigate("/login");
            setCurrentUser(null);
        }
    }

    return (
        <div className='py-3 border border-b-gray-200'>
            <div className='side-margin flex justify-between items-center'>
                <div className='flex flex-col'>
                    <span className='font-bold text-lg md:text-xl'>Inventory System</span>
                    <span className='font-semibold text-sm'>TANYAG'S HARDWARE</span>
                </div>
                <div className='p-2 rounded-xl flex gap-2 items-center cursor-pointer bg-gray-100 relative' onClick={() => setShowMenu(!showMenu)}>
                    <div className='grid place-items-center overflow-hidden w-8 aspect-square rounded-full border-2 border-gray-300'>
                        <img className='object-fit' src={currentUser?.image ? `http://localhost:4000/uploads/${currentUser.image}` : userImg} alt="user-image" />
                    </div>
                    <div className='hidden md:grid'>
                        <span className='text-sm'>{currentUser && currentUser.name}</span>
                        <span className='text-xs -mt-1'>{currentUser && currentUser.role}</span>
                    </div>
                    {
                        showMenu &&
                        <div className={`absolute right-0 top-12 bg-white shadow-md py-2 px-4 rounded-md text-gray-600`}>
                            <Link to="/profile" className='py-1 hover:underline whitespace-nowrap'>My Account</Link>
                            <button className='py-1 hover:underline' onClick={handleLogout}>Logout</button>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Header