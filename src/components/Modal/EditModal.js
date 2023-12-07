import * as React from 'react';
// import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Box, Container, ListItemIcon, TextField, Typography} from '@mui/material';
import { PersonAdd } from '@mui/icons-material';
// import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { useFormik } from 'formik';

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



export default function EditMOdal({title,name,endpoint,token}) {

    const InputData = useFormik({
        initialValues: {
          name: "",
          address:"",
          longitude: 0.0,
          latitude: 0.0,
          description:""
        },
      });
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleUpdate = ()=>{

  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100',
    bgcolor: 'background.paper',
  //   border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  

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

<div>
      <Box sx={style}>
          <Typography my={3} id="modal-modal-title" variant="h6" component="h2">
            Please  fill the following  information  to update {title}
          </Typography>

          <Container style={{display:'flex',justifyContent:'space-between', marginBottom:'10px'}} >
            <TextField value={InputData.values.name} name='name' onChange={InputData.handleChange}  fullWidth label={name} />
            <TextField value={InputData.values.address} name='address' onChange={InputData.handleChange}  fullWidth label='Address' />
            </Container>

          <Container style={{display:'flex',justifyContent:'space-between',marginBottom:'10px'}}> 
            <TextField value={InputData.values.longitude} name='longitude' onChange={InputData.handleChange} label='longitude' id="fullWidth" />
            <AddCircleRoundedIcon style={{marginTop:'10px'}}/>
          <TextField value={InputData.values.latitude} name='latitude' onChange={InputData.handleChange} label='latitude' id="fullWidth" />
          </Container>

         <Container>
         <TextField
         value={InputData.values.description}
         name='description'
         onChange={InputData.handleChange}
         label='Description'
  variant='outlined'
  fullWidth
  multiline
  minRows={4}
  size='small'
/>
         </Container>
          <Container style={{display:'flex',justifyContent:'space-between', marginTop:'10px'}}>
            <Button>Cancle</Button>
            <Button onClick={handleUpdate}>Update</Button>
           
            
          </Container>

          
        </Box>
    </div>
        
      </Modal>
    </>
  );
}