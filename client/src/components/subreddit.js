import React, { useState } from 'react';
import './subreddit.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { auth, storage } from '../firebase';
import{ref,uploadBytes} from 'firebase/storage'
import {v4} from 'uuid'
import temp from '../logo3.jpg'
import RTE from './rte';
import { Button } from '@mantine/core';
import axios from 'axios';
const SubredditCreationForm = (props) => {
 const [newtitle, setTitle] = useState('')
 const [newdesc, setDesc] = useState('')
 const [imageUpload, setImageUpload] = useState();
 const location = useLocation();
const navigate = useNavigate()
 const handleTitle = (event)=>{
    setTitle(event.target.value);
 }


 const handleDesc = (event)=>{

    setDesc(event);

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


 const handleSubmit = async (event)=>{
    event.preventDefault();
    if(!newtitle){
      alert('Enter title')
      return;
      
    }
    const subid = v4();
    if(!imageUpload){
      console.log('no image')
    }
    const currentDate = new Date().toISOString();


    const response = await fetch(`/upload`, {
      method: 'POST',
      body: JSON.stringify({temp: imageUpload, user:subid}),
      headers:{
        'Content-Type': 'application/json'
      }
    });


    const data = {
        title: "t/"+newtitle,
        date: currentDate,
        description: newdesc,
        id: subid,
        members:{'initial': true},
    }
    alert("image uploaded")


    try {
      const response = await axios.post('/subreddits', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.status === 200) {
        const dataR = response.data;
        // Do something with dataR if needed
      } else {
        // Handle the error here, e.g., display an error message
        console.error('Error:', response.status, response.statusText);
      }
    } catch (error) {
      // Handle Axios or other errors
      console.error('Axios or other error:', error);
      alert(error)
    }


const subredditTitle = data && encodeURIComponent(data.title);
const url = data && `/subredditpage?title=${subredditTitle}`;
setTitle('')
setDesc('')
navigate('/allsubs')
    

 }
  return (
  <form className='jp' onSubmit={handleSubmit}> 
  <div className="post-container">  
  <h2 className='create-community'>Create Community</h2>
  <div>

  <input onChange={handleTitle} type='text-area' 
        placeholder='Commmunity-name' className="input-field"  />
    {/* <input onChange={handleDesc}type='text-area' placeholder='About subthread(optional)' className="input-field-large" /> */}
    <RTE formType={"subreddit"} ontext={handleDesc}/>



  </div>
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
