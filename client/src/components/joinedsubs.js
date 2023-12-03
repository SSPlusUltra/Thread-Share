import { useEffect } from "react";
import { useState } from "react";
import { auth } from "../firebase";
import Communitydiv from "./communitydiv";
import './joinedsubs.css'
import Communitycard from "./communitycard";
import { Link } from "react-router-dom";
import axios from "axios";


const JoinedSubs = (props)=>{

    const[reqsub, setreqsub] = useState(props.formD)
    async function fetchsubs(){
      const response = await fetch('/subreddits');
    const dataR = await response.json();
    const extractedData = Object.keys(dataR).map((key) => ({
      title: dataR[key].title,
      description: dataR[key].description,
      id: dataR[key].id,
      members: dataR[key].members
    }));
  
    setreqsub(extractedData)
    }

useEffect(()=>{
    fetchsubs();
}, [reqsub])

const fdata = reqsub && reqsub.filter((item) => {
  return item.members[auth.currentUser.uid] === true;
});


async function handlejoin(item) {
  
  const res = await fetch(`/subreddits/${item.id}`);
  const R = await res.json();
  const id = auth.currentUser.uid;
  const ms = R;

  if (!ms.members[id]) {
    ms.members[id] = true;
  } else {
    ms.members[id] = false;
  }


  try {
    const response = await axios.put(`/subreddits/${item.id}`, ms, {
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
  if(props.ps){
    window.location.reload();
  }
}




return (
  <>
    {fdata && fdata.length>1 ? (
      <>
        <div style={{ color: 'white', fontSize: '20px', fontWeight: 'bold', textAlign: 'center', marginTop: '20px' }}>
          My Communities
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10em', justifyContent: 'center', padding: '20px' }}>
          {fdata.map((item) => {
            const reqimg = props.imgdata && props.imgdata.find((img) => img.user === item.id);

            return (
              <Link
                key={item.id}
                style={{ marginBottom: '10px', textDecoration: 'none' }}
                to={{
                  pathname: '/subredditpage',
                  search: `?title=${encodeURIComponent(item.title)}`,
                }}
              >
                <Communitycard subThread={item} reqimg={reqimg} pdata={props.pdata} udata={props.udata} onhandlejoin={() => handlejoin(item)} />
              </Link>
            );
          })}
        </div>
      </>
    ) : (
      <h2 style={{textAlign:'center'}}>wow such empty :( </h2>
    )}
  </>
);



}

export default JoinedSubs;