import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { Autocomplete, Checkbox } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { host } from "../../constants";
import usePutData from '../../services/api/usePutData';




const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;


const TourOperatorList = ({ setSelectedTourOperators, selectedTourOperator }) => {
  const [tourOpertaor, setTourOperators] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    const fetchTourOperators = async () => {
      try {
        const response = await axios.get(`${host}/tourOper/getTourOPs`);
        const tourOperatorData = response.data;
        const formattedTourOperators = tourOperatorData.map(tourOperator => (

          tourOperator.tourOrgName
        )

        );
        setTourOperators(tourOperatorData);

        
      } catch (error) {
        console.error('Error fetching destinations:', error);
      }
    };

    fetchTourOperators();
  }, []);


  console.log(selectedOptions);
  const handleOptionToggle = (option) => () => {
  };

    useEffect(() => {
    
    setSelectedTourOperators(selectedOptions.map(item => ({ "tourOperatorId": item.tourOperatorId})));
    
  }, [selectedOptions]);

  return (
    <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      options={tourOpertaor}
      disableCloseOnSelect
     
      onChange={(event, newValue) => setSelectedOptions(newValue)}

      getOptionLabel={(option) => option.tourOrgName}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
            
          />
          {option.tourOrgName}
        </li>
      )}
      style={{ width: 500 }}
      renderInput={(params) => (
        <TextField {...params} label="Assign tour Operator" placeholder="Ethio visit Travel" />
      )}
    />

  );
};
export default TourOperatorList;
