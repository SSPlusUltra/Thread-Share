import React, { useState } from 'react';
import './subreddit.css'
import { useNavigate } from 'react-router-dom';
import { storage } from '../firebase';
import{ref,uploadBytes} from 'firebase/storage'
import {v4} from 'uuid'
import temp from '../logo3.jpg'

const SubredditCreationForm = (props) => {
 const [newtitle, setTitle] = useState('')
 const [newdesc, setDesc] = useState('')
 const [imageUpload, setImageUpload] = useState();
const navigate = useNavigate()
 const handleTitle = (event)=>{
    setTitle(event.target.value);
 }


 const handleDesc = (event)=>{

    setDesc(event.target.value);

 }


 const handleSubmit = (event)=>{
    event.preventDefault();
    const subid = v4();
    if(!imageUpload){
      console.log('no image')
    }
    const imageRef = ref(storage, `r/${newtitle}/${subid}`)
    uploadBytes(imageRef, imageUpload).then(()=>{
      alert("image uploaded")
    })
    const data = {
        title: "r/"+newtitle,
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
    <input onChange={handleDesc}type='text-area' placeholder='About subthread(optional)' className="input-field-large" />
    <div className='community-icon'>
    <label style={{ color: 'white', margin:'10px'}}>choose community icon:</label>
    <input onChange={(event)=>{
setImageUpload(event.target.files[0])
    }} type='file' className='imagee' style={{cursor:'pointer'}}/>
    </div>
    <button className='post-it' type='submit'>Create</button>
    </div>
    </form>
  );
};

export default SubredditCreationForm;
