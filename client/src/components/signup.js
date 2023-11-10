import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import SignIn from "./sign-in";
import { Link } from "react-router-dom";
import React from "react";
import { useNavigate } from "react-router-dom";
import './signup.css'

const SignUp = ()=>{

    const navigate = useNavigate();
    const[email, setEmail] = React.useState('');
    const[password, setPassword] = React.useState('');
    const[userName, setuserName] = React.useState('');
    const signUp=(event)=>{
       event.preventDefault();
    createUserWithEmailAndPassword(auth, email, password).then((useCredential)=>{
        const user = useCredential.user;
        updateProfile(user, {
            displayName: userName
          })
    console.log(useCredential)
      navigate('/homepage')



    setEmail('')
    setuserName('')
    setPassword('')
    

   }).catch((e)=>{
    console.log(e);
   })
    

    }

    return(
        // <div className="sign-in-container">
        //     <form onSubmit={signUp}>
        //         <h1>Create an account</h1>
        //         <input type='username' placeholder="enter usaername" value={userName} onChange={(e)=>setuserName(e.target.value)}></input>
        //         <input type='email' placeholder="enter email" value={email} onChange={(e)=>setEmail(e.target.value)}></input>
        //         <input type='password' placeholder="enter password" value={password} onChange={(e)=>setPassword(e.target.value)}></input>
        //         <button type='submit'>Sign Up</button>
        //         <Link to="/signin" className="ugh">
        //         <button>Already have an account? signin?</button>
        //       </Link>

        //     </form>
        // </div>

        <div className="signup-form">
        <h2 className="signup-form-title">Sign Up</h2>
        <form onSubmit={signUp}>
          <div className="form-group">
            <label htmlFor="username" className="form-label">Username:</label>
            <input
             type='username' placeholder="enter usaername" value={userName} onChange={(e)=>setuserName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email:</label>
            <input
             type='email' placeholder="enter email" value={email} onChange={(e)=>setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password:</label>
            <input
             type='password' placeholder="enter password" value={password} onChange={(e)=>setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="form-button">Sign Up</button>
        </form>
        <p className="signin-link">
          Already have an account? <Link to="/signin">Sign in</Link>.
        </p>
      </div>
        
    )
}

export default SignUp;