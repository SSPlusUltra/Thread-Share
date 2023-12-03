import './community-post.css'
import {useNavigate } from 'react-router-dom';
const CommunityPost = (props)=>{
   const navigate = useNavigate();

    return(
        <div className="generic-input">
           <input onSelect={()=>{
            if(props.dupe){
                alert('login to create post')
                return
            }
            navigate('/postcreate')
           }} className="input-meh"type="text-area" placeholder="Create a Post"></input>
        </div>
    )
}

export default CommunityPost;