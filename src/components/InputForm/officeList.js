import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { Autocomplete, Checkbox } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { host } from "../../constants";



const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;


const OfficeList = ({ setSelectedOffice, selectedOffice }) => {
  const [offices, setOffices] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  //   const [selectedCountry, setSelectedCountry] = useState('Ethiopia'); // Default selected country

  useEffect(() => {
    const fetchOffices = async () => {
      try {
        const response = await axios.get(`${host}/office/getOffices`);
        const officeData = response.data;
        const formattedOffices = officeData.map(office => (

          office.name
        )

        );
        setOffices(officeData);

        
      } catch (error) {
        console.error('Error fetching offices:', error);
      }
    };

    fetchOffices();
  }, []);


  console.log(selectedOptions);
  const handleOptionToggle = (option) => () => {
  };

    useEffect(() => {
    
    setSelectedOffice(selectedOptions.map(item => ({ "officeId": item.officeId})));
    
  }, [selectedOptions]);

  return (
    <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      options={offices}
      disableCloseOnSelect
     
      onChange={(event, newValue) => setSelectedOptions(newValue)}

      getOptionLabel={(option) => option.name}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
            
          />
          {option.name}
        </li>
      )}
      style={{ width: 500 }}
      renderInput={(params) => (
        <TextField {...params} label="Assign office" placeholder="Head quarter office" />
      )}
    />

  );
};
export default OfficeList;
