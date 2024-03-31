import * as React from 'react';
import Drawer from '@mui/joy/Drawer';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import ModalClose from '@mui/joy/ModalClose';
import Divider from '@mui/joy/Divider';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import { Box } from '@mui/joy';


export default function CalendarDrawer(props) {

    const { eventInfo, setEventInfo } = props;

    const start = eventInfo?._instance?.range?.start;
    const end = eventInfo?._instance?.range?.end;

    const formatDateTime = (dateTime) => {
        return dateTime?.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
            timeZoneName: 'short'
        });
    };

    return (
        <React.Fragment>

            <Drawer
                anchor={"bottom"}
                size="sm"
                variant="plain"
                open={eventInfo != null}
                onClose={() => setEventInfo(null)}
                slotProps={{
                    content: {
                        sx: {
                            bgcolor: 'transparent',
                            p: { md: 3, sm: 0 },
                            boxShadow: 'none',
                        },
                    },
                }}
            >
                <Sheet
                    sx={{
                        borderRadius: 'md',
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        height: '100%',
                        overflow: 'auto',
                    }}
                >
                    <DialogTitle>
                        <Typography level="title-lg" fontWeight="bold" >
                            {eventInfo?.title}
                        </Typography>
                    </DialogTitle>
                    <ModalClose />
                    <Divider />
                    <DialogContent sx={{ gap: 2 }}>

                        <Box>
                            <Typography level="title-md" fontWeight="bold" >
                                Description
                            </Typography>
                            {eventInfo?.extendedProps?.description}
                        </Box>

                        <Box> <Typography level="title-md" fontWeight="bold" >
                            Start
                        </Typography> {formatDateTime(start)} </Box>
                        <Box> <Typography level="title-md" fontWeight="bold" >
                            End
                        </Typography> {formatDateTime(end)} </Box>


                    </DialogContent>
                </Sheet>
            </Drawer>
        </React.Fragment>
    );
}