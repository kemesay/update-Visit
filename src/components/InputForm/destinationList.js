import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { Autocomplete, Checkbox } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { host } from "../../constants";



const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;


const DestinationList = ({ setSelectedDestination, selectedDestination }) => {
  const [destinations, setDestinations] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  //   const [selectedCountry, setSelectedCountry] = useState('Ethiopia'); // Default selected country

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await axios.get(`${host}/destination/getDestinations`);
        const destinationData = response.data;
        const formattedDestinations = destinationData.map(destination => (

          destination.destinationName
        )

        );
        setDestinations(destinationData);

        
      } catch (error) {
        console.error('Error fetching destinations:', error);
      }
    };

    fetchDestinations();
  }, []);


  // console.log(selectedOptions);
  // const handleOptionToggle = (option) => () => {
  // };

    useEffect(() => {
    
    setSelectedDestination(selectedOptions.map(item => ({ "destinationId": item.destinationId })));
    
  }, [selectedOptions]);

  return (
    <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      options={destinations}
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
        <TextField {...params} label="Assign Destination to tour Operator" placeholder="Bale Mountains" />
      )}
    />

  );
};
export default DestinationList;
