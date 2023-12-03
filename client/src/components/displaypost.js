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
import { Avatar, ScrollArea } from '@mantine/core';
import { GoBold, GoComment } from "react-icons/go";
import { RiBookmarkLine } from "react-icons/ri";
import { LuBookMarked } from "react-icons/lu";

const PostDisplay = (props) => {


  async function postsavehandler (){
   props.onhandle(props.v6)

  }

 
  
  const reqid = props.v6 && props.formd && props.formd.find((item)=>item.title === props.v6.subreddit )
 
  const reqimg = reqid && props.imgdata && props.imgdata.find((item)=>item.user === reqid.id)

    

  const requser = props.v6 && props.udata && props.udata.find((item)=>item.id === props.v6.id)
if (!props.v5) {
    return <p>No posts available.</p>;
  }

  return(
  <>
 
  <div className="post-card">
 
  <div className="post-footer">
    <Vote  Upclickhandle={props.UpclickHandler}
        Downclickhandle={props.DownclickHandler} postId = {props.v3} postv={props.v4} uid={props.v5} upre = {props.upress} dpre = {props.dpress} dupe={props.dupe}/>
  </div>
    <div className='right-part'>
    <div className="post-header" style={{display:'flex', flexDirection:'column', gap:'0.5em'}}>
      <div style={{display:'flex', alignItems:'center', marginTop:'15px',paddingRight:'10px', gap:'0.5em'}}>
      {!props.dupe && props.v6 && <Link key={props.v6.id} style={{display:'flex', gap:'0.5em', textDecoration:'none', color:'white'}} to={{
        pathname: '/subredditpage',
        search: `?title=${encodeURIComponent(props.v6.subreddit)}`,
      }}> <div style={{display:'flex', gap:'0.5em'}}><Avatar size={25} src={reqimg && reqimg.image}/>
        <div style={{fontWeight:'bold', fontSize:'12px'}}>{props.v6.subreddit}</div></div> </Link>}
        <div style={{ fontSize: '12px', color: '#888', marginTop: '3px', display: 'flex', alignItems: 'center', fontWeight:'bold'}}>
  <span style={{ marginRight: '5px' }}>•</span> Posted by {requser && requser.name}
</div>

      </div>
      <div style={{display:'flex',alignItems:'flex-start'}}> <div style={{minWidth:'90px', wordBreak:'break-word', paddingRight:'10px', fontWeight:'bold'}} className="post-title">{props.v1}</div> </div>
   
  </div>
<ScrollArea h={70}>
<div style={{paddingRight:'10px'}} className="post-content">
    <div style={{wordBreak:'break-word'}} dangerouslySetInnerHTML={{ __html: `${props.v2}` }}/>
  </div>
</ScrollArea>
{!props.dupe && <div className='footer' style={{paddingRight:'10px'}}>
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
  {auth.currentUser && props.v6.members[auth.currentUser.uid] ? (
    <LuBookMarked color="grey" size="20px" /> // Render LuBookMarked if the user is not a member
  ) : (
    <RiBookmarkLine color="grey" size="20px" /> // Render RiBookmarkLine if the user is a member
  ) }
  <div style={{marginRight:'5px'}}>{auth.currentUser && props.v6.members[auth.currentUser.uid] ? 'Saved' : 'Save'}</div>
</div>

   





    </div>}


    </div>
</div>
    </>)



};

export default PostDisplay;
