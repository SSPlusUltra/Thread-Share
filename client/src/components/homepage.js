import PostDisplay from "./displaypost"
import CommunityPost from "./community-post";
import { auth } from "../firebase";
import { useState, useEffect } from "react";
import './homepage.css'
const HomePage = (props)=>{

 


    if (props.pdata.length === 0) {
        return <p>No posts available. Click on subreddit button on top right and make posts in subreddits to see the posts here.</p>;
      }


  


async function handlesave(post){
  const res = await fetch(`/posts`)

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


  const response = await fetch(`/posts/${post.pid}`, {
      method: 'PUT',
      body: JSON.stringify(ms),
      headers:{
        'Content-Type': 'application/json'
      }
    });

}
return(
  <div className="owo">

<div className="hp">
    <div><CommunityPost/></div>
   
    {props.pdata.map((post) => (
          <PostDisplay
        v1={post.title}
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
        v6={post}
      />
        ))}


    </div>

  </div>
 
        
      )
}

export default HomePage