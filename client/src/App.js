import { Route, Routes } from 'react-router-dom'
import Navbar from './components/navbar';
import './App.css'
import SubredditCreationForm from './components/subreddit';
import { useState } from 'react';
import SubredditPage from './components/subredditpage';
import CreatePosts from './components/postcreate';
import CommentPage from './components/commentpage';
import Profile from './components/profile';
import HomePage from './components/homepage';
import React from 'react';
import { useEffect } from 'react';
import SignUp from './components/signup';
import SignIn from './components/sign-in';
import SignOut from './components/sign-out';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';
import SavedPosts from './components/savedposts';
import JoinedSubs from './components/joinedsubs';
import axios from 'axios';
const arr = []
const pdata= []
function App() {
const [data, setData] = useState(arr)
const [postdata, setPostData] = useState(pdata)
const[isLoggedin, setIsLoggedin] = useState('');
const navigate = useNavigate();
const [cl, setcl] = useState(false);

useEffect(()=>{
    fetchsubs();
  },[data])

  useEffect(()=>{
    fetchposts();
  },[postdata])
  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
           
        if (user) {
          setIsLoggedin(user)
         } else {
          setIsLoggedin(null);
        }
      }
      );
  return ()=>{
    listen();
  }
    // Cleanup the observer when the component unmounts
    
  }, []);

  async function subhandler(movie) {
    try {
      const response = await axios.post('/subreddits', movie, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.status === 200) {
        const dataR = response.data;
        // Do something with dataR if needed
      } else {
        // Handle the error here, e.g., display an error message
        console.error('Error:', response.status, response.statusText);
      }
    } catch (error) {
      // Handle Axios or other errors
      console.error('Axios or other error:', error);
      alert(error)
    }
  }
  


  async function posthandler(pdata) {
    try {
      const response = await axios.post('/posts', pdata, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      // Axios automatically parses the JSON response, so you can access it directly
      const dataR = response.data;
  
      // Do something with dataR if needed
    } catch (error) {
      // Handle Axios or other errors
      console.error('Axios or other error:', error);
    }
  }

   async function updatevotehandler(id,pid,  Vote, voteType){
    const res = await fetch(`/posts/${pid}`);
    const pd = await res.json();
    console.log(pd)
    id= auth.currentUser.uid;
    if (voteType === 'upvote') {
      if (!pd.upvotepressed[id]) {
          if (pd.downvotepressed[id]) {
              pd.vote += 2;
          } else {
              pd.vote += 1;
          }
          pd.upvotepressed[id] = true;
      } else {
          pd.vote -= 1;
          pd.upvotepressed[id] = false;
      }
  
      // Remove user's ID from the downvotepressed array if it's there
      pd.downvotepressed[id] = false;
  } else if (voteType === 'downvote') {
      if (!pd.downvotepressed[id]) {
          if (pd.upvotepressed[id]) {
              pd.vote -= 2;
          } else {
              pd.vote -= 1;
          }
          pd.downvotepressed[id] = true;
      } else {
          pd.vote += 1;
          pd.downvotepressed[id] = false;
      }
  
      // Remove user's ID from the upvotepressed array if it's there
      pd.upvotepressed[id] = false;
  }
  
  try {
    const response = await axios.put(
      `/posts/${pid}`,
      pd,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  
    if (response.status === 200) {
      // PUT request was successful
      console.log('Post updated successfully.');
    } else {
      // Handle other response statuses here
      console.error('Error:', response.status, response.statusText);
    }
  } catch (error) {
    // Handle Axios or parsing errors
    console.error('Axios or JSON parsing error:', error);
  }
  
    fetchposts();
   }
  

  

  async function fetchsubs(){
    const response = await fetch('/subreddits');
  const dataR = await response.json();
  const extractedData = Object.keys(dataR).map((key) => ({
    title: dataR[key].title,
    description: dataR[key].description,
    id: dataR[key].id,
    members: dataR[key].members
  }));

  setData(extractedData)
  }

  async function fetchposts(){
    const response = await fetch('/posts');
  const postsR = await response.json();
  const extractedpostData = Object.keys(postsR).map((key) => ({
    title: postsR[key].title,
    description: postsR[key].description,
    subreddit: postsR[key].subreddit,
    vote: postsR[key].vote,
    date: postsR[key].date,
    id: postsR[key].id,
    pid:postsR[key].pid,
    upvotepressed: postsR[key].upvotepressed,
    downvotepressed: postsR[key].downvotepressed,
    members: postsR[key].members
  }));

  setPostData(extractedpostData)
  }
  
const onloggoin = (k)=>{
  setIsLoggedin(k)
}




  let ne=0;

  const globalupvote = (id, pid) => {
    postdata.map((d)=>{
      if(d.pid === pid){
         ne = d.vote;
      }
    })
    if(ne===1){
      ne = 0;
    }

    else if(ne===-1){
      ne=1
    }
    else{
      ne=1;
    }
    updatevotehandler(id, pid,  ne, 'upvote');
  };
  const globaldownvote = (id, pid) => {
    postdata.map((d)=>{
      if(d.pid === pid){
        ne = d.vote;
     }
    })
    if(ne===-1){
      ne = 0;
    }

    else if(ne===1){
      ne=-1
    }
    else{
      ne=-1;
    }
    updatevotehandler(id,pid, ne, 'downvote');
  };

  const handlec = (v)=>{
    setcl(v);

  }

  
  return (
  <>
     {isLoggedin? <Navbar formD={data} onc= {handlec}/> : ''}

     <Routes>
  <Route path="/signin" element={<SignIn  onL = {onloggoin}/>} />
  {isLoggedin && (
    <>
        <Route path="/signout" element={<SignOut  />} />
      <Route path="/homepage" element={<HomePage pdata={postdata} Uv={globalupvote} Dv={globaldownvote} />} />
      <Route path="/form" element={<SubredditCreationForm onsubreddit={subhandler} />} />
      <Route path="/profile" element={<Profile data={data} />} />
      <Route path="/subredditpage" element={<SubredditPage formD={data} pdata={postdata} Uv={globalupvote} Dv={globaldownvote}  cl = {cl}/>} />
      <Route path="/postcreate" element={<CreatePosts oncreate={posthandler} formD={data} />} />
      <Route path="/commentpage" element={<CommentPage  formD={data} pdata={postdata} Uv={globalupvote} Dv={globaldownvote} />} />
      <Route path="/savedposts" element={<SavedPosts formD={postdata}/>} />
      <Route path="/joinedsubs" element={<JoinedSubs formD={data}/>} />
    </>
  ) }
  <Route path="/" element={<SignUp />} />
</Routes>


      </>
  )   
}

export default App
