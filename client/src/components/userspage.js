import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Badge,
  Table,
  Group,
  Text,
  ScrollArea,
  TextInput,
  rem,
} from '@mantine/core';
import { TextInputProps, ActionIcon, useMantineTheme } from '@mantine/core';
import { IconSearch, IconArrowRight } from '@tabler/icons-react';
import axios from 'axios';
import moment from 'moment';
import { auth } from '../firebase';
import { Link } from 'react-router-dom';

const data = [
    {
      avatar:
        'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png',
      name: 'Robert Wolfkisser',
      job: 'Engineer',
      email: 'rob_wolf@gmail.com',
      role: 'Collaborator',
      lastActive: '2 days ago',
      active: true,
    },
    {
      avatar:
        'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-6.png',
      name: 'Jill Jailbreaker',
      job: 'Engineer',
      email: 'jj@breaker.com',
      role: 'Collaborator',
      lastActive: '6 days ago',
      active: true,
    },
    {
      avatar:
        'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-10.png',
      name: 'Henry Silkeater',
      job: 'Designer',
      email: 'henry@silkeater.io',
      role: 'Contractor',
      lastActive: '2 days ago',
      active: false,
    },
    {
      avatar:
        'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png',
      name: 'Bill Horsefighter',
      job: 'Designer',
      email: 'bhorsefighter@gmail.com',
      role: 'Contractor',
      lastActive: '5 days ago',
      active: true,
    },
    {
      avatar:
        'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-3.png',
      name: 'Jeremy Footviewer',
      job: 'Manager',
      email: 'jeremy@foot.dev',
      role: 'Manager',
      lastActive: '3 days ago',
      active: false,
    },
    // Add more users as needed
  ];
  

  export function Users(props) {
    const [search, setSearch] = useState('');
    const theme = useMantineTheme();


const ddata = props.udata && props.udata

    const filteredData =props.udata && ddata.filter(
      (item) =>{
          console.log(item.name)
       return  item.name.toLowerCase().includes(search.toLowerCase())
      // Add more fields if you want to search in other properties
      }
    );
  
    const rows = filteredData &&filteredData.map((item) => {
      const reqimgs = props.imgdata &&  props.imgdata.filter((obj)=> obj.user===item.id)
      const reqimg = reqimgs && reqimgs.slice(-1)[0]
      return(
      <Table.Tr key={item.name}>
        <Table.Td>
        <Link style={{textDecoration:'none', color:'white'}} to={{
          pathname: '/userprofile',
          search: `?id=${encodeURIComponent(item.id)}`,
        }}><Group gap="sm">
            <Avatar size={40} src={reqimg && reqimg.image} radius={40} />
            <div>
              <Text fz="sm" fw={500}>
                {item.name}
              </Text>
            </div>
          </Group>
          </Link>
        </Table.Td>
  
        <Table.Td>{moment(item.createdFrom).fromNow()}</Table.Td>
        <Table.Td>{ item.id === auth.currentUser.uid? 'now' : moment(item.signedinFrom).fromNow()}</Table.Td>
        <Table.Td>
          {item.onlineStatus ? (
            <Badge fullWidth variant="light">
              Active
            </Badge>
          ) : (
            <Badge color="gray" fullWidth variant="light">
              Disabled
            </Badge>
          )}
        </Table.Td>
      </Table.Tr>
      )
          });
  
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',gap:'1em', padding:'10px'}}>
        <TextInput
      radius="xl"
      size="md"
      placeholder="wanna find someone?"
      onChange={(event) => setSearch(event.currentTarget.value)}
      value={search}
      rightSectionWidth={42}
      leftSection={<IconSearch style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
 
    />
        <ScrollArea style={{ width: '100%', maxWidth: '900px' }}>
        <Table style={{ minWidth: '485px' }}>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Employee</Table.Th>
                <Table.Th>Member since</Table.Th>
                <Table.Th>Last active</Table.Th>
                <Table.Th>Status</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </ScrollArea>
      </div>
    );
  }