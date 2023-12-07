import { useEffect, useState } from 'react';
import Communitycard from './communitycard'
import axios from 'axios';
import { Link } from 'react-router-dom';


const AllSubs = (props)=>{
    const [data, setData] = useState();
    useEffect(()=>{
        fetchsubs();
    },[])




async function fetchsubs(){
    try {
        const responseSubs = await axios.get('/subreddits');
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
        <>
        <div style={{textAlign: 'center', fontSize:'25px', fontWeight:'bold', marginTop:'10px'}}>All Communities</div>
        <div style={{display:'flex', flexWrap:'wrap',gap:'10em', justifyContent:'center', padding:'20px'}}>
 {data ? (
  data.map((item) => {
    const reqimg = props.imgdata &&  props.imgdata.find((img) => img.user === item.id);

    return (
      <Link key={item.id} style={{ marginBottom: '10px', textDecoration: 'none' }} to={{
        pathname: '/subredditpage',
        search: `?title=${encodeURIComponent(item.title)}`,
      }}>
        <Communitycard subThread={item} reqimg={reqimg} pdata={props.pdata}  udata={props.udata}/>
      </Link>
    );
  })
) : (
  "wow such empty :("
)}

      

        </div>
      </>
    );
};


export default AllSubs;