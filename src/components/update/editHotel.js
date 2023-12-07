import * as React from "react";
import {
  TextField,
  FormControl,
  FormHelperText,
  Stack,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Typography,
  DialogTitle,
  MenuItem,
  Select,
  InputLabel,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import CloseIcon from "@mui/icons-material/Close";

export default function EditHotel({ open, handleClose }) {
  const [role, setRole] = React.useState("");

  const handleChange = (event) => {
    setRole(event.target.value);
  };
  const loanSettingValidationSchema = yup.object({
    
  hotelName: yup.string().required('Hotel name is required'),
  hotelLatitude: yup.number().typeError('Latitude must be a number').required('Latitude is required'),
  hotelLongitude: yup.number().typeError('Longitude must be a number').required('Longitude is required'),
  hotelAddress: yup.string().required('Hotel address is required'),
  hotelDescription: yup.string(),
  });

  const formikEditHotel = useFormik({
    initialValues: {
        hotelName: "",
        hotelLatitude: 0,
        hotelLongitude: 0,
        hotelAddress: "",
        hotelDescription: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const Field = ({ title, fieldName }) => (
    <FormControl fullWidth>
      <TextField
        variant="standard"
        label={<Typography sx={{ fontSize: 18 }}>{title + " *"} </Typography>}
        {...formikEditHotel.getFieldProps(fieldName)} // Use the fieldName parameter here
        error={
          formikEditHotel.touched[fieldName] && // Update the field references to use fieldName
          Boolean(formikEditHotel.errors[fieldName])
        }
      ></TextField>
      {formikEditHotel.touched[fieldName] && // Update the field references to use fieldName
        formikEditHotel.errors[fieldName] && (
          <FormHelperText error>
            {formikEditHotel.errors[fieldName]}
          </FormHelperText>
        )}
    </FormControl>
  );
  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          marginBottom="-20px"
        >
          <DialogTitle sx={{ fontSize: 20, fontWeight: "bold" }}>
            Update Hotel
          </DialogTitle>
          <CloseIcon
            onClick={handleClose}
            sx={{
              color: "#e6841c",
              marginRight: "20px",
              fontSize: "34px",
              cursor: "pointer",
            }}
          />
        </Stack>
        <DialogContent>
          <DialogContentText sx={{ color: "#e6841c" }}></DialogContentText>
          <br />
          <Stack direction="column" spacing={2.6}>
            <FormControl fullWidth>
              <TextField
                variant="standard"
                label={
                  <Typography sx={{ fontSize: 18 }}>
                    {"hotelName" + " *"}{" "}
                  </Typography>
                }
                {...formikEditHotel.getFieldProps("hotelName")} // Use the fieldName parameter here
                error={
                  formikEditHotel.touched["hotelName"] && // Update the field references to use fieldName
                  Boolean(formikEditHotel.errors["hotelName"])
                }
              ></TextField>
              {formikEditHotel.touched["hotelName"] && // Update the field references to use fieldName
                formikEditHotel.errors["hotelName"] && (
                  <FormHelperText error>
                    {formikEditHotel.errors["hotelName"]}
                  </FormHelperText>
                )}
            </FormControl>
            <FormControl fullWidth>
              <TextField
                variant="standard"
                label={
                  <Typography sx={{ fontSize: 18 }}>
                    {"hotelLatitude" + " *"}{" "}
                  </Typography>
                }
                {...formikEditHotel.getFieldProps("hotelLatitude")} // Use the fieldName parameter here
                error={
                  formikEditHotel.touched["hotelLatitude"] && // Update the field references to use fieldName
                  Boolean(formikEditHotel.errors["hotelLatitude"])
                }
              ></TextField>
              {formikEditHotel.touched["hotelLatitude"] && // Update the field references to use fieldName
                formikEditHotel.errors["hotelLatitude"] && (
                  <FormHelperText error>
                    {formikEditHotel.errors["hotelLatitude"]}
                  </FormHelperText>
                )}
            </FormControl>
            <FormControl fullWidth>
              <TextField
                variant="standard"
                label={
                  <Typography sx={{ fontSize: 18 }}>
                    {"hotelLongitude" + " *"}{" "}
                  </Typography>
                }
                {...formikEditHotel.getFieldProps("hotelLongitude")} // Use the fieldName parameter here
                error={
                  formikEditHotel.touched["hotelLongitude"] && // Update the field references to use fieldName
                  Boolean(formikEditHotel.errors["hotelLongitude"])
                }
              ></TextField>
              {formikEditHotel.touched["hotelLongitude"] && // Update the field references to use fieldName
                formikEditHotel.errors["hotelLongitude"] && (
                  <FormHelperText error>
                    {formikEditHotel.errors["hotelLongitude"]}
                  </FormHelperText>
                )}
            </FormControl>
            <FormControl fullWidth>
              <TextField
                variant="standard"
                label={
                  <Typography sx={{ fontSize: 18 }}>
                    {"hotelAddress" + " *"}{" "}
                  </Typography>
                }
                {...formikEditHotel.getFieldProps("hotelAddress")} // Use the fieldName parameter here
                error={
                  formikEditHotel.touched["hotelAddress"] && // Update the field references to use fieldName
                  Boolean(formikEditHotel.errors["hotelAddress"])
                }
              ></TextField>
              {formikEditHotel.touched["hotelAddress"] && // Update the field references to use fieldName
                formikEditHotel.errors["hotelAddress"] && (
                  <FormHelperText error>
                    {formikEditHotel.errors["hotelAddress"]}
                  </FormHelperText>
                )}
            </FormControl>


            <FormControl fullWidth>
              <TextField
                variant="standard"
                label={
                  <Typography sx={{ fontSize: 18 }}>
                    {"hotelDescription" + " *"}{" "}
                  </Typography>
                }
                {...formikEditHotel.getFieldProps("hotelDescription")} // Use the fieldName parameter here
                error={
                  formikEditHotel.touched["hotelDescription"] && // Update the field references to use fieldName
                  Boolean(formikEditHotel.errors["hotelDescription"])
                }
              ></TextField>
              {formikEditHotel.touched["hotelDescription"] && // Update the field references to use fieldName
                formikEditHotel.errors["hotelDescription"] && (
                  <FormHelperText error>
                    {formikEditHotel.errors["hotelDescription"]}
                  </FormHelperText>
                )}
            </FormControl>

          
          </Stack>
        </DialogContent>
        <DialogActions sx={{ margin: "10px", padding: "10px" }}>
          <Button onClick={handleClose} variant="contained" color="error">
            Cancel
          </Button>
          <Button
            onClick={formikEditHotel.handleSubmit}
            variant="contained"
            color="primary"
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
