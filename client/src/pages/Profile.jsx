import React, { useContext, useEffect, useState } from 'react'
import userImage from "../assets/user.webp";
import { UserContext } from "../context/UserContext"; 
import axios from 'axios';
import VerifiedDialog from '../component/VerifiedDialog';
import { ToastContainer, toast } from "react-toastify";

const Profile = () => {
  const [visible, setVisible] = useState(false);
  const [editAction, setEditAction] = useState("");
  const { currentUser, setUpdate } = useContext(UserContext);
  const [imageName, setImageName] = useState("");
  const [editInfo, setEditInfo] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    username: "",
    newPassword: "",
    confirmPassword: ""
  })

  const uploadImage = async (e) => {
      const file = e.target.files[0];
      const formData = new FormData();
      if(file === "") return;
      if(file !== ""){
          formData.append("image", file);
          const {data: filename} = await axios.post("/upload_image", formData, {
              headers: { "Content-type": "multipart/form-data" },
          });
          setImageName(filename);
      }
  }

  useEffect(() => {
    if(imageName){
      axios.put("/update_image_account", { uploadedImage: imageName }).then((res) => {
        setUpdate("add-image");
        toast.success("Image uploaded successfully.", { position: toast.POSITION.TOP_RIGHT });
      }).catch((err) => {
        toast.error("Failed to upload image.", { position: toast.POSITION.TOP_RIGHT });
      });
    }
  }, [imageName])

  useEffect(() => {
    if(currentUser){
      const { name, username, image, role, id } = currentUser;
      setProfile(prev => ({...prev, name, username, image, role, id}));
    }
  }, [currentUser])

  const inputForm = (e) => {
    setProfile(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <>
      <VerifiedDialog 
        visible={visible}
        setVisible={setVisible}
        editAction={editAction}
        setEditAction={setEditAction}
        profile={profile}
        setProfile={setProfile}
      />
      <ToastContainer 
        draggable={false}
        hideProgressBar={true}
      /> 
      <div className='side-margin'>
        <div className='pt-4'>
          <span className='uppercase font-semibold text-2xl mt-4'>MY ACCOUNT</span>
        </div>
        <div className='grid mt-6 gap-4 md:grid-cols-[250px_1fr] md:gap-6 '>
          <div className='md:mt-6'>
            <label htmlFor='userImage' className='overflow-hidden w-40 md:w-52 aspect-square flex rounded-full border-2 border-gray-300 cursor-pointer'>
              <img src={profile?.image ? `http://localhost:4000/uploads/${profile.image}` : userImage} alt="user-image" className='object-contain' />
            </label>
            <input accept="image/*" type="file" id="userImage" className="hidden" onChange={uploadImage}/>
          </div>
          <div className='grid gap-6'>
            <div className='border border-gray-300 pt-4 pb-6 px-6 rounded-lg'>
              <div className='mb-4 flex justify-between items-center'>
                <span className='font-semibold text-2xl'>Manage Info</span>
                <div className='border-2 text-gray-600 border-gray-300 rounded-md'>
                  {
                    editInfo ?
                    <div className='flex justify-center gap-1'>
                      <button 
                        className='bg-transparent p-1 hover:bg-gray-300' 
                        onClick={() => {
                          setEditAction("info");
                          setVisible(true); 
                        }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      </button>
                      <button className='bg-transparent p-1 hover:bg-gray-300' onClick={() => setEditInfo(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div> :
                    <button className='bg-transparent px-4 hover:bg-gray-300' onClick={() => setEditInfo(true)}>Edit</button>
                  }
                </div>
              </div>
              <div className='grid md:grid-cols-2 gap-4 md:gap-6'>
                <div className='grid gap-2'>  
                  <label htmlFor="">Full Name</label>
                  {
                    editInfo ?
                      <input type="text" name='name' placeholder='Full name' value={profile.name} onChange={inputForm}/>
                    :
                      <span className='font-semibold'>{profile.name}</span>
                  }
                </div>
                <div className='grid gap-2'>
                  <label htmlFor="">Username</label>
                  {
                    editInfo ?
                      <input type="text" name='username' placeholder='Username' value={profile.username} onChange={inputForm}/>
                    :
                      <span className='font-semibold'>{profile.username}</span>
                  }
                </div>
              </div>
            </div>
            <div className='border border-gray-300 pt-4 pb-6 px-6 rounded-lg'>
              <div className='mb-4 flex justify-between items-center'>
                <span className='font-semibold text-2xl'>Manage Password</span>
                <button 
                  className='btn-primary'
                  onClick={() => {
                    setEditAction("password");
                    setVisible(true); 
                  }}
                  >Save</button>
              </div>
              <div className='grid md:grid-cols-2 md:gap-6 gap-4'>
                <div className='grid gap-2'>
                  <label htmlFor="">New Password</label>
                  <input type="password" name='newPassword' placeholder='New password' value={profile.newPassword} onChange={inputForm}/>
                </div>
                <div className='grid gap-2'>
                  <label htmlFor="">Confirm Passowrd</label>
                  <input type="password" name='confirmPassword' placeholder='Confirm Password' value={profile.confirmPassword} onChange={inputForm}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile