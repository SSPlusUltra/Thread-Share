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
import Communitycard from './communitycard';


const comments = [];
const CommentPage = (props) => {

const[img,setimg] = useState(pfp)

const [allComments, setAllComments] = useState(comments);

const [rcomment, setrcomment] = useState();

const [data, setPostData] = useState(false);

const location = useLocation();
useEffect(()=>{
  fetchcomments();
},[])










const isWideScreen = useMediaQuery('(min-width: 1050px)');



console.log(props.formD)
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');
  const plainId = id.replace(/"/g, '');
  const post = props.pdata && props.pdata.filter((post) => post.pid === plainId)[0];

  const fdata = post && props.formD && props.formD.find((item)=>item.title===post.subreddit)



  const reqimg = fdata && props.imgdata && props.imgdata.find((item)=>item.user === fdata.id)
  
  if (!post) {
    // Render a loading message or handle the case where the post is not found
    return <p>Loading...</p>;
  }
  

  async function handlejoin() {
  
    const res = await fetch(`/subreddits/${fdata.id}`);
    const R = await res.json();
    const id = auth.currentUser.uid;
    const ms = R;

    if (!ms.members[id]) {
      ms.members[id] = true;
    } else {
      ms.members[id] = false;
    }


    try {
      const response = await axios.put(`/subreddits/${fdata.id}`, ms, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        console.log('Post updated successfully.');
      } else {
        console.error('Error:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Axios or JSON parsing error:', error);
    }
      window.location.reload();
  }
 




   async function fetchcomments(){
    const response = await fetch('/comments');
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
    const R= props.pdata
    console.log(R,post)
  
  const reqid = Object.keys(R).find((key) => (
    R[key].pid === post.pid
  ));
  console.log(R[reqid])
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
      window.location.reload();
  
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
    const response = await fetch('/comments', {
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
    udata={props.udata}
    imgdata={props.imgdata}
    formd={props.formD}
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
<div style={{marginBottom:'10px'}}> <CommentHtml comment={comment} imgdata={props.imgdata} udata={props.udata}/> </div>
))}</div>

     
      </div>

      {isWideScreen && (
          <div className='outer-cm-div'>
            <Communitycard subThread={fdata} reqimg={ reqimg && reqimg} pdata={props.pdata} udata={props.udata} onhandlejoin={handlejoin}/>
          </div>
        )}

      </div>
  
  );
};

export default CommentPage;
