"use client"
import MainTemplate from '@/components/main/MainTemplate';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import Link from '@mui/joy/Link';
import React, { useEffect, useState } from 'react';
import { fetchData } from '@/components/util';
import { Box, Select, Option, CircularProgress } from '@mui/joy';
import { Button, FormControl, FormLabel, Input, Stack, } from '@mui/joy';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import StandardCard from '@/components/main/StandardCard';
import { DateTime } from 'luxon';
import InviteeCalendar from '@/components/calendar/InviteeCalendar';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import Typography from '@mui/joy/Typography';

// Invitee landing page. 
// The page(s) where an arbitrary user adds their timeslots (availability).

let eventId = 0;

function createEventId() {
  return String(eventId++);
}

function mapToCalendar(timeslots, userId) {

  var userTimeslots = [];
  timeslots.forEach(timeslot => {
    if (timeslot['user'] === userId){
      var backgroundColour;
      if (timeslot.priority = 2) {
        backgroundColour = '#C63D2F'
      } else if (timeslot.priority = 1) {
        backgroundColour = '#FC6736'
      } else {
        backgroundColour = '#FFBB5C'
      }

      userTimeslots.push({
        id: createEventId(),
        start: timeslot.start_time.substring(0, timeslot.start_time.length - 1),
        end: timeslot.end_time.substring(0, timeslot.end_time.length - 1),
        backgroundColor: backgroundColour
      });  
    }
  });
  return userTimeslots;
}

export default function Default(props) {
  
  const { params } = props
  const apiURL = 'calendars/' + params.calendar_id + '/timeslots';
  
  const { data, isFetching, message } = fetchData(apiURL);
  const allCurrTimeslots = data || [];
  const userTimeslots = mapToCalendar(allCurrTimeslots, parseInt(params.user_id));


  const [ events, setEvents ] = useState([]);
  const [priority, setPriority] = React.useState('low');

  var colour = '#FFBB5C';
  var priorityAsInt = 0
  useEffect(() => {
    if (priority === 'high') {
      colour = '#C63D2F'
      priorityAsInt = 2;
    } else if (priority === 'medium') {
      colour = '#FC6736'
      priorityAsInt = 1;
    } else {
      colour = '#FFBB5C'
      priorityAsInt = 0;
    }
  }, [priority])


  useEffect(() => {
    console.log(events)
  }, [events])

  const handleSelect = (selectInfo) => {
    let calendarApi = selectInfo.view.calendar

    calendarApi.unselect() // clear date selection
    var newEvent = {
      id: createEventId(),
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      allDay: selectInfo.allDay,
      backgroundColor: colour
    };
    calendarApi.addEvent(newEvent);

    // var newEvents = [];
    // newEvents.push(events);
    // newEvents.push(newEvent);
    // console.log("new events: ");
    // console.log(newEvents);
    // setEvents(newEvents);
  
  }
   

  const handlePriChange = (e) => {
    e.preventDefault();
    setPriority(e.target.value);

  }

  function handleEventClick(clickInfo) {
    clickInfo.event.remove();
  }

  function handleEvents(events) {
    setEvents(events)
  }

  return (
    <MainTemplate title="My Availability"
      breadcrumb={[
        { name: "My Account" }
      ]}
      >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Typography id="segmented-controls-example" fontWeight="lg" fontSize="sm">
        Priority:
      </Typography>
      <RadioGroup
        orientation="horizontal"
        aria-labelledby="segmented-controls-example"
        name="priority"
        value={priority}
        onChange={handlePriChange}
        sx={{
          minHeight: 48,
          padding: '4px',
          borderRadius: '12px',
          bgcolor: 'neutral.softBg',
          '--RadioGroup-gap': '4px',
          '--Radio-actionRadius': '8px',
        }}
      >
        {['low', 'medium', 'high'].map((item) => (
          <Radio
            key={item}
            color="neutral"
            value={item}
            disableIcon
            label={item}
            variant="plain"
            sx={{
              px: 2,
              alignItems: 'center',
            }}
            slotProps={{
              action: ({ checked }) => ({
                sx: {
                  ...(checked && {
                    bgcolor: 'background.surface',
                    boxShadow: 'sm',
                    '&:hover': {
                      bgcolor: 'background.surface',
                    },
                  }),
                },
              }),
            }}
          />
        ))}
      </RadioGroup>
    </Box>
      {!isFetching ? 
      <InviteeCalendar 
          events={events} 
          initialEvents={userTimeslots} 
          onSelect={handleSelect} 
          handleEventClick={handleEventClick}
          // handleEvents={handleEvents}
          /> :
        <Box sx={{ width: '100%', height: '100%', display: "flex", alignItems: "center", justifyContent: "center" }}>
          <CircularProgress />
        </Box>}
        <Button size="lg">Done</Button>
    </MainTemplate>
  );
}