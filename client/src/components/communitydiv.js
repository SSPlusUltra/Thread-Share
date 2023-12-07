import { useEffect, useState } from 'react';
import './communitydiv.css'
import { storage } from '../firebase';
import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';
import { auth } from '../firebase';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import Mdown from './mdown';
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Button } from '@mantine/core';
import Communitycard from './communitycard';

const Communitydiv = (props) => {
  const [Threadlogo, setThreadlogo] = useState();
  const [value, setValue] = useState('Join');
  const [reqsub, setreqsub] = useState(props.newD);
  const [jsonobj, setJsonobj] = useState(null);
  useEffect(() => {
    fetchsubs();
  }, []);


  const id = auth.currentUser.uid;
  const subThread = props.title && reqsub && reqsub.find((item) => item.title === props.title) || <p>loading...</p>;


  async function handledeletesub(){

    try {
      const response = await axios.delete(`/subreddits/delete/${subThread.id}`,{
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        console.log('Post updated successfully.');
      } else {
        console.error('Error:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Axios or JSON parsing error:', error);
    }

  }


  async function handlejoin() {
  
    const res = await fetch(`/subreddits/${subThread.id}`);
    const R = await res.json();
    const id = auth.currentUser.uid;
    const ms = R;

    if (!ms.members[id]) {
      ms.members[id] = true;
      setValue('Joined');
    } else {
      ms.members[id] = false;
      setValue('Join');
    }


    try {
      const response = await axios.put(`/subreddits/${subThread.id}`, ms, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        console.log('Post updated successfully.');
      } else {
        console.error('Error:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Axios or JSON parsing error:', error);
    }
      window.location.reload();
  }

  async function fetchsubs() {
    const response = await fetch('/subreddits');
    const dataR = await response.json();
    const extractedData = Object.keys(dataR).map((key) => ({
      title: dataR[key].title,
      date: dataR[key].date,
      description: dataR[key].description,
      id: dataR[key].id,
      members: dataR[key].members,
    }));
    setreqsub(extractedData);

   
  }

  return (
      <Communitycard pdata = {props.pdata} reqimg={props.reqimg} ps = {props.ps} onhandlejoin={handlejoin}  subThread={props.title && subThread} udata={props.udata} />
  );
  }  
export default Communitydiv;
