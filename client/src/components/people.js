import { Users } from "./userspage";

const People = (props)=>{
   return(
    <Users udata={props.udata} formD = {props.formD} imgdata={props.imgdata}/>
   )
} 


export default People;