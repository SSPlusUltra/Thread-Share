import { Card, Avatar, Text, Group, Button } from '@mantine/core';
import classes from './profile.module.css';
import Selectdiff from './segmentedcontrol';

const stats = [
  { value: '34K', label: 'Followers' },
  { value: '187', label: 'Follows' },
  { value: '1.6K', label: 'Posts' },
];

export default function Profile() {
  const items = stats.map((stat) => (
    <div key={stat.label}>
      <Text ta="center" fz="lg" fw={500}>
        {stat.value}
      </Text>
      <Text ta="center" fz="sm" c="dimmed" lh={1}>
        {stat.label}
      </Text>
    </div>
  ));

  return (
    <div>
      <div style={{display:'flex', justifyContent:'center', gap:'1em', width:'100%',paddingLeft:'10px'}}>

      

<div className={classes.commentcontainer} style={{width:'50%'}}>
<div style={{paddingBottom:'10px', width:'100%'}}  >     
  <Selectdiff/>
  </div>
</div>

<Card withBorder padding="xl" radius="md" className={classes.card} style={{width:'265px', height:'520px', marginTop:'70px', marginRight:'10px'}}>
<Card.Section
  h={140}
  style={{
    backgroundImage:
      'url(https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80)',
  }}
/>
<Avatar
  src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png"
  size={80}
  radius={80}
  mx="auto"
  mt={-30}
  className={classes.avatar}
/>
<Text ta="center" fz="lg" fw={500} mt="sm">
  Bill Headbanger
</Text>
<Text ta="center" fz="sm" c="dimmed">
  Fullstack engineer
</Text>
<Group mt="md" justify="center" gap={30}>
  {items}
</Group>
<Button fullWidth radius="md" mt="xl" size="md" variant="default">
  Follow
</Button>
</Card>
</div>
    </div>
    
    
  );
}