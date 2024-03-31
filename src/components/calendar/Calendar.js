"use client"
import React, { useEffect, useState } from 'react';
import './calendar.css'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from "@fullcalendar/interaction";
import { Card } from '@mui/joy';
import CalendarDrawer from './CalendarDrawer';

export default function Calendar(props) {
    const { events } = props;

    const [eventInfo, setEventInfo] = useState(null);
    const [open, setOpen] = React.useState(false);

    const handleEventClick = (clickInfo) => {
        setEventInfo(clickInfo.event);
    };

    return (
        <>
            <Card sx={{ p: 0, height: "100%" }}>
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    buttonText={{
                        today: 'Today',
                        month: 'Month',
                        week: 'Week',
                        day: 'Day',
                        list: 'List'
                    }}
                    headerToolbar={{
                        start: 'today prev,next title',
                        end: 'dayGridMonth,timeGridWeek'
                    }}
                    height={"100%"}
                    events={events}
                    allDaySlot={false}
                    titleFormat={{ // will produce something like "Tuesday, September 18, 2018"
                        month: 'long',
                        year: 'numeric'
                    }}
                    eventColor={"#ff0000"}

                    eventClick={handleEventClick}

                />
            </Card>
            <CalendarDrawer eventInfo={eventInfo} setEventInfo={setEventInfo} />
        </>

    )
}


