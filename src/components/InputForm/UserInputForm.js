import {
  Box,
  Button,
  Container,
  FormControlLabel,
  FormGroup,
  Input,
  MenuItem,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import usePostData from "../../services/api/usePostData";
import { useFormik } from "formik";
import CountrySelect from "./CountrySelect";
import { useState } from "react";
import { Autocomplete } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import MultiSelect from "./selectrole";
import usePutData from "../../services/api/usePutData";
import useGetData, { fetchData } from "../../services/api/useGetData";
import { host, token } from "../../constants";

function UserInputForm({
  title,
  name,
  endpoint,
  isEditing,
  apitoken,
  open,
  setOpen,
  initialData,
  setIsEdited,
}) {
  const [selectedCountry, setSelectedCountry] = useState("Ethiopia");
  const [selectedRoles, setSelectedRoles] = useState();
  const [checked, setChecked] = React.useState(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100",
    bgcolor: "background.paper",
    //   border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

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

  const roleOptions = ["admin", "Market Analyst", "employee", "Tour Operator"];

  const initialValues = isEditing
    ? {
        username: initialData.username,
        password: initialData.password,
        fullName: initialData.fullName,
        email: initialData.email,
        emailConfirmed: initialData.emailConfirmed,
        phoneNum: initialData.phoneNum,
        gender: initialData.gender,
        birthDate: initialData.birthDate,
        isEnabled: initialData.isEnabled,
        // country: initialData.address.country,
        // city: initialData.address.city,
        // subCity: initialData.address.subCity,
        // woreda: initialData.address.woreda,
        // houseNumber: initialData.address.houseNumber,
        roles: initialData.roles.roleName,
      }
    : {
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

  const {
    mutate: postMutate,
    isLoading: postIsLoading,
    isSuccess: postIsSuccess,
    isError: postIsError,
    error: postError,
  } = usePostData(endpoint, apitoken, InputData);
  const {
    mutate: putMutate,
    isLoading: putIsLoading,
    isSuccess: putIsSuccess,
    isError: putIsError,
    error: putError,
  } = usePutData(endpoint, apitoken, InputData);

  const handleSave = (e) => {
    e.preventDefault();
    isEditing ? putMutate(userpayload) : postMutate(userpayload);
    console.log(userpayload);
  };
  useEffect(() => {
    let getEndpoint = `${host}/manageAdmins/getUsers`;
    const data = fetchData(getEndpoint, token);

    if (putIsSuccess || postIsSuccess) {
      setIsEdited(true);
    }
  }, [putIsSuccess, postIsSuccess]);
  return (
    <div>
      <Box sx={style}>
        <Typography my={3} id="modal-modal-title" variant="h6" component="h2">
          Please fill the following information to add user
        </Typography>

        <Container
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
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
        </Container>

        <Container
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
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
        </Container>
        <Container
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
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
        </Container>
        <Container style={{ display: "flex", justifyContent: "space-between" }}>
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
        </Container>
        <Container style={{ display: "flex", justifyContent: "space-between" }}>
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
        </Container>
        <Container
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "10px",
          }}
        >
          <Button onClick={() => setOpen(false)}>Cancle</Button>
          <Button onClick={handleSave}>
            {postIsLoading || putIsLoading ? "Saving.." : "Save"}
          </Button>
          <h3>
            {postIsSuccess || putIsSuccess
              ? "SuccessFull registered"
              : postIsError || putIsError}
          </h3>
        </Container>
      </Box>
    </div>
  );
}

export default UserInputForm;
