"use client";
import React, { useEffect, useState } from 'react';
import MainTemplate from '@/components/main/MainTemplate';
import StandardCard from '@/components/main/StandardCard';
import InviteeCalendar from '@/components/calendar/InviteeCalendar';
import { Box, Button, Switch, Typography, Card } from '@mui/joy';
import { FormControlLabel } from '@mui/material';
import { fetchData } from '@/components/util'; 

const priToColour = {
  "2": '#C63D2F',  // high pri
  "1": '#FC6736',  
  "0": '#FFBB5C'   // low pri
};

function mapTimeslotsToEvents(timeslots) {
  if (!Array.isArray(timeslots)) return []; // TODO remove
  return timeslots.map(timeslot => ({
    id: String(timeslot.id),
    start: timeslot.start_time.substring(0, timeslot.start_time.length - 1),
    end: timeslot.end_time.substring(0, timeslot.end_time.length - 1),
    backgroundColor: priToColour[timeslot.priority],
    title: `${timeslot.user.username}` 
  }));
}


function UserItem({ user, onToggle, isChecked }) {
  return (
    <Card variant="outlined" sx={{
      mb: 2, p: 2, borderColor: 'rgba(0, 0, 0, 0.12)',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: 'auto',
    }}>
      <Typography variant="subtitle2" sx={{ fontSize: '1rem' }}>
        {user.username}
      </Typography>
      <Switch
        checked={isChecked}
        onChange={() => onToggle(user.id)}
      />
    </Card>
  );
}


function UserList({ timeslots }) {
    return (
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          User List
        </Typography>
        {timeslots.map((timeslot, index) => (
          <UserItem key={index} user={timeslot.user} />
        ))}
      </Box>
    );
  }
  

export default function ViewCalendar(props) {
  const { params } = props;
  const calendarId = params.calendar_id;
  const [visibleUsers, setVisibleUsers] = useState({});
  const { data: timeslotsData, isFetching: isFetchingTimeslots } = fetchData(`calendars/${calendarId}/timeslots`);
  const events = React.useMemo(() => mapTimeslotsToEvents(timeslotsData), [timeslotsData]);


  const handleToggle = (userId) => {
    setVisibleUsers(prevState => ({
      ...prevState,
      [userId]: !prevState[userId]
    }));
  };


  const filteredEvents = React.useMemo(() => {
    if (!Array.isArray(timeslotsData)) return [];
    const visibleTimeslots = timeslotsData.filter(timeslot => visibleUsers[timeslot.user.id]);
    return mapTimeslotsToEvents(visibleTimeslots);
  }, [timeslotsData, visibleUsers]);
  
  return (
    <MainTemplate title="View Calendar">
      <StandardCard
        title="View Calendar Timeslots"
        subtitle="Here are the timeslots scheduled for this calendar."
      >
        <InviteeCalendar events={filteredEvents} />
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            User List
          </Typography>
          {timeslotsData.map((timeslot, index) => (
            <UserItem
              key={index}
              user={timeslot.user}
              onToggle={handleToggle}
              isChecked={!!visibleUsers[timeslot.user.id]}
            />
          ))}
        </Box>
      </StandardCard>
    </MainTemplate>
  );
}