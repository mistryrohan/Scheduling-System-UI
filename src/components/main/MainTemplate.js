import * as React from 'react';
import Box from '@mui/joy/Box';
import Sidebar from '@/components/main/Sidebar';
import Header from '@/components/main/Header';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';

export default function MainTemplate({ title, ...props }) {

    const { breadcrumb, children } = props

    return (
        <>
            <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
                <Sidebar />
                <Header />
                <Box
                    component="main"
                    className="MainContent"
                    sx={{
                        pt: { xs: 'calc(12px + var(--Header-height))', md: 3 },
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        minWidth: 0,
                        height: '100dvh',
                        overflow: 'auto',
                    }}
                >
                    <Box sx={{ px: { xs: 2, md: 6 } }}>
                        <Breadcrumbs
                            size="sm"
                            aria-label="breadcrumbs"
                            separator={<ChevronRightRoundedIcon />}
                            sx={{ pl: 0 }}
                        >
                            {breadcrumb}
                            <Typography color="primary" fontWeight={500} fontSize={12}>
                                {title}
                            </Typography>
                        </Breadcrumbs>
                        <Typography level="h2" component="h1" sx={{ mt: 1 }}>
                            {title}
                        </Typography>
                    </Box>


                    <Box sx={{ flex: 1, width: '100%' }}>
                        <Box
                            sx={{
                                position: 'sticky',
                                top: { sm: -100, md: -110 },
                                bgcolor: 'background.body',
                                zIndex: 9995,
                            }}
                        >

                        </Box>
                        <Stack
                            spacing={4}
                            sx={{
                                display: 'flex',
                                mx: 'auto',
                                px: { xs: 2, md: 6 },
                                py: { xs: 2, md: 3 },
                            }}
                        >

                            {children}

                        </Stack>
                    </Box>

                </Box>
            </Box>
        </>
    );
}