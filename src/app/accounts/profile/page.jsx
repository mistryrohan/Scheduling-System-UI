"use client"
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import MainTemplate from '@/components/main/MainTemplate';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import React, { useEffect, useState } from 'react';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import StandardCard from '@/components/main/StandardCard';
import { Button } from '@mui/joy';
import { fetchData, getOptions } from '@/components/util';

export default function Profile() {

  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const accessToken = typeof window === 'object' ? localStorage.getItem('access_token') : null;

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (accessToken) {
        try {
          const response = await fetch('http://127.0.0.1:8000/accounts/profile/', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              ...(accessToken ? { 'Authorization': `Bearer ${accessToken}` } : {}),
            },
          });
          if (!response.ok) {
            throw new Error('Failed to fetch user profile');
          }
          const data = await response.json();
          setUsername(data.user.username);
          setEmail(data.user.email);
          setFirstName(data.user.first_name);
          setLastName(data.user.last_name);
        } catch (error) {
          console.error(error.message);
        }
      }
    };

    fetchUserProfile();
  }, [accessToken]);

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    if (password && password !== confirmPassword) {
      setError('Passwords do not match.');
      setSuccessMessage('');
      return;
    }


    var payload = {}
    if(username != ''){
      payload['username'] = username
    }

    if(firstName != ''){
      payload['first_name'] = firstName
    }
    if(lastName != ''){
      payload['last_name'] = lastName
    }

    if(email != ''){
      payload['email'] = email
    }

    if(password != ''){
      payload['password1'] = password
    }

    if(confirmPassword != ''){
      payload['password2'] = confirmPassword
    }

    try {
      const response = await fetch('http://www.localhost:8000/accounts/profile/', getOptions('PUT', payload));

      if (!response.ok) throw new Error('Failed to update profile');

      setError(''); 
      setSuccessMessage('Updated Successfully');
    } catch (err) {
      setError(err.message);
      setSuccessMessage('');
    }
  };

  return (
    <MainTemplate title="My Profile"
      breadcrumb={[
        { name: "Update Account" }
      ]}>

      <StandardCard
        title="Personal info"
        subtitle="Customize how your profile information will appear."
      >

    <form onSubmit={handleSubmit}>
      <Stack spacing={1} sx={{ mb: 2 }}>
        <FormLabel>Username</FormLabel>
        <FormControl
          sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
        >
          <Input
            size="sm"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormControl>
      </Stack>

      <Stack spacing={1} sx={{ mb: 2 }}>
        <FormLabel>Name</FormLabel>
        <FormControl
          sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
        >
          <Input
            size="sm"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <Input
            size="sm"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            sx={{ flexGrow: 1 }}
          />
        </FormControl>
      </Stack>

      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <FormControl sx={{ flexGrow: 1 }}>
          <FormLabel>Email</FormLabel>
          <Input
            size="sm"
            type="email"
            startDecorator={<EmailRoundedIcon />}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ flexGrow: 1 }}
          />
        </FormControl>
      </Stack>

      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <FormControl sx={{ flexGrow: 1 }}>
          <FormLabel>New Password</FormLabel>
          <Input
            size="sm"
            type="password"
            startDecorator={<VpnKeyIcon />}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ flexGrow: 1 }}
          />
        </FormControl>
        <FormControl sx={{ flexGrow: 1 }}>
          <FormLabel>Confirm Password</FormLabel>
          <Input
            size="sm"
            type="password"
            startDecorator={<VpnKeyIcon />}
            placeholder="Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            sx={{ flexGrow: 1 }}
          />
        </FormControl>
      </Stack>

      <Stack direction="row" spacing={2} sx={{ mt: 2, justifyContent: 'flex-end' }}>
        {/* Cancel and Save Buttons */}
        <Button size="sm" variant="outlined" color="neutral" type="button" onClick={() => {/* Handle Cancel */}}>
          Cancel
        </Button>
        <Button size="sm" variant="solid" type="submit">
          Save
        </Button>
      </Stack>

      {successMessage && <div style={{ color: 'green', marginTop: '10px' }}>{successMessage}</div>}
      {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
    </form>

      </StandardCard>
    </MainTemplate>
  );
}