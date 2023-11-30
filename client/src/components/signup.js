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
} from '@mantine/core';
import axios from "axios";
import { trusted } from "mongoose";

const SignUp = (props)=>{

    const navigate = useNavigate();

    const[data, setData] = useState();

useEffect(() => {
  const fetchData = async () => {
    try {
      const responseSubs = await axios.get('http://localhost:4000/users');
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

    fetchData();
  }
  }, []);

  async function statushandle(udata){
         
    try {
      const response = await axios.post(`http://localhost:4000/users/${auth.currentUser.uid}`, udata, {
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
        const response = await axios.post('http://localhost:4000/users', udata, {
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
    

    const [type, toggle] = useToggle(['register', 'login']);
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

          navigate('/homepage');
        } else if (type === 'login') {
          const useCredential = await signInWithEmailAndPassword(auth, form.values.email, form.values.password);
        
          console.log(useCredential);
          navigate('/homepage');
          const mdata = data.find((item)=>item.id===auth.currentUser.uid)
          mdata.onlineStatus = true;
          statushandle(mdata);
        }
      } catch (error) {
        console.error('Authentication error:', error);
      }
    };




    return( 
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Paper radius="md" p="xl"  withBorder {...props}>
      <Text size="lg" fw={500}>
        Welcome to Mantine, {type} with
      </Text>


      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <form onSubmit={handleAuth}>
        <Stack>
          {type === 'register' && (
            <TextInput
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
            placeholder="hello@mantine.dev"
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
          <Button type="submit" radius="xl">
            {upperFirst(type)}
          </Button>
        </Group>
      </form>
    </Paper>
    </div>
  );
}

export default SignUp;