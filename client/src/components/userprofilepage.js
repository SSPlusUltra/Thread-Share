import { useLocation } from "react-router-dom";
import Profile from "./profile";

const UserProfile = (props)=>{
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');
    const plainId = id && id.replace(/"/g, '');
    const requser = plainId && props.udata && props.udata.find((item) => item.id === plainId);
    return(
   <Profile ouser={true} reqid={plainId} udata={props.udata} imgdata={props.imgdata}  requserdiff={requser} />
    );
}

export default UserProfile;