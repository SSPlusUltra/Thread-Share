import { useEffect } from "react";
import { useState } from "react";
import { auth } from "../firebase";
import Communitydiv from "./communitydiv";
import './joinedsubs.css'


const JoinedSubs = (props)=>{

    const[reqsub, setreqsub] = useState(props.formD)
    async function fetchsubs(){
      const response = await fetch('http://localhost:4000/subreddits');
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

const fdata = reqsub.filter((item) => {
  return item.members[auth.currentUser.uid] === true;
});




return (
  <div className="js">
  <h2 style={{'color': 'white'}}> Your Communities</h2>
  <div className="wh-container">
 
    {fdata.map((item) => (
      <div className="lh"> 
 <Communitydiv title={item.title} newD={props.formD}/>
 </div>
  ))}</div>
 </div>
)



}

export default JoinedSubs;