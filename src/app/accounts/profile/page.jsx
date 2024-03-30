"use client"
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import MainTemplate from '@/components/main/MainTemplate';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import React, { useState } from 'react';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import StandardCard from '@/components/main/StandardCard';
import { Button } from '@mui/joy';
import { fetchData } from '@/components/util';

export default function Profile() {

  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    if (password && password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // Constructing payload, excluding password fields if they're not filled
    const payload = {
      username,
      first_name: firstName, 
      last_name: lastName,
      email,
      password1: password, 
      password2: confirmPassword,
    };

    try {
      const response = await fetch('/accounts/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // Authorization header here if required
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Failed to update profile');

      setError(''); 
    } catch (err) {
      setError(err.message);
    }
  };

  let { data: userData, isFetching: isFetchingInvitations } = fetchData(`accounts/profile`);
  console.log(userData);
  console.log(userData.username);

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

      {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
    </form>

      </StandardCard>
    </MainTemplate>
  );
}