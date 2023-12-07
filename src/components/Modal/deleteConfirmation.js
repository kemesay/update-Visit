import React from 'react';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';

function DeleteConfirmationModal(props) {
  const { open, onClose, onConfirm } = props;

  return (
    <Dialog open={open} onClose={onClose}>
      <div>
        <p>Are you sure you want to delete this item?</p>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="primary">
          Delete
        </Button>
      </div>
    </Dialog>
  );
}

export default DeleteConfirmationModal;
