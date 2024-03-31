"use client"
import MainTemplate from '@/components/main/MainTemplate';
import { Button, FormControl, FormLabel, Input, Stack } from '@mui/joy';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import React from 'react';
import StandardCard from '@/components/main/StandardCard';
import TableSortAndSelection from '@/components/main/TableCard';
import { fetchData } from '@/components/util';
import { useState } from 'react';

export default function Contacts() {

  // state for the contacts page form
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const { data, isFetching, message } = fetchData('accounts/contacts');
  // @ts-ignore
  const contacts = data || [];

  
  const headCells = [
    {
      id: 'username',
      numeric: false,
      disablePadding: true,
      label: 'Username',
    },
    {
      id: 'first_name',
      numeric: false,
      disablePadding: true,
      label: 'First Name',
    },
    {
      id: 'last_name',
      numeric: false,
      disablePadding: true,
      label: 'Last Name',
    },
    {
      id: 'email',
      numeric: false,
      disablePadding: true,
      label: 'Email',
    }
  ];

  // const headCells = [
  //   {
  //     id: 'name',
  //     numeric: false,
  //     disablePadding: true,
  //     label: 'Dessert (100g serving)',
  //   },
  //   {
  //     id: 'calories',
  //     numeric: true,
  //     disablePadding: false,
  //     label: 'Calories',
  //   },
  //   {
  //     id: 'fat',
  //     numeric: true,
  //     disablePadding: false,
  //     label: 'Fat (g)',
  //   },
  //   {
  //     id: 'carbs',
  //     numeric: true,
  //     disablePadding: false,
  //     label: 'Carbs (g)',
  //   },
  //   {
  //     id: 'protein',
  //     numeric: true,
  //     disablePadding: false,
  //     label: 'Protein (g)',
  //   },
  // ];




  // const rows = [
  //     { name: 'Cupcake', calories: 305, fat: 3.7, carbs: 67},
  //     { name: 'Donut', calories: 452, fat: 25.0, carbs: 51 },
  //     { name: 'Eclair', calories: 262, fat: 16.0, carbs: 24},
  //     { name: 'Frozen yoghurt', calories: 159, fat: 6.0, carbs: 24},
  //     { name: 'Gingerbread', calories: 356, fat: 16.0, carbs: 49},
  //     { name: 'Honeycomb', calories: 408, fat: 3.2, carbs: 87},
  //     { name: 'Ice cream sandwich', calories: 237, fat: 9.0, carbs: 37},
  //     { name: 'Jelly Bean', calories: 375, fat: 0.0, carbs: 94},
  //     { name: 'KitKat', calories: 518, fat: 26.0, carbs: 65},
  //     { name: 'Lollipop', calories: 392, fat: 0.2, carbs: 98},
  //     { name: 'Marshmallow', calories: 318, fat: 0, carbs: 81},
  //     { name: 'Nougat', calories: 360, fat: 19.0, carbs: 9},
  //     { name: 'Oreo', calories: 437, fat: 18.0, carbs: 63}
  //   ]


  const rows = contacts.map(({ id, ...attr }) => ({ id, ...attr }));
  
  

  const [selected, setSelected] = React.useState([]);

  const handleDeleteClick = async () => {
    // wip
    console.log(selected[0]);
    alert(`delete ${selected}`);
    const requestBody = {
      'user2': selected[0]
    }
    try {
      const response = await fetch(`http://localhost:8000/accounts/contacts/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody) 
      });

      if (response.ok) {
        alert("contact deleted");
        // TODO: find better way of doing this
        window.location.reload();
      } else {
        throw Error;
      }
    } catch (error) {
      console.error("Failed to delete contact: ", error);
      alert("An error occurred. Please try again.");
    };
  };

  const handleAddContact = async (e) => {
    e.preventDefault();
    const requestBody = {
      'email': email
    }
    try {
      const response = await fetch(`http://localhost:8000/accounts/contacts/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody) 
      });

      if (response.ok) {
        alert("contact added");
        // TODO: find better way of doing this
        window.location.reload();
      } else {
        throw Error;
      }
    } catch (error) {
      console.error("Failed to add contact: ", error);
      alert("An error occurred. Please try again.");
    };
  }
    


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
                    <Button size="sm" variant="solid" onClick={handleAddContact}>
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

              <Input size="sm" placeholder="Username" name='' value={username} onChange={(e) => {setUsername(e.target.value)}}/>
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
                value={email} onChange={(e) => {setEmail(e.target.value)}}
              />
            </FormControl>
          </Stack>
        </form>
      </StandardCard>

      <TableSortAndSelection title="Contacts" subtitle="View contacts here." {...tableProps} />

    </MainTemplate>
  );
}