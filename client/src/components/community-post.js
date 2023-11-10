import './community-post.css'
import {useNavigate } from 'react-router-dom';
const CommunityPost = ()=>{
   const navigate = useNavigate();

    return(
        <div className="generic-input">
           <input onSelect={()=>{
            navigate('/postcreate')
           }} className="input-meh"type="text-area" placeholder="Create a Post"></input>
        </div>
    )
}

export default CommunityPost;