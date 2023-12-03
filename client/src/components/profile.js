import { Card, Avatar, Text, Group, Button, FileInput, Image, Notification, Input } from '@mantine/core';
import classes from './profile.module.css';
import Selectdiff from './segmentedcontrol';
import { IconAt, IconUpload, IconUserCircle } from '@tabler/icons-react';
import { Menu, ActionIcon, rem, useMantineTheme } from '@mantine/core';
import { IconTrash, IconBookmark, IconCalendar, IconChevronDown } from '@tabler/icons-react';
import { useState, useRef, useEffect } from 'react';
import { auth } from '../firebase';
import LogoS from '../logo.png'
import Profilecard from './profilecard';
import axios from 'axios';
import { useLoaderData, useLocation } from 'react-router-dom';

const stats = [
  { value: '34K', label: 'Followers' },
  { value: '187', label: 'Follows' },
  { value: '1.6K', label: 'Posts' },
];

export default function Profile(props) {
  const location = useLocation();
  const theme = useMantineTheme();
 const [imageUpload, setImageUpload] = useState();
 const [pdata, setPostData] = useState();
 const fileInputRef = useRef(null);
 const [imgdata, setimgData] = useState(null);
  const handleFileChange = (e) => {
    const file = e && e.target.files[0];
    console.log(imageUpload)
    if(file){
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUpload(reader.result)
        console.log(imageUpload)
      
    }
    reader.readAsDataURL(file);
       
    }
  }

  



  



  useEffect(() => {
    const fetchData = async () => {
      try {
        const responsePosts = await axios.get('/posts');
        const postsR = responsePosts.data;
        const extractedpostData = postsR && Object.keys(postsR).map((key) => ({
          title: postsR[key].title,
          description: postsR[key].description,
          subreddit: postsR[key].subreddit,
          vote: postsR[key].vote,
          date: postsR[key].date,
          id: postsR[key].id,
          pid: postsR[key].pid,
          upvotepressed: postsR[key].upvotepressed,
          downvotepressed: postsR[key].downvotepressed,
          members: postsR[key].members,
        }));
        setPostData(extractedpostData);
      } catch (error) {
        console.error('Error fetching posts:', error);
        // Handle error appropriately
      }
      
      try {
        const responseSubs = await axios.get('/upload');
        const dataR = responseSubs.data;
        const extractedData =dataR && Object.keys(dataR).map((key) => ({
          image: dataR[key].image,
          user: dataR[key].user,
        }));
        setimgData(extractedData);
        console.log(extractedData); // Log the extractedData
      } catch (error) {
        console.error('Error fetching subreddits:', error);
        // Handle error appropriately
      }
        
    }
    

    fetchData(); // Call the fetchData function once during component mount
  }, []);

  




  
const requser = props.udata && props.udata.find((item)=>(item.id===auth.currentUser.uid))
const finrequser =  requser && props.requserdiff ? props.requserdiff : requser;
  const reqimage = imgdata && imgdata.filter((item)=>(item.user===auth.currentUser.uid))
  const reqimagediff = props.requserdiff && imgdata && imgdata.filter((item)=>(item.user===props.requserdiff.id))
  const reqimg =  reqimage && reqimage.slice(-1)[0]
  const reqimgdiff = reqimagediff && reqimagediff.slice(-1)[0]

  console.log(props.udata)

  async function uploadImage(){
    const response = await fetch(`/upload`, {
          method: 'POST',
          body: JSON.stringify({temp: imageUpload, user:auth.currentUser.uid}),
          headers:{
            'Content-Type': 'application/json'
          }
        });
        alert("image uploaded")
        window.location.reload();
      
  }

  console.log(props.data)

  const reqpost = pdata && pdata.filter((item)=>{
    return item.id === auth.currentUser.uid
  })
  const reqpostdiff = props.requserdiff && pdata && pdata.filter((item)=>{
    return item.id === props.requserdiff.id
  })

  const reqauth = props.udata && props.udata.find((item)=>item.id===auth.currentUser.uid)


const finreqimg = reqimgdiff ? reqimgdiff : reqimg;

const finreqpost = reqpostdiff ? reqpostdiff : reqpost


  const handleUpload = () => {
    if(fileInputRef){
      fileInputRef.current.value = null;
    } 
    if(!imageUpload){
      console.log('no image')
    }
    else{
      uploadImage();
    }
  };


  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1em', width: '100%', paddingLeft: '10px' }}>
        <div className={classes.commentcontainer} style={{ width: '50%' }}>
          <div style={{ paddingBottom: '10px', width: '100%' }}>
            <Selectdiff formd={props.data} imgdata={props.imgdata}  requserdiff={props.requserdiff } />
          </div>
        </div>
        <Profilecard reqid = {props.reqid} reqpost = {finreqpost} requser={finrequser && finrequser} ref={fileInputRef} onhandlefile={handleFileChange} onupload={handleUpload} reqimg = {finreqimg} udata={props.udata} reqauth = {requser && requser} formd={props.data}/>
      </div>
    </div>
  );
}
