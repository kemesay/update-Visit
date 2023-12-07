import * as React from "react";
import DataTable from "./DataTable";

import AddMOdal from "../Modal/AddModal";
import useGetData from "../../services/api/useGetData";
import { Box, Typography } from "@mui/material";
import { Paper, Popper } from "@material-ui/core";
import { GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import useDeleteData from "../../services/api/useDeleteData";
import { DeleteTwoTone } from "@mui/icons-material";

import { host } from "../../constants";
import {token} from "../../constants";

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
      if (nativeEvent.key === 'Escape' || nativeEvent.key === 'Esc') {
        setShowFullCell(false);
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [setShowFullCell, showFullCell]);

  return (
    <Box
      ref={wrapper}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{
        alignItems: 'center',
        lineHeight: '24px',
        width: '100%',
        height: '100%',
        position: 'relative',
        display: 'flex',
        
      }}
    >
      <Box
        ref={cellDiv}
        sx={{
          height: '100%',
          width,
          display: 'block',
          position: 'absolute',
          top: 0,
        }}
      />
      <Box
        ref={cellValue}
        sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
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
    <GridCellExpand value={params.value || ''} width={params.colDef.computedWidth} />
  );
}


export default function Office() {

  const [isEditing, setIsEditing] = React.useState(false);
  const [editData, setEditData] = React.useState ({});
  const [open, setOpen] = React.useState(false);
  const [officeId, setOfficeId] = React.useState(null);

  let endpoint =  `${host}/office/registerOffice` ;
  let getEndpoint =  `${host}/office/getOffices` ;   
  let deleteEndpoint =   `${host}/office/delete/office/` 
  let editEndpoint = `${host}/office/edit/${officeId}`


  const { data, isLoading, isError, error } = useGetData(
    getEndpoint,
    token
  );

  console.log(data);

  const deleteUser = React.useCallback(
    (officeId) => async () => {
      try {
        const response = await fetch(`${deleteEndpoint}${officeId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json", // Adjust content type if needed
          },
        });
  
        if (response.ok) {
          // Handle success, e.g., update your UI or data
          console.log(`Deleted office with ID ${officeId}`);
        } else {
          // Handle non-successful response (e.g., server error or invalid response)
          console.error(`Failed to delete office with ID ${officeId}`);
        }
      } catch (error) {
        // Handle fetch error (e.g., network issue)
        console.error("Error deleting office:", error);
      }
    },
    [deleteEndpoint, token]
  );

  const editUser = React.useCallback(
    (officeId, updatedData) => async () => {
      try {
        const response = await fetch(`${editEndpoint}${officeId}`, {
          method: "PUT",
          headers: {
            "Authorization": `Bearer ${token}`, // Add authorization token if required
            "Content-Type": "application/json", // Adjust content type if needed
          },
          body: JSON.stringify(updatedData), // Convert the updated data to JSON
        });
  
        if (response.ok) {
          // Handle success, e.g., update your UI or data
          console.log(`Updated office with ID ${officeId}`);
        } else {
          // Handle non-successful response (e.g., server error or invalid response)
          console.error(`Failed to update office with ID ${officeId}`);
        }
      } catch (error) {
        // Handle fetch error (e.g., network issue)
        console.error("Error updating office:", error);
      }
    },
    [editEndpoint, token]
  );
  

  const columns =  React.useMemo(
    () =>  [
    { field: "officeId", 
    headerName: "ID", 
    width: 90
  },
    {
      field: "name",
      headerName: "Des_Name",
      width: 150,
      editable: true,
      renderCell: renderCellExpand,
    },
    {
      field: "address",
      headerName: "Address",
      width: 150,
      editable: true,
      renderCell: renderCellExpand,
    },
    {
      field: "longitude",
      headerName: "long",
      type: "number",
      width: 110,
      editable: true,
      renderCell: renderCellExpand,
    },
    {
      field: "latitude",
      headerName: "lat",
      type: "number",
      width: 110,
      editable: true,
      renderCell: renderCellExpand,
    },
    {
      field: "description",
      headerName: "description",
      width: 110,
      editable: true,
      renderCell: renderCellExpand,
    },
    {
      field: 'delete',
      type: 'actions',
      headerName:'Delete' ,
      width: 110,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={deleteUser(params.id)}
        />
      ]
    },
    {
      field: 'Edit',
      type: 'actions',
      headerName:'Edit' ,
      width: 110,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          onClick={()=>{setIsEditing(true);setEditData(params.row); console.log(params.row);setOpen(true);setOfficeId(params.id)}}
        />
      ]
    }
  ],
  [deleteUser]);
  

  return (
    <>
      <AddMOdal
        title="Office"
        name="office name"
        endpoint={isEditing?editEndpoint:endpoint}
        token={token}
        open={open}
        setOpen={setOpen}
        isEditing={isEditing}
        initialData={editData}
      />

      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error: {error.message}</p>
      ) : (
        <DataTable getRowId={(row) => row.officeId} rows={data} columns={columns} />
      )}
    </>
  );
}