"use client"
import React from 'react';

import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import {
    viewWeek,
    viewDay
} from '@schedule-x/calendar'

import '@schedule-x/theme-default/dist/index.css'
import './calendar.css'

import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop'
import { createEventModalPlugin } from '@schedule-x/event-modal'
import { createResizePlugin } from '@schedule-x/resize'

export default function Calendar(props) {

    const { events } = props;

    const calendar = useCalendarApp({
        defaultView: viewWeek.name,
        views: [viewDay, viewWeek],
        events: events,
        plugins: [createDragAndDropPlugin(), createEventModalPlugin(), createResizePlugin()]
    })

    return (
        <div>
            <ScheduleXCalendar calendarApp={calendar} />
        </div>
    );
}