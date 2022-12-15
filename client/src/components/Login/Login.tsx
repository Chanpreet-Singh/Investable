import React, { useState } from "react";
import "./Login.css";
import useForm from "./useForm";
import validate from "./LoginFormValidationRulesEP";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Grid, Typography, Box } from "@mui/material";
import logo from "../../assets/app-logo-2.png";
import icon from "../../assets/app-icon.png";
import Paper from "@mui/material/Paper";
import httpClient from "../../thunk/interceptor";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import UtilityUser from "../Utility/UtilityUser";
import Singleton from "./Singleton";

/**
 * Login component
 */
const Login = (): any => {
  const dispatch = useDispatch();
  const loggedInUserEmailId = localStorage.getItem("loggedInUserEmail"); // get the logged in user id

  const submitHandler = () => {
    httpClient //authenticate user
      .post(Singleton.getInstance().urlLogin, {
        email: values.email,
        password: values.password,
      })
      .then((response) => {
        if (response.data.message === "Authentication Successful") {
          //email and password matched
          localStorage.setItem("isUserLoggedIn", "true"); //set user session
          localStorage.setItem("loggedInUserEmail", values.email); //email of the logged in user
          login(); //navigation
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error: any) => {
        toast.error(error.message);
      });
  };

  const {
    values,
    errors: err,
    handleChange: manageChanges,
    handleSubmit: onsubmit,
    IsSubmitted,
  }: any = useForm(login, validate);
  const [_, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  function login() {
    UtilityUser().then((response) => {
      //Founder will land on myposts and investor will land on feeds page
      if (response.user_data.profile_type.toLowerCase() === "entrepreneur") {
        navigate("/userprofile");
      } else {
        navigate("/feeds");
      }
    });
    setLoggedIn(true);
  }

  return (
    <Grid
      container
      component="main"
      sx={{
        height: "100vh",
      }}
    >
      <Grid item xs={false} sm={5} md={6} className="imagecontainer">
        <img src={logo} alt="Logo" className="image" />
      </Grid>

      <Grid
        item
        xs={12}
        sm={7}
        md={6}
        component={Paper}
        elevation={0}
        className="backgroundRight"
      >
        <Grid>
          <Box className="titlecontainer">
            <Typography component="h1" variant="h6" className="title">
              <img src={icon} alt="Icon" className="imageIcon" />
            </Typography>
          </Box>
        </Grid>
        <div className="loginBox">
          <form onSubmit={onsubmit} noValidate>
            <div className="attributes">
              <label className="label">Email Address</label>
              <div className="data-block">
                <input
                  autoComplete="off"
                  className={`input ${err.email && "is-danger"}`}
                  type="email"
                  name="email"
                  onChange={manageChanges}
                  value={values.email || ""}
                  required
                />
                {err.email && <p className="help is-danger">{err.email}</p>}
              </div>
            </div>
            <div className="field">
              <label className="label">Password</label>
              <div className="control">
                <input
                  className={`input ${err.password && "is-danger"}`}
                  type="password"
                  name="password"
                  onChange={manageChanges}
                  value={values.password || ""}
                  required
                />
              </div>
              {err.password && <p className="help is-danger">{err.password}</p>}
            </div>
            <button
              type="submit"
              className="button is-block is-info is-fullwidth buttonGradient"
              onClick={() => submitHandler()}
            >
              Submit
            </button>
            <Link to="/register">
              <p className="mt-5" style={{ textAlign: "center" }}>
                Create New Account ?
              </p>
            </Link>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default Login;
