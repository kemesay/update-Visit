import React from "react";
import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import  gmailIcon from './../../assets/images/Gmail_Logo_512px.png'
import GoogleLoginButton from "./GoogleloginButton";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { FormLabel } from "@mui/material";
import * as Yup from "yup";
import Signup from "../../services/api/signup";
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    // background: "green",
    marginTop: "-30px",
    justifyContent: "center",
    width: "100%",
    paddingLeft: "6px",
    paddingRight: "6px",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: 5,
      paddingRight: 5,
    },
  },
  root: {
    display: "flex",
    backgroundColor: "whiteSmoke",
    width: "45%",
    justifyContent: "center",
    flexWrap: "nowrap",
    background: "white",
    borderRadius: "15px",
    height: "850px",
    "& a": {
      color: "#3A6351",
    },
    [theme.breakpoints.down("sm")]: {
      "& form": {
        padding: 0,
      },
    },
  },

  form: {
    justifyContent: "center",
    width: "60%",
    marginTop: "5px",
    [theme.breakpoints.down("sm")]: {
      width: "80%",
    },
    "@media (max-width:960px)": {
      marginLeft: "105px",
      marginTop: "10px",
    },
  },
  submit: {
    background: "#3293A8",
    borderRadius: "5px",
    width: "100%",
    height: "40px",
    margin: theme.spacing(1, 0, 2),
    "&:hover": {
      background: "rgba(50, 147, 168,0.79)",
    },
    "@media (max-width:760px)": {
      width: "80%",
    },
  },

  login: {
    fontWeight: "800",
    marginLeft: "65px",
    "@media (max-width:760px)": {
      marginLeft: "15px",
    },
  },
  textField: {
    margin: "10px 0",
    borderRadius: "10px",
    width: "100%",
    borderTopLeftRadius: "10px",
    borderBottomLeftRadius: "10px",
    border: "0px solid #eee",
    borderLeftWidth: "7px",
    borderLeftColor: "rgba(215,215,215,0.47)",
    "& input": {
      color: "rgba(57,50,50,0.25)",
      border: "0px solid #eee",
      height: "10px",
      borderRadius: "10px",
      width: "100%",
    },
    "@media (max-width:760px)": {
      width: "80%",
    },
  },
  texts: { marginLeft: "", "@media (max-width:760px)": {} },
  inputAdornment: {
    background: "rgba(215,215,215,0.87)",
    borderRadius: "7px 0px 0px 7px",
  },
}));

function Registration() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [error, setError] = React.useState("");
  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Full Name is required"),
    username: Yup.string().required("User Name is required"),

    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    birthDate: Yup.string().required("Birth Date is required"),
    phoneNum: Yup.string().required("Phone Number is required"),
    gender: Yup.string().required("Gender is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters long"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });
  const formik = useFormik({
    initialValues: {
      fullName: "",
      username: "",
      email: "",
      birthDate: "",
      phoneNum: "",
      gender: "male",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const signupData = await Signup({
          fullName: values.fullName,
          username: values.username,
          birthDate: values.birthDate,
          gender: values.gender,
          phoneNum: values.phoneNum,
          email: values.email,
          password: values.password,
        });

        if (signupData.status === 200) {
          navigate("/");
          // console.log("Signup successful");
        } else if (signupData.status === 400) {
          setError("user already exist");
        } else {
          setError("Sign-up failed try again ");
        }
      } catch (error) {
        setError("Sign-up Failed!");
      }
    },
  });

  return (
    <div className={classes.container}>
      <div className={classes.root}>
        <form
          className={classes.form}
          noValidate
          onSubmit={formik.handleSubmit}
        >
          <Box style={{ height: "10px" }}>
            <h3 style={{ color: "red", padding: "0px", margin: "0px" }}>
              {error}
            </h3>
          </Box>
          <Typography
            align="center"
            component="h1"
            variant="h5"
            style={{ margin: "0px" }}
            className={classes.texts}
          >
            <h3>
              <span style={{ color: "#ee662d" }}>Visit</span>Oromia{" "}
            </h3>
          </Typography>

          <TextField
            variant="outlined"
            margin="none"
            required
            fullWidth
            name="fullName"
            label="fullName"
            type="text"
            id="fullname"
            onChange={formik.handleChange}
            value={formik.values.fullName}
            className={classes.textField}
          />

          <TextField
            variant="outlined"
            margin="none"
            required
            fullWidth
            name="username"
            label="username"
            type="text"
            id="username"
            onChange={formik.handleChange}
            value={formik.values.username}
            className={classes.textField}
          />

          <TextField
            variant="outlined"
            margin="none"
            required
            name="birthDate"
            type="date"
            id="birthDate"
            onChange={formik.handleChange}
            value={formik.values.birthDate}
            className={classes.textField}
            fullWidth
            helperText="birthDate"
          />
          <FormControl
            component="fieldset"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "around",
            }}
          >
            <RadioGroup
              aria-label="gender"
              name="gender"
              defaultValue="male" // Set the default value to "male"
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "around",
              }}
              value={formik.values.gender}
              onChange={formik.handleChange}
            >
              <FormLabel style={{ marginRight: "10px", paddingLeft: "10px" }}>
                Gender *
              </FormLabel>
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
            </RadioGroup>
          </FormControl>
          <TextField
            variant="outlined"
            margin="none"
            required
            fullWidth
            name="phoneNum"
            label="phone Number"
            type="phone"
            id="phoneNum"
            onChange={formik.handleChange}
            value={formik.values.phoneNum}
            className={classes.textField}
          />
          <TextField
            variant="outlined"
            margin="none"
            required
            fullWidth
            name="email"
            label="Email"
            type="email"
            id="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            className={classes.textField}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            variant="outlined"
            margin="none"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            autoComplete="current-password"
            className={classes.textField}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />

          <TextField
            variant="outlined"
            margin="none"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            onChange={formik.handleChange}
            value={formik.values.confirmPassword}
            className={classes.textField}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
          />
          <Typography
            align="center"
            variant="body2"
            style={{ padding: 10 }}
            className={classes.texts}
          ></Typography>
          <Button
            id="register"
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ backgroundColor: "#ee662d" }}
            className={classes.submit}
          >
            Register
          </Button>
          <Typography
            align="center"
            variant="body2"
            style={{ padding: 10 }}
            className={classes.texts}
          >
            Or
          </Typography>
          <GoogleLoginButton />

          <div container justify="center">
            <div>
              <Box
                style={{
                  fontWeight: "800",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Box style={{ marginRight: "7px" }}>Already have account?</Box>
                <Link href="/" variant="body2" id="gotoSignup">
                  {"Login"}
                </Link>
              </Box>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Registration;
