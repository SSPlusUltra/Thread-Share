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
import { Link } from 'react-router-dom';
import { storage } from '../firebase';
import { useEffect, useState } from 'react';
import { getDownloadURL, listAll, ref } from 'firebase/storage';






// Now mockdata is an array of objects with title and icon properties

export function HeaderMegaMenu(props) {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const theme = useMantineTheme();
  const [reqsub, setreqsub] = useState(props.formD)
  const [Threadlogo, setThreadlogo] = useState()


  useEffect(()=>{
    fetchsubs();
  },[])


// Assuming this code is inside an asynchronous function or an async block



// Now mockdata contains an array of resolved promises

  
  


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