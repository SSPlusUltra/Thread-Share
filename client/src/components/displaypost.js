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
import { ScrollArea } from '@mantine/core';
import { GoBold, GoComment } from "react-icons/go";
import { RiBookmarkLine } from "react-icons/ri";
import { LuBookMarked } from "react-icons/lu";

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
    <ScrollArea style={{ width: '100%' }}><h3 style={{minWidth:'90px', wordBreak:'break-word', paddingRight:'10px'}} className="post-title">{props.v1}</h3></ScrollArea>
  </div>
<ScrollArea h={70}>
<div style={{paddingRight:'10px'}} className="post-content">
    <div dangerouslySetInnerHTML={{ __html: `${props.v2}` }}/>
  </div>
</ScrollArea>
<div className='footer' style={{paddingRight:'10px'}}>
 <div className='comments-main'>
<Link to={{
          pathname: '/commentpage',
          search: `?id=${encodeURIComponent(props.v3)}`,
        }} className="comments">
    <div style={{display:'flex', alignItems:'center', gap:'0.25em'}}><GoComment   size="20px" fill='grey'/>
      <div  style={{color:'white',paddingBottom:'5px'}} >Comments</div></div> 
 
    </Link>
    </div>
    <div onClick={postsavehandler} style={{ display: 'flex', alignItems: 'center', gap: '0.1em', cursor: 'pointer' }}>
  {props.v6.members[auth.currentUser.uid] ? (
    <LuBookMarked color="grey" size="20px" /> // Render LuBookMarked if the user is not a member
  ) : (
    <RiBookmarkLine color="grey" size="20px" /> // Render RiBookmarkLine if the user is a member
  ) }
  <div style={{marginRight:'5px'}}>{props.v6.members[auth.currentUser.uid] ? 'Saved' : 'Save'}</div>
</div>

   





    </div>


    </div>
</div>
    </>)



};

export default PostDisplay;
