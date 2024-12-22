"use client"
import * as React from 'react';
import Box from '@mui/joy/Box';
import Sidebar from '@/components/main/Sidebar';
import Header from '@/components/main/Header';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import BreadCrumb from './BreadCrumb';
import Popup from './Popup';
import { useEffect  } from 'react';
import { useRouter } from 'next/navigation';



export default function MainTemplate({ title, ...props }) {

    const { breadcrumb, children, message, titleDecorator } = props
    const [open, setOpen] = React.useState(true);
    const router = useRouter();

    useEffect(() => {
        const accessToken = typeof window === 'object' ? localStorage.getItem('access_token') : null;
        if (!accessToken) {
            router.push('/');
        }
    }, [router]);

    return (
        <>
            {message ? <Popup message={message} open={open} setOpen={setOpen} /> : <></>}
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
                        overflow: 'auto'
                    }}
                >
                    <Box sx={{ px: { xs: 2, md: 6 } }}>
                        <Breadcrumbs
                            size="sm"
                            aria-label="breadcrumbs"
                            separator={<ChevronRightRoundedIcon />}
                            sx={{ pl: 0 }}
                        >
                            {<BreadCrumb links={breadcrumb ?? []} />}
                            <Typography color="primary" fontWeight={500} fontSize={12}>
                                {title}
                            </Typography>
                        </Breadcrumbs>
                        <Box
                            sx={{
                                display: 'flex',
                                mb: 1,
                                gap: 1,
                                flexDirection: { xs: 'column', sm: 'row' },
                                alignItems: { xs: 'start', sm: 'center' },
                                justifyContent: 'space-between',
                            }}
                        >
                            <Typography level="h2" component="h1">
                                {title}
                            </Typography>
                            {titleDecorator ?? <></>}
                        </Box>
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
                                height: "100%",
                                px: { xs: 2, md: 6 },
                                py: { xs: 2 },
                                gap: 2
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