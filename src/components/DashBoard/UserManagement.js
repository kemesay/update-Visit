import * as React from "react";
import DataTable from "./DataTable";

import UserModal from "../Modal/UserModal";
import useGetData from "../../services/api/useGetData";
import { Box, Typography } from "@mui/material";
import { Paper, Popper } from "@material-ui/core";
import { GridActionsCellItem } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import useDeleteData from "../../services/api/useDeleteData";
import { DeleteTwoTone } from "@mui/icons-material";
import { host } from "../../constants";
import { token } from "../../constants";

function isOverflown(element) {
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  );
}

const GridCellExpand = React.memo(function GridCellExpand(props) {
  const { width, value } = props;
  const wrapper = React.useRef(null);
  const cellDiv = React.useRef(null);
  const cellValue = React.useRef(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [showFullCell, setShowFullCell] = React.useState(false);
  const [showPopper, setShowPopper] = React.useState(false);

  const handleMouseEnter = () => {
    const isCurrentlyOverflown = isOverflown(cellValue.current);
    setShowPopper(isCurrentlyOverflown);
    setAnchorEl(cellDiv.current);
    setShowFullCell(true);
  };

  const handleMouseLeave = () => {
    setShowFullCell(false);
  };

  React.useEffect(() => {
    if (!showFullCell) {
      return undefined;
    }

    function handleKeyDown(nativeEvent) {
      // IE11, Edge (prior to using Bink?) use 'Esc'
      if (nativeEvent.key === "Escape" || nativeEvent.key === "Esc") {
        setShowFullCell(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [setShowFullCell, showFullCell]);

  return (
    <Box
      ref={wrapper}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{
        alignItems: "center",
        lineHeight: "24px",
        width: "100%",
        height: "100%",
        position: "relative",
        display: "flex",
      }}
    >
      <Box
        ref={cellDiv}
        sx={{
          height: "100%",
          width,
          display: "block",
          position: "absolute",
          top: 0,
        }}
      />
      <Box
        ref={cellValue}
        sx={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {value}
      </Box>
      {showPopper && (
        <Popper
          open={showFullCell && anchorEl !== null}
          anchorEl={anchorEl}
          style={{ width, marginLeft: -17 }}
        >
          <Paper
            elevation={1}
            style={{ minHeight: wrapper.current.offsetHeight - 3 }}
          >
            <Typography variant="body2" style={{ padding: 8 }}>
              {value}
            </Typography>
          </Paper>
        </Popper>
      )}
    </Box>
  );
});

function renderCellExpand(params) {
  return (
    <GridCellExpand
      value={params.value || ""}
      width={params.colDef.computedWidth}
    />
  );
}

export default function UserManagment() {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editData, setEditData] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const [userId, setUserId] = React.useState(null);
  const [isEdited, setIsEdited] = React.useState(false);

  let endpoint = `${host}/manageAdmins/createUser`;
  let getEndpoint = `${host}/manageAdmins/getUsers`;
  let deleteEndpoint = `${host}/manageAdmins/delete/user/`;
  let editEndpoint = `${host}/manageAdmins/edit/${userId}`;

  const { data, isLoading, isError, error, refetch } = useGetData(
    getEndpoint,
    token
  );
  React.useEffect(() => {
    if (isEdited) {
      refetch();
      setOpen(false);
    }
  }, [isEdited, data]);

  const deleteUser = React.useCallback(
    (userId) => async () => {
      try {
        const response = await fetch(`${deleteEndpoint}${userId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json", // Adjust content type if needed
          },
        });

        if (response.ok) {
          console.log(`Deleted user with ID ${userId}`);
        } else {
          console.error(`Failed to delete user with ID ${userId}`);
        }
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    },
    [deleteEndpoint, token]
  );
  const editUser = React.useCallback(
    (userId, updatedData) => async () => {
      try {
        const response = await fetch(`${editEndpoint}${userId}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`, // Add authorization token if required
            "Content-Type": "application/json", // Adjust content type if needed
          },
          body: JSON.stringify(updatedData), // Convert the updated data to JSON
        });

        if (response.ok) {
          console.log(`Updated user with ID ${userId}`);
        } else {
          console.error(`Failed to update user with ID ${userId}`);
        }
      } catch (error) {
        console.error("Error updating user:", error);
      }
    },
    [editEndpoint, token]
  );

  const columns = React.useMemo(
    () => [
      { field: "userId", headerName: "ID", width: 90 },
      {
        field: "username",
        headerName: "UserName",
        width: 150,
        editable: true,
      },
      {
        field: "fullName",
        headerName: "fullName",
        width: 110,
        editable: true,
      },
      {
        field: "email",
        headerName: "Email",
        width: 110,
        editable: true,
      },

      {
        field: "gender",
        headerName: "Gender ",
        width: 110,
        editable: true,
      },

      {
        field: "phoneNum",
        headerName: "Phone number ",
        width: 110,
        editable: true,
      },

      {
        field: "birthDate",
        headerName: "birth Date",
        width: 110,
        editable: true,
      },

      {
        field: "twoFactorEnabled",
        headerName: "two factor enabled ",
        width: 110,
        editable: true,
      },

      {
        field: "status",
        headerName: "Status",
        width: 200,
        renderCell: (params) =>
          params.row.status ? (
            <Typography
              sx={{
                color: "white",
                backgroundColor: "green",
                border: "1px solid green",
                paddingX: "3px",
              }}
            >
              Active
            </Typography>
          ) : (
            <Typography
              sx={{
                color: "white",
                backgroundColor: "red",
                border: "1px solid red",
                paddingX: "3px",
              }}
            >
              Suspended
            </Typography>
          ),
      },

      // {
      //   field: "address",
      //   headerName: "Address",
      //   width: 300,
      //   renderCell: (params) => (
      //     <div>
      //       {/* <div>{params.value.country}</div>
      //       <div>{params.value.city}</div>
      //       <div>{params.value.subCity}</div>
      //       <div>{params.value.woreda}</div>
      //       <div>{params.value.houseNumber}</div> */}
      //     </div>
      //   ),
      // },
      {
        field: "roles",
        headerName: "Roles",
        width: 100,
        renderCell: (params) => (
          <div>
            {params.value.map((role) => (
              <div key={role.roleName}>{role.roleName}</div>
            ))}
          </div>
        ),
      },

      {
        field: "delete",
        type: "actions",
        headerName: "Delete",
        width: 110,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={deleteUser(params.id)}
          />,
        ],
      },
      {   
        field: "Edit",
        type: "actions",
        headerName: "Edit",
        width: 110,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            onClick={() => {
              setIsEditing(true);
              setEditData(params.row);
              console.log(  "hahaha"  ,params.row);
              setOpen(true);
              setUserId(params.id);
            }}
          />,
        ],
      },
    ],
    [deleteUser, editUser]
  );

  var userRows = [];
  if (Array.isArray(data) && data.length > 0) {
    data.map((user, index) => {
      userRows.push({
        userId: user.userId,
        username: user.username,
        password: user.password,
        fullName: user.fullName,
        email: user.email,
        gender: user.gender,
        phoneNum: user.phoneNum,
        birthDate: user.birthDate,
        twoFactorEnabled: user.twoFactorEnabled,
        status: user.isEnabled,
        roles: user.roles,
        // address: user.address,
        // status: user.isEnabled,
      });
    });
  }

  return (
    <>
      <UserModal
        title="User Management"
        name="User managent List"
        endpoint={isEditing ? editEndpoint : endpoint}
        token={token}
        open={open}
        setOpen={setOpen}
        isEditing={isEditing}
        initialData={editData}
        setIsEdited={setIsEdited}
      />

      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error: {error.message}</p>
      ) : (
        <DataTable
          getRowId={(row) => row.userId}
          rows={userRows}
          columns={columns}
        />
      )}
    </>
  );
}
