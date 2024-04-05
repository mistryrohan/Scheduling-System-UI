"use client"
import MainTemplate from '@/components/main/MainTemplate';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import Link from '@mui/joy/Link';
import React, { useEffect, useState } from 'react';
import { fetchData, getOptions } from '@/components/util';
import { Box, CircularProgress, Autocomplete, Snackbar } from '@mui/joy';
import { Button, FormControl, FormLabel, Input, Stack, } from '@mui/joy';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import StandardCard from '@/components/main/StandardCard';
import { DateTime } from 'luxon';
import InviteeCalendar from '@/components/calendar/InviteeCalendar';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import Typography from '@mui/joy/Typography';
import { useRouter } from 'next/navigation';
import {createEventId, mapToCalendar, mapEventsToTimeslots, mapContactsToOptions, mapPickedOptionsToUserIds } from '@/components/calendar/util';

export default function Default() {
      // Create calendar.

  const router = useRouter();

  // states for the form above the calendar
  const [title, setTitle ] = useState('');
  const [description, setDescription] = useState('');
  const [ pickedOptions, setPickedOptions ] = useState([]);
  const [duration, setDuration] = useState(30);
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  // states for the calendar
  const [events, setEvents ] = useState([]);
  const [priority, setPriority] = React.useState('low');
  const [colour, setColour ] = useState('#FFBB5C');
  

  // state for popup
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  
  const apiURL = 'accounts/contacts';
  const { data, isFetching, message } = fetchData(apiURL);
  const mappedData = mapContactsToOptions(data)

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {

      if (active) {
        setOptions([...mappedData]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

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
    const userIds = mapPickedOptionsToUserIds(pickedOptions);

    // First, create the calendar 
    const CalendarRequestBody = {
      'name': title,
      'description': description,
      'duration': duration,
    };
 
    var newCalId; 
    try {
      const response = await fetch('http://localhost:8000/calendars/', getOptions('POST', CalendarRequestBody))
        .then(response => response.json())
        .then(data => {
            newCalId = data.calendar.id;
            setErrorMessage("Calendar created successfully! Inviting Contacts ...")
            setSnackbarOpen(true);
        })
        .catch(error => {
            console.error('Error:', error);
            allSuccess = false;
        });

    } catch (e) {
        console.log(e);
    }

    if(!allSuccess){
      await new Promise(r => setTimeout(r, 1500));
    }
    router.push('/meetings');
    
    // post to send invitations 
    const InvitationsRequestBody = {
      'users': userIds
    }
    try {
      const response = await fetch(`http://localhost:8000/` +'calendars/' + newCalId + '/invitations/', getOptions('POST', InvitationsRequestBody));
      if (response.ok) {
        setErrorMessage("Invited Contacts!")
        setSnackbarOpen(true);
      } else {
        throw Error;
      }
    } catch (error) {
      setErrorMessage("Could not invite contacts")
      setSnackbarOpen(true);
      allSuccess = false;
    }

    const timeslots = mapEventsToTimeslots(events);
  
    // delete what was there before
    try {
      const response = await fetch(`http://localhost:8000/` +'calendars/' + newCalId + '/timeslots/', getOptions('DELETE'));
      if (!response.ok) {
        throw Error;
      }
    } catch (error) {
      console.error("Failed to delete timeslots: ", error);
      allSuccess = false;
    };


    //post the updated timeslots 
    const requestBody = {
      'timeslots': timeslots
    }
    try {
      const response = await fetch(`http://localhost:8000/` +'calendars/' + newCalId  + '/timeslots/', getOptions('POST', requestBody));

      if (!response.ok) {
        throw Error;
      }
    } catch (error) {
      setErrorMessage("Could not save your availability. Please try again.")
      setSnackbarOpen(true);
      console.error("Failed to add timeslots: ", error);
      allSuccess = false;
    };


  }


  const handleOnChange = (event, value) => {
    setPickedOptions(value)

  };


    return (
      <MainTemplate title="Create a Calendar"
        breadcrumb={[
          { name: "My Account" }
        ]}
        >
        <StandardCard
        title="Create a new calendar"
        subtitle="Please input the details of your calendar"
      >
        <form>
          <Stack spacing={1} sx={{ mb: 1 }}>
            <FormLabel>Title</FormLabel>
            <FormControl
              sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
            >
              <Input size="sm" placeholder="Add a title" name='' onChange={(e) => {setTitle(e.target.value)}}/>
            </FormControl>
          </Stack>


          <Stack spacing={1} sx={{ mb: 1 }}>
            <FormLabel>Invite Contacts</FormLabel>
              <FormControl
                sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
              >
                <Autocomplete 
                multiple
                freeSolo
                limitTags={2}
                options={options}
                placeholder="Pick contacts to add"
                // slotProps={{
                //   input: {
                //     autoComplete: 'new-password', // disable autocomplete and autofill
                //   },
                // }}
                autoHighlight
                onChange={handleOnChange}
                open={open}
                onOpen={() => {
                  setOpen(true);
                }}
                onClose={() => {
                  setOpen(false);
                }}
                loading={loading}
                endDecorator={
                  loading ? (
                    <CircularProgress size="sm" sx={{ bgcolor: 'background.surface' }} />
                  ) : null
                }
                />
              </FormControl>
            
          </Stack>


          <Stack spacing={1} sx={{ mb: 1 }}>
            <FormLabel>Description</FormLabel>
            <FormControl
              sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
            >
              <Input size="sm" placeholder="Add a description" name='' onChange={(e) => {setDescription(e.target.value)}}/>
            </FormControl>
          </Stack>

          <Stack spacing={1} sx={{ mb: 1 }}>
            <FormLabel>Duration</FormLabel>
            <FormControl
              sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
            >
              <Input size="sm" placeholder="Enter a duration" name='' onChange={(e) => {setDuration(parseInt(e.target.value))}}/>
            </FormControl>
          </Stack>
        </form>
      </StandardCard>
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
        <InviteeCalendar 
            events={events}  
            onSelect={handleSelect} 
            handleEventClick={handleEventClick}
            handleEventDrop={handleTimeChange}
          ></InviteeCalendar>
          <Box sx={{display: "flex", justifyContent: "right", gap: 2}}>
            <Button size="lg" variant="outlined" sx={{borderColor: 'rgba(0, 0, 0, 0.12)'}}>Cancel</Button>
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