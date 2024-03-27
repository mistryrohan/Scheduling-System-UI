import React from 'react';
import Sheet from '@mui/joy/Sheet';
import { styled } from '@mui/joy/styles';
import { Avatar, Divider, Dropdown, Menu, MenuButton, MenuItem, Stack, Typography } from '@mui/joy';

const Item = styled(Sheet)(({ theme }) => ({
    ...theme.typography['body-sm'],
    textAlign: 'center',
    fontWeight: theme.fontWeight.md,
    color: theme.vars.palette.text.secondary,
    border: '1px solid',
    borderColor: theme.palette.divider,
    padding: theme.spacing(1),
    borderRadius: theme.radius.md,
}));



export default function MeetingCard({ meeting }) {

    

    return (
        <Item
            variant="outlined"
            sx={{
                my: 1,
                mx: 'auto',
                p: 2,
            }}
        >
            <Stack spacing={2} direction="row" alignItems="center">
                <Stack>
                    <Avatar>W</Avatar>
                </Stack>
                <Divider orientation="vertical" />
                <Stack sx={{ minWidth: 0, flexGrow: 1 }}>
                    <Typography noWrap>{meeting.name}</Typography>
                    <Typography noWrap>{meeting.description}</Typography>
                    <Typography noWrap>{meeting.duration}</Typography>
                </Stack>

                <Stack>
                    <Dropdown>
                        <MenuButton>
                            More
                        </MenuButton>
                        <Menu>
                            <MenuItem>View Meeting</MenuItem>
                            <Divider />
                            <MenuItem>Delete Meeting</MenuItem>
                        </Menu>
                    </Dropdown>
                </Stack>
            </Stack>
        </Item>
    );
}