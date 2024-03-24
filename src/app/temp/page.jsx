import MainTemplate from '@/components/main/MainTemplate';
import { InfoOutlined } from '@mui/icons-material';
import { FormControl, FormHelperText, FormLabel, Input } from '@mui/joy';
import React from 'react';

export default function Calendars() {
    return (
        <MainTemplate title="Component Library">
            Put any components you make here.


            Input
            https://mui.com/joy-ui/react-input/

            <Input placeholder="Type in here…" error defaultValue="Oh no, error found!" />
            <FormControl error>
                <FormLabel>Label</FormLabel>
                <Input placeholder="Type in here…" defaultValue="Oh no, error found!" />
                <FormHelperText>
                    <InfoOutlined />
                    Opps! something is wrong.
                </FormHelperText>
            </FormControl>


        </MainTemplate>
    );
}