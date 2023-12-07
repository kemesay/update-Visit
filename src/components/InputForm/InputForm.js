import { Box, Button, Container, Input, TextField, Typography } from '@mui/material'
import React from 'react'
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { useFormik } from 'formik';
import usePostData from '../../services/api/usePostData';
import usePutData from '../../services/api/usePutData';

function InputForm({title,name,endpoint,isEditing,apitoken,setOpen,initialData}) {
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

      const initialValues = isEditing
  ? {
      name: initialData.name ,// Set initial values for editing mode
      address:initialData.address,
      longitude: initialData.longitude,
      latitude: initialData.latitude,
      description: initialData.description,
    }
  : {
      name: "", // Set initial values for non-editing (adding) mode
      address: "",
      longitude: 0.0,
      latitude: 0.0,
      description: "",
    };

const InputData = useFormik({
  initialValues,
  // ... other form configuration options
});
      
      const destinantionPayload = {
        "name": InputData.values.name,
        "latitude": InputData.values.latitude,
        "longitude": InputData.values.longitude,
        "address": InputData.values.address,
        "description":InputData.values.description
    }

    const bankPayload = 
    {
      "name": InputData.values.name,
      "address": InputData.values.address,
      "latitude": InputData.values.latitude,
      "longitude": InputData.values.longitude,
      "description": InputData.values.description
    }
    const hotelPayload = 
    {
    "name": InputData.values.name,
    "latitude": InputData.values.latitude,
    "longitude": InputData.values.longitude, 
    "address": InputData.values.address,
    "description": InputData.values.description,
    }
    const officePayload = 
    {
    "name": InputData.values.name,
    "latitude": InputData.values.latitude,
    "longitude": InputData.values.longitude,
    "address": InputData.values.address,
    "description": InputData.values.description
    }

      const { mutate: postMutate, isLoading: postIsLoading,isSuccess:postIsSuccess, isError: postIsError, error: postError } = usePostData(endpoint, apitoken, InputData);
       const { mutate: putMutate, isLoading: putIsLoading, isError: putIsError, error: putError } = usePutData(endpoint, apitoken, InputData);

      const handleSaved = async (e)=>{
        
        e.preventDefault();

        if( title === 'Destinanation'){
          isEditing? putMutate(destinantionPayload):postMutate(destinantionPayload);
        } else if(title === "Hotels"){
         isEditing? putMutate(hotelPayload):  postMutate(hotelPayload);
          console.log(hotelPayload);
        } else if(title === "Banks"){
          isEditing? putMutate(bankPayload):  postMutate(bankPayload);
        } else if(title === "Office"){
          isEditing? putMutate(officePayload): postMutate(officePayload);
        }
      }

  return (
    <div>
      <Box sx={style}>
          <Typography my={3} id="modal-modal-title" variant="h6" component="h2">
            Please  fill the following  information  to register {title}
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
         <TextField  value={InputData.values.description} name='description' onChange={InputData.handleChange} label='Description' variant='outlined' fullWidth
          multiline
          minRows={4}
          size='small'
         />
         </Container>
          <Container style={{display:'flex',justifyContent:'space-between', marginTop:'10px'}}>
            <Button onClick={()=>setOpen(false)} >Cancle</Button>
            <Button onClick={handleSaved}>{postIsLoading?"Saving..":"Save"}</Button>
            <h3>{postIsSuccess?"SucceshandleSavedsFull registered": ""}</h3>
            
          </Container>
          {/* <h2 style={{color:'red'}}>{isError? `${error?.message}`: ''}</h2> */}
        </Box>
    </div>
  )
}

export default InputForm