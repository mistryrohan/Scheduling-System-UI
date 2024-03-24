import * as React from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Link from '@mui/joy/Link';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import LoginRegisterTemplate from '@/components/accounts/LoginRegisterTemplate';

export default function Register() {
  return (
    <LoginRegisterTemplate
      title="Register"
      subtitle={
        <>
          Already have an account?{' '}
          <Link href="/accounts/login" level="title-sm">
            Log in
          </Link>
        </>}
    >
      <form>
        <FormControl required>
          <FormLabel>Username</FormLabel>
          <Input type="email" name="email" />
        </FormControl>
        <FormControl required>
          <FormLabel>Email</FormLabel>
          <Input type="email" name="email" />
        </FormControl>
        <FormControl required>
          <FormLabel>Password</FormLabel>
          <Input type="password1" name="password" />
        </FormControl>
        <FormControl required>
          <FormLabel>Confirm Password</FormLabel>
          <Input type="password2" name="password" />
        </FormControl>
        <Stack gap={4} sx={{ mt: 4 }}>

          <Button type="submit" fullWidth>
            Register
          </Button>
        </Stack>
      </form>
    </LoginRegisterTemplate>

  );
}