import React, { useEffect, useRef, useState} from 'react';
import { useLocation } from 'react-router-dom';
import './postcreate.css'
import {v4} from 'uuid'
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import Communitydiv from './communitydiv';
import { validatePassword } from 'firebase/auth';
import axios from 'axios';
import RTE from './rte';
import { Ebutton } from './ebutton';
import { Button } from '@mantine/core';
import Communitycard from './communitycard';
import { useMediaQuery } from '@mantine/hooks';
const CreatePosts =(props)=>{
  const [onShow, setonShow] = useState(false);
 

const location = useLocation();
const queryParams = new URLSearchParams(location.search);
const par = queryParams.get('par');
const navigate = useNavigate();
const newT = encodeURIComponent(par);
 const [newtitle, setTitle] = useState('')
 const [newdesc, setDesc] = useState('')
const [cm, setcm] = useState('');
const [img, setimg] = useState();
const [data, setData] = useState();
const dropdownRef = useRef(null);

const [subThread, setsubThread] = useState(par? par : null)
 
  useEffect(() => {
   // Event listener to close the dropdown when clicked outside
   const handleClickOutside = (event) => {
     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
       setonShow(false);
     }
   };
 
   // Attach the event listener
   document.addEventListener('mousedown', handleClickOutside);
 
   // Clean up the event listener when the component unmounts
   return () => {
     document.removeEventListener('mousedown', handleClickOutside);
   };
 }, []);

 const fdata = props.formD && props.formD.find((item) => {
  return item.title === subThread;
});

const reqimg = fdata && props.imgdata && props.imgdata.find((item)=>item.user===fdata.id)

 async function handlejoin() {
  
    const res = await fetch(`/subreddits/${fdata.id}`);
    const R = await res.json();
    const id = auth.currentUser.uid;
    const ms = R;

    if (!ms.members[id]) {
      ms.members[id] = true;
    
    } else {
      ms.members[id] = false;
  
    }


    try {
      const response = await axios.put(`/subreddits/${fdata.id}`, ms, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        console.log('Post updated successfully.');
      } else {
        console.error('Error:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Axios or JSON parsing error:', error);
    }
      window.location.reload();
  }



 const handleTitle = (event)=>{
    setTitle(event.target.value);
 }

 const tgd = ()=>{
  setonShow(!onShow)
 }

 const handleDesc = (event)=>{

    setDesc(event);

 }

 const uid = auth.currentUser.uid;

async function uploadImage(){
  const response = await fetch(`/upload`, {
        method: 'POST',
        body: JSON.stringify({temp: img, user:auth.currentUser.uid}),
        headers:{
          'Content-Type': 'application/json'
        }
      });
}

useEffect(()=>{
  fetchimgs();
},[])

const fetchimgs = async () => {
  try {
    const responseSubs = await axios.get('/upload');
    const dataR = responseSubs.data;
    const extractedData = Object.keys(dataR).map((key) => ({
      image: dataR[key].image,
      user: dataR[key].user,
    }));
    setData(extractedData);
    console.log(extractedData); // Log the extractedData
  } catch (error) {
    console.error('Error fetching subreddits:', error);
    // Handle error appropriately
  }
};
const isWideScreen = useMediaQuery('(min-width: 767px)');

 const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setimg(reader.result);
     
    };
    reader.readAsDataURL(file);
  }
}

const handled = (val)=>{
  val && setsubThread(val);
}

 const handleSubmit = (event)=>{
    event.preventDefault();
    const reqobj = props.formD.find((item)=>item.title === subThread)
    if(!reqobj.members[auth.currentUser.uid]){
      alert('only members can create posts')
      return
    }
    if(!newtitle){
      alert('enter title');
      return;
    }
    const currentDate = new Date().toISOString(); 
    const data = {
        pid: v4(),
        id: uid,
        title: newtitle,
        description: newdesc,
        subreddit: par || '',
        date: currentDate,
        vote:0,
        upvotepressed:{'initial': true},
        downvotepressed:{'initial': true},
        members: {'initial': true}

      
    }
    props.oncreate(data)
    const subredditTitle = encodeURIComponent(data.subreddit);
    const url = `/subredditpage?title=${subredditTitle}`;
setTitle('')
setDesc('')
navigate(url);







 }
 return (


  
//   <form className='other-container' onSubmit={handleSubmit}>
//   <div className='other-container'>
//   <div className="post-container">
//     <div onClick={()=>{
//       setonShow(!onShow)
//     }} className='sub-thread-dropdown'>
//       <input type='text-area' value={subThread} className='main-button' placeholder='choose a community'/> 
//       <span className='caret-down'><FontAwesomeIcon icon={faCaretDown} /></span>
//     </div>
//    {onShow &&
//     <div className='drop-down-content'>
//     {props.formD.map((item) => (
//                <div onClick={()=>{
//                   setsubThread(item.title)
//                   setonShow(false)
//                   navigate(`/postcreate?par=${encodeURIComponent(item.title)}`);
//                }} className='sp'>{item.title}</div>
//               ))}
//   </div>
//    }
   
//     <input onChange={handleTitle} type='text-area' placeholder='Title' className="input-field"  />
//     <input onChange={handleDesc} type='text-area' placeholder='Description(optional)' className="input-field-large" />
//     <button className='post-it' type='submit'>Post</button>
//   </div>
// <div className='uwu'> {subThread && <Communitydiv title={subThread} newD={props.formD}/>}  </div>

  
//   </div>
//   </form>



<div  >



{/* <div className="profile-container">
     <h2 style={{'color': 'white'}}>Upload/edit image</h2>
     <img src={img} alt="Logo" className="rounded-logo" />
      <div className='int-d'>
      <input onChange={handleFileChange} type='file'/>
      <button className='last-bt' onClick={handlecl}>upload</button>
      </div>
      
    </div> */}


{/* <form onSubmit={handleSubmit}  className="post-form">


  
  <div  className='oof'  >
  <div  ref={dropdownRef} className='dd-btn'>
    <div  onClick={tgd}   className='combo'>
   <div><input value={subThread} onChange={(e)=>{
    setcm(e.target.value)

   }} type='text' className='cm-btn' placeholder='choose a community'/></div> 
  <div  className='syn'><FontAwesomeIcon className='caret-down' icon={faCaretDown} /></div>

    </div>
    {onShow &&
    <div className='drop-down-content'>
    {props.formD.map((item) => (
               <div onClick={()=>{
                  setsubThread(item.title)
                  setonShow(false)
                  navigate(`/postcreate?par=${encodeURIComponent(item.title)}`);
               }} className='sp'>{item.title}</div>
              ))}
  </div>
   }
  
  </div>

  </div>
 
      <input onChange={(e)=>{
            setTitle(e.target.value)
      }} value={newtitle} type='text' className='title-fl' placeholder='Title'/>
      <input value={newdesc} onChange={(e)=>{
             setDesc(e.target.value)
      }} type='text' className='desc-fl' placeholder='Description(optional)'/>
      <button type='submit' className='p-btn'>Create</button> 
    </form> */}


<form className='jp' style={{gap:'2em'}} onSubmit={handleSubmit}> 

<div className="post-container">  
<div style={{width:'90%', display:'flex', flexDirection:'column'}}>
  <h2 style={{marginTop:'5px', marginBottom:'0px'}} className='create-community'>Create a Post</h2>
  <div style={{width:'50%'}}><Ebutton ondselect={handled} formD={props.formD} subT={par}/></div>
    <input style={{width:'100%'}} onChange={handleTitle} type='text-area' 
        placeholder='Title' className="input-field"  />
    <div style={{width:'100%'}}><RTE formType={"post"} onpost={handleDesc}/></div>
    <Button type='submit'>Create</Button>
    </div>
    </div>
    {isWideScreen && <div className='uwu'> {subThread && <Communitycard subThread={fdata} reqimg={reqimg} pdata={props.pdata} udata={props.udata} onhandlejoin={handlejoin}/>}  </div>}
 
    </form>
 
 
</div>


 










);

};

export default CreatePosts;