import { createUserWithEmailAndPassword,onAuthStateChanged,signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import SignIn from "./sign-in";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import '@mantine/core/styles.css';
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
  Avatar,
} from '@mantine/core';
import axios from "axios";
import { trusted } from "mongoose";
import LogoS from '../logo.png'
const SignUp = (props)=>{

    const navigate = useNavigate();

    const[data, setData] = useState();

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
  console.log(data)

  async function statushandle(udata){
         
    try {
      const response = await axios.put(`/users/${auth.currentUser.uid}`, udata, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      // Axios automatically parses the JSON response, so you can access it directly
      const dataR = response.data;
  
      // Do something with dataR if needed
    } catch (error) {
      // Handle Axios or other errors
      console.error('Axios or other error:', error);
    }

  }

    async function userhandler(udata) {
      try {
        const response = await axios.post('/users', udata, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
    
        // Axios automatically parses the JSON response, so you can access it directly
        const dataR = response.data;
    
        // Do something with dataR if needed
      } catch (error) {
        // Handle Axios or other errors
        console.error('Axios or other error:', error);
      }
    }
    

    const [type, toggle] = useToggle([ 'login','register']);
    const form = useForm({
      initialValues: {
        userName:'',
        email: '',
        name: '',
        password: '',
        terms: true,
      },
  
      validate: {
        email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
        password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
      },
    });



    const handleAuth = async (event) => {
      event.preventDefault();
  
      try {
        if (type === 'register') {
          if(!form.values.userName){
            alert('enter username')
            return;
          }

          if(form.values.password.length < 7){
            alert('password should be atleast 7 characters')
            return;
          }
          const useCredential = await createUserWithEmailAndPassword(auth, form.values.email, form.values.password);
          const user = useCredential.user;
          await updateProfile(user, {
            displayName: form.values.userName,
          });
          const data={
            name: user.displayName ,
            id:user.uid,
            onlineStatus:true,
            createdFrom:user.metadata.creationTime,
            signedinFrom:user.metadata.lastSignInTime,
            following:{ 'initial': true },
            followers:{ 'initial': true },
          }

          user.displayName && userhandler(data);
          console.log(useCredential);
          if(useCredential){
            navigate('/homepage');
          }
          else{
            <h4>Loading...</h4>
          }
        } else if (type === 'login') {
          const useCredential = await signInWithEmailAndPassword(auth, form.values.email, form.values.password);
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
      } catch (error) {
       alert(error)
      }
    };




    return( 
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Paper radius="md" p="xl"  withBorder {...props}>
        <div style={{display:'flex', flexDirection:'column', alignItems:'center', gap:'0.5em'}}>
        <Text style={{textAlign:'center'}} size="lg" fw={500}>
        Welcome to ThreadShare
      </Text>
      <Avatar src={LogoS}/>
        </div>
      


      <Divider label="continue with email" labelPosition="center" my="xs" />

      <form onSubmit={handleAuth}>
        <Stack>
          {type === 'register' && (
            <TextInput
            required
              label="Name"
              placeholder="Your name"
              value={form.values.userName}
              onChange={(event) => form.setFieldValue('userName', event.currentTarget.value)}
              radius="md"
            />
          )}

          <TextInput
            required
            label="Email"
            placeholder="hello@ThreadShare.com"
            value={form.values.email}
            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
            error={form.errors.email && 'Invalid email'}
            radius="md"
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
            error={form.errors.password && 'Password should include at least 6 characters'}
            radius="md"
          />

          {type === 'register' && (
            <Checkbox
            color="red"
              label="I accept terms and conditions"
              checked={form.values.terms}
              onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
            />
          )}
        </Stack>

        <Group justify="space-between" mt="xl">
          <Anchor component="button" type="button" c="dimmed" onClick={() => toggle()} size="xs">
            {type === 'register'
              ? 'Already have an account? Login'
              : "Don't have an account? Register"}
          </Anchor>
          <Button color="red" type="submit" radius="xl">
            {upperFirst(type)}
          </Button>
        </Group>
      </form>
    </Paper>
    </div>
  );
}

export default SignUp;