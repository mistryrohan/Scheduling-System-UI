import * as React from 'react';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import DialogActions from '@mui/joy/DialogActions';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DeleteForever from '@mui/icons-material/DeleteForever';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';

export default function AlertDialogModal({open, setOpen, ...props}) {

    const { title, text, deleteButtonText, handleDelete } = props;

  return (
    <React.Fragment>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog variant="outlined" role="alertdialog">
          <DialogTitle>
            <WarningRoundedIcon />
            {title ? title : "Confirmation"}
          </DialogTitle>
          <Divider />
          <DialogContent>
            {text ? text : "Are you sure?"}
          </DialogContent>
          <DialogActions>
            <Button variant="solid" color="danger" onClick={() => {handleDelete(); setOpen(false)}}>
              {deleteButtonText ? deleteButtonText : "Delete"}
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