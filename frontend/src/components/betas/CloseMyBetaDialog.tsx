import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Iconify from 'src/components/Iconify';

interface CloseMyJioDialogProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function DeleteMyBetaDialog({ isOpen, onCancel, onConfirm }: CloseMyJioDialogProps) {
  return (
    <Dialog
      open={isOpen}
      onClose={onCancel}
      aria-labelledby="delete-my-beta-dialog-title"
      aria-describedby="delete-my-beta-dialog-description"
    >
      <DialogTitle sx={{ mb: 1 }} id="delete-my-beta-dialog-title">
        Do you really want to delete this Beta?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="delete-my-beta-dialog-description">
          Betas cannot be recovered once they are deleted.
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ pb: '5px !important' }}>
        <Button sx={{ py: 2 }} onClick={onCancel}>
          Cancel
        </Button>
        <Button
          startIcon={<Iconify icon={'eva:trash-2-outline'} />}
          sx={{ py: 2 }}
          color="error"
          onClick={onConfirm}
          autoFocus
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
