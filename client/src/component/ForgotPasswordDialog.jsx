import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { toast } from 'react-toastify';
import axios from 'axios';


const VerifyForm = ({ setIsVerified, setUserFoundData}) => {
    const [username, setUsername] = useState("");

    const verifyUsername = async (e) => {
        e.preventDefault();
        if(username === ""){
            return toast.warning("Fill up all fields.", { position: toast.POSITION.TOP_RIGHT });
        }

        const { data } = await axios.post("/verify_username", { username });
        if(typeof data === "object"){
            toast.success("Username is found.", { position: toast.POSITION.TOP_RIGHT });
            setUserFoundData(data);
            setIsVerified(true);
        }else{
            return toast.error("Username can't found. Try again.", { position: toast.POSITION.TOP_RIGHT });
        }
    }

    return (
        <form className="grid gap-4" onSubmit={verifyUsername}>
            <div className="grid gap-2">
                <label>Username</label>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <span className="text-sm">Enter your current username to continue the process.</span>
            <button className="btn-primary mt-6 py-2">
                SUBMIT
            </button>
        </form>
    )
}

const ResetForm = ({ userFoundData, setUserFoundData, setVisible }) => {
    const [resetData, setResetData] = useState({
        newPassword: "",
        confirmPassword: ""
    })

    const resetPassword = async (e) => {
        e.preventDefault();

        if(resetData.newPassword === "" || resetData.confirmPassword === ""){
            return toast.warning("Fill up all fields.", { position: toast.POSITION.TOP_RIGHT });
        }

        if(resetData.newPassword !== resetData.confirmPassword ){
            return toast.warning("Password did not match.", { position: toast.POSITION.TOP_RIGHT });
        }

        const { data } = await axios.put("/update_password_account", { id: userFoundData.id, password: resetData.confirmPassword });
        if(typeof data === "object"){
            setVisible(false);
            setUserFoundData({});
            toast.success("Password has been change successfully.", { position: toast.POSITION.TOP_RIGHT });
        }else{
            toast.error("Failed to change the password. Try again.", { position: toast.POSITION.TOP_RIGHT });
        }
    }

    return (
        <form className="grid gap-4" onSubmit={resetPassword}>
            <div className="grid gap-2">
                <label>New Password</label>
                <input
                    type="password"
                    placeholder="New Password"
                    value={resetData.newPassword}
                    onChange={(e) => setResetData(prev => ({...prev, newPassword: e.target.value}))}
                />
            </div>
            <div className="grid gap-2">
                <label>ConfirmPassword</label>
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={resetData.confirmPassword}
                    onChange={(e) => setResetData(prev => ({...prev, confirmPassword: e.target.value}))}
                />
            </div>
            <button className="btn-primary mt-6 py-2">
                SUBMIT
            </button>
        </form>
    )
}

const ForgotPasswordDialog = ({ setVisible, visible }) => {
    const [isVerified, setIsVerified] = useState(false);
    const [userFoundData, setUserFoundData] = useState({});

    return (
        <Dialog
            className='w-[90%] md:w-[50%]'
            header="Forgot Password" 
            draggable={false}
            visible={visible}
            onHide={() => setVisible(false)}
        >
            {  
                isVerified ?
                <ResetForm 
                    userFoundData={userFoundData} 
                    setVisible={setVisible}
                    setUserFoundData={setUserFoundData}/> :
                <VerifyForm 
                    setIsVerified={setIsVerified} 
                    setUserFoundData={setUserFoundData}/>
            }
        </Dialog>
    )
}

export default ForgotPasswordDialog