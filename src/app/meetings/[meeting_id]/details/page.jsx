import MainTemplate from '@/components/main/MainTemplate';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import Link from '@mui/joy/Link';
import React from 'react';

export default function MeetingDetails(props) {
  const { params } = props

  return (
    <MainTemplate title="Meeting Details"
      breadcrumb={[
        { name: "My Account" }
      ]}
      >

      {params.meeting_id}

    </MainTemplate>
  );
}