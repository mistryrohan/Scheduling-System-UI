"use client"
import * as React from 'react';
import { Button, Snackbar } from '@mui/joy';

export default function Popup({message, open, setOpen}) {

    return (<Snackbar
        autoHideDuration={3000}
        variant="solid"
        open={open}
        size={"md"}
        onClose={(event, reason) => { setOpen(false) }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        endDecorator={
            <Button
                onClick={() => setOpen(false)}
                size="sm"
                variant="solid"
                color="success"
            >
                Dismiss
            </Button>
        }
    >
        {message}
    </Snackbar>);
}
