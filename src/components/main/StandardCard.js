import * as React from 'react';
import Box from '@mui/joy/Box';
import Divider from '@mui/joy/Divider';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';

export default function StandardCard(props) {

    const { title, subtitle, children } = props;

    return (

        <Card>
            <Box sx={{ mb: 1 }}>
                <Typography level="title-md">{title}</Typography>
                <Typography level="body-sm">
                    {subtitle}
                </Typography>
            </Box>
            <Divider />
            <Stack
                direction="row"
                spacing={3}
                sx={{ my: 1 }}
            >
                <Stack spacing={2} sx={{ flexGrow: 1 }}>

                    {children}

                </Stack>
            </Stack>
        </Card>

    );
}