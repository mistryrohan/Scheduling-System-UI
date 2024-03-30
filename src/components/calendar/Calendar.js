"use client"
import React from 'react';
import './calendar.css'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import { Card } from '@mui/joy';


export function getMeetingCalendar() {

    // const calendar = useCalendarApp({
    //     defaultView: viewMonthGrid.name,
    //     views: [viewDay, viewWeek, viewMonthGrid, viewMonthAgenda],
    //     plugins: [createDragAndDropPlugin(), createEventModalPlugin(), createResizePlugin()]
    // })

    // const updateCalendar = (e) => { calendar.events.set(e); }

    // return { calendar, updateCalendar };

    return { calendar: undefined, updateCalendar: () => { } }

}

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