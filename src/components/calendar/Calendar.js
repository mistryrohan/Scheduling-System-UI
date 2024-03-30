"use client"
import React from 'react';
import './calendar.css'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import { Card } from '@mui/joy';

export default function Calendar(props) {
    const { events } = props;
    return (
        <Card sx={{ p: 0, height: "100%" }}>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin]}
                initialView="timeGrid"
                buttonText={{
                    today: 'Today',
                    month: 'Month',
                    week: 'Week',
                    day: 'Day',
                    list: 'List'
                }}
                headerToolbar={{
                    start: 'title dayGridMonth,timeGridWeek',
                    end: 'prev,next today'
                }}
                height={"100%"}
                events={events}
            />
        </Card>

    )
}