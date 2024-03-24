import React from 'react';
import MainTemplate from '@/components/main/MainTemplate';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import Link from '@mui/joy/Link';

export default function Default() {

  return (
    <MainTemplate title="Default"
      breadcrumb={[
        { name: "My Account" }
      ]}
    >

    </MainTemplate>
  );
}