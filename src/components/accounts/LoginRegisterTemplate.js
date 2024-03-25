import * as React from 'react';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';

export default function LoginRegisterTemplate({ title, ...props }) {

    const { subtitle, children } = props

    return (
        <>
            <Stack gap={1}>
                <Typography component="h1" level="h3">
                    {title}
                </Typography>
                <Typography level="body-sm">
                    {subtitle}
                </Typography>
            </Stack>
            {children ?
                <Stack gap={4}>
                    {children}
                </Stack> : <></>
            }
        </>
    );
}