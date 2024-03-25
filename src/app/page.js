"use client"
import * as React from 'react';
import HalfTemplate from '@/components/accounts/HalfTemplate';
import { Box, Button, Checkbox, FormControl, FormLabel, Input, Link, Stack } from '@mui/joy';
import LoginRegisterTemplate from '@/components/accounts/LoginRegisterTemplate';

export default function LandingPage() {

    const [showLogin, setShowLogin] = React.useState(false);
    const [showRegister, setShowRegister] = React.useState(false);


    // logic here

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
                            <Input type="password" name="password1" />
                        </FormControl>
                        <FormControl required>
                            <FormLabel>Confirm Password</FormLabel>
                            <Input type="password" name="password2" />
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

        </HalfTemplate>

    );
}