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
  } from "@mui/material";
  import EditIcon from "@mui/icons-material/Edit";
  import DeleteIcon from "@mui/icons-material/Delete";

  
  
  function TouristPage() {
    const [validationErrors, setValidationErrors] = useState({});
    const [selectedTouristId,setSelectedTouristId] = useState(null)
  
    // const {
    //   data: roles,
    // } = useGet("/api/v1/roles");

    const roleNames = [
      'admin',
      'Market Analyst',
      'employee',
      'Tour Operator',
  ];
    // const roleNames = roleOptions?.map((role) => role.roleName);
  
    const columns = useMemo(
      () => [
        {
          accessorKey: "touristId",
          header: "Id",
          enableEditing: false,
          size: 80,
        },
        {
          accessorKey: "fullName",
          header: "Full name",
          
        },
        {
            accessorKey: "touristType",
            header: "Tourist Type",
            
          },

          {
            accessorKey: "phoneNum",
            header: "Phone Number",
            
          },

          {
            accessorKey: "visitedAt",
            header: "visited date",
            
          },

        {
          accessorKey: "country",
          header: "Country",
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
            type: "email",
            required: true,
            error: !!validationErrors?.email,
            helperText: validationErrors?.email,
            //remove any previous validation errors when user focuses on the input
            onFocus: () =>
              setValidationErrors({
                ...validationErrors,
                lastName: undefined,
              }),
          },
        },
        // {
        //   accessorKey: "role",
        //   header: "Role",
  
        //   editVariant: "select",
        //   editSelectOptions: roleNames,
        //   muiEditTextFieldProps: {
        //     // select: true,
        //     // error: !!validationErrors?.role,
        //     // helperText: validationErrors?.role,
        //   },
          
        // },
        
      
        {
          accessorKey: "updatedAt",
          header: "updatedAt",
          enableEditing: false,
          
        },
      ],
      [validationErrors]
    );

  
    //call CREATE hook
    const { mutateAsync: createUser, isPending: isCreatingUser } = useCreate('tourist/registerTourist');
    //call READ hook
    const {
      data: fetchedUsers,
      isError: isLoadingUsersError,
      isFetching: isFetchingUsers,
      isLoading: isLoadingUsers,
    } = useGet("tourist/getTourist");
    //call read hook of role api
  
    //call UPDATE hook
    const { mutateAsync: updateUser, isPending: isUpdatingUser } = useUpdate(`tourist/edit/${selectedTouristId}`);
    //call DELETE hook
    const { mutateAsync: deleteUser,  isPending: isDeletingUser } = useDelete(`tourist/delete/tourist/${selectedTouristId}`);
    const handleDeleteUser = async () => {
      
      // setUserId(row.original.id);
      // setSelectedTouristId(values?.touristId)
    
      if(window.confirm("Are you sure you want to delete this Tourist?")){
        
        await deleteUser();
        // table.setEditingRow(null);
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
  
      const transformedData = {
        "password": "123456", // Replace with the actual password value
        "phoneNum": values.phoneNum,
        "fullName": values.fullName,
        "email": values.email
    };
      await createUser(transformedData);
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
      setSelectedTouristId(values?.touristId)
      console.log('vvvvv',values?.touristId)
      
     const data = {
      "fullName": values.fullName

  }
      
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
          <DialogTitle variant="h5">Add Tourist</DialogTitle>
          <DialogContent
            sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {internalEditComponents} {/* or render custom edit components here */}
          </DialogContent>
          <DialogActions>
            <MRT_EditActionButtons variant="text" table={table} row={row} />
          </DialogActions>
        </>
      ),
      //optionally customize modal content
      renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
        <>
          <DialogTitle variant="h3">Edit Tourist</DialogTitle>
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
            <IconButton onClick={() =>{
              handleDeleteUser();
              setSelectedTouristId(row.original.touristId)} }>
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
          Add Tourist
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
  
  export default TouristPage;
  