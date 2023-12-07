import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { Autocomplete, Checkbox } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const TourType = ({ setSelectedTypies, selectedTypies }) => {
    const tourTypeOptions = [
        "International",
        "Domestic",
    ];
    useEffect(() => {
        setSelectedTypies(selectedTypies);
    }, [selectedTypies, setSelectedTypies]);

    return (
        <Autocomplete
            multiple
            id="checkboxes-tags-demo"
            options={tourTypeOptions}
            disableCloseOnSelect
            onChange={(event, newValue) => {
                setSelectedTypies(newValue);
            }}
            value={selectedTypies}
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
                <TextField {...params} label="Tour Type" placeholder="Select Type" />
            )}
        />
    );
};

export default TourType;
