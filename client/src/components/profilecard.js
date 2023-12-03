
import { Card, Avatar, Text, Group, Button, FileInput, Image, Notification, Input } from '@mantine/core';
import classes from './profile.module.css';
import Selectdiff from './segmentedcontrol';
import { IconAt, IconUpload, IconUserCircle } from '@tabler/icons-react';
import { Menu, ActionIcon, rem, useMantineTheme } from '@mantine/core';
import { IconTrash, IconBookmark, IconCalendar, IconChevronDown } from '@tabler/icons-react';
import { useState, useRef, useEffect } from 'react';
import { auth } from '../firebase';
import LogoS from '../logo.png'
import React from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Profilecard = React.forwardRef((props, ref)=>{

  const navigate = useNavigate();

  const [fl, setfl] = useState('');


  useEffect(()=>{
       getlist();
  },[])

 async function getlist(){
  const flist = await fetch(`/users/${auth.currentUser.uid}`);
  const pd= await flist.json();
  setfl(pd)

 }


 console.log(fl);


    const stats = [
      { value: props.requser && props.requser.followers
        ? (Object.values(props.requser.followers).filter((value) => value).length)-1
        : '0', label: 'Followers' },
        { value: fl && fl.following
            ? (Object.values(fl.following).filter((value) => value).length)-1
            : '0', label: 'Following' },
        { value: props.reqpost&& props.reqpost.length || '0', label: 'Posts' },
      ];
const id = auth.currentUser?.uid;

const pro = props.requser ? props.requser : '';
const con = props.reqauth ? props.reqauth : '';
     
console.log('props:', props);
console.log('props.requser:', props.requser);
console.log('props.requser.id:', props.requser?.id);
      
    const items = stats && stats.map((stat) => (
      <div>

<Link style={{textDecoration:'none', color:'white'}} to={{
        pathname: stat.label==='Followers' || stat.label === 'Following' ? '/follow': '',
        search: stat.label=== "Followers"? `?id=${encodeURIComponent(props.requser.id)}&text=${encodeURIComponent('Followers')}`: stat.label === 'Following'? `?id=${encodeURIComponent(props.requser.id)}&text=${encodeURIComponent('Following')}`: `?id=${encodeURIComponent(props.requser.id)}`
      }} key={stat.label}>
      <Text ta="center" fz="lg" fw={500}>
  {stat.value}
</Text>
<Text ta="center" fz="sm" c="dimmed" lh={1}>
  {stat.label}
</Text>
    
      
      </Link>

      </div>
     

        
      ));

      async function handlefollow() {
      
          // Fetch the current user data
          const res = await fetch(`/users/${auth.currentUser.uid}`);
          const pd= await res.json();
      
         if(!pd.following[props.reqid])
          pd.following[props.reqid] = true;

          else{
            pd.following[props.reqid] = false;
          }
      
          // Update the current user data
          const response1 = await axios.put(`/users/${auth.currentUser.uid}`, pd, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
      

          // Fetch the target user data
          const resv = await fetch(`/users/${props.reqid}`);
          const pdv = await resv.json();
      
          // Check if pdv.followers is undefined and initialize it as an object
         
          if(!pdv.followers[auth.currentUser.uid])
          pdv.followers[auth.currentUser.uid] = true;

          else{
            pdv.followers[auth.currentUser.uid] = false;
          }
      
      
          // Update the target user data
          const response2 = await axios.put(`/users/${props.reqid}`, pdv, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
      
          window.location.reload();
      }
      



return(
    <Card
    withBorder
    padding="xl"
    radius="md"
    className={classes.card}
    style={{ display: 'flex', width: '265px', height: '520px', marginTop: '70px', marginRight: '10px', flexDirection: 'column' }}
  >
    <Card.Section
      h={140}
      style={{
        backgroundImage:`url(${props.reqimg && props.reqimg.image})`
      }}
    />
    <Avatar
      src={ props.reqimg && props.reqimg.image}
      alt="image Loading..."
      size={80}
      radius={80}
      mx="auto"
      mt={-30}
      className={classes.avatar}
    />
   {props.requser && props.requser.id && (
  <Text ta="center" fz="lg" fw={500}>
    {props.requser.name}
  </Text>
)}
    <Group mt="md" justify="center" gap={30}>
      {items}
    </Group>
    {props.requser && !(props.requser.id === auth.currentUser.uid) && <Button onClick={handlefollow} color='red' fullWidth radius="md" mt="xl" size="md" >
      {fl && fl.following[props.reqid]?'Following': 'Follow'}
   </Button>} 
    <div style={{marginTop:'20px', display:'flex', flexDirection:'column', gap:'1em'}}>
    {/* <FileInput leftSection={<IconUpload/>} label="Attach your CV" placeholder="FileInput" onChange={handleFileChange} style={{cursor:'pointer'}} caption={imageUpload ? 'File selected' : null} value={imageUpload}/> */}
 {props.requser && (props.requser.id === auth.currentUser.uid &&<input ref={ref} type='file' onChange={props.onhandlefile}></input>)}
    {props.requser && (props.requser.id === auth.currentUser.uid && <Button bg="red"  onClick={props.onupload}>Upload Image</Button>)}
    </div>
  </Card>
)
})

export default Profilecard;