import * as React from 'react';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import DialogActions from '@mui/joy/DialogActions';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Box, Card, Typography } from '@mui/joy';

export default function ModifyTimeslot({ open, setOpen, ...props }) {


  return (
    <React.Fragment>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog sx={{ maxWidth: "30vw" }} variant="outlined">
          <DialogTitle>
            Modify Timeslots
          </DialogTitle>
          <Divider />
          <DialogContent>


            <Typography level="title-md" fontWeight="bold" sx={{ mb: 1 }}>
              Thursday, January 1, 2023
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, justifyContent: "center" }}>

              <Button color={'danger'} variant={"outlined"} sx={{ py: 1 }}>
                10:10 AM
              </Button>
              <Button variant={"outlined"} sx={{ py: 1 }}>
                10:10 AM
              </Button>
              <Button variant={"outlined"} sx={{ py: 1 }}>
                10:10 AM
              </Button>
              <Button variant={"outlined"} sx={{ py: 1 }}>
                10:10 AM
              </Button>
              <Button variant={"outlined"} sx={{ py: 1 }}>
                10:10 AM
              </Button>
              <Button variant={"outlined"} sx={{ py: 1 }}>
                10:10 AM
              </Button>
              <Button variant={"outlined"} sx={{ py: 1 }}>
                10:10 AM
              </Button>

            </Box>

            <Divider sx={{ m: 2 }} />

            <Typography level="title-md" fontWeight="bold" sx={{ mb: 1 }}>
              Thursday, January 1, 2023
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, justifyContent: "center" }}>

              <Button variant={"outlined"} sx={{ py: 1 }}>
                10:10 AM
              </Button>
              <Button variant={"outlined"} sx={{ py: 1 }}>
                10:10 AM
              </Button>
              <Button variant={"outlined"} sx={{ py: 1 }}>
                10:10 AM
              </Button>
              <Button variant={"outlined"} sx={{ py: 1 }}>
                10:10 AM
              </Button>
              <Button variant={"outlined"} sx={{ py: 1 }}>
                10:10 AM
              </Button>
              <Button variant={"outlined"} sx={{ py: 1 }}>
                10:10 AM
              </Button>
              <Button variant={"outlined"} sx={{ py: 1 }}>
                10:10 AM
              </Button>

            </Box>

            <Divider sx={{ m: 2 }} />

            <Typography level="title-md" fontWeight="bold" sx={{ mb: 1 }}>
              Thursday, January 1, 2023
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, justifyContent: "center" }}>

              <Button variant={"outlined"} sx={{ py: 1 }}>
                10:10 AM
              </Button>
              <Button variant={"outlined"} sx={{ py: 1 }}>
                10:10 AM
              </Button>
              <Button variant={"outlined"} sx={{ py: 1 }}>
                10:10 AM
              </Button>
              <Button variant={"outlined"} sx={{ py: 1 }}>
                10:10 AM
              </Button>
              <Button variant={"outlined"} sx={{ py: 1 }}>
                10:10 AM
              </Button>
              <Button variant={"outlined"} sx={{ py: 1 }}>
                10:10 AM
              </Button>
              <Button variant={"outlined"} sx={{ py: 1 }}>
                10:10 AM
              </Button>

            </Box>


          </DialogContent>
          <DialogActions>
            <Button variant="solid" onClick={() => { setOpen(false) }}>
              Confirm
            </Button>
            <Button variant="plain" color="neutral" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}