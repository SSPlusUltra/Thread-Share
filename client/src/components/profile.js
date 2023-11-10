import React from 'react';
import './profile.css'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { auth } from '../firebase';
import { storage } from '../firebase';
import{ref,uploadBytes} from 'firebase/storage'
import {v4} from 'uuid'
import Threadlg from '../logo3.jpg'

const Profile = (props) => {
    const navigate = useNavigate();
    const [img, setimg] = useState(Threadlg);
 const handlecl=()=>{
  const subid = v4();
  if(!img){
    console.log('no image')
  }
  const imageRef = ref(storage, `${auth.currentUser.uid}/${subid}`)
  uploadBytes(imageRef, img).then(()=>{
    alert("image uploaded")
  })
 }
    const handleNavigate = (title) => {
        // Replace "/subredditpage" with the appropriate route
        navigate(`/subredditpage?title=${encodeURIComponent(title)}`);

        
      };
    
  return (
    <div className="profile-container">
     <h2 style={{'color': 'white'}}>Upload/edit image</h2>
     <img src={img} alt="Logo" className="rounded-logo" />
      <div className='int-d'>
      <input onChange={(e)=>{
           setimg(e.target.files[0]);

      }} type='file'/>
      <button className='last-bt' onClick={handlecl}>upload</button>
      </div>
      
    </div>
  );
};

export default Profile;