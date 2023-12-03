// SubredditPage.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './subredditpage.css'
import { useLocation } from 'react-router-dom';
import PostDisplay from './displaypost';
import Communitydiv from './communitydiv';
import { auth } from '../firebase';
import { useMediaQuery } from '@mantine/hooks';
import { Avatar } from '@mantine/core';

const SubredditPage = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isWideScreen = useMediaQuery('(min-width: 1050px)'); 
  const queryParams = new URLSearchParams(location.search);
  const title = queryParams.get('title');
  const subredditPosts = title && props.pdata.filter((post) => post.subreddit === title);
  const id =props.formD && props.formD.find((item)=>item.title===title)
  const reqimg = id && props.imgdata && props.imgdata.find((item)=> item.user === id.id)

  


  



  async function handlesave(post){
    const res = await fetch(`/subreddits`)
  
        const R = await res.json();
  const reqid = Object.keys(R).find((key) => (
    R[key].pid === post.pid
  ));
  const id = auth.currentUser.uid
   const ms = R[reqid];
  
    if(!ms.members[id]){
      ms.members[id] = true;
    }
    else{
      ms.members[id] = false;
    }
  
  
    const response = await fetch(`/subreddits/${reqid}`, {
        method: 'PUT',
        body: JSON.stringify(ms),
        headers:{
          'Content-Type': 'application/json'
        }
      });
  
  }

  return (
    <div className='sp-cd'>
      <div style={{display:'flex', alignItems:'center', justifyContent:'center', marginTop:'10px', gap:'0.5em'}}>
        <Avatar src={reqimg && reqimg.image}/>
        <h3 style={{color:'white'}}>{title}</h3></div>
      <div className='cd-sp'>

<div className='sp-sp' style={{marginBottom:'20px'}}>

{subredditPosts.length > 0 && (
        subredditPosts.map((post) => (
          <PostDisplay  v1={post.title}
          udata = {props.udata}
          imgdata={props.imgdata}
          formd={props.formD}
          v2={post.description}
          v3={post.pid}
          v4={post.vote}
          v5={post.id}
          UpclickHandler = {props.Uv}
          DownclickHandler = {props.Dv} 
          upress = {post.upvotepressed}
          dpress = {post.downvotepressed}
          key={post.pid}
          onhandle={handlesave}
          v6={post}/>
          
          
        ))
      ) }

</div>



        
    


{isWideScreen&& <div className='cd-cd' ><Communitydiv reqimg = {reqimg} title = {title} newD={props.formD} pdata={props.pdata} udata={props.udata}/></div>}
</div>

   
      




      <Link  to={{
                  pathname: '/postcreate',
                  search: `?par=${encodeURIComponent(title)}`,
                }}  className="add-post-btn">
                  
        +
      </Link>
    </div>
  );
};

export default SubredditPage;
