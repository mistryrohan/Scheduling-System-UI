"use client"
import MainTemplate from '@/components/main/MainTemplate';
import { Typography } from '@mui/joy';
import React from 'react';

import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import {
    viewWeek,
    viewDay,
    viewMonthGrid,
    viewMonthAgenda,
} from '@schedule-x/calendar'

import '@schedule-x/theme-default/dist/index.css'

export default function Temp() {

    const calendar = useCalendarApp({
        defaultView: viewMonthGrid.name,
        views: [viewDay, viewWeek, viewMonthGrid, viewMonthAgenda],
        events: [
            {
                id: '1',
                title: 'Event 1',
                start: '2023-12-16',
                end: '2023-12-16',
            },
        ],
    })

    return (
        <MainTemplate title="Component Library">
            Put any components you make here.


            <Typography level="h2">Input, Form Validation</Typography>
            https://mui.com/joy-ui/react-input/




            <Typography level="h2">Calendar</Typography>
            https://schedule-x.dev/docs/calendar

            <div>
                <ScheduleXCalendar calendarApp={calendar} />
            </div>


        </MainTemplate>
    );
}