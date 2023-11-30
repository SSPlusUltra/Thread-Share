import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import './sign-out.css'
import { Link, useNavigate } from "react-router-dom";
import { Button, Group, UnstyledButton } from "@mantine/core";


const SignOut = (props)=>{
const navigate = useNavigate();
const loggingout = ()=>{
    signOut(auth).then(() => {
        console.log('sign-out successful')
         window.location.href = '/';
        props.onLogout(null)
 
        

      }).catch((error) => {
        // An error happened.
      });
    
}    
  return(
    <>
     <Group visibleFrom="md">
        <UnstyledButton onClick={loggingout} variant="default">Sign out</UnstyledButton>
          </Group>
    </>
  )

}



export default SignOut;
