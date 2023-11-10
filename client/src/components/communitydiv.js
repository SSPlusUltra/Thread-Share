
import { useEffect, useState } from 'react';
import './communitydiv.css'
import { storage } from '../firebase';
import {getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';
import { auth } from '../firebase';
import axios from 'axios';
const Communitydiv = (props)=>{
    const [Threadlogo, setThreadlogo] = useState()
    const[value, setValue] = useState('Join')
    const [reqsub, setreqsub] = useState(props.newD)

    useEffect(()=>{
      listAll(imageRef).then((res)=>{
        console.log(res)
        res.items.forEach(element => {
          getDownloadURL(element).then((url)=>{
              setThreadlogo(url);
          })
          
        });
      })
    }, [props.title])
    
    useEffect(()=>{
      fetchsubs();
    },[reqsub])
    
   
   const id = auth.currentUser.uid
    const subThread = reqsub.find((item)=>
      item.title === props.title
    )|| <p>loading...</p>
    const imageRef = ref(storage, `${props.title}/` )

   
    async function handlejoin (){  

      const res = await fetch(`/subreddits/${subThread.id}`)

      const R = await res.json();
      console.log(R)
      const id = auth.currentUser.uid
       const ms = R

    if(!ms.members[id]){
      ms.members[id] = true
     setValue('Joined')
    }

    else{
      ms.members[id] = false
      setValue('Join')
    }


    try {
      const response = await axios.put(
        `/subreddits/${subThread.id}`,
        ms,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    
      if (response.status === 200) {
        // PUT request was successful
        console.log('Post updated successfully.');
      } else {
        // Handle other response statuses here
        console.error('Error:', response.status, response.statusText);
      }
    } catch (error) {
      // Handle Axios or parsing errors
      console.error('Axios or JSON parsing error:', error);
    }
  
    

    };


    async function fetchsubs(){
      const response = await fetch('/subreddits');
    const dataR = await response.json();
    const extractedData = Object.keys(dataR).map((key) => ({
      title: dataR[key].title,
      description: dataR[key].description,
      id: dataR[key].id,
      members: dataR[key].members
    }));
    setreqsub(extractedData)
  }


   return(
    <div className='community-container'>
         <div className="logo-container">
      <img src={Threadlogo} alt="Logo" className="rounded-logo" />
    </div>
    <div className='community-title'>{props.title}</div>
    <button className='join-sub' onClick={handlejoin}>{subThread.members && subThread.members[auth.currentUser.uid]? 'Joined': 'Join'}</button>
    <div className='community-desc'>{subThread.description}</div>
  </div>
   )
}

export default Communitydiv;