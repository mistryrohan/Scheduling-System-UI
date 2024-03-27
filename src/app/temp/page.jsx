"use client"
import MainTemplate from '@/components/main/MainTemplate';
import { Typography } from '@mui/joy';
import React from 'react';
import '@schedule-x/theme-default/dist/index.css'
import Calendar from '@/components/calendar/Calendar';

export default function Temp() {

    const events = [
        {
            id: 2,
            title: 'Breakfast with Sam',
            description: 'Discuss the new project',
            location: 'Starbucks',
            start: '2023-11-29 05:00',
            end: '2023-11-29 06:00',
            calendarId: 'low'
        },
        {
            id: 3,
            title: 'Gym',
            start: '2023-11-27 06:00',
            end: '2023-11-27 07:00',
            calendarId: 'high'
        },
        {
            id: 5,
            title: 'Some appointment',
            people: ['John'],
            start: '2024-03-23 03:00',
            end: '2024-03-23 04:30',
            calendarId: 'high'
        },
        {
            id: 6,
            title: 'Other appointment',
            people: ['Susan', 'Mike'],
            start: '2024-03-23 03:00',
            end: '2024-03-23 04:00',
            calendarId: 'medium',
        },
    ]

    return (
        <MainTemplate title="Component Library">
            Put any components you make here.


            <Typography level="h2">Input, Form Validation</Typography>
            https://mui.com/joy-ui/react-input/

            <Typography level="h2">Calendar</Typography>
            https://schedule-x.dev/docs/calendar

            <Calendar events={events} />


        </MainTemplate>
    );
}