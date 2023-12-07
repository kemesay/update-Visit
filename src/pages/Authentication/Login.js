import React, { useState } from "react";
import GoogleLoginButton from "./GoogleloginButton";
import {
  makeStyles,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import  gmailIcon from './../../assets/images/Gmail_Logo_512px.png'
import Typography from "@material-ui/core/Typography";
import { useFormik } from "formik";
import * as Yup from 'yup'; // Import Yup for validation
import Signin from "../../services/api/Signin";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  username: Yup.string()
    .required("Username is required"),
  password: Yup.string()
    .required("Password is required"),
});

const useStyles = makeStyles((theme) => ({
  container: {
      display:'flex',
      justifyContent:'center',
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
      backgroundColor: 'whiteSmoke',
      width:'45%',
      justifyContent:'center',
      flexWrap: "nowrap",
      background: "white",
      borderRadius: "15px",
      height: "650px",
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
     
      justifyContent: 'center',
      width: "60%",
      marginTop:'40px',
      [theme.breakpoints.down("sm")]: {
       width:'80%'
      },
      "@media (max-width:960px)": {
        marginLeft:'105px',
        marginTop:'10px'
      },
    },
submit: {
  background: "#3293A8",
  borderRadius: "5px",
  width: "100%",
  height: "50px",
  margin: theme.spacing(1, 0, 2),
  "&:hover": {
    background: "rgba(50, 147, 168,0.79)",
  },
  "@media (max-width:760px)": {
    width:"80%"
  },
},

login:{
  fontWeight:'800',
  marginLeft:'65px',
  "@media (max-width:760px)": {
      marginLeft:'15px'
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
    height:'25px',
    borderRadius: "10px",
    width: "100%",
  },
  "@media (max-width:760px)": {
    width: "80%",
  },
},
texts:
{marginLeft:'',
"@media (max-width:760px)": {
  
}},
inputAdornment: {
  background: "rgba(215,215,215,0.87)",
  borderRadius: "7px 0px 0px 7px",
},
}));

function Login() {
  const [error, setError] = useState('')
  const classes = useStyles();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: validationSchema, // Apply the validation schema
    onSubmit: async (values) => {
      try {
        const data = await Signin({ username: values.username, password: values.password });
        if (data) {
          navigate('/dashboard/reports');
        }
      } catch (error) {
        setError('may you are on pending or other problem try later!')
      }
    },
  });
  return (
    <div className={classes.container}>
      <div className={classes.root}>
        <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
          <Box style={{ height: '10px'}}>
          <h3 style={{color: 'red', padding: '0px', margin: '0px'}}>{error}</h3> 
          </Box>
            
        <Typography
            align="center"
            component="h1"
            variant="h5"
            style={{ padding: 20, }}
            className={classes.texts}
          >
            <h3><span style={{color: '#ee662d'}}>Visit</span>Oromia </h3>
          </Typography>
           
          <TextField
            variant="outlined"
            margin="none"
            required
            fullWidth
            name="username"
            label="Username"
            type="text"
            id="username"
            onChange={formik.handleChange}
            value={formik.values.username}
            autoComplete="current-password"
            className={classes.textField}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
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
           <Typography
            align="center"
            variant="body2"
            style={{ padding: 10 }}
            className={classes.texts}
          >
           <Link href="/resetPassword" variant="body2">
                Forgot password?
              </Link>
          </Typography>
          <Button
            id="login"
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ backgroundColor: 'rgb(238 102 45)' }}
            className={classes.submit}
          >
            Log in
          </Button>
          <Typography
            align="center"
            variant="body2"
            style={{ padding: 10 }}
            className={classes.texts}
          >
           Or
          </Typography>
          {/* <Button
                id="login"
               fullWidth
              variant="contained"
              color="primary"
                              

              className={classes.submit}
              style={{
                backgroundImage: `url(${gmailIcon})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                // border: 'none',
                // width: '70px', // Set the width and height to match the size of your icon
                // height: '48px',
                // padding: '0', // Remove padding to have the button fit the icon size
                cursor: 'pointer', // Change cursor to indicate it's clickable
              }}
            >
            Continue  with Gmail
          </Button> */}
            <GoogleLoginButton />
            {/* <a href="http://localhost:9010/oauth2/authorization/google"> Continues with Google</a> */}
            {/* <div>
				<h4><a href="/oauth2/authorization/google">Login with Google</a></h4>
			</div> */}

            <div container justify="center">
              <div >
                <Box  style={{ fontWeight: "800", display: 'flex', justifyContent: 'center',}}>
                  <Box style={{marginRight: '7px'}}>Don't have an account?</Box>
                  <Link href="/signup" variant="body2" id="gotoSignup">
                    {"Sign Up"}
                  </Link>
                </Box>
              </div>
            </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
