import { onAuthStateChanged, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { useEffect } from "react";

const SignIn = (props)=>{
    const navigate = useNavigate();


    const[email, setEmail] = React.useState('');
    const[password, setPassword] = React.useState('');
    const signIn=(event)=>{
       event.preventDefault();
       
   signInWithEmailAndPassword(auth, email, password).then((useCredential)=>{


    // Update the user profile here
    console.log(useCredential)
    navigate('/homepage')
   
   

   }).catch((e)=>{
    console.log(e);
   })
    

    }

    return(
        // <div className="sign-in-container">
        //     <form onSubmit={signIn}>
        //         <h1>Log In</h1>
        //         <input type='email' placeholder="enter email" value={email} onChange={(e)=>setEmail(e.target.value)}></input>
        //         <input type='password' placeholder="enter password" value={password} onChange={(e)=>setPassword(e.target.value)}></input>
        //         <button type='submit'>Log In</button>
        //     </form>
        // </div>


        <div className="signup-form">
        <h2 className="signup-form-title">Login</h2>
        <form onSubmit={signIn}>
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
          <button type="submit" className="form-button">Login</button>
        </form>
        <p className="signin-link">
          Don't have an account? <Link to="/">Sign up</Link>.
        </p>
      </div>
    )
}

export default SignIn;