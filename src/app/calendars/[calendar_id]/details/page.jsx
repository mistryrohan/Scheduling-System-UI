"use client"
import React from 'react';
import { fetchData } from '@/components/util';
import MainTemplate from '@/components/main/MainTemplate';
import { Button, Box, Typography, Card, CardContent } from '@mui/joy';
import { Grid } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import PersonIcon from '@mui/icons-material/Person';
import MessageIcon from '@mui/icons-material/Message';
import { useRouter } from 'next/navigation';


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


function GuestItem({ guest, calendarId }) {

  const accessToken = typeof window === 'object' ? localStorage.getItem('access_token') : null;

  const sendReminder = async () => {
    try {
      const response = await fetch(`http://www.localhost:8000/calendars/${calendarId}/reminders/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(accessToken ? { 'Authorization': `Bearer ${accessToken}` } : {}),
        },
        body: JSON.stringify({ users: [guest.user.id] }) 
      });

      if (response.ok) {
        alert("Reminder Sent Successfully");
      } else {
        alert("Failed to send the reminder. Please try again.");
      }
    } catch (error) {
      console.error("Failed to send reminder: ", error);
      alert("An error occurred. Please try again.");
    }
  };
  
  return (
    <Card variant="outlined" sx={{
      mb: 2, p: 2, borderColor: 'rgba(0, 0, 0, 0.12)',
      display: 'flex', justifyContent: 'space-between', alignItems: 'left', width: 'auto',
    }}>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>

        <Typography variant="subtitle2" sx={{ fontSize: '1rem' }}>
          {guest.user.username}
        </Typography>

        <Typography variant="body2" sx={{ fontSize: '1rem' }}>
          {guest.user.email}
        </Typography>

        <Typography variant="subtitle2" sx={{ flexGrow: 0 }}>
          {guest.status}
        </Typography>

        {guest.status !== 'scheduled' && (
           <Button size="medium" variant="outlined" sx={{ mr: 1 }} onClick={sendReminder}>
           Send Reminder
         </Button>
        )}
      </Box>     
    </Card>
  );
}

function GuestList({ guests, setGuests, calendarId }) {
  return (
    <Box sx={{ mt: 2 }}>
      <Typography level="h2" sx={{ mb: 2 }}>Guests</Typography>
      {guests.map((guest, index) => (
        <GuestItem key={index} guest={guest} calendarId={calendarId} />
      ))}
    </Box>
  );
}


export default function CalendarDetails(props) {
  const { params } = props;
  const router = useRouter();
  const calendarId = params.calendar_id;

  
  let { data: calendarData, isFetching: isFetchingCalendar } = fetchData(`calendars/${params.calendar_id}/details`); 
  let { data: timeslotsData, isFetching: isFetchingTimeslots } = fetchData(`calendars/${params.calendar_id}/timeslots`);
  let { data: invitationsData, isFetching: isFetchingInvitations } = fetchData(`calendars/${params.calendar_id}/invitations2`);

  const [guests, setGuests] = React.useState(invitationsData.responded_invitees_details || []);

  React.useEffect(() => {
    if (invitationsData.responded_invitees_details) {
      setGuests(invitationsData.responded_invitees_details);
    }
  }, [invitationsData]);


  const handleFinalizeClick = () => {
    router.push(`/calendars/${calendarId}/finalize/`);
  };


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

      <GuestList guests={guests} setGuests={setGuests} calendarId={params.calendar_id}/>

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="solid"
          size="lg"
          onClick={handleFinalizeClick}
          sx={{
            width: 250,
            height: 50,
            fontSize: '1rem',
            display: 'block', 
            mx: 'auto', 
            my: 2, 
          }}
        >
          Finalize
        </Button>
      </Box>

    </MainTemplate>
  );
}
