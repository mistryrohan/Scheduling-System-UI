"use client"
import * as React from 'react';
import Box from '@mui/joy/Box';
import Table from '@mui/joy/Table';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import Checkbox from '@mui/joy/Checkbox';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import IconButton from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import Tooltip from '@mui/joy/Tooltip';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { visuallyHidden } from '@mui/utils';
import { DateTime } from 'luxon';

function labelDisplayedRows({ from, to, count }) {
    return `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`;
}

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
    const { headCells, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, disableSelect } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <thead>
            <tr>
                {disableSelect ? <></> : <th>
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        slotProps={{
                            input: {
                                'aria-label': 'select all desserts',
                            },
                        }}
                        sx={{ verticalAlign: 'sub' }}
                    />
                </th>}
                {headCells.map((headCell) => {
                    const active = orderBy === headCell.id;
                    return (
                        <th
                            key={headCell.id}
                            aria-sort={
                                active ? { asc: 'ascending', desc: 'descending' }[order] : undefined
                            }
                        >
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <Link
                                underline="none"
                                color="neutral"
                                textColor={active ? 'primary.plainColor' : undefined}
                                component="button"
                                onClick={createSortHandler(headCell.id)}
                                fontWeight="lg"
                                startDecorator={
                                    headCell.numeric ? (
                                        <ArrowDownwardIcon sx={{ opacity: active ? 1 : 0 }} />
                                    ) : null
                                }
                                endDecorator={
                                    !headCell.numeric ? (
                                        <ArrowDownwardIcon sx={{ opacity: active ? 1 : 0 }} />
                                    ) : null
                                }
                                sx={{
                                    '& svg': {
                                        transition: '0.2s',
                                        transform:
                                            active && order === 'desc' ? 'rotate(0deg)' : 'rotate(180deg)',
                                    },
                                    '&:hover': { '& svg': { opacity: 1 } },
                                }}
                            >
                                {headCell.label}
                                {active ? (
                                    <Box component="span" sx={visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </Box>
                                ) : null}
                            </Link>
                        </th>
                    );
                })}
            </tr>
        </thead>
    );
}

function EnhancedTableToolbar(props) {
    const { numSelected, title, subtitle, handleDeleteClick } = props;

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: 'background.level1',
                }),
                borderTopLeftRadius: 'var(--unstable_actionRadius)',
                borderTopRightRadius: 'var(--unstable_actionRadius)',
            }}
        >
            {numSelected > 0 ? (
                <Typography sx={{ py: 2, flex: '1 1 100%' }} component="div">
                    {numSelected} selected
                </Typography>
            ) : (
                title || subtitle ? <Box sx={{ py: 1, my: 1 }}>
                    <Typography level="title-md">{title}</Typography>
                    <Typography level="body-sm">
                        {subtitle}
                    </Typography>
                </Box> : <></>
            )}

            {numSelected > 0 ? (
                <>
                    <Tooltip title="Delete">
                        <IconButton size="sm" color="danger" variant="solid" onClick={handleDeleteClick}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </>
            ) : <></>}
        </Box>
    );
}

export default function TableSortAndSelection(props) {
    const { headCells, rows, title, subtitle, handleDeleteClick, disableSelect, topDecorator } = props

    const selected = props.selected ?? [];
    const setSelected = props.setSelected ?? function () { };

    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event, newValue) => {
        setRowsPerPage(parseInt(newValue.toString(), 10));
        setPage(0);
    };

    const getLabelDisplayedRowsTo = () => {
        if (rows.length === -1) {
            return (page + 1) * rowsPerPage;
        }
        return rowsPerPage === -1
            ? rows.length
            : Math.min(rows.length, (page + 1) * rowsPerPage);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    return (
        <Box sx={{ m: '0 !important', display: "flex", flexDirection: "column", gap: 2 }}>
            {topDecorator}
            <Sheet
                variant="outlined"
                sx={{ m: '0 !important', width: '100%', maxWidth: '100%', boxShadow: 'sm', borderRadius: 'sm' }}
            >
                <EnhancedTableToolbar numSelected={selected.length} title={title} subtitle={subtitle} handleDeleteClick={handleDeleteClick} />
                <Table
                    aria-labelledby="tableTitle"
                    hoverRow
                    sx={{
                        '--TableCell-headBackground': 'transparent',
                        '--TableCell-selectedBackground': (theme) =>
                            theme.vars.palette.success.softBg,
                        '& thead th:nth-of-type(1)': disableSelect ? undefined : {
                            width: '40px',
                        },
                        '& thead th': {
                            width: '100%',
                        },
                        '& tr > *:nth-of-type(n+3)': { textAlign: 'right' },
                    }}
                >
                    <EnhancedTableHead
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={rows.length}
                        headCells={headCells}
                        disableSelect={disableSelect}
                    />
                    <tbody>
                        {stableSort(rows, getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                                const isItemSelected = isSelected(row.id);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <tr
                                        onClick={(event) => disableSelect ? undefined : handleClick(event, row.id)}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.id}
                                    // selected={isItemSelected}

                                    >
                                        {disableSelect ? <></> : <th scope="row">
                                            <Checkbox
                                                checked={isItemSelected}
                                                slotProps={{
                                                    input: {
                                                        'aria-labelledby': labelId,
                                                    },
                                                }}
                                                sx={{ verticalAlign: 'top' }}
                                            />
                                        </th>}
                                        {row.name ? <th id={labelId} scope="row">
                                            {row.name}
                                        </th> : <></>}
                                        {Object.entries(row).map(([key, value]) => {

                                            if (key.includes('time')) {
                                                value = DateTime.fromISO(value).plus({ hours: 5 }).toLocaleString({ weekday: 'short', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' });
                                            }

                                            return ( //so bad but idc
                                                key !== 'name' && key !== 'id' && key.charAt(0) !== '_' &&
                                                <td key={key}>{value}</td>
                                            )
                                        })}
                                    </tr>
                                );
                            })}
                        {emptyRows > 0 && (
                            <tr
                                style={{
                                    height: `calc(${emptyRows} * 40px)`,
                                }}
                            >
                                <td colSpan={6} aria-hidden />
                            </tr>
                        )}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={6}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 2,
                                        justifyContent: 'flex-end',
                                    }}
                                >
                                    <FormControl orientation="horizontal" size="sm">
                                        <FormLabel>Rows per page:</FormLabel>
                                        <Select onChange={handleChangeRowsPerPage} value={rowsPerPage}>
                                            <Option value={5}>5</Option>
                                            <Option value={10}>10</Option>
                                            <Option value={25}>25</Option>
                                        </Select>
                                    </FormControl>
                                    <Typography textAlign="center" sx={{ minWidth: 80 }}>
                                        {labelDisplayedRows({
                                            from: rows.length === 0 ? 0 : page * rowsPerPage + 1,
                                            to: getLabelDisplayedRowsTo(),
                                            count: rows.length === -1 ? -1 : rows.length,
                                        })}
                                    </Typography>
                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                        <IconButton
                                            size="sm"
                                            color="neutral"
                                            variant="outlined"
                                            disabled={page === 0}
                                            onClick={() => handleChangePage(page - 1)}
                                            sx={{ bgcolor: 'background.surface' }}
                                        >
                                            <KeyboardArrowLeftIcon />
                                        </IconButton>
                                        <IconButton
                                            size="sm"
                                            color="neutral"
                                            variant="outlined"
                                            disabled={
                                                rows.length !== -1
                                                    ? page >= Math.ceil(rows.length / rowsPerPage) - 1
                                                    : false
                                            }
                                            onClick={() => handleChangePage(page + 1)}
                                            sx={{ bgcolor: 'background.surface' }}
                                        >
                                            <KeyboardArrowRightIcon />
                                        </IconButton>
                                    </Box>
                                </Box>
                            </td>
                        </tr>
                    </tfoot>
                </Table>
            </Sheet>
        </Box>

    );
}
