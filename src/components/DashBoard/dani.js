import {
    MRT_EditActionButtons,
    MaterialReactTable,
    useMaterialReactTable,
  } from "material-react-table";
  import React, { useMemo, useState } from "react";
  import { validateUser } from "../utils/validation";
  import { useCreate } from "../services/hooks/useCreate";
  import { useGet } from "../services/hooks/useGet";
  import { useUpdate } from "../services/hooks/useUpdate";
  import { useDelete } from "../services/hooks/useDelete";
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
  
  
  function UserPage() {
    const [validationErrors, setValidationErrors] = useState({});
  
    const {
      data: roles,
    } = useGet("/api/v1/roles");
    const roleNames = roles?.map((role) => role.roleName);
  
    const columns = useMemo(
      () => [
        {
          accessorKey: "userId",
          header: "Id",
          enableEditing: false,
          size: 80,
        },
        {
          accessorKey: "fullName",
          header: "Full Name",
          muiEditTextFieldProps: {
            required: true,
            error: !!validationErrors?.fullName,
            helperText: validationErrors?.fullName,
            //remove any previous validation errors when user focuses on the input
            onFocus: () =>
              setValidationErrors({
                ...validationErrors,
                firstName: undefined,
              }),
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
        {
          accessorKey: "role",
          header: "Role",
  
          editVariant: "select",
          editSelectOptions: roleNames,
          muiEditTextFieldProps: {
            select: true,
            error: !!validationErrors?.role,
            helperText: validationErrors?.role,
          },
          
        },
        {
          accessorKey: "lastLoggedIn",
          header: "Last LoggedIn",
          enableEditing: false,
          
        },
        {
          accessorKey: "createdAt",
          header: "CreatedAt",
          enableEditing: false,
          
        },
        {
          accessorKey: "updatedAt",
          header: "updatedAt",
          enableEditing: false,
          
        },
      ],
      [roleNames, validationErrors]
    );
  
    //call CREATE hook
    const { mutateAsync: createUser, isPending: isCreatingUser } = useCreate('/api/v1/users');
    //call READ hook
    const {
      data: fetchedUsers,
      isError: isLoadingUsersError,
      isFetching: isFetchingUsers,
      isLoading: isLoadingUsers,
    } = useGet("/api/v1/users");
    //call read hook of role api
  
    //call UPDATE hook
    const { mutateAsync: updateUser, isPending: isUpdatingUser } = useUpdate('/api/v1/users');
    //call DELETE hook
    const { isPending: isDeletingUser } = useDelete();
  
    //CREATE action
    const handleCreateUser = async ({ values, table }) => {
      
      const newValidationErrors = validateUser(values);
      if (Object.values(newValidationErrors).some((error) => error)) {
        setValidationErrors(newValidationErrors);
        return;
      }
      setValidationErrors({});
  
      const transformedData = {
        "password": "123456", // Replace with the actual password value
        "roleName": values.role,
        "fullName": values.fullName,
        "email": values.email
    };
      await createUser(transformedData);
      table.setCreatingRow(null); //exit creating mode
    };
  
    //UPDATE action
    const handleSaveUser = async ({ values, table }) => {
      const newValidationErrors = validateUser(values);
      if (Object.values(newValidationErrors).some((error) => error)) {
        setValidationErrors(newValidationErrors);
        return;
      }
      setValidationErrors({});
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
          <DialogTitle variant="h5">Create New User</DialogTitle>
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