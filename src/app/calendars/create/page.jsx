"use client"
import MainTemplate from '@/components/main/MainTemplate';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import Link from '@mui/joy/Link';
import React, { useEffect, useState } from 'react';
import { fetchData } from '@/components/util';
import { Box, CircularProgress, Autocomplete } from '@mui/joy';
import { Button, FormControl, FormLabel, Input, Stack, } from '@mui/joy';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import StandardCard from '@/components/main/StandardCard';
import { DateTime } from 'luxon';
import InviteeCalendar from '@/components/calendar/InviteeCalendar';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import Typography from '@mui/joy/Typography';

let eventId = 0;

const priToColour = {
  "2":  '#C63D2F', // highest pri
  "1": '#FC6736', 
  "0": '#FFBB5C' // lowest pri
}

const colourToPri = {
  "#C63D2F": 2, // highest pri
  "#FC6736": 1, 
  "#FFBB5C": 0 // lowest pri
}

function createEventId() {
  return String(eventId++);
}

function mapToCalendar(timeslots, userId) {

  var userTimeslots = [];
  timeslots.forEach(timeslot => {
    if (timeslot['user'] === userId){ 
      userTimeslots.push({
        id: createEventId(),
        start: timeslot.start_time.substring(0, timeslot.start_time.length - 1),
        end: timeslot.end_time.substring(0, timeslot.end_time.length - 1),
        backgroundColor: priToColour[timeslot.priority]
      });  
    }
  });
  return userTimeslots;
}

function mapEventsToTimeslots(events) {
  var timeslots = [];
  events.forEach(event => {
    timeslots.push({
      start_time: event.start.substring(0, 19), // TODO: check
      end_time: event.end.substring(0, 19),
      priority: colourToPri[event.backgroundColor]
    });
  
  });
  return timeslots;
}

function mapContactsToOptions(contacts){
  var contactOptions = [];
  contacts.forEach(contact => {
    contactOptions.push({
      label: contact.email,
      id: contact.id
    })
  })
  return contactOptions;
}


export default function Default() {
      // Create calendar.

  const [ events, setEvents ] = useState([]);
  const [priority, setPriority] = React.useState('low');
  const [colour, setColour ] = useState('#FFBB5C');
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  const apiURL = 'accounts/contacts';
  const { data, isFetching, message } = fetchData(apiURL);
  const mappedData = mapContactsToOptions(data)

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      // await sleep(1e3); // For demo purposes.
      

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
    // const timeslots = mapEventsToTimeslots(events);
    // console.log("timeslots", timeslots);
    // e.preventDefault();

    // // delete what was there before
    // try {
    //   const response = await fetch(`http://localhost:8000/` +'calendars/' + params.calendar_id + '/timeslots/', {
    //     method: 'DELETE'
    //   });

    //   if (response.ok) {
    //     alert("deleted old timeslots")
    //   } else {
    //     throw Error;
    //   }
    // } catch (error) {
    //   console.error("Failed to delete timeslots: ", error);
    //   alert("An error occurred. Please try again.");
    // };


    // //post the updated timeslots 
    // const requestBody = {
    //   'timeslots': timeslots
    // }
    // try {
    //   const response = await fetch(`http://localhost:8000/` +'calendars/' + params.calendar_id + '/timeslots/', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(requestBody) 
    //   });

    //   if (response.ok) {
    //     alert("added timeslots")
    //   } else {
    //     throw Error;
    //   }
    // } catch (error) {
    //   console.error("Failed to add timeslots: ", error);
    //   alert("An error occurred. Please try again.");
    // };
  }

  const handleOnChange = (event, value) => {
    console.log(value); // Log the selected value
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
              <Input size="sm" placeholder="Add a title" name=''/>
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
              <Input size="sm" placeholder="Add a description" name=''/>
            </FormControl>
          </Stack>

          <Stack spacing={1} sx={{ mb: 1 }}>
            <FormLabel>Duration</FormLabel>
            <FormControl
              sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
            >
              <Input size="sm" placeholder="Enter a duration" name=''/>
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
            // handleEvents={handleEvents}
          ></InviteeCalendar>
          <Box sx={{display: "flex", justifyContent: "right", gap: 2}}>
            <Button size="lg" variant="outlined" sx={{borderColor: 'rgba(0, 0, 0, 0.12)'}}>Cancel</Button>
            <Button size="lg" onClick={onSubmit}>Done</Button>
          </Box>  
          
      </MainTemplate>
    );
}