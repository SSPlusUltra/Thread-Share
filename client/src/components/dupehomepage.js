
import PostDisplay from "./displaypost"
import CommunityPost from "./community-post";
import { auth } from "../firebase";
import { useState, useEffect } from "react";
import './homepage.css'
import axios from "axios";

const Dupehomepage = (props)=>{
    
      const [data, setPostData] = useState();
      useEffect(()=>{
        fetchposts();
      },[])
    
     
    
    
        if (props.pdata && props.pdata.length === 0) {
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
        setPostData(extractedpostData);
      } catch (error) {
        console.error('Error fetching posts:', error);
        // Handle error appropriately
      }
    }
    
  
    return(
      <div className="owo">
    
    <div style={{paddingBottom:'20px'}} className="hp">
        <div><CommunityPost dupe={true}/></div>
       
        {data&& data.map((post) => (
              <PostDisplay
              dupe={true}
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
            v6={post}
            udata = {props.udata}
          />
            ))}
    
    
        </div>
    
      </div>
     
            
          )




}

export default Dupehomepage;