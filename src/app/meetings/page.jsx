"use client"
import MainTemplate from '@/components/main/MainTemplate';
import { fetchData } from '@/components/util';
import { Box, Select, Option, CircularProgress } from '@mui/joy';
import React, { useState } from 'react';

import { DateTime } from 'luxon';
import Calendar, { getMeetingCalendar } from '@/components/calendar/Calendar';

function mapToCalendar(meetings) {
  return meetings?.map(meeting => {

    const startTime = DateTime.fromISO(meeting.start_time).plus({ hours: 4 }); // bad conversion but i truly dgaf
    const endTime = startTime.plus({ minutes: meeting.duration });

    return {
      id: meeting.id,
      title: meeting.calendar.name,
      description: meeting.calendar.description,
      start: startTime.toFormat('yyyy-MM-dd HH:mm'), // calendar wants this format lol
      end: endTime.toFormat('yyyy-MM-dd HH:mm'),
      calendarId: (meeting.calendar.id).toString(),
    }
  }) || [];
}


export default function Meetings() {

  const { data, isFetching, message } = fetchData('meetings');
  const invitedMeetings = data['invited_meetings'] || [];
  const hostedMeetings = data['hosted_meetings'] || [];

  const invitedEvents = mapToCalendar(invitedMeetings);
  const hostedEvents = mapToCalendar(hostedMeetings);
  const allEvents = [...invitedEvents, ...hostedEvents];

  const [ events, setEvents ] = React.useState(allEvents);

  const handleChange = (_, value) => {
    if (value == "invited") setEvents(invitedEvents);
    else if (value == "hosted") setEvents(hostedEvents);
    else setEvents(allEvents);
  };

  const NewMeetingButton = <Select variant="solid" defaultValue="all" onChange={handleChange}>
    <Option value="all">All Meetings</Option>
    <Option value="invited">Invited Meetings</Option>
    <Option value="hosted">Hosted Meetings</Option>
  </Select>;

  return (
    <MainTemplate title="My Meetings" message={message} titleDecorator={NewMeetingButton}>

      {!isFetching ? <Calendar events={events} /> :
        <Box sx={{ width: '100%', height: '100%', display: "flex", alignItems: "center", justifyContent: "center" }}>
          <CircularProgress />
        </Box>}

    </MainTemplate>
  );
}