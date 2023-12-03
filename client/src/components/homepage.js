import PostDisplay from "./displaypost"
import CommunityPost from "./community-post";
import { auth } from "../firebase";
import { useState, useEffect } from "react";
import './homepage.css'
import axios from "axios";
const HomePage = (props)=>{

  const [data, setPostData] = useState();
  useEffect(()=>{
    fetchposts();
  },[data])

 


    if (props.pdata.length === 0) {
        return <p>No posts available. Click on subreddit button on top right and make posts in subreddits to see the posts here.</p>;
      }


  
async function fetchposts(){
  try {
    const responsePosts = await axios.get('http://localhost:4000/posts');
    const postsR = responsePosts.data;
    const extractedpostData = Object.keys(postsR).map((key) => ({
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
    setPostData((prev)=>{
      if(prev!=extractedpostData){
        return extractedpostData
      }
      else{
        return;
      }
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    // Handle error appropriately
  }
}

async function handlesave(post){
  const res = await fetch(`http://localhost:4000/posts`)

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


  const response = await fetch(`http://localhost:4000/posts/${post.pid}`, {
      method: 'PUT',
      body: JSON.stringify(ms),
      headers:{
        'Content-Type': 'application/json'
      }
    });

}
return(
  <div className="owo">

<div style={{paddingBottom:'20px'}} className="hp">
    <div><CommunityPost/></div>
   
    {data&& data.map((post) => (
          <PostDisplay
          formd={props.formd}
          imgdata={props.imgdata}
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
        udata = {props.udata}
      />
        ))}


    </div>

  </div>
 
        
      )
}

export default HomePage