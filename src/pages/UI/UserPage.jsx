import {
    MRT_EditActionButtons,
    MaterialReactTable,
    useMaterialReactTable,
  } from "material-react-table";

  import React, { useMemo, useState } from "react";
  // import { validateUser } from "../utils/validation";
  import { useCreate } from "../../services/hooks/useCreate";
  import { useGet } from "../../services/hooks/useGet";
  import { useUpdate } from "../../services/hooks/useUpdate";
  import { useDelete } from "../../services/hooks/useDelete";
  import {
    Box,
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Tooltip,
    FormControlLabel,
    MenuItem,
    Switch,
    TextField,

  } from "@mui/material";
  import EditIcon from "@mui/icons-material/Edit";
  import DeleteIcon from "@mui/icons-material/Delete";
import { useFormik } from "formik";
import CountrySelect from "../../components/InputForm/CountrySelect";
import MultiSelect from "../../components/InputForm/selectrole";

  
  function UserPage() {
    const [validationErrors, setValidationErrors] = useState({});
    const [isEditing, setIsEditing] = React.useState(false);

    const [selectedCountry, setSelectedCountry] = useState("Ethiopia");
    const [selectedRoles, setSelectedRoles] = useState();
    const [checked, setChecked] = React.useState(false);
  
  
    const roleOptions = [
      'admin',
      'Market Analyst',
      'employee',
      'Tour Operator',
      'System Admin',
             ];
    const gender = [
    {
      value: "Male",
      label: "Male",
    },
    {
      value: "Female",
      label: "Female",
    },
    ];
    const columns = useMemo(
      () => [
        {
          accessorKey: "userId",
          header: "Id",
          enableEditing: false,
          size: 80,
        },
        {
          accessorKey: "username",
          header: "username",
          
        },
        {
          accessorKey: "isEnabled",
          editVariant:'select',
          editSelectOptions:["True",'False'],
          header: "status",
          Cell: ({ cell }) => <div style={cell.getValue() ? {backgroundColor: 'green' } : {backgroundColor: 'red'}}>{cell.getValue() ? "active" : "suspended"}</div>,
        },
      
        {
          accessorKey: "fullName",
          header: "Full Name",
          muiEditTextFieldProps: {
            // required: true,
            // error: !!validationErrors?.fullName,
            // helperText: validationErrors?.fullName,
            // //remove any previous validation errors when user focuses on the input
            // onFocus: () =>
            //   setValidationErrors({
            //     ...validationErrors,
            //     firstName: undefined,
            //   }),
            //optionally add validation checking for onBlur or onChange
          },
        },
        {
          accessorKey: "email",
          header: "Email",
          muiEditTextFieldProps: {
            // type: "email",
            // required: true,
            // error: !!validationErrors?.email,
            // helperText: validationErrors?.email,
            // //remove any previous validation errors when user focuses on the input
            // onFocus: () =>
            //   setValidationErrors({
            //     ...validationErrors,
            //     lastName: undefined,
            //   }),
          },
        },
        {
          accessorKey: "roles",
          header: "Roles",
          editVariant:'select',
          editSelectOptions:roleOptions,
          Cell: ({ cell }) => {
            const roles = cell.getValue();
        
            // Check if roles is an array and not empty
            if (Array.isArray(roles) && roles.length > 0) {
              return (
                <div>
                  {roles.map((role, index) => (
                    <div key={index}>
                      <div>{role.roleName}</div>
                      {/* <div>{role.description}</div> */}
                      {/* Add other properties as needed */}
                    </div>
                  ))}
                </div>
              );
            } else if (!roles) {
              return <div>No roles</div>;
            } else {
              // Single role case
              return (
                <div>
                  <div>{roles.roleName}</div>
                  {/* <div>{roles.description}</div> */}
                  {/* Add other properties as needed */}
                </div>
              );
            }
          },
        },
        
       
        {
          accessorKey: "address.country",
          header: "Address",
          enableEditing: false,
          
        },
       
      ],
      [roleOptions, validationErrors]
    );

    

    const [selectedUserId, setSelectedUserId] = useState(null);

    const initialValues = {
      username: "",
      password: "",
      fullName: "",
      email: "",
      emailConfirmed: true,
      phoneNum: " ",
      gender: " ",
      birthDate: " ",
      twoFactorEnabled: false,
      isEnabled: false,
      address: {
        country: "",
        city: "",
        subCity: "",
        woreda: "",
        houseNumber: " ",
      },
      roles: [],
    };

    const InputData = useFormik({
      initialValues,
      // ... other form configuration options
    });
  
    const userpayload = {
      username: InputData.values.username,
      password: InputData.values.password,
      fullName: InputData.values.fullName,
      phoneNum: InputData.values.phoneNum,
      address: {
        country: selectedCountry,
        city: InputData.values.city,
        subCity: InputData.values.subCity,
        houseNum: InputData.values.houseNum,
        woreda: InputData.values.woreda,
      },
      gender: InputData.values.gender,
      roles: selectedRoles, // Pass selected roles here
      twoFactorEnabled: InputData.values.twoFactorEnabled,
      emailConfirmed: InputData.values.emailConfirmed,
      isEnabled: isEditing ? checked : InputData.values.isEnabled,
      birthDate: InputData.values.birthDate,
      email: InputData.values.email,
    };
  
    //call CREATE hook
    const { mutateAsync: createUser, isPending: isCreatingUser } = useCreate('manageAdmins/createUser');
    //call READ hook
    const {
      data: fetchedUsers,
      isError: isLoadingUsersError,
      isFetching: isFetchingUsers,
      isLoading: isLoadingUsers,
    } = useGet("manageAdmins/getUsers");
    //call read hook of role api
  
    //call UPDATE hook
    const { mutateAsync: updateUser, isPending: isUpdatingUser } = useUpdate(`manageAdmins/edit/${selectedUserId}`);
    //call DELETE hook
    const { mutateAsync: deleteUser,  isPending: isDeletingUser } = useDelete(`manageAdmins/delete/user/${selectedUserId}`);
    const handleDeleteUser = async (row ) => {
      
      // setUserId(row.original.id);
      if(window.confirm("Are you sure you want to delete this user?")){
        await deleteUser();
        console.log("heeeerrrrrrrrrrrrrrrrrrr not delete")
        table.setEditingRow(null);
      }
    
    }
    //CREATE action
    const handleCreateUser = async ({ values, table }) => {
      
      // const newValidationErrors = validateUser(values);
      // if (Object.values(newValidationErrors).some((error) => error)) {
      //   setValidationErrors(newValidationErrors);
      //   return;
      // }
      // setValidationErrors({});
  
    //   const transformedData = {
    //     "password": "123456", // Replace with the actual password value
    //     "roleName": values.role,
    //     "fullName": values.fullName,
    //     "email": values.email
    // };

    console.log(userpayload)
      await createUser(userpayload);
      table.setCreatingRow(null); //exit creating mode
    };
  
    //UPDATE action
    const handleSaveUser = async ({ values, table }) => {
      // const newValidationErrors = validateUser(values);
      // if (Object.values(newValidationErrors).some((error) => error)) {
      //   setValidationErrors(newValidationErrors);
      //   return;
      // }
      // setValidationErrors({});
      console.log(values)
      setSelectedUserId(values?.userId)
      const data = {
        fullName: values.fullName,
        email:values.email,
        address:values.address,
        roles: [ {
          "roleName": values.roles
      }],
      isEnabled:values.isEnabled
      };
      
      await updateUser(data);
      table.setEditingRow(null); //exit editing mode
    };
  
    
  
    const table = useMaterialReactTable({
      columns,
      data: fetchedUsers || [],
      createDisplayMode: "modal", 
      editDisplayMode: "modal", 
      enableEditing: true,
      positionActionsColumn: "last",
      getRowId: (row) => row.id,
      muiToolbarAlertBannerProps: isLoadingUsersError
        ? {
            color: "error",
            children: "Error loading data",
          }
        : undefined,
      muiTableContainerProps: {
        sx: {
          minHeight: "500px",
        },
      },
      onCreatingRowCancel: () => setValidationErrors({}),
      onCreatingRowSave: handleCreateUser,
      onEditingRowCancel: () => setValidationErrors({}),
      onEditingRowSave: handleSaveUser,
   
      renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
        <>
          <DialogTitle variant="h5">Create New User</DialogTitle>
          <DialogContent
            sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {/* {internalEditComponents} or render custom edit components here */}
            {/* <Container style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}> */}

            <TextField
            style={{ margin: "10px" }}
            value={InputData.values.username}
            name="username"
            onChange={InputData.handleChange}
            fullWidth
            type="userName"
            helperText="userName"
          />
          <TextField
            style={{ margin: "10px" }}
            value={InputData.values.password}
            name="password"
            onChange={InputData.handleChange}
            fullWidth
            type="password"
            helperText=" password"
          />
          <TextField
            style={{ margin: "10px" }}
            value={InputData.values.fullName}
            name="fullName"
            onChange={InputData.handleChange}
            fullWidth
            type="fullNmae"
            helperText="fullName"
          />
        {/* </Container> */}

        {/* <Container
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        > */}
          <TextField
            style={{ margin: "10px" }}
            value={InputData.values.email}
            name="email"
            onChange={InputData.handleChange}
            fullWidth
            type="email"
            helperText="Email"
          />
          <TextField
            style={{ margin: "10px" }}
            value={InputData.values.birthDate}
            name="birthDate"
            onChange={InputData.handleChange}
            fullWidth
            type="date"
            label=""
            helperText="DOB"
          />

          <FormControlLabel
            control={
              <Switch
                value={isEditing ? checked : InputData.values.isEnabled}
                name="isEnabled"
                onChange={
                  isEditing
                    ? (event) => setChecked(event.target.checked)
                    : InputData.handleChange
                }
              />
            }
            label="Enabled"
          />
        {/* </Container> */}
        {/* <Container
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        > */}
          <TextField
            style={{ margin: "10px" }}
            fullWidth
            id="outlined-select-gender"
            value={InputData.values.gender}
            name="gender"
            onChange={InputData.handleChange}
            select
            label="Select"
            defaultValue="Male"
            helperText="Please select gender"
          >
            {gender.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <MultiSelect
            style={{ margin: "10px" }}
            selectedRoles={selectedRoles}
            setSelectedRoles={setSelectedRoles}
            roleOptions={roleOptions}
          />
          <FormControlLabel
            style={{ margin: "10px" }}
            control={
              <Switch
                value={InputData.values.twoFactorEnabled}
                name="twoFactorEnabled"
                onChange={InputData.handleChange}
              />
            }
            label="Two Factor Authentication"
          />
          {/* <FormControlLabel label="Is Active" control={<Switch value={InputData.values.isActive} name='isActive' onChange={InputData.handleChange} />} /> */}
        {/* </Container> */}
        {/* <Container style={{ display: "flex", justifyContent: "space-between" }}> */}
          <CountrySelect
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
          />
          <TextField
            style={{ margin: "10px" }}
            value={InputData.values.city}
            name="city"
            onChange={InputData.handleChange}
            fullWidth
            helperText="city"
          />
          <TextField
            style={{ margin: "10px" }}
            value={InputData.values.subCity}
            name="subCity"
            onChange={InputData.handleChange}
            fullWidth
            helperText="sub city"
          />
        {/* </Container> */}
        {/* <Container style={{ display: "flex", justifyContent: "space-between" }}> */}
          <TextField
            style={{ margin: "10px" }}
            value={InputData.values.houseNum}
            name="houseNum"
            onChange={InputData.handleChange}
            fullWidth
            helperText="houseNum"
          />
          <TextField
            style={{ margin: "10px" }}
            value={InputData.values.woreda}
            name="woreda"
            onChange={InputData.handleChange}
            fullWidth
            helperText="Woreda"
          />
          <TextField
            style={{ margin: "10px" }}
            value={InputData.values.phoneNum}
            name="phoneNum"
            onChange={InputData.handleChange}
            fullWidth
            helperText="phone Number"
          />
          {/* </Container> */}
        </DialogContent>
          <DialogActions>
            <MRT_EditActionButtons variant="text" table={table} row={row} />
          </DialogActions>
        </>
      ),
      //optionally customize modal content
      renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
        <>
          <DialogTitle variant="h3">Edit User</DialogTitle>
          <DialogContent
            sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            {internalEditComponents}
          </DialogContent>
          <DialogActions>
            <MRT_EditActionButtons variant="text" table={table} row={row} />
          </DialogActions>
        </>
      ),
      renderRowActions: ({ row, table }) => (
        <Box sx={{ display: "flex", gap: "1rem" }}>
          <Tooltip title="Edit">
            <IconButton onClick={() => table.setEditingRow(row)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton onClick={() => handleDeleteUser(row)}>
            <DeleteIcon />         
               </IconButton>
          
          </Tooltip>
        
        </Box>
      ),
      renderTopToolbarCustomActions: ({ table }) => (
        <Button
          variant="contained"
          onClick={() => {
            table.setCreatingRow(true); 
          }}
        >
          Create New User
        </Button>
      ),
  
      state: {
        isLoading: isLoadingUsers,
        isSaving: isCreatingUser || isUpdatingUser || isDeletingUser,
        showAlertBanner: isLoadingUsersError,
        showProgressBars: isFetchingUsers,
      },
    });
  
    return <MaterialReactTable table={table} />;
  }
  
  export default UserPage;
  