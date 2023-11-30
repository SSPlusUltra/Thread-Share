import React, { useState } from 'react';
import './subreddit.css'
import { useNavigate } from 'react-router-dom';
import { auth, storage } from '../firebase';
import{ref,uploadBytes} from 'firebase/storage'
import {v4} from 'uuid'
import temp from '../logo3.jpg'
import RTE from './rte';
import { Button } from '@mantine/core';
const SubredditCreationForm = (props) => {
 const [newtitle, setTitle] = useState('')
 const [newdesc, setDesc] = useState('')
 const [imageUpload, setImageUpload] = useState();
const navigate = useNavigate()
 const handleTitle = (event)=>{
    setTitle(event.target.value);
 }


 const handleDesc = (event)=>{

    setDesc(event);

 }


 async function uploadImage(sid){
  const response = await fetch(`http://localhost:4000/upload`, {
        method: 'POST',
        body: JSON.stringify({temp: imageUpload, user:sid}),
        headers:{
          'Content-Type': 'application/json'
        }
      });
      alert("image uploaded")
}


const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUpload(reader.result)
     
    };
    reader.readAsDataURL(file);
  }
}


 const handleSubmit = (event)=>{
    event.preventDefault();
    const subid = v4();
    if(!imageUpload){
      console.log('no image')
    }
    else{
      uploadImage(subid);
    }
    const currentDate = new Date().toISOString();
    const data = {
        title: "t/"+newtitle,
        date: currentDate,
        description: newdesc,
        id: subid,
        members:{'initial': true},
    }
props.onsubreddit(data);
const subredditTitle = encodeURIComponent(data.title);
const url = `/subredditpage?title=${subredditTitle}`;
setTitle('')
setDesc('')
navigate(url)
    

 }
  return (
  <form className='jp' onSubmit={handleSubmit}> 
  <div className="post-container">  
  <h2 className='create-community'>Create Community</h2>
    <input onChange={handleTitle} type='text-area' 
        placeholder='Commmunity-name' className="input-field"  />
    {/* <input onChange={handleDesc}type='text-area' placeholder='About subthread(optional)' className="input-field-large" /> */}
    <RTE formType={"subreddit"} ontext={handleDesc}/>
    <div className='community-icon'>
    <label style={{ color: 'white', margin:'10px'}}>choose community icon:</label>
    <input onChange={handleFileChange} type='file' className='imagee' style={{cursor:'pointer'}}/>
    </div>
    <Button style={{borderRadius:'20px', width:'100px'}} className='post-it' type='submit'>Create</Button>
    </div>
    </form>
  );
};

export default SubredditCreationForm;
