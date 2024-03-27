import MainTemplate from '@/components/main/MainTemplate';
import React from 'react';


export default function CalendarDetails(props) {
  const { params } = props

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
      {params.calendar_id}
    </MainTemplate>
  );
}