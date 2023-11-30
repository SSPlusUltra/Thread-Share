import React, { useState, useRef, useEffect } from 'react';
import classes from './navbar.module.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import SignOut from './sign-out';
import Pfp from './pfp';
import Threadlogo from '../logo3.jpg'
import { auth, storage } from '../firebase';
import { getDownloadURL, listAll, ref } from 'firebase/storage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { Button, Menu, Text, rem, useMantineTheme, Avatar } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks'; 

import {
  IconSquareCheck,
  IconPackage,
  IconUsers,
  IconCalendar,
  IconLogout,
  IconUser,
  IconBuildingCommunity,
  IconUsersGroup,
  IconBookmarkFilled,
  IconBookmarksFilled,
 
} from '@tabler/icons-react';

import {
  HoverCard,
  Group,
  UnstyledButton,

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
import LogoS from '../logo.png'
import axios from 'axios';

import { signOut } from 'firebase/auth';
export default function Navbar(props){
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const dropdownRef2 = useRef(null);

const navigate = useNavigate();


  const [prof, setprof] = useState(false)
 
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const theme = useMantineTheme();
  const [reqsub, setreqsub] = useState(props.formD)
  const [Threadlogo, setThreadlogo] = useState()
  const [data, setData] = useState();
  const [isHovered, setIsHovered] = useState(false);
  const [opened, setOpened] = useState(false);


  useEffect(()=>{
    fetchsubs();
  },[])
  useEffect(()=>{
    fetchimgs();
  },[])

  const isWideScreen = useMediaQuery('(min-width: 768px)');
  
  const fetchimgs = async () => {
    try {
      const responseSubs = await axios.get('http://localhost:4000/upload');
      const dataR = responseSubs.data;
      const extractedData = Object.keys(dataR).map((key) => ({
        image: dataR[key].image,
        user: dataR[key].user,
      }));
      setData(extractedData);
      console.log(extractedData); // Log the extractedData
    } catch (error) {
      console.error('Error fetching subreddits:', error);
      // Handle error appropriately
    }
  };
  

// Assuming this code is inside an asynchronous function or an async block



// Now mockdata contains an array of resolved promises

  
  const idata = data && data.map((item)=>{
    const matchingReqSub = reqsub.find((req) => req.id === item.user);
    const subreddit = matchingReqSub ? matchingReqSub.title : null;
  
    return {
      icon: item.image,
      subreddit: subreddit,
    };
  }).filter((item) => item.subreddit); 


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

const links = data && idata.slice(0,6).map((item) => (
  <Link  to={{
    pathname: '/subredditpage',
    search: `?title=${encodeURIComponent(item.subreddit)}`,
  }}  key={item.id} href="#" className="dropdown-link">{item.title}
   <UnstyledButton className={classes.subLink} key={item.title}>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <img src={item.icon} style={{ borderRadius: '50%', width: '65px', height: '60px', marginTop: '15px' }} />
      <Text size="sm" fw={500} style={{ marginLeft: '10px' }}>
        {item.subreddit}
      </Text>
    </div>
  </UnstyledButton>
  </Link>

));

const handlesignout = ()=>{
  signOut(auth).then(() => {
      console.log('sign-out successful')
       window.location.href = '/';


      

    }).catch((error) => {
      // An error happened.
    });
  
} 

  useEffect(() => {
    // Event listener to close the dropdown when clicked outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) ) {
        setShowDropdown(false);
     
      }
      if(dropdownRef2.current && !dropdownRef2.current.contains(event.target)){
        setprof(false)
      }
  
    };

    // Attach the event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  


 
  

  

  return (
    <nav  >
       <div  >
 <Box >
      <header className={classes.header}>
        <Group  justify="space-between" h="100%">
        {isWideScreen && <Link style={{display:'flex', textDecoration:'none', color:'white',justifyContent:'center',alignItems:'center'}} to='/homepage'>
    <img src={LogoS} className= "reddit-icon"style={{ borderRadius:'50%',width: '50px', height: '40px'}}></img>
    <div style={{ fontFamily:'sans-serif', fontWeight:'bold',fontSize:'20px'}}>ThreadShare</div>
  </Link>}
          <Group h="100%" gap={0} visibleFrom="sm">
            <HoverCard width={600} position="bottom" radius="md" shadow="md" withinPortal>
              <HoverCard.Target>
                <a href="#" className={classes.link}>
                  <Center inline>
                    <Box component="span" mr={5}>
                    <Button bg="red" rightSection={
            <IconChevronDown style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          }
          pr={12}>SubThreads</Button>
                    </Box>
                  </Center>
                </a>
              </HoverCard.Target>

              <HoverCard.Dropdown style={{ overflow: 'hidden' }}>
                <Group justify="space-between" px="md">
                  <Text fw={500}>SubThreads</Text>
                  <Anchor href="#" fz="xs">
                    View all
                  </Anchor>
                </Group>

                <Divider my="sm" />

                <SimpleGrid cols={2} spacing={0}>
                  {links}
                </SimpleGrid>

                <div className={classes.dropdownFooter}>
                <Group justify="space-between">
                    <div>
                      <Text fw={500} fz="sm">
                        New SubThread
                      </Text>
                      <Text size="xs" c="dimmed">
                        start a community here
                      </Text>
                    </div>
                    <Button onClick={()=>{
                      navigate('/form')
                    }}variant="default"> Create</Button>
                  </Group>
                </div>
              </HoverCard.Dropdown>
            </HoverCard>
          </Group>
          <div >
          <Menu style={{alignItems:'center', display:'flex', borderRadius:'5px', width:'250px', height:'60px'}}
      transitionProps={{ transition: 'pop-top-right' }}
      position="top-end"
      withinPortal
      opened={opened} onChange={setOpened}
    >
      <Menu.Target >
      <UnstyledButton >
      <Group style={{display:'flex', width:'100%', padding:'5px',display:'flex', gap:'0.9em', alignItems:'center',borderRadius:'5px', justifyContent:'center',borderBottomRightRadius:'0px', borderBottomLeftRadius:'0px' }} className={`${classes.user} ${isHovered ? classes.hoverEffect : ''} ${opened? classes.opened:''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)} 
        >
        <Avatar
        size={30}
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
          radius="xl"
        />

        <div style={{ flex: 1 }}>
          <Text size="sm" fw={500}>
            {auth.currentUser.displayName}
          </Text>
           
          <Text style={{maxWidth:'200px', overflow:'hidden'}} c="dimmed" size="xs">
          {auth.currentUser.email}
          </Text>
        </div>

        <IconChevronDown style={{ width: rem(14), height: rem(14) }} stroke={1.5} />
      </Group>
    </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown style={{display:'flex', alignItems:'center', borderRadius:'5px', marginTop:'-16px',paddingTop:'10px', width:'250px', backgroundColor:'#1A1B1E',borderTopRightRadius:'0px',borderTopLeftRadius:'0px', borderTop: 'none'}}>
      <Link to='/profile' style={{textDecoration:'none'}}  ><Menu.Item
         style={{width:'240px'}}
          leftSection={
            <IconUser
              style={{ width: rem(16), height: rem(16) }}
              color={theme.colors.blue[6]}
              stroke={1.5}
            />
          }
        >
          Profile
        </Menu.Item>
        </Link>
        <Link  to='/joinedsubs' style={{textDecoration:'none'}} className='m'>
        <Menu.Item
          leftSection={
            <IconUsersGroup
              style={{ width: rem(16), height: rem(16) }}
              color={theme.colors.pink[6]}
              stroke={1.5}
            />
          }
        >
          My Communities
        </Menu.Item>

        
        </Link>

        <Link  to='/users' style={{textDecoration:'none'}} className='s'>
        <Menu.Item
          leftSection={
            <IconUsers
              style={{ width: rem(16), height: rem(16) }}
              color={theme.colors.blue[6]}
              stroke={1.5}
            />
          }
        >
        People
        </Menu.Item>
        </Link>



        <Link  to='/savedposts' style={{textDecoration:'none'}} className='s'>
        <Menu.Item
          leftSection={
            <IconBookmarksFilled
              style={{ width: rem(16), height: rem(16) }}
              color={theme.colors.blue[6]}
              stroke={1.5}
            />
          }
        >
        Saved Posts
        </Menu.Item>
        </Link>
        <Menu.Item onClick={handlesignout} 
        leftSection={
          <IconLogout
            style={{ width: rem(16), height: rem(16) }}
            color={theme.colors.cyan[6]}
            stroke={1.5}
          />
        }
       >
          
          Signout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>


          </div>

          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />

          <a href="#" className={classes.link}>
            Home
          </a>
          <UnstyledButton className={classes.link} onClick={toggleLinks}>
            <Center inline>
              <Box component="span" mr={5}>
                Features
              </Box>
              <IconChevronDown
                style={{ width: rem(16), height: rem(16) }}
                color={theme.colors.blue[6]}
              />
            </Center>
          </UnstyledButton>
          <Collapse in={linksOpened}>{links}</Collapse>
          <a href="#" className={classes.link}>
            Learn
          </a>
    
        
          <Divider my="sm" />
        </ScrollArea>
      </Drawer>
    </Box>
    <Divider
    thickness={2}
    color="red"
 
/>

    </div>
    </nav>
  );
};
