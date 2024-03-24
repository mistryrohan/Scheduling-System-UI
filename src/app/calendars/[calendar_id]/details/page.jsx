import MainTemplate from '@/components/main/MainTemplate';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import Link from '@mui/joy/Link';
import React from 'react';

export default function Default() {

    // The page listing the calendar details.
    // /calendars/<calendar_id>/details
    // /calendars/<calendar_id>/timeslots/
    // /calendars/<calendar_id>/reminders/
    // /calendars/<calendar_id>/finalize/  

  return (
    <MainTemplate title="Default"
      breadcrumb={[
        { name: "My Account" }
      ]}
      >

      

    </MainTemplate>
  );
}