// PostCard.js
import React from 'react';
import './displaypost.css'; // Import the CSS file for styling
import { Link } from 'react-router-dom';
import Vote from './vote';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faBookmark, faShare } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import { useEffect } from 'react';
import { auth } from '../firebase';

const PostDisplay = (props) => {


  async function postsavehandler (){
   props.onhandle(props.v6)

  }
    
if (!props.v5) {
    return <p>No posts available.</p>;
  }

  return(
  <>
 
  <div className="post-card">
 
  <div className="post-footer">
    <Vote  Upclickhandle={props.UpclickHandler}
        Downclickhandle={props.DownclickHandler} postId = {props.v3} postv={props.v4} uid={props.v5} upre = {props.upress} dpre = {props.dpress}/>
  </div>
    <div className='right-part'>
    <div className="post-header">
    <h3 className="post-title">{props.v1}</h3>
  </div>

  <div className="post-content">
    <p style={{ textAlign: 'justify' }}>{props.v2}</p>
  </div>
<div className='footer'>
 <div className='comments-main'>
<Link to={{
          pathname: '/commentpage',
          search: `?id=${encodeURIComponent(props.v3)}`,
        }} className="comments">
       <FontAwesomeIcon style={{color:'white'}}  icon={faComment} size="xl"/>
       <span style={{color:'white', margin:"0px 70px 0px 5px"}} >comments</span>
 
    </Link>
    </div>

    <div className='bookmark-main'  onClick={postsavehandler}>
    <FontAwesomeIcon icon={faBookmark} style={{color:'yellow'}} size="xl" />
       <span style={{color:'white', margin:"0px 70px 0px 5px"}} >save</span>
    </div>





    </div>


    </div>
</div>
    </>)



};

export default PostDisplay;
