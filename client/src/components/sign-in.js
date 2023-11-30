import { createUserWithEmailAndPassword,signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import SignIn from "./sign-in";
import { Link } from "react-router-dom";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import '@mantine/core/styles.css';
import './sign-in.css'
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

const SignUp = (props)=>{

    const navigate = useNavigate();
    

    const [type, toggle] = useToggle(['login', 'register']);
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
          console.log(useCredential);
          navigate('/homepage');
        } else if (type === 'login') {
          const useCredential = await signInWithEmailAndPassword(auth, form.values.email, form.values.password);
          console.log(useCredential);
          navigate('/homepage');
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
              value={form.values.name}
              onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
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