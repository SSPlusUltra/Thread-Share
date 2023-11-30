// SubredditPage.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './subredditpage.css'
import { useLocation } from 'react-router-dom';
import PostDisplay from './displaypost';
import Communitydiv from './communitydiv';
import { auth } from '../firebase';
import { useMediaQuery } from '@mantine/hooks';

const SubredditPage = (props) => {
  const location = useLocation();
  const isWideScreen = useMediaQuery('(min-width: 1050px)'); 
  const queryParams = new URLSearchParams(location.search);
  const title = queryParams.get('title');
  const subredditPosts = props.pdata.filter((post) => post.subreddit === title);
  async function handlesave(post){
    const res = await fetch(`http://localhost:4000/subreddits`)
  
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
  
  
    const response = await fetch(`http://localhost:4000/subreddits/${reqid}`, {
        method: 'PUT',
        body: JSON.stringify(ms),
        headers:{
          'Content-Type': 'application/json'
        }
      });
  
  }

  return (
    <div className='sp-cd'>
      <div><h2 style={{'color':'white'}}>{title}</h2></div>
      <div className='cd-sp'>

<div className='sp-sp'>

{subredditPosts.length > 0 && (
        subredditPosts.map((post) => (
          <PostDisplay  v1={post.title}
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



        
    


{isWideScreen&& <div className='cd-cd' ><Communitydiv title = {title} newD={props.formD}/></div>}
</div>

   
      




      <Link to={{
                  pathname: '/postcreate',
                  search: `?par=${encodeURIComponent(title)}`,
                }}  className="add-post-btn">
        +
      </Link>
    </div>
  );
};

export default SubredditPage;
