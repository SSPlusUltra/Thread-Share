import { Card, Image, Text, Group, Badge, Center, Button, Divider, Flex, Tooltip } from '@mantine/core';
import { IconCake, IconGasStation, IconGauge, IconManualGearbox, IconUsers } from '@tabler/icons-react';
import classes from './communitycard.module.css';
import { ScrollArea } from '@mantine/core';
import { auth } from '../firebase';
import moment from 'moment';
import { useLocation } from 'react-router-dom';
import { useMediaQuery } from '@mantine/hooks';



export function Communitycard(props){

const reqpdata = props.subThread && props.pdata && props.pdata.filter((item)=>item.subreddit===props.subThread.title)

const location = useLocation();




  const handlejoinn = ()=>{
    props.onhandlejoin();
  }
  const reqmembers = props.subThread && Object.entries(props.subThread.members)
  .filter(([key, value]) => value === true)
  .map(([key, value]) => key);



  const onlineMembers = props.udata && props.udata
  .filter((item) => reqmembers && reqmembers.includes(item.id) && item.onlineStatus)
  .map((item) => ({
    id: item.id,
    onlineStatus: item.onlineStatus,
  }));

  console.log(onlineMembers)


const isWideScreen = useMediaQuery('(min-width: 767px)');


  
  

  
  const stats = [
    { title: 'Members', value: props.subThread && Object.values(props.subThread.members).filter((value)=>value === true).length-1 },
    { title: 'Posts', value: reqpdata && reqpdata.length || '0' },
    { title: 'Online', value: onlineMembers && onlineMembers.length || '0' },
  ];




  const items = stats.map((stat) => (
    <div key={stat.title}>
      <Text size="xs" color="dimmed">
        {stat.title}
      </Text>
      <Text fw={500} size="sm">
        {stat.value}
      </Text>
    </div>
  ));

  return (
    <Card withBorder radius="md" className={classes.card} style={{width:'250px', height:'auto', display:'flex'}}>
      <Card.Section style={{alignSelf:'center'}} className={classes.imageSection}>
        <Image src={props.reqimg ? props.reqimg.image :''} alt="Image Loading..."  style={{width:'80px', height:'80px', borderRadius:'50%'}} />
      </Card.Section>

      <Card.Section >
        <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
          <Text fw={500}>{props.subThread.title}</Text>
          <ScrollArea style={{ padding:'20px',paddingLeft:'30px', marginBottom:'10px'}}  h={150}>
          <Text fz="md" c="dimmed" style={{wordBreak:'break-word'}}>
          <div dangerouslySetInnerHTML={{ __html: `${props.subThread.description}` }}/>
          </Text>
          </ScrollArea>
          <Badge color='blue'  leftSection={
            <IconCake/>
          } style={{margin:'0px 8px 0px 8px', height:'30px'}} variant="outline">{moment(props.subThread.date).format('DD MMMM YYYY')}</Badge>
        </div>
        </Card.Section>
      <br></br>
      <Divider/>
      <Card.Section style={{display:'flex', flexDirection:'column', alignItems:'center'}} className={classes.section} >
        <Text fz="sm" c="dimmed" className={classes.label}>
          SUBTHREAD INFO
        </Text>

        <Card.Section style={{display:'flex', gap:'1.8em',margin:'0px 12px 0px 12px'}} className={classes.footer}>{items}</Card.Section>

      </Card.Section>



    
    

      <Card.Section className={classes.section}>
        <Group style={{display:'flex', flexDirection:'column', alignItems:'center'}} gap={30}>

       <Button disabled={!isWideScreen} color='red' onClick={handlejoinn} radius="xl" style={{width:'200px'}}>
      {props.subThread.members && props.subThread.members[auth.currentUser.uid] ? 'Joined' : 'Join'}
      </Button>
        </Group>
      </Card.Section>

    </Card>
  );
}

export default Communitycard;