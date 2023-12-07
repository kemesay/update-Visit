import { Box, Button, Container, MenuItem, TextField, Typography } from '@mui/material'
import React from 'react'
import { useState } from 'react';
import { useFormik } from 'formik';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import usePostData from '../../services/api/usePostData';
import OfficeList from './officeList';
import usePutData from '../../services/api/usePutData';

function EmployeeInputForm({title,name,endpoint,isEditing,apitoken,setOpen,initialData}) {

    const [selectedoffice, setSelectedOffice] = useState([]); 


    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "100",
        bgcolor: "background.paper",
        //   border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };
    
      
    const gender = [
        {
          value: 'Male',
          label: 'Male',
        },
        {
          value: 'Female',
          label: 'Female',
        },
      
      ];
      const InputData1 = useFormik({
        initialValues: {
           firstName: "",
           middleName: "", 
           lastName: "",
           address: "",
           email: "",
           phoneNum: "",
           Address: "",
           gender: "",
           birthDate: "",
           isActive: "",
          
        },
      });

      const initialValues = isEditing
      ? {
          firstName: initialData.firstName ,// Set initial values for editing mode
          middleName: initialData.middleName,
          lastName: initialData.lastName,
          email: initialData.email,
          phoneNum: initialData.phoneNum,
          address: initialData.address,
          gender: initialData.gender,
          birthDate: initialData.birthDate,
          isActive: initialData.isActive,          
        }
      : {
        firstName: "",
        middleName: "",
        lastName: " ",
        email: "",
        phoneNum: " ",
        address: " ",
        gender: " ",
        birthDate: " ",
        isActive: "",
        };
    
    const InputData = useFormik({
      initialValues,
      // ... other form configuration options
    });



      
      const employeePayload = 
          {
    "firstName":  InputData.values.firstName,
    "middleName": InputData.values.middleName,
    "lastName":   InputData.values.lastName,
    "email":      InputData.values.email,
    "phoneNum":   InputData.values.phoneNum,
    "address":    InputData.values.address,
    "gender":     InputData.values.gender,
    "birthDate":  InputData.values.birthDate,
    "isActive":   InputData.values.isActive,
    "office":     selectedoffice
          }
      
          const { mutate: postMutate, isLoading: postIsLoading,isSuccess:postIsSuccess, isError: postIsError, error: postError } = usePostData(endpoint, apitoken, InputData);
          const { mutate: putMutate, isLoading: putIsLoading, isError: putIsError, error: putError } = usePutData(endpoint, apitoken, InputData);
              
      const handleSave = (e)=>{
        e.preventDefault();
        isEditing? putMutate(employeePayload):postMutate(employeePayload);      
        console.log(employeePayload);
      }


  return (
    <div>
      <Box sx={style}>
        <Typography my={3} id="modal-modal-title" variant="h6" component="h2">
          Please fill the following information to register Employee
        </Typography>

        <Container
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          <TextField style={{margin:'10px' }} value={InputData.values.firstName} name='firstName' onChange={InputData.handleChange}  fullWidth type='firstName' helperText="First Name" />
          <TextField style={{margin:'10px' }}  value={InputData.values.middleName} name='middleName' onChange={InputData.handleChange}  fullWidth type='middleName' helperText="Middle Name" />
          <TextField style={{margin:'10px' }} value={InputData.values.lastName} name='lastName' onChange={InputData.handleChange}  fullWidth type='lastName' helperText="Last Name" />
        </Container>

        <Container
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          <TextField style={{margin:'10px' }} value={InputData.values.email} name='email' onChange={InputData.handleChange}  fullWidth type='email' helperText="Email" />
          <TextField style={{margin:'10px' }} value={InputData.values.phoneNum} name='phoneNum' onChange={InputData.handleChange}  fullWidth type='phone' helperText="Phone Number" />
          <TextField style={{margin:'10px' }} value={InputData.values.birthDate} name='birthDate' onChange={InputData.handleChange}  fullWidth  type="date" helperText="Please select birth date"  ></TextField>
        
        </Container>
        <Container
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          <OfficeList setSelectedOffice={setSelectedOffice} selectedoffice={selectedoffice} />
          <TextField style={{margin:'10px' }} value={InputData.values.address} name='address' onChange={InputData.handleChange}  fullWidth type='address' helperText="Address" />
          <TextField style={{margin:'10px' }} value={InputData.values.gender} name='gender' onChange={InputData.handleChange}  
          id="outlined-select-gender"
          select
          defaultValue="Male"
          helperText="Please select gender"
        >
          {gender.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        </Container>
        
           <Container style={{display:'flex',justifyContent:'space-between', marginTop:'10px'}}>
            <Button>Cancle</Button>
            <Button onClick={handleSave}>{postIsLoading?"Saving..":"Save"}</Button>
            <h3>{postIsSuccess?"SuccessFull registered": ""}</h3>
            
          </Container>
          {/* <h2 style={{color:'red'}}>{isError? `${error?.message}`: ''}</h2> */}
        </Box>
    </div>
  )
}

export default EmployeeInputForm
