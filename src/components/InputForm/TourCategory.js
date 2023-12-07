import React, { useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { Autocomplete, Checkbox } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;


const TourCategory = ({ setSelectedCategories, selectedCategories  }) => {
    const tourCategoryOptions  = [
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
    useEffect(() => {
        setSelectedCategories(selectedCategories);
    }, [selectedCategories, setSelectedCategories]);

    return (
        <Autocomplete
        multiple
        id="checkboxes-tags-demo"
        options={tourCategoryOptions}
        disableCloseOnSelect
        onChange={(event, newValue) => {
            setSelectedCategories(newValue);
        }}
        value={selectedCategories}
        getOptionLabel={(option) => option}
        renderOption={(props, option, { selected }) => (
            <li {...props}>
                <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                />
                {option}
            </li>
        )}
        style={{ width: 500 }}
        renderInput={(params) => (
            <TextField {...params} label="Tour Category" placeholder="Select Category" />
        )}
    />
    );
};

export default TourCategory;
