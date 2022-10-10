import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface CloseMyJioDialogProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function CloseMyJioDialog({ isOpen, onCancel, onConfirm }: CloseMyJioDialogProps) {
  return (
    <Dialog
      open={isOpen}
      onClose={onCancel}
      aria-labelledby="close-my-jio-dialog-title"
      aria-describedby="close-my-jio-dialog-description"
    >
      <DialogTitle id="close-my-jio-dialog-title">
        Do you really want to close this Jio?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="close-my-jio-dialog-description">
          Jios cannot be reopened once they are closed.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button sx={{ py: 2 }} onClick={onCancel}>
          Cancel
        </Button>
        <Button sx={{ py: 2 }} color="error" onClick={onConfirm} autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
