"use client"
import MainTemplate from '@/components/main/MainTemplate';
import { fetchData } from '@/components/util';
import {
  Box,
  Button,
  CircularProgress,
  Select,
  Option,
  Dropdown,
  FormControl,
  FormLabel,
  Input,
  ListDivider,
  ListItemDecorator,
  Menu,
  MenuButton,
  MenuItem,
} from '@mui/joy';
import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import TableSortAndSelection from '@/components/main/TableCard';
import { ArrowDropDown, DeleteForever, Edit } from '@mui/icons-material';
import StatusChip from '@/components/calendars/StatusChip';
import { Search } from '@mui/icons-material';
import AlertDialogModal from '@/components/calendars/DeleteModal';
import { useRouter } from 'next/navigation';

export default function Calendars() {

  const user = 1;

  const { data, isFetching, message } = fetchData('calendars');

  const ownedCalendars = data['owned_calendars'] || [];
  const invitedCalendars = data['invitee_calendars'] || [];
  const allCalendars = [...ownedCalendars, ...invitedCalendars];

  const [searchInput, setSearchInput] = React.useState('');
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const [deleteCalendar, setDeleteCalendar] = React.useState(-1);
  const [filterType, setFilterType] = React.useState('all');

  const NewCalendarButton = <Button
    color="primary"
    startDecorator={<AddIcon />}
    size="lg"
    onClick={() => router.push(`/calendars/create`)}
  >
    New Calendar
  </Button>;

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const headCells = [
    {
      id: 'name',
      numeric: false,
      disablePadding: true,
      label: 'Name',
    },
    {
      id: 'buttons',
      numeric: false,
      disablePadding: true,
      label: '',
    },
  ];

  const router = useRouter()

  const handleViewDetails = (id) => {
    router.push(`/calendars/${id}/details`)
  }

  const handleDelete = () => {
    // TODO: Implement deletion
    alert(`delete calendar ${deleteCalendar}`)
    setDeleteCalendar(-1);
  }

  const handleFilterType = (u) => {
    if(filterType == 'hosted') return u == user;
    else if(filterType == 'invited') return u != user;
    else return true;
  }

  const rows = allCalendars
    .filter(({ primary_user }) => handleFilterType(primary_user))
    .filter(({ name }) => name.toLowerCase().includes(searchInput.toLowerCase()))
    .map(({ primary_user, duration, description, has_meeting, respondants, all_responded, ...attr }) => ({
      ...attr,
      button: (
        <Box sx={{ display: "flex", justifyContent: "end", gap: 2 }}>
          <StatusChip owner={primary_user} user={user} hasMeeting={has_meeting} allResponded={all_responded} respondants={respondants}/>
          <Dropdown>
            <MenuButton endDecorator={<ArrowDropDown />}>More</MenuButton>
            <Menu size="sm" placement="bottom-end">
              <MenuItem onClick={() => {handleViewDetails(attr.id)}}>
                <ListItemDecorator >
                  <Edit />
                </ListItemDecorator>
                View Details
              </MenuItem>
              <ListDivider />
              <MenuItem color="danger" onClick={() => {setDeleteCalendar(attr.id); setOpenDeleteModal(true)}}>
                <ListItemDecorator sx={{ color: "inherit" }}>
                  <DeleteForever />
                </ListItemDecorator>
                Delete
              </MenuItem>
            </Menu>
          </Dropdown>
        </Box>
      ),
    }));


  const topDecorator = <Box
    className="SearchAndFilters-tabletUp"
    sx={{
      borderRadius: 'sm',
      display: { sm: 'flex' },
      flexWrap: 'wrap',
      gap: 1.5
    }}
  >
    <FormControl sx={{ flex: 1 }} size="sm">
      <FormLabel>Search</FormLabel>
      <Input size="sm" placeholder="Search" startDecorator={<Search />} onChange={handleSearchInputChange} />
    </FormControl>
    <FormControl size="sm">
      <FormLabel>Type</FormLabel>
      <Select
        size="sm"
        placeholder="Filter by type"
        slotProps={{ button: { sx: { whiteSpace: 'nowrap' } } }}
      >
        <Option value="all" onClick={() => setFilterType("all")}>All</Option>
        <Option value="hosted" onClick={() => setFilterType("hosted")}>Hosted</Option>
        <Option value="invited" onClick={() => setFilterType("invited")}>Invited</Option>
      </Select>
    </FormControl>
  </Box>

  const tableProps = { headCells, rows, topDecorator }

  return (
    <>
      <AlertDialogModal open={openDeleteModal} setOpen={setOpenDeleteModal} title={"Delete Calendar"} handleDelete={handleDelete}/>
      <MainTemplate title="Calendars" message={message} titleDecorator={NewCalendarButton}>
        {!isFetching ?
          <TableSortAndSelection {...tableProps} disableSelect /> :
          <Box sx={{ width: '100%', height: '100%', display: "flex", alignItems: "center", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        }
      </MainTemplate>
    </>


  );
}