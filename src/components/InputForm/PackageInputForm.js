import { Box, Button, Container, MenuItem, TextField, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react';
import usePostData from '../../services/api/usePostData';
import { useFormik } from 'formik';
import TourOperatorList from './touroperatorList';
import DestinationList from './destinationList';
import TourCategory from './TourCategory';
import TourType from './TourType';
import usePutData from '../../services/api/usePutData';


function PackageInputForm({title,name,endpoint,isEditing,apitoken,setOpen,initialData}) {
 
  const [selectedDestination, setSelectedDestination] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTourOperator, setSelectedTourOperators] = useState([]);
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
          packageName: initialData.packageName ,// Set initial values for editing mode
          stayDuration:initialData.stayDuration,
          touristType: initialData.touristType,
          packageForDorInter: initialData.packageForDorInter,
          packagePricePerPerson: initialData.packagePricePerPerson,
          maxGroup: initialData.maxGroup,
          packageDescription: initialData.packageDescription,
          departureDates: initialData.departureDates,
          destinations: initialData.destinations,
          tourOpertaor: initialData.tourOpertaor,
        }
      : {
        packageName: "",
        stayDuration: "",
        touristType: [],
        packageForDorInter: [],
        packagePricePerPerson: " ",
        maxGroup: " ",
        packageDescription: " ",
        departureDates: " ",
        destinations: [],
        tourOpertaor:  []
        };
    
    const InputData = useFormik({
      initialValues,
      // ... other form configuration options
    });

      const packagePayload = 
      {
        "packageName": InputData.values.packageName,
        "stayDuration": InputData.values.stayDuration,
        "packagePricePerPerson": InputData.values.packagePricePerPerson,
        "maxGroup": InputData.values.maxGroup,
        "packageDescription": InputData.values.packageDescription,
        "departureDates": InputData.values.departureDates,
        "destinations": selectedDestination,
        "touristType": selectedCategories,
        "packageForDorInter": selectedTypies,
        "tourOpertaor": selectedTourOperator
      }

      const { mutate: postMutate, isLoading: postIsLoading,isSuccess:postIsSuccess, isError: postIsError, error: postError } = usePostData(endpoint, apitoken, InputData);
      const { mutate: putMutate, isLoading: putIsLoading, isSuccess:putIsSuccess,   isError: putIsError, error: putError } = usePutData(endpoint, apitoken, InputData);
     const handleSave = (e)=>{
        e.preventDefault();
        isEditing? putMutate(packagePayload):postMutate(packagePayload);
        console.log(packagePayload);
      }


  return (
    <div>
      <Box sx={style}>
        <Typography my={3} id="modal-modal-title" variant="h6" component="h2">
          Please fill the following information to register Package
        </Typography>

        <Container
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          <TextField style={{margin:'10px' }}  value={InputData.values.packageName} name='packageName' onChange={InputData.handleChange}  fullWidth helperText="Package Name" />
          <TextField style={{margin:'10px' }}  value={InputData.values.maxGroup} name='maxGroup' onChange={InputData.handleChange}  fullWidth helperText="max number of Traveller" />

        </Container>

        <Container style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", }} >
          <TextField style={{margin:'10px' }} value={InputData.values.stayDuration} name='stayDuration' onChange={InputData.handleChange} fullWidth  helperText="duration of stay" />
          <TourOperatorList selectedTourOperator={selectedTourOperator} setSelectedTourOperators={setSelectedTourOperators} />
        </Container>


        <Container style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", }} >
        <DestinationList setSelectedDestination={setSelectedDestination} selectedDestination={selectedDestination} />
        </Container>

        <Container style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", }} >
        <TextField style={{margin:'10px' }} value={InputData.values.departureDates} name='departureDates' onChange={InputData.handleChange} fullWidth type="date"  helperText="schedule" />
        <TourType selectedTypies={selectedTypies} setSelectedTypies={setSelectedTypies} tourTypeOptions={tourTypeOptions} />
        </Container>

        <Container style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", }} >
        <TourCategory selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} tourCategoryOptions={tourCategoryOptions} />
        <TextField  style={{margin:'10px' }}  value={InputData.values.packagePricePerPerson} name='packagePricePerPerson' onChange={InputData.handleChange} fullWidth  helperText="package price perperson" />
        </Container>


        <Container style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", }}>
        <textarea style={{margin:'10px' }} value={InputData.values.packageDescription} name='packageDescription' onChange={InputData.handleChange} fullWidth  helperText="package describton" 
                  variant='outlined' 
                  multiline
                  minRows={4}
                  size='small' />
        </Container>
        

       
        <Container style={{display:'flex',justifyContent:'space-between', marginTop:'10px'}}>
            <Button onClick={()=>setOpen(false)} >Cancle</Button>
            <Button onClick={handleSave}>{postIsLoading?"Saving..":"Save"}</Button>
            <h3>{postIsSuccess?"SuccessFull registered": ""}</h3>
            
          </Container>
      </Box>
    </div>
  )
}

export default PackageInputForm
