import MainTemplate from '@/components/main/MainTemplate';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import Link from '@mui/joy/Link';
import React from 'react';

export default function Default() {

    // The page(s) where an arbitrary user adds their timeslots (availability).
    //  /calendars/<calendar_id>/timeslots/
    // /calendars/timeslots/<timeslot_id>/

  return (
    <MainTemplate title="Default"
      breadcrumb={[
        { name: "My Account" }
      ]}
      >

      

    </MainTemplate>
  );
}