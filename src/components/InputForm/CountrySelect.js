import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const CountrySelect = ({setSelectedCountry,selectedCountry}) => {
  const [countries, setCountries] = useState([]);
//   const [selectedCountry, setSelectedCountry] = useState('Ethiopia'); // Default selected country

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v2/all');
        const countriesData = response.data;

        const formattedCountries = countriesData.map(country => ({
          value: country.name,
          label: country.name,
        }));

        setCountries(formattedCountries);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  const handleCountryChange = event => {
    setSelectedCountry(event.target.value);
  };

  return (
    <TextField
      fullWidth
      id="outlined-select-country"
      select
      
      value={selectedCountry}
      onChange={handleCountryChange}
      helperText="Please select Country"

     
    >
      {countries.map(option => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default CountrySelect;
