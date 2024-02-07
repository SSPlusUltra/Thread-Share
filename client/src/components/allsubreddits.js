import { useEffect, useState } from 'react';
import Communitycard from './communitycard'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';


const AllSubs = (props)=>{
    const [data, setData] = useState();
    useEffect(()=>{
        fetchsubs();
    },[])

    async function handlejoin(sub) {
      console.log(sub)
      const res = sub;
      const id = auth.currentUser.uid;
      const ms = res;
  
      if (!ms.members[id]) {
        ms.members[id] = true;
      } else {
        ms.members[id] = false;
      }
  
  
      try {
        const response = await axios.put(`/subreddits/${sub.id}`, ms, {
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

        <Communitycard original={item} onhandlejoin={handlejoin} iid={item.id} title={item.title} allsubsrender={true} subThread={item} reqimg={reqimg} pdata={props.pdata}  udata={props.udata}/>
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