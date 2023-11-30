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
const cdata = pdata && pdata.filter((item)=>{
    return (item.id === auth.currentUser.uid)
})
const usercomments = allComments && allComments.filter((item)=>{
    return(item.cid===auth.currentUser.uid);
})

console.log(allComments)

  
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
            {(pdata && cdata.map((post) => (
            <Link style={{marginBottom:'10px'}} to={{
                pathname: '/commentpage',
                search: `?id=${encodeURIComponent(post.pid)}`,
              }} className="comments">
         <PostDisplay
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
          v6={post}
        />
       
          </Link>
            )))}
        </div>);
      case 'comments':
        return (
            <div style={{marginTop:'10px'}}>
                {
                   ( usercomments && usercomments.map((item)=>(
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
