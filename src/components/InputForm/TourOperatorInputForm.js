import { Box, Button, Container, MenuItem, TextField, Typography } from '@mui/material'
import React from 'react'
import usePostData from "../../services/api/usePostData";

import DestinationList from "./destinationList"
import { useState } from "react";
import { useFormik } from "formik";
import TourCategory from './TourCategory';
import TourType from './TourType';
import usePutData from '../../services/api/usePutData';


function TourOperatorInputForm({title,name,endpoint,isEditing,apitoken,setOpen,initialData}) {

  const [selectedDestination, setSelectedDestination] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTypies, setSelectedTypies] = useState([]);


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

  const tourTypeOptions  = [
    "International",
    "Demostic",
  ];

  const tourCategoryOptions = [
    "Hiking",
    "Camping",
    "Lodge",
    "Water body",
    "Birds",
    "Wild Animals",
    "Agronimies",
    "Parks",
    "Mountains",
  ];

  const initialValues = isEditing
  ? {
      tourOrgName: initialData.tourOrgName,
      ownerFullName: initialData.ownerFullName,
      ownerAddress: initialData.ownerAddress,
      email: initialData.email,
      touristType: initialData.touristType,
      phoneNum: initialData.phoneNum,
      tourCategory: initialData.tourCategory,
      foundAt: initialData.foundAt,
      tinNum: initialData.tinNum,
      destinantions: initialData.destinations,
    }
  : {
    tourOrgName: "",
    ownerFullName: "",
    ownerAddress: "",
    email: "",
    touristType: [],
    phoneNum: " ",
    tourCategory: [],
    foundAt: " ",
    tinNum: " ",
    destinantions: []
    };

const InputData = useFormik({
  initialValues,
  // ... other form configuration options
});


  const touroperatorPayload =
  {
    "tourOrgName": InputData.values.tourOrgName,
    "ownerFullName": InputData.values.ownerFullName,
    "ownerAddress": InputData.values.ownerAddress,
    "email": InputData.values.email,
    "phoneNum": InputData.values.phoneNum,
    "tourCategory": selectedCategories,
    "touristType": selectedTypies,
    "foundAt": InputData.values.foundAt,
    "tinNum": InputData.values.tinNum,
    "destinations": selectedDestination
  }
  const { mutate: postMutate, isLoading: postIsLoading,isSuccess:postIsSuccess, isError: postIsError, error: postError } = usePostData(endpoint, apitoken, InputData);
  const { mutate: putMutate, isLoading: putIsLoading, isSuccess: putIsSuccess, isError: putIsError, error: putError } = usePutData(endpoint, apitoken, InputData);

  const handleSave = (e) => {
    e.preventDefault();
    isEditing ? putMutate(touroperatorPayload):postMutate(touroperatorPayload);

    console.log(touroperatorPayload);
  }


  return (
    <div>
      <Box sx={style}>
        <Typography my={3} id="modal-modal-title" variant="h6" component="h2">
          Please fill the following information to register Tour Operator
        </Typography>

        <Container
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          <TextField style={{ margin: '10px' }} value={InputData.values.tourOrgName} name='tourOrgName' onChange={InputData.handleChange} fullWidth helperText="Tour org Name" />
          <TextField style={{ margin: '10px' }} value={InputData.values.ownerFullName} name='ownerFullName' onChange={InputData.handleChange} fullWidth helperText="owner full name" />
          <TextField style={{ margin: '10px' }} value={InputData.values.ownerAddress} name='ownerAddress' onChange={InputData.handleChange} fullWidth helperText="owner Address" />

        </Container>

        <Container
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          <TextField style={{ margin: '10px' }} value={InputData.values.email} name='email' onChange={InputData.handleChange} fullWidth type='email' helperText="Email" />
          <TextField style={{ margin: '10px' }} value={InputData.values.phoneNum} name='phoneNum' onChange={InputData.handleChange} fullWidth type='phone' helperText="Phone Number" />
           

        </Container>


        <Container
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          <TextField style={{ margin: '10px' }} value={InputData.values.foundAt} name='foundAt' onChange={InputData.handleChange} fullWidth type="date" helperText=" Please select Operator found at"  ></TextField>
          <TourCategory selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} tourCategoryOptions={tourCategoryOptions} />
          <TourType selectedTypies={selectedTypies} setSelectedTypies={setSelectedTypies} tourTypeOptions={tourTypeOptions} />
          
        </Container>

        <Container
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          <TextField style={{ margin: '10px' }} value={InputData.values.tinNum} name='tinNum' onChange={InputData.handleChange} fullWidth helperText='tinNumber' />
          <DestinationList setSelectedDestination={setSelectedDestination} selectedDestination={selectedDestination} />
        </Container>

        <Container style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
          <Button onClick={()=>setOpen(false)} >Cancle</Button>
          <Button onClick={handleSave}>{postIsLoading || putIsLoading  ? "Saving.." : "Save"}</Button>
          <h3>{postIsSuccess || putIsSuccess ? "SuccessFull registered" :postIsError || putIsError}</h3>

        </Container>
      </Box>
    </div>
  )
}




export default TourOperatorInputForm




