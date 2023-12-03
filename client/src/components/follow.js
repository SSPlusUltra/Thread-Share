import React, { useEffect, useState } from 'react';
import { SegmentedControl, VisuallyHidden } from '@mantine/core';
import { IconEye, IconCode, IconExternalLink } from '@tabler/icons-react';
import PostDisplay from './displaypost';
import axios from 'axios';
import { Link, useLoaderData, useLocation } from 'react-router-dom';
import { auth } from '../firebase';
import { CommentHtml } from './commenthtml';
import People from './people';

const PreviewComponent = () => <div>Preview Component</div>;
const CodeComponent = () => <div>Code Component</div>;
const ExportComponent = () => <div>Export Component</div>;

const Follow = (props) => {



    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');
    const plainId = id.replace(/"/g, '');
    const text = queryParams.get('text');
  const plainText =  text && text.replace(/"/g, '');
  const reqlist = props.udata && props.udata.find((item)=> item.id === plainId)
  const [selectedItem, setSelectedItem] = useState( plainText ? plainText : 'Followers');
  const [pdata, setPostData] = useState(props.pdata)
  const [allComments, setAllComments] = useState(props.data);
  


  
  const followerss =  reqlist && Object.entries(reqlist.followers)
  .filter(([userId, isMember]) => isMember === true)
  .map(([userId]) => userId);

  const followerlist = props.udata && props.udata.filter((item)=>followerss.includes(item.id))

  console.log(plainText)

  const followingg = reqlist && Object.entries(reqlist.following)
  .filter(([userId, isMember]) => isMember === true)
  .map(([userId]) => userId);

  const followinglist = props.udata && props.udata.filter((item)=>followingg.includes(item.id))




  const renderComponent = () => {
    switch (selectedItem) {
      case 'Followers':
        return(<div>
            <People formD = {props.formD} udata = {followerlist} imgdata = {props.imgdata} />
        </div>);
      case 'Following':
        return (
            <div>
            <People formD = {props.formD} udata = {followinglist} imgdata = {props.imgdata} />
        </div>
        );
      case 'export':
        return <ExportComponent />;
      default:
        return null;
    }
  };

  return (
    <div style={{display:'flex', flexDirection:'column', alignItems:'center', marginTop:'20px', gap:'1em'}}>

      <SegmentedControl
        color="red"
        value={selectedItem}
        onChange={(value) => setSelectedItem(value)}
        data={[
          {
            value: 'Followers',
            label: (
              <>
               
                <div>Followers</div>
              </>
            ),
          },
          {
            value: 'Following',
            label: (
              <>
         
                <div>Following</div>
              </>
            ),
          },
        ]}
      />
      {renderComponent()}
    </div>
  );
};

export default Follow;
