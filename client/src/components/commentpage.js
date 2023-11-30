import React, { useState, useEffect } from 'react';
import PostDisplay from './displaypost';
import { useLocation } from 'react-router-dom';
import CommentForm from './commentform';
import './commentpage.css'
import Communitydiv from './communitydiv';
import { Link } from 'react-router-dom';
import pfp from '../logo3.jpg';
import moment from 'moment/moment';
import { auth, storage } from '../firebase';
import { getDownloadURL, listAll, ref } from 'firebase/storage';
import RTE from './rte';
import { Button } from '@mantine/core';
import { CommentHtml } from './commenthtml';
import axios from 'axios';
import { useMediaQuery } from '@mantine/hooks'; 


const comments = [];
const CommentPage = (props) => {

const[img,setimg] = useState(pfp)

const [allComments, setAllComments] = useState(comments);

const [rcomment, setrcomment] = useState();

const [data, setPostData] = useState(false);

const location = useLocation();
useEffect(()=>{
  fetchcomments();
},[allComments])

useEffect(()=>{
  fetchposts();
},[data]);

const isWideScreen = useMediaQuery('(min-width: 1050px)');

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
const updatestate= ()=>{
  setrcomment('');

}
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');
  const plainId = id.replace(/"/g, '');
  const post = data && data.filter((post) => post.pid === plainId)[0];
  if (!post) {
    // Render a loading message or handle the case where the post is not found
    return <p>Loading...</p>;
  }
  
 




   async function fetchcomments(){
    const response = await fetch('http://localhost:4000/comments');
  const commR = await response.json();
  const extractedcommData = Object.keys(commR).map((key) => ({
    Timeago: commR[key].Timeago,
    author: commR[key].author,
    pid: commR[key].pid,
    text: commR[key].text,
    cid: commR[key].cid
  }));

  setAllComments(extractedcommData)
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
const handleComment=(comment, name)=>{
  setrcomment(comment);

}


   async function handleCommentSubmit(event){
    event.preventDefault();

    const newComment = {
      pid:post.pid,
      Timeago: moment(), // Generate a unique ID for the comment
      text: rcomment,
      author: "u/"+ `${auth.currentUser.displayName}`,
      cid: auth.currentUser.uid
    };
    // Add the new comment to the existing comments
    const response = await fetch('http://localhost:4000/comments', {
      method: 'POST',
      body: JSON.stringify(newComment),
      headers:{
        'Content-Type': 'application/json'
      }
    });
    window.location.reload();
   }


  return (
    <div style={{paddingBottom:'30px'}}className='comment-page-container'>
      <div style={{paddingBottom:'10px'}} className='inner'>     
      
    <div className='inner-post'>

    <PostDisplay
        id={post.id}
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
     

      
    </div>


      <div className='inner-cf'>

       <form onSubmit={handleCommentSubmit}>
       <div style={{display:'flex', flexDirection:'column'}}><RTE  formType ={"comment"} onSub={handleComment} newd={post} />
      <Button type='submit' color='red'>post</Button>     
      </div>
       </form>
     
     

      </div>


     
<div><h4 style={{color:'white'}}>{allComments.find((comment)=>comment.pid===post.pid)? "Comments": "Wow Such Empty :("}</h4></div>
<div>{allComments
.filter(comment => comment.pid === post.pid) // Filter comments by matching post.pid
.map((comment) => (
<div style={{marginBottom:'10px'}}> <CommentHtml comment={comment}/> </div>
))}</div>

     
      </div>

      {isWideScreen && (
          <div className='outer-cm-div'>
            <Communitydiv className='comm' title={post.subreddit} newD={props.formD} />
          </div>
        )}

      </div>
  
  );
};

export default CommentPage;
