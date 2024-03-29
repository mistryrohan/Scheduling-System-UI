"use client"
import React from 'react';
import { fetchData } from '@/components/util';
import MainTemplate from '@/components/main/MainTemplate';
import { Button, Box, Typography, Card, CardContent } from '@mui/joy';
import { Grid } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import DescriptionIcon from '@mui/icons-material/Description';
import PersonIcon from '@mui/icons-material/Person';
import MessageIcon from '@mui/icons-material/Message';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import MailOutlineIcon from '@mui/icons-material/MailOutline';


// Decide grid layout based on number of timeslots
function TimeslotGrid({ timeslots }) {
  const columns = timeslots.length > 4 ? 2 : 1;
  return (
    <Grid container spacing={1} sx={{ pt: 1 }}>
      {timeslots.map((slot, index) => (
        <Grid item xs={12 / columns} key={index}>
          <Typography>{slot}</Typography>
        </Grid>
      ))}
    </Grid>
  );
}


// Each block of information
function InfoBlock({ label, content, icon, timeslots }) {
  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          position: 'relative',
        }}>
          <Typography level="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
            {label}
          </Typography>
          {timeslots ? <TimeslotGrid timeslots={timeslots} /> : <Typography>{content}</Typography>}
          {icon && (
            <Box sx={{ position: 'absolute', bottom: 8, right: 8 }}>
              {icon}
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}


function GuestItem({ guest, onRemove }) {
  return (

    <Card variant="outlined" sx={{
      mb: 2, p: 2, borderColor: 'rgba(0, 0, 0, 0.12)',
      display: 'flex', justifyContent: 'space-between', alignItems: 'left', width: '100%',
    }}>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {/* User ID */}
        <Typography variant="subtitle2" sx={{ fontSize: '0.875rem', flexGrow: 0 }}>
          {`User ID: ${guest.user}`}
        </Typography>
        {/* Placeholder Email */}
        <Typography variant="body2" sx={{ fontSize: '0.75rem', flexGrow: 0 }}>
          placeholder@email.com
        </Typography>
        {/* Status */}
        <Typography variant="subtitle2" sx={{ flexGrow: 0 }}>
          {guest.status}
        </Typography>

        {guest.status !== 'scheduled' && (
          <Button size="small" variant="outlined" sx={{ mr: 1 }}>
            Send Reminder
          </Button>
        )}
        <Button size="small" variant="outlined" color="error" onClick={() => onRemove(guest.id)}>
          Remove
        </Button>
      </Box>
      
    </Card>
  );
}


function GuestList({ guests, setGuests }) {
  // Handler to remove a guest from the list
  const handleRemoveGuest = (guestId) => {
    const updatedGuests = guests.filter(guest => guest.id !== guestId);
    setGuests(updatedGuests);
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography level="h6" sx={{ mb: 2 }}>Guests</Typography>
      {guests.map((guest, index) => (
        <GuestItem key={index} guest={guest} onRemove={handleRemoveGuest} />
      ))}
    </Box>
  );
}


export default function CalendarDetails(props) {
  const { params } = props;
  
  let { data: calendarData, isFetching: isFetchingCalendar } = fetchData(`calendars/${params.calendar_id}/details`); 
  let { data: timeslotsData, isFetching: isFetchingTimeslots } = fetchData(`calendars/${params.calendar_id}/timeslots`);
  let { data: invitationsData, isFetching: isFetchingInvitations } = fetchData(`calendars/${params.calendar_id}/invitations`);

  const [guests, setGuests] = React.useState(invitationsData.responded_invitees_details || []);

  React.useEffect(() => {
    if (invitationsData.responded_invitees_details) {
      setGuests(invitationsData.responded_invitees_details);
    }
  }, [invitationsData]);

  console.log("Hello");
  console.log(calendarData);
  console.log(timeslotsData);
  console.log(invitationsData);

  
  // Check if any data is still fetching, and prevent access to not yet available data
  if (isFetchingCalendar || isFetchingTimeslots || isFetchingInvitations) {
    return <div>Loading...</div>;
  }


  const formattedTimeslots = timeslotsData.map(slot =>
    `${new Date(slot.start_time).toLocaleString()} - ${new Date(slot.end_time).toLocaleString()}`
  );

  return (
    <MainTemplate title="Calendar Details" breadcrumb={[{ name: "My Account" }]}>
      <Box sx={{ mt: 4, display: 'grid', gap: 2, gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
        
        <Card variant="outlined" sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
          <EventIcon sx={{ mr: 2 }} />
          <Box>
            <Typography variant="subtitle1" component="div">
              {calendarData.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {calendarData.description}
            </Typography>
          </Box>
        </Card>

        <Card variant="outlined" sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
          <PersonIcon sx={{ mr: 2 }} />
          <Typography variant="body1">
            Organizer: {calendarData.primary_user}
          </Typography>
        </Card>

        <Card variant="outlined" sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
          <MessageIcon sx={{ mr: 2 }} />
          <Typography variant="body1">
            {invitationsData.message}
          </Typography>
        </Card>

      </Box>

      <Grid container spacing={2}>
        <InfoBlock
          label="Timeslots"
          timeslots={formattedTimeslots}
          icon={<EventIcon />}
        />
      </Grid>

      <GuestList guests={guests} setGuests={setGuests} />
      {/* <GuestList guests={invitationsData.responded_invitees_details || []} setGuests={setGuests}} /> */}

    </MainTemplate>
  );
}
