import { useEffect, useState } from "react";
import { auth } from "../firebase";
import PostDisplay from "./displaypost";
import './savedposts.css'

const SavedPosts = (props)=>{


    const[data, setData] = useState(props.formD)


    useEffect(()=>{
        fetchposts();
    },[data])

    async function fetchposts(){
        const response = await fetch(`http://localhost:4000/posts`);
      const postsR = await response.json();
      console.log(postsR)
      const extractedpostData = Object.keys(postsR).map((key) => ({
        title: postsR[key].title,
        description: postsR[key].description,
        subreddit: postsR[key].subreddit,
        vote: postsR[key].vote,
        date: postsR[key].date,
        id: postsR[key].id,
        pid:postsR[key].pid,
        upvotepressed: postsR[key].upvotepressed,
        downvotepressed: postsR[key].downvotepressed,
        members:postsR[key].members    
      }));
      setData(extractedpostData)
    }

    const D = data.filter((item)=>{
       return item.members[auth.currentUser.uid] === true

    })

    
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
    <div className="ts">
       <div> <h2 style={{'color':'white'}}>Saved Posts</h2></div> 
      <div className="st"> 
        { D.map((post) => (
        <PostDisplay
          v1={post.title}
          v2={post.description}
          v3={post.pid}
          v4={post.vote}
          v5={post.id}
          UpclickHandler={props.Uv}
          DownclickHandler={props.Dv}
          upress={post.upvotepressed}
          dpress={post.downvotepressed}
          key={post.pid}
          onhandle = {handlesave}
          v6={post}
        />
      ))}


      </div>
     
    </div>
   
      
)
}

export default SavedPosts;