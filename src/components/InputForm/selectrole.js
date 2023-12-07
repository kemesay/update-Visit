import React, { useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { Autocomplete, Checkbox } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const MultiSelect = ({ setSelectedRoles, selectedRoles }) => {
    const roleOptions = [
        'admin',
        'Market Analyst',
        'employee',
        'Tour Operator',
    ];

    useEffect(() => {
        // Update the parent component's state with the selected roles
        setSelectedRoles(selectedRoles);
    }, [selectedRoles, setSelectedRoles]);

    return (
        <Autocomplete
            multiple
            id="checkboxes-tags-demo"
            options={roleOptions}
            disableCloseOnSelect
            onChange={(event, newValue) => {
                setSelectedRoles(newValue); 
                console.log("newValue: ", newValue);
                var roles = []
                newValue.forEach(role => {
                    roles.push({ roleName: role })

                })
                setSelectedRoles(roles)
                console.log("roles ", roles);
            }}
            value={selectedRoles}
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
                <TextField {...params} label="Roles" placeholder="Select Roles" />
            )}
        />
    );
};

export default MultiSelect;
