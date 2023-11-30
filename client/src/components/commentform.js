import React, { useState } from 'react';
import './commentform.css'; // Import the CSS file
import { auth } from '../firebase';
import Communitydiv from './communitydiv';

const CommentForm = (props) => {
  const [comment, setComment] = useState('');

  const handleCommentChange = (event) => {
    event.preventDefault();
    props.onSub(comment, auth.currentUser.displayName, props.newd.pid);
    setComment('');

  };

 

  return (
    <form onSubmit={handleCommentChange}>
    <div className="comment-form-container"> {/* Add the container div */}
    <h3>comment as {auth.currentUser.displayName}</h3>
      <input className='comment-form' value={comment} type='text' placeholder='Thoughts...?' onChange={(e) => setComment(e.target.value)} />
      <button type='submit' className='postingg'>post</button> 
    </div>
    </form>
  );
};

export default CommentForm;
