import * as React from 'react';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import DialogActions from '@mui/joy/DialogActions';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Box, Typography } from '@mui/joy';
import { DateTime } from 'luxon';

export default function ModifyTimeslot({ open, setOpen, ...props }) {

  const { data, editUser, handleModifySelected } = props;
  const currUser = data?.find(row => row.id === editUser)

  if (!currUser) return (<></>);

  const { _selected: selected, _timeslots: timeslots } = currUser;

  const [newSelected, setNewSelected] = React.useState(-1);

  const handleConfirm = () => {
    if (newSelected >= 0) handleModifySelected(currUser.id, newSelected);
    setNewSelected(-1);
    setOpen(false);
  }

  const handleClose = () => {
    setNewSelected(-1);
    setOpen(false);
  }

  const timeslotsByDate = timeslots.reduce((acc, obj, index) => {
    const date = obj.time.slice(0, 10);
    const newObj = { ...obj, index: index };
    if (acc[date]) acc[date].push(newObj);
    else acc[date] = [newObj];
    return acc;
  }, {});

  return (
    <React.Fragment>
      <Modal open={open} onClose={handleClose}>
        <ModalDialog sx={{ maxWidth: "30vw" }} variant="outlined">
          <DialogTitle sx={{ display: "flex", flexDirection: "column" }}>
            <>
              Modify Timeslot
            </>
            <Typography level="body-sm">
              Timeslots are ordered by priority within each date.
            </Typography>
          </DialogTitle>


          <Divider />
          <DialogContent>

            {Object.keys(timeslotsByDate).map((key, index, array) => {

              const date = DateTime.fromISO(key).toFormat('EEEE, MMMM d, yyyy');
              const hasNext = index < array.length - 1;

              return <React.Fragment key={key}>
                <Typography level="title-md" fontWeight="bold" sx={{ mb: 1 }}>
                  {date}
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, justifyContent: "center" }}>
                  {timeslotsByDate[key].map(timeslot => {
                    const time = DateTime.fromISO(timeslot?.time).plus({ hours: 5 }).toLocaleString({ hour: '2-digit', minute: '2-digit' });
                    const handleClick = () => {
                      setNewSelected(timeslot?.index);
                    }
                    const isDisabled = newSelected < 0 ? timeslot?.index === selected : timeslot?.index === newSelected;

                    return <Button key={timeslot?.index} disabled={isDisabled} sx={{ py: 1 }} onClick={handleClick} color={'primary'} variant={"outlined"}>
                      {time}
                    </Button>
                  })}
                </Box>
                {hasNext ? <Divider sx={{ m: 2 }} /> : <></>}

              </React.Fragment>
            })}


          </DialogContent>
          <DialogActions>
            <Button variant="solid" onClick={handleConfirm}>
              Confirm
            </Button>
            <Button variant="plain" color="neutral" onClick={handleClose}>
              Cancel
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}