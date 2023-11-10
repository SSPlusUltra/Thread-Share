
import './vote.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUp, faCircleDown } from '@fortawesome/free-solid-svg-icons';
import { auth } from '../firebase';

const Vote = (props)=>{
 const userId = auth.currentUser.uid;
    const handleupvoteclick = ()=>{
      props.Upclickhandle(userId, props.postId);
    }

    const handledownvoteclick = ()=>{
      props.Downclickhandle(userId, props.postId);
    }

    const up = props.upre|| false
    const down = props.dpre|| false;
    return(
        <div className="vote-section">
          <FontAwesomeIcon onClick= {handleupvoteclick} className={up[userId]? 'upvote-active' : 'upvote-inactive'} icon={faCircleUp} size="2xl" />
      <span className="votes-count">{props.postv || 0}</span>
      <FontAwesomeIcon onClick={handledownvoteclick} className={down[userId]? 'downvote-active' : 'downvote-inactive'} icon={faCircleDown} size="2xl" />
    </div>
    )
}

export default Vote;