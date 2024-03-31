"use client"
import * as React from 'react';
import HalfTemplate from '@/components/accounts/HalfTemplate';
import { Box, Button, Checkbox, FormControl, FormLabel, Input, Link, Stack, Snackbar, FormHelperText } from '@mui/joy';
import LoginRegisterTemplate from '@/components/accounts/LoginRegisterTemplate';
import { handleLogin } from '@/components/util';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
    const router = useRouter();
    const [showLogin, setShowLogin] = React.useState(false);
    const [showRegister, setShowRegister] = React.useState(false);
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [usernameError, setUsernameError] = React.useState('');
    const [password1Error, setPassword1Error] = React.useState('');
    const [password2Error, setPassword2Error] = React.useState('');

    const switchToLoginView = () => {
        setShowRegister(false);
        setShowLogin(true);
    };

    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        const username = event.target.username.value;
        const password = event.target.password.value;

        const { success, message } = await handleLogin(username, password);
        if (success) {
            console.log('Login successful');
            router.push('/meetings');
        } else {
            console.log('Login failed: ', message);
            setErrorMessage(message);
            setSnackbarOpen(true);
        }
    };

    const handleRegisterSubmit = async (event) => {
        event.preventDefault();
        const formData = {
            username: event.target.username.value,
            first_name: event.target.firstName.value,
            last_name: event.target.lastName.value,
            email: event.target.email.value,
            password1: event.target.password1.value,
            password2: event.target.password2.value,
        };

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        };
        try {
            const response = await fetch('http://www.localhost:8000/accounts/register/', requestOptions);
            const data = await response.json();
            setUsernameError('');
            setPassword1Error('');
            setPassword2Error('');
            if (!response.ok) {
                let errorMessage = data.message && data.message.length ? data.message.join(' ') : 'Login failed';
                if (data.username) {
                    setUsernameError(data.username.join(' '));
                }
                if (data.password1) {
                    setPassword1Error(data.password1.join(' '));
                }
                if (data.password) {
                    setPassword2Error(data.password.join(' '));
                }
                throw new Error(errorMessage);
            }
            console.log('Registration successful:', data);
            setErrorMessage('Registration successful! Please login.');
            setSnackbarOpen(true);
            switchToLoginView();
            router.push('/');
        } catch (error) {
            console.error('Registration error:', error);
            setErrorMessage(error.message);
            setSnackbarOpen(true);
        }

    };

    return (
        <HalfTemplate>

            {!showLogin && !showRegister ?

                <>
                    <Button type="submit" onClick={() => { setShowLogin(true) }} fullWidth>
                        Sign in
                    </Button>

                    <Button type="submit" onClick={() => { setShowRegister(true) }} variant="outlined" fullWidth>
                        Register
                    </Button>
                </>
                : <></>}

            {showLogin ?
                <LoginRegisterTemplate
                    title="Log In"
                    subtitle={
                        <>
                            New to OneToOne?{' '}
                            <Link onClick={() => {setShowRegister(true); setShowLogin(false); }} level="title-sm">
                                Register
                            </Link>
                        </>}
                >
                    <form onSubmit={handleLoginSubmit}>
                        <FormControl required>
                            <FormLabel>Username</FormLabel>
                            <Input type="text" name="username" />
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
                : <></>}
            {showRegister ?
                <LoginRegisterTemplate
                    title="Register"
                    subtitle={
                        <>
                            Already have an account?{' '}
                            <Link onClick={() => {setShowRegister(false); setShowLogin(true); }} level="title-sm">
                                Log in
                            </Link>
                        </>}
                >
                    <form onSubmit={handleRegisterSubmit}>
                        <FormControl required error={usernameError.length > 0}>
                            <FormLabel>Username</FormLabel>
                            <Input type="text" name="username" />
                            <FormHelperText>
                                {usernameError && <div style={{ color: 'red' }}>{usernameError}</div>}
                            </FormHelperText>
                        </FormControl>
                        <FormControl required>
                            <FormLabel>First Name</FormLabel>
                            <Input type="text" name="firstName" /> {/* Added field */}
                        </FormControl>
                        <FormControl required>
                            <FormLabel>Last Name</FormLabel>
                            <Input type="text" name="lastName" /> {/* Added field */}
                        </FormControl>
                        <FormControl required>
                            <FormLabel>Email</FormLabel>
                            <Input type="email" name="email" />
                        </FormControl>
                        <FormControl required error={password1Error.length > 0}>
                            <FormLabel>Password</FormLabel>
                            <Input type="password" name="password1" />
                            <FormHelperText>
                                {password1Error && <div style={{ color: 'red' }}>{password1Error}</div>}
                            </FormHelperText>
                        </FormControl>
                        <FormControl required error={password2Error.length > 0}>
                            <FormLabel>Confirm Password</FormLabel>
                            <Input type="password" name="password2" />
                            <FormHelperText>
                                {password2Error && <div style={{ color: 'red' }}>{password2Error}</div>}
                            </FormHelperText>
                        </FormControl>
                        <Stack gap={4} sx={{ mt: 4 }}>

                            <Button type="submit" fullWidth>
                                Register
                            </Button>
                        </Stack>
                    </form>
                </LoginRegisterTemplate>
                : <></>}

            {showLogin || showRegister ?
                <Button type="submit" onClick={() => { setShowRegister(false); setShowLogin(false) }} variant="plain" fullWidth>
                    Back
                </Button> : <></>}

            <Snackbar
                autoHideDuration={3000}
                variant="solid"
                open={snackbarOpen}
                size={"md"}
                onClose={(event, reason) => { setSnackbarOpen(false) }}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                endDecorator={
                    <Button
                        onClick={() => setSnackbarOpen(false)}
                        size="sm"
                        variant="solid"
                        color="success"
                    >
                        Dismiss
                    </Button>
                }
            >
                {errorMessage}
            </Snackbar>
        </HalfTemplate>

    );
}