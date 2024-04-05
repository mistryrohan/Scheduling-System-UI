"use client"
import MainTemplate from '@/components/main/MainTemplate';
import React, { useEffect, useState } from 'react';
import { fetchData, getOptions } from '@/components/util';
import { Box, CircularProgress, Snackbar } from '@mui/joy';
import { Button} from '@mui/joy';
import InviteeCalendar from '@/components/calendar/InviteeCalendar';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import Typography from '@mui/joy/Typography';
import {createEventId, mapToCalendar, mapEventsToTimeslots } from '@/components/calendar/util.js';
import { useRouter } from 'next/navigation';

// Invitee landing page. 
// The page(s) where an arbitrary user adds their timeslots (availability).

export default function Default(props) {
  
  const router = useRouter();
  const { params } = props
  const apiURL = 'calendars/' + params.calendar_id + '/timeslots';
  
  const { data, isFetching, message } = fetchData(apiURL);
  const allCurrTimeslots = data || [];
  const userTimeslots = mapToCalendar(allCurrTimeslots, parseInt(params.user_id));


  const [ events, setEvents ] = useState([]);
  const [priority, setPriority] = React.useState('low');
  const [colour, setColour ] = useState('#FFBB5C');

  // state for popup
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');


  useEffect(() => {
    setEvents(userTimeslots);
  }, [data])

  useEffect(() => {
    if (priority === 'high') {
      setColour('#C63D2F');
    } else if (priority === 'medium') {
      setColour('#FC6736');
    } else {
      setColour('#FFBB5C');
    }
  }, [priority])


  useEffect(() => {
    console.log("events", events)
  }, [events])

 

  const handleSelect = (selectInfo) => {

    var newEvent = {
      id: createEventId(),
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      allDay: selectInfo.allDay,
      backgroundColor: colour,
    };


    var newEvents = [];
    newEvents.push(...events);
    newEvents.push(newEvent);
    console.log("new events: ");
    console.log(newEvents);
    setEvents(newEvents);
  
  }
   

  const handlePriChange = (e) => {
    e.preventDefault();
    setPriority(e.target.value);
  }

  

  function handleEventClick(info) {
    var newEvents = []
    newEvents.push(...events);
    const index = newEvents.findIndex(obj => parseInt(obj.id) === parseInt(info.event.id));

    if (index != -1) {
      newEvents.splice(index, 1);
    }
    setEvents(newEvents);
  }

 
  function handleTimeChange(info){
    console.log(info.event);

    var newEvents = [];
    newEvents.push(...events);
    const index = newEvents.findIndex(obj => parseInt(obj.id) === parseInt(info.event.id));

    if (index != -1) {
      newEvents[index].start = info.event.startStr;
      newEvents[index].end = info.event.endStr;
    }
  }

  const onSubmit = async (e) => {
    var allSuccess = true;
    const timeslots = mapEventsToTimeslots(events);
    console.log("timeslots", timeslots);
    e.preventDefault();

    // delete what was there before
    try {
      const response = await fetch(`http://localhost:8000/` +'calendars/' + params.calendar_id + '/timeslots/', getOptions('DELETE'));

      if (!response.ok) {
        throw Error;
      }
    } catch (error) {
      console.error("Failed to delete timeslots: ", error);
      allSuccess = false
    };


    if (allSuccess){
      //post the updated timeslots 
      const requestBody = {
        'timeslots': timeslots
      }
      try {
        const response = await fetch(`http://localhost:8000/` +'calendars/' + params.calendar_id + '/timeslots/', getOptions('POST', requestBody));
        if (!response.ok) {
          throw Error;
        }
      } catch (error) {
        setErrorMessage("Your availability could not be saved. Please try again later.")
        setSnackbarOpen(true);
        allSuccess = false
        console.error("Failed to add timeslots: ", error);
      };
    }

    if(!allSuccess){
      await new Promise(r => setTimeout(r, 1500));
    }

    router.push('/meetings');

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
          onSelect={handleSelect} 
          handleEventClick={handleEventClick}
          handleEventDrop={handleTimeChange}
          // handleEvents={handleEvents}
          /> :
        <Box sx={{ width: '100%', height: '100%', display: "flex", alignItems: "center", justifyContent: "center" }}>
          <CircularProgress />
        </Box>}
        <Box sx={{display: "flex", justifyContent: "right", gap: 2}}>
          <Button size="lg" variant="outlined" sx={{borderColor: 'rgba(0, 0, 0, 0.12)'}} onClick={() => router.push('/meetings')}>Cancel</Button>
          <Button size="lg" onClick={onSubmit}>Done</Button>
          <Snackbar
                autoHideDuration={1500}
                variant="solid"
                open={snackbarOpen}
                size={"md"}
                onClose={(event, reason) => { setSnackbarOpen(false) }}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                {errorMessage}
            </Snackbar>
        </Box>  
        
    </MainTemplate>
  );
}