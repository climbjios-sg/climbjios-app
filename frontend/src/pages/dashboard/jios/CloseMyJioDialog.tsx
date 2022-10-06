import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface CloseMyJioDialogProps {
  isOpen: boolean;
  handleCancel: () => void;
  handleClose: () => void;
}

export default function CloseMyJioDialog({
  isOpen,
  handleCancel,
  handleClose,
}: CloseMyJioDialogProps) {
  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="close-my-jio-dialog-title"
      aria-describedby="close-my-jio-dialog-description"
    >
      <DialogTitle id="close-my-jio-dialog-title">Are you sure?</DialogTitle>
      <DialogContent>
        <DialogContentText id="close-my-jio-dialog-description">
          Do you really want to close this jio? This process cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleClose} autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
