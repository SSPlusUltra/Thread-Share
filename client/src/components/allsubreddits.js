import { useEffect, useState } from 'react';
import Communitycard from './communitycard'
import axios from 'axios';


const AllSubs = ()=>{
    const [data, setData] = useState();
    useEffect(()=>{
        fetchsubs();
    },[])

async function fetchsubs(){
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
}

    return(
        <div style={{display:'flex', flexWrap:'wrap',gap:'1.5em'}}>
  {data&&data.map((item)=>(
            <Communitycard subThread = {item}/>
        ))}
      

        </div>
      
    );
};


export default AllSubs;