import * as React from 'react';
import Box from '@mui/joy/Box';
import Divider from '@mui/joy/Divider';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import { CardActions, CardOverflow } from '@mui/joy';

export default function StandardCard(props) {

    const { title, subtitle, children, overflow, titleDecorator } = props;

    return (

        <Card>
            {title || subtitle ? <>
                <Box sx={{ mb: children ? 1 : 0 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            mb: 0.1,
                            gap: 1,
                            flexDirection: { xs: 'column', sm: 'row' },
                            alignItems: { xs: 'start', sm: 'center' },
                            justifyContent: 'space-between',
                        }}
                    >
                        <Typography level="title-md">
                            {title}
                        </Typography>
                        {titleDecorator ?? <></>}
                    </Box>
                    <Typography level="body-sm">
                        {subtitle}
                    </Typography>
                </Box>
            </> : <></>}

            {(title || subtitle) && children ? <Divider /> : <></>}

            {children ? <Stack
                direction="row"
                spacing={3}
                sx={{ my: 1 }}
            >
                <Stack spacing={2} sx={{ flexGrow: 1 }}>

                    {children}

                </Stack>
            </Stack> : <></>}

            {overflow ? <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
                <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
                    {overflow}
                </CardActions>
            </CardOverflow> : <></>}

        </Card>

    );
}