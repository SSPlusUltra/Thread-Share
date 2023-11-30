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
import LogoS from '../logo3.jpg'
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
 <Box pb={5}>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
        <Link to='/homepage'>
    <img src={LogoS} className= "reddit-icon"style={{ borderRadius:'50%',width: '50px', height: '50px'}}/>
  </Link>
  <div className='logo-text'>
  <h2 style={{paddingBottom:'15px'}}>ThreadShare</h2>
</div>

          <Group h="100%" gap={0} visibleFrom="sm">
          <Link to='/homepage' style={{textDecoration:'none', color:'white'}}>
              Home
            </Link>
            <HoverCard width={600} position="bottom" radius="md" shadow="md" withinPortal>
              <HoverCard.Target>
                <a href="#" className={classes.link}>
                  <Center inline>
                    <Box component="span" mr={5}>
                    SubThreads
                    </Box>
                    <IconChevronDown
                      style={{ width: rem(16), height: rem(16) }}
                      color={theme.colors.blue[6]}
                    />
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
                        Get started
                      </Text>
                      <Text size="xs" c="dimmed">
                        Their food sources have decreased, and their numbers
                      </Text>
                    </div>
                    <Button variant="default">Get started</Button>
                  </Group>
                </div>
              </HoverCard.Dropdown>
            </HoverCard>
            <a href="#" className={classes.link}>
              Learn
            </a>
            <a href="#" className={classes.link}>
              Academy
            </a>
          </Group>

          <Group visibleFrom="sm">
          <Link to='/signin' style={{textDecoration:'none'}}><Button variant="default">Log in</Button></Link>
          <Link to='/'><Button variant="default">Sign up</Button></Link>
          </Group>

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
          <a href="#" className={classes.link}>
            Academy
          </a>

          <Divider my="sm" />

          <Group justify="center" grow pb="xl" px="md">
            <Button variant="default">Log in</Button>
            <Button>Sign up</Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>

    </div>
   
  );
}