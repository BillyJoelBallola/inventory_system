import React, { useContext, useState } from "react";
import { Dialog } from 'primereact/dialog';
import { toast } from "react-toastify";
import axios from "axios";
import { UserContext } from "../context/UserContext";

const VerifiedDialog = ({ visible, setVisible, editAction, setEditAction, profile, setProfile}) => {
    const [password, setPassword] = useState("");  
    const { setUpdate } = useContext(UserContext);

    const editInfo = () => {
        if(profile.name === "" || profile.username === ""){
            setPassword("");
            return toast.warning("Fill up all fields.", { position: toast.POSITION.TOP_RIGHT });
        }

        axios.put("/update_account", {  id: profile.id, name: profile.name, username: profile.username }).then((res) => {
            setEditAction("");
            setUpdate("edit-info");
            setVisible(false);
            setPassword("");
            toast.success("Info edited successfully.", { position: toast.POSITION.TOP_RIGHT });
        }).catch((err) => {
            setEditAction("");
            setUpdate("edit-info");
            setVisible(false);
            setPassword("");
            toast.error("Failed to edit info.", { position: toast.POSITION.TOP_RIGHT });
        })
    }

    const editPassword = () => {
        if(profile.newPassword === "" || profile.confirmPassword === ""){
            setPassword("");
            return toast.warning("Fill up all fields.", { position: toast.POSITION.TOP_RIGHT });
        }

        if(profile.newPassword !== profile.confirmPassword){
            setPassword("");
            return toast.warning("Password did not match. Try again.", { position: toast.POSITION.TOP_RIGHT });
        }

        axios.put("/update_password_account", { id: profile.id, password: profile.confirmPassword }).then((res) => {
            setEditAction("");
            setUpdate("edit-password");
            setVisible(false);
            setPassword("");
            setProfile(prev => ({...prev, newPassword: "", confirmPassword: ""}));
            toast.success("Password edited successfully.", { position: toast.POSITION.TOP_RIGHT });
        }).catch((err) => {
            setEditAction("");
            setUpdate("edit-password");
            setVisible(false);
            setPassword("");
            setProfile(prev => ({...prev, newPassword: "", confirmPassword: ""}));
            toast.error("Failed to edit password.", { position: toast.POSITION.TOP_RIGHT });
        })
    }
    
    const handleVerification = async (e) => {
        e.preventDefault();
        const { data } = await axios.post("/verify_user", { password });
        if(data){
            switch(editAction){
                case "info":
                    editInfo();
                    break;
                case "password":
                    editPassword();
                    break;
                default:
                    break;
            }
        }else{
            setPassword("");
            toast.error("Incorrect password. Try again.", { position: toast.POSITION.TOP_RIGHT });
        }
    }

    return (
        <Dialog
            className="w-[90%] md:w-[30%]"
            header="Verification"
            visible={visible}
            draggable={false}
            onHide={() => {
                setVisible(false);
            }}
        >
            <form className="grid gap-4" onSubmit={handleVerification}>
                <div className="grid gap-2">
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <span className="text-sm">Enter your current password to continue the process.</span>
                <button className="btn-primary mt-6 py-2">
                    VERIFY
                </button>
            </form>
        </Dialog>
    );
};

export default VerifiedDialog;
