import React, { useContext, useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { UserContext } from '../context/UserContext';
import ForgotPasswordDialog from '../component/ForgotPasswordDialog';

const Login = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const { setCurrentUser } = useContext(UserContext);
  const [loginData, setLoginData] = useState({
    username: "",
    password: ""
  })

  const handleInput = (e) => {
    setLoginData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleLoginForm = async (e) => {
    e.preventDefault();
    if(loginData.username === "" || loginData.password === ""){
      return toast.warning("Fill up all fields.", { position: toast.POSITION.TOP_RIGHT });
    }

    const { data } = await axios.post("/login", loginData);
    if(typeof data === "object"){
      setCurrentUser(data && data[0]);
      navigate("/");
    }else{
      return toast.error(data, { position: toast.POSITION.TOP_RIGHT });
    }
  }

  return (
    <>
      <ToastContainer 
        hideProgressBar={true}
        draggable={true}
      />
      <ForgotPasswordDialog 
        setVisible={setVisible}
        visible={visible}
      />
      <div className="w-full flex flex-wrap">
        <div className="w-full md:w-1/2 flex flex-col">
          <div className="flex justify-center md:justify-start pt-12 md:pl-12 md:-mb-24">
              <div className="bg-black text-white font-bold text-md p-3 rounded-lg grid">
                <span>INVENTORY SYSTEM</span>
                <span className='text-sm font-semibold'>TANYAG HARDWARE</span>
              </div>
          </div>
          <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
            <p className="text-center text-3xl">Welcome.</p>
            <div className="flex flex-col pt-3 md:pt-8">
              <div className="flex flex-col pt-4">
                <label className="text-lg">Username</label>
                <input onChange={handleInput} type="text" name="username" placeholder="Username" />
              </div>
              <div className="flex flex-col pt-4">
                <label className="text-lg">Password</label>
                <input onChange={handleInput} type="password" name="password" placeholder="Password" />
              </div>
              <button className='text-sm underline mt-4 max-w-max self-end' onClick={() => setVisible(true)}>Forgot Password?</button>
              <button onClick={handleLoginForm} className="cursor-pointer bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8 rounded-lg">Log In</button>
            </div>
          </div>
        </div>
        <div className="w-1/2 shadow-2xl">
            <img className="object-cover w-full h-screen hidden md:block" src="https://source.unsplash.com/IXUM4cJynP0" />
        </div>
      </div>
    </>
    
  )
}

export default Login