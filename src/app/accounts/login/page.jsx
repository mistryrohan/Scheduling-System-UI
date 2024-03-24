import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Checkbox from '@mui/joy/Checkbox';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Link from '@mui/joy/Link';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import LoginRegisterTemplate from '@/components/accounts/LoginRegisterTemplate';

export default function Login() {

    // logic here

    return (
        <LoginRegisterTemplate
            title="Log In"
            subtitle={
                <>
                    New to OneToOne?{' '}
                    <Link href="/accounts/register" level="title-sm">
                        Register
                    </Link>
                </>}
        >
            <form>
                <FormControl required>
                    <FormLabel>Email</FormLabel>
                    <Input type="email" name="email" />
                </FormControl>
                <FormControl required>
                    <FormLabel>Password</FormLabel>
                    <Input type="password" name="password" />
                </FormControl>
                <Stack gap={4} sx={{ mt: 2 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <Checkbox size="sm" label="Remember me" name="persistent" />
                    </Box>
                    <Button type="submit" fullWidth>
                        Sign in
                    </Button>
                </Stack>
            </form>
        </LoginRegisterTemplate>

    );
}