import {
  HoverCard,
  Group,
  Button,
  UnstyledButton,
  Text,
  SimpleGrid,
  ThemeIcon,
  Anchor,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  Collapse,
  ScrollArea,
  rem,
  useMantineTheme,
} from '@mantine/core';
import { MantineLogo } from '@mantine/ds';
import { useDisclosure } from '@mantine/hooks';
import {
  IconNotification,
  IconCode,
  IconBook,
  IconChartPie3,
  IconFingerprint,
  IconCoin,
  IconChevronDown,
} from '@tabler/icons-react';
import classes from './HeaderMegaMenu.module.css';
import LogoS from '../logo.png'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { auth, storage } from '../firebase';
import { useEffect, useState } from 'react';
import { getDownloadURL, listAll, ref } from 'firebase/storage';
import { signInWithEmailAndPassword } from 'firebase/auth';
import axios from 'axios';






// Now mockdata is an array of objects with title and icon properties

export function HeaderMegaMenu(props) {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const theme = useMantineTheme();
  const [reqsub, setreqsub] = useState(props.formD);
  const [Threadlogo, setThreadlogo] = useState();
  const[data, setData] = useState();
  const navigate = useNavigate();



  useEffect(()=>{
    fetchsubs();
  },[])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseSubs = await axios.get('/users');
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
        setData(extractedData);
      } catch (error) {
        console.error('Error fetching subreddits:', error);
        // Handle error appropriately
      }
  
    }
    fetchData();
    }, []);

// Assuming this code is inside an asynchronous function or an async block



// Now mockdata contains an array of resolved promises

async function statushandle(udata){
         
  try {
    const response = await axios.put(`/users/${auth.currentUser.uid}`, udata, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Axios automatically parses the JSON response, so you can access it directly

    // Do something with dataR if needed
  } catch (error) {
    // Handle Axios or other errors
    console.error('Axios or other error:', error);
  }

}
  


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

const handletestLogin = async()=>{
    const useCredential = await signInWithEmailAndPassword(auth, "anishbu@gmail.com", "Atomiciaz1$");
    const currentUser = auth.currentUser;
      
    if (currentUser) {
      const mdata = data.find((item) => item.id === currentUser.uid);

      if (mdata) {
        mdata.onlineStatus = true;
        mdata.signedinFrom = Date.now()
        await statushandle(mdata);
        console.log(mdata) // Ensure statushandle completes before navigating
      } else {
        console.error('User data not found for online status update');
      }

      navigate('/homepage');
      console.log(useCredential);
    } else {
      console.error('No current user after login');
    }
}

  const links = reqsub.map((item) => (
    <UnstyledButton className={classes.subLink} key={item.title}>
      <Group wrap="nowrap" align="flex-start" >
        <ThemeIcon size={34} variant="default" radius="md">
          {<item.icon style={{ width: rem(22), height: rem(22) }} color={theme.colors.blue[6]} />}
        </ThemeIcon>
        <div>
          <Text size="sm" fw={500}>
            {item.title}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  ));

  return (
    <div className='imp' style={{marginTop:'2px'}}>
 <Box pt={10} pb={10}>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
        { <Link style={{display:'flex', textDecoration:'none', color:'white',justifyContent:'center',alignItems:'center'}} to='/'>
    <img src={LogoS} className= "reddit-icon"style={{ borderRadius:'50%',width: '50px', height: '40px'}}></img>
    <div style={{ fontFamily:'sans-serif', fontWeight:'bold',fontSize:'20px'}}>ThreadShare</div>
  </Link>}

          

          <Group >
          <Link onClick={handletestLogin}><Button color='blue'>Test User Login</Button></Link>
          <Link to='/signin' style={{textDecoration:'none'}}><Button color='red'>Log in</Button></Link>
          <Link to='/signup'><Button color='blue'>Sign up</Button></Link>
          </Group>


        
        </Group>
      </header>
    </Box>
    <Divider
    thickness={2}
    color="red"
 
/>

    </div>
   
  );
}