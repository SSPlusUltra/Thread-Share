import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import './sign-out.css'
import { useNavigate } from "react-router-dom";


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
     <form onSubmit={loggingout}>
    <button className="sign-out-button">Logout</button>
    </form>
    </>
  )

}



export default SignOut;
