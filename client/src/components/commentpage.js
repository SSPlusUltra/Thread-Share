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


const comments = [];
const CommentPage = (props) => {

const[img,setimg] = useState(pfp)

const [allComments, setAllComments] = useState(comments);

const location = useLocation();
useEffect(()=>{
  fetchcomments();
},[allComments])

const imageRef = ref(storage, `${auth.currentUser.uid}/` )

useEffect(()=>{
  listAll(imageRef).then((res)=>{
    console.log(res)
    res.items.forEach(element => {
      getDownloadURL(element).then((url)=>{
          setimg(url)
      })
      
    });
  })
}, [])

  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');
  const plainId = id.replace(/"/g, '');
  const post = props.pdata.filter((post) => post.pid === plainId)[0];
  if (!post) {
    // Render a loading message or handle the case where the post is not found
    return <p>Loading...</p>;
  }
  
 




   async function fetchcomments(){
    const response = await fetch('/comments');
  const commR = await response.json();
  const extractedcommData = Object.keys(commR).map((key) => ({
    Timeago: commR[key].Timeago,
    author: commR[key].author,
    pid: commR[key].pid,
    text: commR[key].text
  }));

  setAllComments(extractedcommData)
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

   async function handleCommentSubmit(comment, name, pid){

    const newComment = {
      pid:pid,
      Timeago: moment(), // Generate a unique ID for the comment
      text: comment,
      author: "u/"+ name
    };
    // Add the new comment to the existing comments
    const response = await fetch('/comments', {
      method: 'POST',
      body: JSON.stringify(newComment),
      headers:{
        'Content-Type': 'application/json'
      }
    });
   }


  return (
    <div className='comment-page-container'>
      <div className='inner'>     
      
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

      <CommentForm newd={post} onSub={handleCommentSubmit} />

      </div>


     
<div><h4 style={{    color:'white'}}>comments</h4></div>

{allComments
.filter(comment => comment.pid === post.pid) // Filter comments by matching post.pid
.map((comment) => (
<div className='commentsss' key={comment.id}>
<div className='bru'>
  <div className='userr'>
    <div className='profile-cont'>
      <Link to='/profile'><img src={img} alt="Logo" className="roundedv2" /></Link>
    </div>
    <h5>{comment.author}</h5> {/* Display the comment title or appropriate property */}
    <div className='tago'> {moment(comment.Timeago).fromNow()}</div>
  </div>
  <div>{comment.text}</div> {/* Display the comment text or appropriate property */}
</div>
</div>
))}

     
      </div>

   <div className='outer-cm-div'>

   <Communitydiv className='comm' title={post.subreddit} newD={props.formD}/>
    
    </div>  

      </div>
  
  );
};

export default CommentPage;
