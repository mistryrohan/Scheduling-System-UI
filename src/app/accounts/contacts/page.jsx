"use client"
import MainTemplate from '@/components/main/MainTemplate';
import { Box, Button, FormControl, FormLabel, Input, Snackbar, Stack } from '@mui/joy';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import React, { useEffect } from 'react';
import StandardCard from '@/components/main/StandardCard';
import TableSortAndSelection from '@/components/main/TableCard';
import { fetchData, getOptions } from '@/components/util';
import { useState } from 'react';

export default function Contacts() {

  // state for the contacts page form
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const { data, isFetching, message } = fetchData('accounts/contacts');
  // @ts-ignore
  const [contacts, setContacts] = useState([]);

  // state for popup
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  useEffect(() => {
    setContacts(data);
  }, [data]);

  
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
        setErrorMessage("Contact Deleted!")
        setSnackbarOpen(true);
        setContacts(data);
        // TODO: find better way of doing this
        // window.location.reload();
        // useEffect(() => {
        //   setContacts(data);
        // }, [data]);

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



    // const response = await fetch('http://localhost:8000/accounts/contacts/', getOptions('POST', requestBody))
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log(data);
    //         setErrorMessage("Created contact" + data)
    //         setSnackbarOpen(true);
    //     })
    //     .catch(error => {
    //         setErrorMessage("Could not create contact. Error: " + error)
    //         setSnackbarOpen(true);
    //         console.error('Error:', error);
    //     });


    try {
      const response = await fetch(`http://localhost:8000/accounts/contacts/`, getOptions('POST', requestBody));

      if (response.ok) {
        alert("contact added");
        setErrorMessage("Contact added!")
        setSnackbarOpen(true);
        // TODO: find better way of doing this
        // window.location.reload();
        setContacts(data);
      } else {
        throw Error;
      }
    } catch (error) {
      console.error("Failed to add contact: ", error.data);
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

      <Box sx={{display: "flex", justifyContent: "right", gap: 2}}>
            <Snackbar
                autoHideDuration={1500}
                variant="solid"
                open={snackbarOpen}
                size={"md"}
                onClose={(event, reason) => { setSnackbarOpen(false) }}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                {errorMessage}
            </Snackbar>
          </Box> 

    </MainTemplate>
  );
}