"use client"
import React from 'react';

import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import {
    viewWeek,
    viewDay,
    viewMonthGrid,
    viewMonthAgenda
} from '@schedule-x/calendar'

import '@schedule-x/theme-default/dist/index.css'
import './calendar.css'

import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop'
import { createEventModalPlugin } from '@schedule-x/event-modal'
import { createResizePlugin } from '@schedule-x/resize'


export function getMeetingCalendar() {

    const calendar = useCalendarApp({
        defaultView: viewMonthGrid.name,
        views: [viewDay, viewWeek, viewMonthGrid, viewMonthAgenda],
        plugins: [createDragAndDropPlugin(), createEventModalPlugin(), createResizePlugin()]
    })

    const updateCalendar = (e) => { calendar.events.set(e); }

    return { calendar, updateCalendar };
}

export default function Calendar(props) {
    const { calendar } = props;
    return <ScheduleXCalendar calendarApp={calendar} />;
}