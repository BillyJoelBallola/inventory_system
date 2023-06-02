import React, { useEffect, useState } from 'react'
import { Dialog } from 'primereact/dialog';
import userImag from "../assets/user.webp";
import axios from 'axios';

const AcccountDialog = ({ visible, setVisible, toastMsgBox, setTableAction, editInfo, setEditInfo }) => {
    const [accountData, setAccountData] = useState({
        name: "",
        username: "",
        role: "",
        password: ""
    })

    useEffect(() => {
        if(editInfo){
            setAccountData(editInfo);
        }
    }, [editInfo])

    const resetForm = () => {
        setAccountData({
            name: "",
            username: "",
            role: "",
            password: ""
        })
    }

    const inputForm = (e) => {
        setAccountData((prev) => ({
            ...prev, 
            [e.target.name]: e.target.value
        }))
    } 

    const handleFormAccount = async (e) => {
        e.preventDefault();

        if(accountData.name === "" || accountData.username === ""){
            return toastMsgBox("warning", "Fill up all fields.");
        }

        setAccountData(prev => ({...prev, password: prev.username}));
        
        if(accountData.password !== ""){
            const { data } = await axios.post("/add_account", accountData)
            if(typeof data === "object"){
                setVisible(false);
                setTableAction('add');
                resetForm();
                toastMsgBox("success", "Successfully saved.");
            }else{
                setVisible(false);
                setTableAction('add');
                resetForm();
                toastMsgBox("error", data);
            }
        }
    }

    const handleEditAccount = (e) => {
        e.preventDefault();

        if(accountData.name === "" || accountData.username === ""){
            return toastMsgBox("warning", "Fill up all fields.");
        }

        axios.put("/update_account", accountData).then((res) => {
            setVisible(false);
            setTableAction('edit');
            toastMsgBox("success", "Edited successfully.");
        }).catch((err) => {
            setVisible(false);
            setTableAction('edit');
            toastMsgBox("error", "Failed to edit.");
        })
    }


    return (
        <Dialog 
            className='w-[90%] md:w-[50%]'
            header="User Account" 
            visible={visible}
            draggable={false}
            onHide={() => {
                setVisible(false)
                setEditInfo(null)  
                resetForm();
            }}>
            <form className='grid gap-4' onSubmit={editInfo ? handleEditAccount : handleFormAccount}>
                <div className='grid gap-6 items-center'>
                    <div className='grid gap-3'>
                        <div className='grid gap-1'>
                            <label>FULL NAME</label>
                            <input type="text" placeholder='Name' name='name' onChange={inputForm} value={accountData.name}/>
                        </div>
                        <div className='grid gap-1'>
                            <label>USERNAME</label>
                            <input type="text" placeholder='Username' name='username' onChange={inputForm} value={accountData.username}/>
                        </div>
                        <div className='grid gap-1'>
                            <label>ROLE</label>
                            <select name="role" onChange={inputForm} value={accountData.role}>
                                <option value="">--select role--</option>
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                            </select>
                        </div>
                    </div>
                </div>
                <button className='btn-primary mt-6 py-2'>{editInfo ? "SAVE EDIT" : "SAVE"}</button>
            </form>
        </Dialog>
    )
}

export default AcccountDialog