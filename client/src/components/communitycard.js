import { Card, Image, Text, Group, Badge, Center, Button, Divider, Flex } from '@mantine/core';
import { IconGasStation, IconGauge, IconManualGearbox, IconUsers } from '@tabler/icons-react';
import classes from './communitycard.module.css';
import { ScrollArea } from '@mantine/core';
import { auth } from '../firebase';

const mockdata = [
  { label: '4 passengers', icon: IconUsers },
  { label: '100 km/h in 4 seconds', icon: IconGauge },
  { label: 'Automatic gearbox', icon: IconManualGearbox },
  { label: 'Electric', icon: IconGasStation },
];

const stats = [
  { title: 'Members', value: '27.4 km' },
  { title: 'Rank', value: '9.6 km/h' },
  { title: 'Online', value: '88/100' },
];


export function Communitycard(props){
  const features = mockdata.map((feature) => (
    <Center key={feature.label}>
      <feature.icon size="1.05rem" className={classes.icon} stroke={1.5} />
      <Text size="xs">{feature.label}</Text>
    </Center>

    
  ));

  const handlejoinn = ()=>{
    props.onhandlejoin();
  }

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
    <Card withBorder radius="md" className={classes.card} style={{width:'auto', height:'auto', display:'flex'}}>
      <Card.Section style={{alignSelf:'center'}} className={classes.imageSection}>
        <Image src="https://i.imgur.com/ZL52Q2D.png" alt="Tesla Model S"  style={{width:'80px', height:'80px', borderRadius:'50%'}} />
      </Card.Section>

      <Card.Section >
        <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
          <Text fw={500}>{props.subThread.title}</Text>
          <ScrollArea h={90}>
          <Text fz="md" c="dimmed" style={{wordBreak:'break-word'}}>
          <div dangerouslySetInnerHTML={{ __html: `${props.subThread.description}` }}/>
          </Text>
          </ScrollArea>
          <Badge style={{margin:'0px 8px 0px 8px'}} variant="outline">created on:{props.subThread.date}</Badge>
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
          <Button onClick={handlejoinn} radius="xl" style={{width:'200px'}}>
          {props.subThread.members && props.subThread.members[auth.currentUser.uid] ? 'Joined' : 'Join'}
          </Button>
        </Group>
      </Card.Section>

    </Card>
  );
}

export default Communitycard;