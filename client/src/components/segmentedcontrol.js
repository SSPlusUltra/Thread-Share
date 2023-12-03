import React, { useEffect, useState } from 'react';
import { SegmentedControl, VisuallyHidden } from '@mantine/core';
import { IconEye, IconCode, IconExternalLink } from '@tabler/icons-react';
import PostDisplay from './displaypost';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import { CommentHtml } from './commenthtml';

const PreviewComponent = () => <div>Preview Component</div>;
const CodeComponent = () => <div>Code Component</div>;
const ExportComponent = () => <div>Export Component</div>;

const SelectDiff = (props) => {
  const [selectedItem, setSelectedItem] = useState('posts');
  const [pdata, setPostData] = useState(props.pdata)
  const [allComments, setAllComments] = useState(props.data);
  const [imgdata, setimgData] = useState(props.pdata)
  const [formd, setData] = useState(props.pdata)
  const [udata, setDatau] = useState(props.pdata)
const cdata = pdata && pdata.filter((item)=>{
    return (item.id === auth.currentUser.uid)
})

const cdatadiff = props.requserdiff && pdata && pdata.filter((item)=>{
  return (item.id === props.requserdiff.id)
})
const usercomments = allComments && allComments.filter((item)=>{
    return(item.cid===auth.currentUser.uid);
})

const usercommentsdiff = props.requserdiff && allComments && allComments.filter((item)=>{
  return(item.cid===props.requserdiff.id);
})

console.log(udata)

const findata = cdatadiff ? cdatadiff : cdata;
const fincomments = usercommentsdiff ? usercommentsdiff : usercomments;

async function handlesave(post){
  const res = await fetch(`http://localhost:4000/posts`)

      const R = await res.json();
const reqid = Object.keys(R).find((key) => (
  R[key].pid === post.pid
));
const id = auth.currentUser.uid
 const ms = R[reqid];

  if(!ms.members[id]){
    ms.members[id] = true;
  }
  else{
    ms.members[id] = false;
  }


  const response = await fetch(`http://localhost:4000/posts/${post.pid}`, {
      method: 'PUT',
      body: JSON.stringify(ms),
      headers:{
        'Content-Type': 'application/json'
      }
    });

}

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
}, []); // Empty de


  useEffect(() => {
    const fetchData = async () => {
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
    ;
    try{
        const response = await axios.get('http://localhost:4000/comments');
        const commR =response.data;
        const extractedcommData = Object.keys(commR).map((key) => ({
          Timeago: commR[key].Timeago,
          author: commR[key].author,
          pid: commR[key].pid,
          text: commR[key].text,
          cid:commR[key].cid
        }));
      
        setAllComments(extractedcommData)

    }
    catch (error) {
        console.error('Error fetching posts:', error);
        // Handle error appropriately
      }
        
    }
    

    fetchData(); // Call the fetchData function once during component mount
  }, []);



  console.log(usercomments)

  const renderComponent = () => {
    switch (selectedItem) {
      case 'posts':
        return(<div style={{marginTop:'10px'}}>
            {(pdata && findata.map((post) => (
            <Link style={{marginBottom:'10px'}} to={{
                pathname: '/commentpage',
                search: `?id=${encodeURIComponent(post.pid)}`,
              }} className="comments">
                <div style={{width:'100%'}}>
         <PostDisplay
          formd={formd}
          imgdata={imgdata}
          udata={udata}
          v1={post.title}
          v2={post.description}
          v3={post.pid}
          v4={post.vote}
          v5={post.id}
          UpclickHandler = {props.Uv}
          DownclickHandler = {props.Dv}
          upress = {post.upvotepressed}
          dpress = {post.downvotepressed}
          key={post.pid}
          onhandle={handlesave}
          v6={post}
        />
       </div>
          </Link>
            )))}
        </div>);
      case 'comments':
        return (
            <div style={{marginTop:'10px'}}>
                {
                   ( usercomments && fincomments.map((item)=>(
                    <Link style={{textDecoration:'none'}} to={{
                        pathname: '/commentpage',
                        search: `?id=${encodeURIComponent(item.pid)}`,
                      }}>
                       <div style={{marginBottom:'10px'}}> <CommentHtml comment = {item} /> </div>
                        </Link>
                    )) )
                }
            </div>
        );
      case 'export':
        return <ExportComponent />;
      default:
        return null;
    }
  };

  return (
    <div>
      <SegmentedControl
        color="red"
        value={selectedItem}
        onChange={(value) => setSelectedItem(value)}
        data={[
          {
            value: 'posts',
            label: (
              <>
               
                <div>Posts</div>
              </>
            ),
          },
          {
            value: 'comments',
            label: (
              <>
         
                <div>Comments</div>
              </>
            ),
          },
        ]}
      />
      {renderComponent()}
    </div>
  );
};

export default SelectDiff;
