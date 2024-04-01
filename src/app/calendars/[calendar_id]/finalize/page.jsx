"use client"
import MainTemplate from '@/components/main/MainTemplate';
import { fetchData } from '@/components/util';
import {
    Box,
    CircularProgress,
    Select,
    Option,
    Dropdown,
    FormControl,
    FormLabel,
    Input,
    ListItemDecorator,
    Menu,
    MenuButton,
    MenuItem,
    Card,
    Button,
    Divider,
    Typography,
} from '@mui/joy';
import React from 'react';
import TableSortAndSelection from '@/components/main/TableCard';
import { ArrowDropDown, Edit } from '@mui/icons-material';
import { Search } from '@mui/icons-material';
import ModifyTimeslot from '@/components/calendars/finalize/ModifyTimeslotModal';
import ConflictChip from '@/components/calendars/finalize/ConflictChip';
import StandardCard from '@/components/main/StandardCard';

export default function Calendars(props) {

    const user = 1;

    const { params } = props;

    const { data, isFetching, message } = fetchData(`calendars/${params.calendar_id}/finalize/`);

    const calendar = data['calendar'] || {};
    const finalizeData = data['meetings'] || [];

    const [searchInput, setSearchInput] = React.useState('');
    const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
    const [filterType, setFilterType] = React.useState('all');


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
            id: 'time',
            numeric: false,
            disablePadding: true,
            label: 'Time',
        },
        {
            id: 'buttons',
            numeric: false,
            disablePadding: true,
            label: '',
        },
    ];

    const handleViewDetails = () => {
        setOpenDeleteModal(true);
    }

    const handleFilterType = (has_conflict) => {
        if (filterType == 'conflict') return has_conflict;
        else return true;
    }

    const rowData = finalizeData.map(({ user, selected, timeslots }) => {

        const has_conflict = user.id == 2;

        return {
            id: user.id,
            _calendar_id: calendar.id,
            name: `${user.first_name} ${user.last_name}`,
            start_time: timeslots[selected].time,
            _duration: timeslots[selected].duration,
            _has_conflict: has_conflict,
            button: (
                <Box sx={{ display: "flex", justifyContent: "end", gap: 2 }}>
                    <ConflictChip has_conflict={has_conflict} />
                    <Dropdown>
                        <MenuButton endDecorator={<ArrowDropDown />}>More</MenuButton>
                        <Menu size="sm" placement="bottom-end">
                            <MenuItem onClick={() => { handleViewDetails() }}>
                                <ListItemDecorator >
                                    <Edit />
                                </ListItemDecorator>
                                Modify Time
                            </MenuItem>
                        </Menu>
                    </Dropdown>
                </Box>
            ),
        }
    });

    const rows = rowData.filter(({ name }) => name.toLowerCase().includes(searchInput.toLowerCase()))
        .filter(({ _has_conflict }) => handleFilterType(_has_conflict));

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
                <Option value="conflict" onClick={() => setFilterType("conflict")}>Conflict</Option>
            </Select>
        </FormControl>
    </Box>

    const tableProps = { headCells, rows, topDecorator }

    return (
        <>
            <ModifyTimeslot open={openDeleteModal} setOpen={setOpenDeleteModal} />
            <MainTemplate title="Finalize Calendar" message={message}>
                {!isFetching ?
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <StandardCard title={calendar?.name} subtitle={calendar?.description} />
                        <TableSortAndSelection {...tableProps} disableSelect />
                        <Divider />
                        <Box sx={{ display: "flex", gap: 2, justifyContent: "end" }}>
                            <Button
                                variant="outlined"
                                size="md"
                            >
                                Cancel
                            </Button>
                            <Button
                                color="primary"
                                size="md"
                            >
                                Create Meetings
                            </Button>
                        </Box>

                    </Box>
                    :
                    <Box sx={{ width: '100%', height: '100%', display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <CircularProgress />
                    </Box>
                }
            </MainTemplate>
        </>
    );
}