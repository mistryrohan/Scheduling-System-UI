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
      id: 'name',
      numeric: false,
      disablePadding: true,
      label: 'Name',
    },
    {
      id: 'username',
      numeric: false,
      disablePadding: true,
      label: 'Username',
    },
    {
      id: 'email',
      numeric: false,
      disablePadding: true,
      label: 'Email',
    }
  ];




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
    
  const rows = contacts.map(({ first_name, last_name, ...attr }) => ({ ...attr, name: `${first_name} ${last_name}` }));

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