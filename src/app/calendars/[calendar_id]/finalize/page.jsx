"use client"
import MainTemplate from '@/components/main/MainTemplate';
import { fetchData, getOptions } from '@/components/util';
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
    Button,
    Divider,
} from '@mui/joy';
import React, { useEffect } from 'react';
import TableSortAndSelection from '@/components/main/TableCard';
import { ArrowDropDown, Edit } from '@mui/icons-material';
import { Search } from '@mui/icons-material';
import ModifyTimeslot from '@/components/calendars/finalize/ModifyTimeslotModal';
import ConflictChip from '@/components/calendars/finalize/ConflictChip';
import StandardCard from '@/components/main/StandardCard';
import { DateTime } from 'luxon';
import { useRouter } from 'next/navigation';
import Popup from '@/components/main/Popup';

export default function Calendars(props) {

    const { params } = props;
    const router = useRouter();

    const { data, isFetching, message, responseCode } = fetchData(`calendars/${params.calendar_id}/finalize/`);

    console.log(responseCode);

    useEffect(() => {
        if (responseCode === 403) {
            router.push('/calendars');
        }
    }, [responseCode]);

    const calendar = data['calendar'] || {};
    const finalizeData = data['meetings'] || [];

    const [searchInput, setSearchInput] = React.useState('');
    const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
    const [filterType, setFilterType] = React.useState('all');
    const [editUser, setEditUser] = React.useState(-1);
    const [rowData, setRowData] = React.useState([]);
    const [fetched, setFetched] = React.useState(false);

    const handleSearchInputChange = (event) => {
        setSearchInput(event.target.value);
    };

    // Modifying selected Timeslot, initializing rows

    const getButton = (id, hasConflict) => {
        return <Box sx={{ display: "flex", justifyContent: "end", gap: 2 }}>
            <ConflictChip has_conflict={hasConflict} />
            <Dropdown>
                <MenuButton endDecorator={<ArrowDropDown />}>More</MenuButton>
                <Menu size="sm" placement="bottom-end">
                    <MenuItem onClick={() => { handleViewDetails(id) }}>
                        <ListItemDecorator >
                            <Edit />
                        </ListItemDecorator>
                        Modify Time
                    </MenuItem>
                </Menu>
            </Dropdown>
        </Box>

    }

    const checkConflict = (user, startTime, endTime, otherUser, otherSelected, otherTimeslots) => {
        if (user.id !== otherUser.id) {
            const otherSelectedTimeslot = otherTimeslots[otherSelected]
            const otherStartTime = DateTime.fromISO(otherSelectedTimeslot.time);
            const otherEndTime = otherStartTime.plus({ minutes: otherSelectedTimeslot.duration });
            if (!(endTime <= otherStartTime || startTime >= otherEndTime) || (endTime == otherEndTime && startTime == otherStartTime)) return true;
        }
        return false;
    }

    const findConflict = (user, selected, timeslots, data) => {
        let hasConflict = false;

        const selectedTimeslot = timeslots[selected];
        const startTime = DateTime.fromISO(selectedTimeslot.time);
        const endTime = startTime.plus({ minutes: selectedTimeslot.duration });

        if (data.length < 1) finalizeData.forEach(({ user: otherUser, selected: otherSelected, timeslots: otherTimeslots }) => {
            if (checkConflict(user, startTime, endTime, otherUser, otherSelected, otherTimeslots)) hasConflict = true;

        });
        else data.forEach(({ _user: otherUser, _selected: otherSelected, _timeslots: otherTimeslots }) => {
            if (checkConflict(user, startTime, endTime, otherUser, otherSelected, otherTimeslots)) hasConflict = true;
        });

        return hasConflict;
    }

    useEffect(() => {
        if (finalizeData?.length > 0 && !fetched) {
            const initData = finalizeData.map(({ user, selected, timeslots }) => {
                const hasConflict = findConflict(user, selected, timeslots, []);
                const button = getButton(user.id, hasConflict);
                return {
                    id: user.id,
                    name: `${user.first_name} ${user.last_name}`,
                    start_time: timeslots[selected].time,
                    _calendar_id: calendar.id,
                    _user: user,
                    _duration: timeslots[selected].duration,
                    _has_conflict: hasConflict,
                    _timeslots: timeslots,
                    _selected: selected,
                    button: button,
                }
            });
            setRowData(initData);
            setFetched(true);
        }
    }, [finalizeData]);

    const handleModifySelected = (u, newSelected) => {

        // Update selection
        const updatedRowData = rowData.map(row => {
            if (row.id === u) {
                const { _timeslots } = row;

                return {
                    ...row,
                    start_time: _timeslots[newSelected].time,
                    _selected: newSelected
                };
            }
            return row;
        });

        // Update all conflict buttons
        const finalUpdatedRowData = updatedRowData.map(row => {
            const { _user, _selected, _timeslots } = row;
            const hasConflict = findConflict(_user, _selected, _timeslots, updatedRowData);
            const button = getButton(_user.id, hasConflict);

            return {
                ...row,
                _has_conflict: hasConflict,
                button: button
            };
        });

        setRowData(finalUpdatedRowData);
    };

    const handleViewDetails = (u) => {
        setEditUser(u);
        setOpenDeleteModal(true);
    }

    const handleFilterType = (has_conflict) => {
        if (filterType == 'conflict') return has_conflict;
        else return true;
    }

    // Submission
    
    const [submitMessage, setSubmitMessage] = React.useState(undefined);
    const [open, setOpen] = React.useState(true);

    const handleSubmission = () => {
        const data = rowData.map(({id, start_time, _duration, _calendar_id}) => ({
            user: id,
            start_time: start_time,
            duration: _duration,
            calendar_id: _calendar_id
        }));
        const payload = {meetings: data};
        
        fetch('http://www.localhost:8000/calendars/'+ params.calendar_id +'/finalize/', getOptions('POST', payload))
        .then(response => response.json())
        .then((_) => {
            router.push('/calendars');
        })
        .catch(error => {
            setSubmitMessage(error);
        });
    };

    // Table Props

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

    const disabled = rowData.some(row => row._has_conflict)

    return (
        <>
            {submitMessage ? <Popup message={message} open={open} setOpen={setOpen} /> : <></>}
            <ModifyTimeslot handleModifySelected={handleModifySelected} data={rowData} editUser={editUser} open={openDeleteModal} setOpen={setOpenDeleteModal} />
            <MainTemplate title="Finalize Calendar" message={message}>
                {!isFetching ?
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <StandardCard title={calendar?.name} subtitle={calendar?.description ? `${calendar?.description} (${calendar?.duration} min)` : ''} />
                        <TableSortAndSelection {...tableProps} disableSelect />
                        <Divider />
                        <Box sx={{ display: "flex", gap: 2, justifyContent: "end" }}>
                            <Button
                                variant="outlined"
                                size="md"
                                onClick={() => { router.push('/calendars'); }}
                            >
                                Cancel
                            </Button>

                            <Button
                                color="primary"
                                size="md"
                                disabled={disabled}
                                onClick={handleSubmission}
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