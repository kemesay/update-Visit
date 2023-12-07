import * as React from "react";
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import {Typography} from "@material-ui/core";
import { Paper } from "@material-ui/core";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { GridActionsCellItem } from "@mui/x-data-grid";
import DataTable from "./DataTable";

import PackageModal from "../Modal/PackageModal";
import useGetData from "../../services/api/useGetData";
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

export default function TourOperator() {

  const [isEditing, setIsEditing] = React.useState(false);
  const [editData, setEditData] = React.useState ({});
  const [open, setOpen] = React.useState(false);
  const [packageId, setPackageId] = React.useState(null);

  let endpoint =  `${host}/tourPackage/registerPackage` ;
  let getEndpoint = `${host}/tourPackage/getPackages`;        
  let deleteEndpoint = `${host}/tourPackage/delete/package/`
  let editEndpoint = `${host}/tourOper/edit/${packageId}`


  const { data, isLoading, isError, error } = useGetData(
    getEndpoint,
    token
  );

  console.log(data);
  const deleteUser = React.useCallback(
    (packageId) => async () => {
      try {
        const response = await fetch(`${deleteEndpoint}${packageId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json", // Adjust content type if needed
          },
        });
  
        if (response.ok) {
          // Handle success, e.g., update your UI or data
          console.log(`Deleted destination with ID ${packageId}`);
        } else {
          // Handle non-successful response (e.g., server error or invalid response)
          console.error(`Failed to delete destination with ID ${packageId}`);
        }
      } catch (error) {
        // Handle fetch error (e.g., network issue)
        console.error("Error deleting destination:", error);
      }
    },
    [deleteEndpoint, token]
  );
  


  const editUser = React.useCallback(
    (packageId, updatedData) => async () => {
      try {
        const response = await fetch(`${editEndpoint}${packageId}`, {
          method: "PUT",
          headers: {
            "Authorization": `Bearer ${token}`, // Add authorization token if required
            "Content-Type": "application/json", // Adjust content type if needed
          },
          body: JSON.stringify(updatedData), // Convert the updated data to JSON
        });
  
        if (response.ok) {
          // Handle success, e.g., update your UI or data
          console.log(`Updated destination with ID ${packageId}`);
        } else {
          // Handle non-successful response (e.g., server error or invalid response)
          console.error(`Failed to update destination with ID ${packageId}`);
        }
      } catch (error) {
        // Handle fetch error (e.g., network issue)
        console.error("Error updating destination:", error);
      }
    },
    [editEndpoint, token]
  );
  



const columns = React.useMemo(
  () =>  [
  { field: "packageId", headerName: "ID", width: 90 },
  {
    field: "packageName",
    headerName: "package Name",
    width: 150,
    editable: true,
  },
  {
    field: "stayDuration",
    type: "number",
    headerName: "stay Duration",
    width: 150,
    editable: true,
  },
  {
    field: "packagePricePerPerson",
    headerName: "package Price PerPerson",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "maxGroup",
    headerName: "Max number in Group",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "packageForDorInter",
    headerName: " Tourist Type",
    width: 110,
    editable: true,
  },
  {
    field: "touristType",
    headerName: "Tour Action Category",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "packageDescription",
    headerName: "package Description",
    width: 110,
    editable: true,
  },
  {
    field: "departureDates",
    headerName: "departure Dates",
    width: 110,
    editable: true,
  },
  {
    field: "createdAt",
    headerName: "created At",
    width: 110,
    editable: true,
  },
  {
    field: "destinations",
    headerName: "destination list",
    width: 110,
    editable: true,
  },
  {
    field: "tourOpertaor",
    headerName: "tourOpertaor list",
    width: 110,
    editable: true,
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
          onClick={()=>{setIsEditing(true);setEditData(params.row); console.log(params.row);setOpen(true); setPackageId(params.id)}}
      />
    ]
  }
],
[deleteUser, editUser]);

return (
  <>
      <PackageModal
        title="Packages"
        name="Packages Name"
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
      <DataTable getRowId={(row) => row.packageId} rows={data} columns={columns} />
      )}
      </>
    );
  }



