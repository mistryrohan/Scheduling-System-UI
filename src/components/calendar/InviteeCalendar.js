"use client"
import React from 'react';
import './calendar.css'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { Card } from '@mui/joy';

export default function InviteeCalendar(props) {
    const { events, initialEvents, onSelect, handleEventClick, handleEvents, handleEventDrop} = props;
    return (
        <Card sx={{ p: 0, height: "100%" }}>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, timeGridPlugin]}
                initialView="timeGridWeek"
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
                editable={true}
                selectable={true}
                dragScroll={true}
                initialEvents={initialEvents}
                eventDurationEditable={true}
                // selectMirror={true}
                select={onSelect}
                eventClick={handleEventClick}
                eventResizableFromStart={true}
                eventsSet={handleEvents}
                eventChange={handleEventDrop}
                contentHeight={"auto"}
                slotMinTime={"07:00:00"}
            />
        </Card>

    )
}