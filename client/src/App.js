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
import { MantineProvider, Text } from '@mantine/core';
import { HeaderMegaMenu } from './components/HeaderMegaMenu';
import AllSubs from './components/allsubreddits';
import Communitycard from './components/communitycard';
import { Users } from './components/userspage';
import UserProfile from './components/userprofilepage';
import SelectDiff from './components/segmentedcontrol';
import People from './components/people';
import Follow from './components/follow';
import Dupehomepage from './components/dupehomepage';
const arr = []
const pdata= []
function App() {
const [data, setData] = useState(arr)
const [postdata, setPostData] = useState(pdata)
const[isLoggedin, setIsLoggedin] = useState('');
const navigate = useNavigate();
const [cl, setcl] = useState(false);
const[datau, setDatau] = useState();
const[imgdata, setimgData] = useState();

useEffect(() => {
  const fetchData = async () => {
    try {
      const responseSubs = await axios.get('http://localhost:4000/users');
            const dataR = responseSubs.data;
            const extractedData = Object.keys(dataR).map((key) => ({
              name: dataR[key].name,
              id: dataR[key].id,
              onlineStatus: dataR[key].onlineStatus,
              createdFrom: dataR[key].createdFrom,
              signedinFrom: dataR[key].signedinFrom,
              following: dataR[key].following,
              followers: dataR[key].followers,
      }));
      setDatau(extractedData);
    } catch (error) {
      console.error('Error fetching subreddits:', error);
      // Handle error appropriately
    }

  }
  fetchData();
  }, []);

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
      const response = await axios.post('http://localhost:4000/subreddits', movie, {
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
  

  async function uploadImage(img){
    try {
      const response = await axios.post('http://localhost:4000/subreddits', img, {
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
      const response = await axios.post('http://localhost:4000/posts', pdata, {
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
    const res = await fetch(`http://localhost:4000/posts/${pid}`);
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
      `http://localhost:4000/posts/${pid}`,
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
  
   }
  

  

   useEffect(() => {
    const fetchData = async () => {
      try {
        const responseSubs = await axios.get('http://localhost:4000/subreddits');
        const dataR = responseSubs.data;
        const extractedData = Object.keys(dataR).map((key) => ({
          title: dataR[key].title,
          date: dataR[key].date,
          description: dataR[key].description,
          id: dataR[key].id,
          members: dataR[key].members,
        }));
        setData(extractedData);
      } catch (error) {
        console.error('Error fetching subreddits:', error);
        // Handle error appropriately
      }

      try {
        const responsePosts = await axios.get('http://localhost:4000/posts');
        const postsR = responsePosts.data;
        const extractedpostData = Object.keys(postsR).map((key) => ({
          title: postsR[key].title,
          description: postsR[key].description,
          subreddit: postsR[key].subreddit,
          vote: postsR[key].vote,
          date: postsR[key].date,
          id: postsR[key].id,
          pid: postsR[key].pid,
          upvotepressed: postsR[key].upvotepressed,
          downvotepressed: postsR[key].downvotepressed,
          members: postsR[key].members,
        }));
        setPostData(extractedpostData);
      } catch (error) {
        console.error('Error fetching posts:', error);
        // Handle error appropriately
      }

      try {
        const responseSubs = await axios.get('http://localhost:4000/upload');
        const dataR = responseSubs.data;
        const extractedData = Object.keys(dataR).map((key) => ({
          image: dataR[key].image,
          user: dataR[key].user,
        }));
        setimgData(extractedData);
        console.log(extractedData); // Log the extractedData
      } catch (error) {
        console.error('Error fetching subreddits:', error);
        // Handle error appropriately
      }

      
    };

    fetchData(); // Call the fetchData function once during component mount
  }, []); // Empty dependency array to run the effect only once during mount
  
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
  
     {isLoggedin ?<Navbar imgdata = {imgdata} udata = {datau} formd={data}/>:<HeaderMegaMenu formD={data}/>}

     <Routes>
  <Route path="/signin" element={<SignIn  onL = {onloggoin}/>} />
  <Route  path="/signup" element={<SignUp/>} />
  <Route path="/" element={<Dupehomepage pdata={postdata} udata={datau} formD = {data} imgdata={imgdata}/>} />
  {isLoggedin && (
    <>
        <Route path="/signout" element={<SignOut  />} />
      <Route path="/homepage" element={<HomePage pdata={postdata} Uv={globalupvote} Dv={globaldownvote} imgdata = {imgdata} formd = {data} udata={datau} />} />
      <Route path="/form" element={<SubredditCreationForm onsubreddit={subhandler} />} />
      <Route path="/profile" element={<Profile imgdata = {imgdata} data={data} udata={datau} pdata={postdata} />} />
      <Route path="/subredditpage" element={<SubredditPage formD={data} pdata={postdata} Uv={globalupvote} Dv={globaldownvote}  cl = {cl} imgdata = {imgdata} udata={datau}/>} />
      <Route path="/postcreate" element={<CreatePosts pdata={postdata} oncreate={posthandler} formD={data} imgdata ={imgdata} udata={datau}/>} />
      <Route path="/commentpage" element={<CommentPage  formD={data} pdata={postdata} Uv={globalupvote} Dv={globaldownvote} imgdata={imgdata} udata={datau}/>} />
      <Route path="/savedposts" element={<SavedPosts formD={postdata}/>} />
      <Route path="/joinedsubs" element={<JoinedSubs imgdata = {imgdata} pdata={postdata} udata={datau}/>} />
      <Route path="/allsubs" element={<AllSubs imgdata = {imgdata} pdata={postdata} udata={datau} formD={data}/>} />
      <Route path="/communitycard" element={<Communitycard formd={data}/>} />
      <Route path="/userprofile" element={<UserProfile udata = {datau} imgdata={imgdata}/>} />
      <Route path="/segmentedcontrol" element={<SelectDiff pdata={postdata} Uv={globalupvote} Dv={globaldownvote}/>} />
      <Route path="/people" element={<People udata={datau} formD = {data} imgdata={imgdata}/>} />
      <Route path="/follow" element={<Follow udata={datau} formD = {data} imgdata={imgdata}/>} />



    </>
  ) }
</Routes>
      </>
  )   
}

export default App
