"use client"
import MainTemplate from '@/components/main/MainTemplate';
import { fetchData } from '@/components/util';
import { Box, Button, CircularProgress, Dropdown, IconButton, Menu, MenuButton, MenuItem, Stack } from '@mui/joy';
import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import TableSortAndSelection from '@/components/main/TableCard';
import StandardCard from '@/components/main/StandardCard';
import { ArrowDropDown, MoreVert } from '@mui/icons-material';

export default function Calendars() {

  const { data, isFetching, message } = fetchData('calendars');

  const headCells = [
    {
      id: 'name',
      numeric: false,
      disablePadding: true,
      label: 'Name',
    }
  ];

  const rows = data.map(({ primary_user, duration, description, ...attr }) => ({
    ...attr
  }));

  const [selected, setSelected] = React.useState([]);

  const handleDeleteClick = () => {
    // wip
    alert(`delete ${selected}`);
  };

  const tableProps = { headCells, rows, selected, setSelected, handleDeleteClick }

  const NewCalendarButton = <Button
    color="primary"
    startDecorator={<AddIcon />}
    size="lg"
  >
    New Calendar
  </Button>;

  return (
    <MainTemplate title="Calendars" message={message} titleDecorator={NewCalendarButton}>

      {!isFetching ?
        <TableSortAndSelection {...tableProps} /> :
        <Box sx={{ width: '100%', height: '100%', display: "flex", alignItems: "center", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      }

      {selected.length > 0 ?
        selected.length == 1 ?
          <StandardCard subtitle={'TODO: Quick View'} /> :
          <StandardCard subtitle={`${selected.length} calendars selected.`} />
        : <StandardCard subtitle={"Select a calendar to view."} />}

    </MainTemplate>

  );
}