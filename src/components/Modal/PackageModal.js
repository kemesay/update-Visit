import * as React from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Container, ListItemIcon} from '@mui/material';
import { PersonAdd } from '@mui/icons-material';
import PackageInputForm from '../InputForm/PackageInputForm';

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: '100',
//   bgcolor: 'background.paper',
// //   border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
// };



export default function EmployeeModal({ title, name, endpoint,isEditing, token,open,setOpen ,initialData}) {
  // const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Container maxWidth='100' style={{display:'flex',justifyContent:'end',backgroundColor:'whitesmoke'}}>  
        <Button onClick={handleOpen}  >
                <ListItemIcon>
                <PersonAdd/>
                </ListItemIcon>
            </Button>
        </Container>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <PackageInputForm    title={title}
          name={name}
          endpoint={endpoint}
          token={token}
          isEditing={isEditing}
          setOpen={setOpen}
          initialData={initialData} />
      </Modal>
    </>
  );
}