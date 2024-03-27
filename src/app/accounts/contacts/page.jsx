"use client"
import MainTemplate from '@/components/main/MainTemplate';
import { Button, FormControl, FormLabel, Input, Stack } from '@mui/joy';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import React from 'react';
import StandardCard from '@/components/main/StandardCard';
import TableSortAndSelection from '@/components/main/TableCard';

export default function Contacts() {
  

  const headCells = [
    {
      id: 'name',
      numeric: false,
      disablePadding: true,
      label: 'Dessert (100g serving)',
    },
    {
      id: 'calories',
      numeric: true,
      disablePadding: false,
      label: 'Calories',
    },
    {
      id: 'fat',
      numeric: true,
      disablePadding: false,
      label: 'Fat (g)',
    },
    {
      id: 'carbs',
      numeric: true,
      disablePadding: false,
      label: 'Carbs (g)',
    },
    {
      id: 'protein',
      numeric: true,
      disablePadding: false,
      label: 'Protein (g)',
    },
  ];
  
  const rows = [
      { name: 'Cupcake', calories: 305, fat: 3.7, carbs: 67, protein: 4.3 },
      { name: 'Donut', calories: 452, fat: 25.0, carbs: 51, protein: 4.9 },
      { name: 'Eclair', calories: 262, fat: 16.0, carbs: 24, protein: 6.0 },
      { name: 'Frozen yoghurt', calories: 159, fat: 6.0, carbs: 24, protein: 4.0 },
      { name: 'Gingerbread', calories: 356, fat: 16.0, carbs: 49, protein: 3.9 },
      { name: 'Honeycomb', calories: 408, fat: 3.2, carbs: 87, protein: 6.5 },
      { name: 'Ice cream sandwich', calories: 237, fat: 9.0, carbs: 37, protein: 4.3 },
      { name: 'Jelly Bean', calories: 375, fat: 0.0, carbs: 94, protein: 0.0 },
      { name: 'KitKat', calories: 518, fat: 26.0, carbs: 65, protein: 7.0 },
      { name: 'Lollipop', calories: 392, fat: 0.2, carbs: 98, protein: 0.0 },
      { name: 'Marshmallow', calories: 318, fat: 0, carbs: 81, protein: 2.0 },
      { name: 'Nougat', calories: 360, fat: 19.0, carbs: 9, protein: 37.0 },
      { name: 'Oreo', calories: 437, fat: 18.0, carbs: 63, protein: 4.0 }
    ]

  const [selected, setSelected] = React.useState([]);

  const handleDeleteClick = () => {
    // wip
    alert(`delete ${selected}`);
  };

  const tableProps = {headCells, rows, selected, setSelected, handleDeleteClick}


  return (
    <MainTemplate title="Contacts"
      breadcrumb={[
        { name: "My Account" }
      ]}
    >

      <StandardCard
        title="Add Contact"
        subtitle="Add a new contact."
        overflow={<>
                    <Button size="sm" variant="outlined" color="neutral">
                        Cancel
                    </Button>
                    <Button size="sm" variant="solid">
                        Add
                    </Button>
                    </>}
      >
        <form>
          <Stack spacing={1} sx={{ mb: 1 }}>
            <FormLabel>Username</FormLabel>
            <FormControl
              sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
            >

              <Input size="sm" placeholder="Username" defaultValue="defaultValue" />
            </FormControl>
          </Stack>
          <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
            <FormControl sx={{ flexGrow: 1 }}>
              <FormLabel>Email</FormLabel>
              <Input
                size="sm"
                type="email"
                startDecorator={<EmailRoundedIcon />}
                placeholder="Email"
                sx={{ flexGrow: 1 }}
              />
            </FormControl>
          </Stack>
        </form>
      </StandardCard>

      <TableSortAndSelection title="Contacts" subtitle="View contacts here." {...tableProps} />

    </MainTemplate>
  );
}