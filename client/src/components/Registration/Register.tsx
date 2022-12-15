import React from "react";
import useForm from "./useForm";
import validate from "./LoginFormValidationRules";
import { useNavigate } from "react-router-dom";
import httpClient from "../../thunk/interceptor";
import { toast } from "react-toastify";
import "./Register.css";

import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { Theme, useTheme } from "@mui/material/styles";
import { styled } from "@material-ui/core";

const Input = styled("input")({
  display: "none",
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
//Code reffered ---
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const Register = () => {
  const theme = useTheme();

  const marketLists = [
    //market lists overall. Best practice : It needs to come through the backend in future changes
    "Automotive",
    "Finance",
    "Food",
    "Hospitalitiy",
    "Entertainment",
    "Construction",
    "Social Media",
    "IT",
  ];

  const [marketTypes, setMarketTypes] = React.useState<string[]>([]);
  const [type, setType] = React.useState<string>("");
  const [gender, setGender] = React.useState<string>();
  const [profilePic, SetProfilePic] = React.useState<any>();
  const [additionalDoc, SetAdditionalDoc] = React.useState<any>();

  const {
    values,
    errors: err,
    handleChange: manageChanges,
    handleSubmit: onsubmit,
  }: any = useForm(register, validate);

  const navigate = useNavigate();

  const handleTypeChange = (event: SelectChangeEvent) => {
    setType(event.target.value as string);
  };

  const handleGenderChange = (event: SelectChangeEvent) => {
    setGender(event.target.value as string);
  };

  const handleMarketTypeChange = (
    event: SelectChangeEvent<typeof marketTypes>
  ) => {
    const {
      target: { value },
    } = event;
    setMarketTypes(typeof value === "string" ? value.split(",") : value);
  };

  /**
   *
   * @param event action when profile pic is changed
   */
  function onProfilePicInputChange(event: any) {
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      SetProfilePic(reader.result);
    };
  }

  /**
   *
   * @param event on additional doc input
   */
  function onAdditionalDocInputChange(event: any) {
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      SetAdditionalDoc(reader.result);
    };
  }

  /**
   *
   * @param values check if any value is empty or not to block the register api
   * @returns
   */
  function isAnyFieldEmpty(values: any): Boolean {
    if (!(typeof values.firstName != "undefined" && values.firstName)) {
      toast.error("First name field cannot be empty");
      return false;
    }
    if (!(typeof values.lastName != "undefined" && values.lastName)) {
      toast.error("Last name field cannot be empty");
      return false;
    }
    if (!(typeof values.email != "undefined" && values.email)) {
      toast.error("Email field cannot be empty");
      return false;
    }
    if (!(typeof values.password != "undefined" && values.password)) {
      toast.error("Password field cannot be empty");
      alert("-" + values.firstName + "-");
      return false;
    }
    if (!(typeof values.mobile_number != "undefined" && values.mobile_number)) {
      toast.error("Mobile number field cannot be empty");
      return false;
    }
    if (!(typeof values.city != "undefined" && values.city)) {
      toast.error("City field cannot be empty");
      return false;
    }

    if (!(typeof values.company_name != "undefined" && values.company_name)) {
      toast.error("Company field cannot be empty");
      return false;
    }
    if (!(typeof values.about_me != "undefined" && values.about_me)) {
      toast.error("About me field cannot be empty");
      return false;
    }
    if (!(typeof values.technology != "undefined" && values.technology)) {
      toast.error("Technology field cannot be empty");
      return false;
    }

    if (!(typeof marketTypes != "undefined" && marketTypes)) {
      toast.error("Market Type field cannot be empty");
      return false;
    }
    if (!(typeof type != "undefined" && type)) {
      toast.error("Who are you field cannot be empty");
      return false;
    }
    if (!(typeof values.ethnicity != "undefined" && values.ethnicity)) {
      toast.error("Ethnicity field cannot be empty");
      return false;
    }
    if (!(typeof gender != "undefined" && gender)) {
      toast.error("Gender field cannot be empty");
      return false;
    }

    if (!(typeof profilePic != "undefined" && profilePic)) {
      toast.error("Profile pic cannot be empty");
      return false;
    }
    if (!(typeof additionalDoc != "undefined" && additionalDoc)) {
      toast.error("Additional Document field cannot be empty");
      return false;
    }

    return true;
  }

  /**
   *
   * @param event
   * register the user
   */
  function register(event: any) {
    event.preventDefault();
    if (isAnyFieldEmpty(values) === true) {
      //check if any field is empty before registering
      httpClient
        .post("/signup", {
          first_name: values.firstName,
          last_name: values.lastName,
          email: values.email,
          password: values.password,
          mobile_num: values.mobile_number,
          city: values.city,
          company_name: values.company_name,
          about: values.about_me,
          country: values.country,
          profile_type: type,
          technology: values.technology,
          interest_market: marketTypes,
          past_investments: values.past_investment,
          ethnicity: values.ethnicity,
          gender: gender,
          profile_pic: profilePic,
          additional_doc: additionalDoc,
        })
        .then((response: any) => {
          //success... set user to session
          if (response.data.message === "User Registered successfully!") {
            localStorage.setItem("isUserLoggedIn", response.data.token);
            localStorage.setItem("loggedInUserEmail", values.email);
            navigate("/");
          } else {
            toast.error(response.data.message);
          }
        })
        .catch((error: any) => {
          toast.error(error.message);
        });
    }
  }

  return (
    <div className="section hightlight background">
      <div className="container">
        <div className="column is-6 is-offset-3">
          <div>
            <h1 className="is-size-3">Register</h1>
            <form onSubmit={register} noValidate>
              <div>
                <TextField
                  style={{ marginTop: "30px" }}
                  fullWidth
                  variant="outlined"
                  label="First Name"
                  autoComplete="off"
                  type="text"
                  name="firstName"
                  onChange={manageChanges}
                  value={values.firstName || ""}
                  required
                />
              </div>
              <div className="attributes">
                <TextField
                  style={{ marginTop: "30px" }}
                  fullWidth
                  variant="outlined"
                  label="Last Name"
                  autoComplete="off"
                  type="text"
                  name="lastName"
                  onChange={manageChanges}
                  value={values.lastName || ""}
                  required
                />
              </div>
              <div className="attributes">
                <TextField
                  fullWidth
                  style={{ marginTop: "30px" }}
                  variant="outlined"
                  label="Email"
                  autoComplete="off"
                  type="email"
                  name="email"
                  onChange={manageChanges}
                  value={values.email || ""}
                  required
                />
              </div>
              <div className="field">
                <TextField
                  fullWidth
                  style={{ marginTop: "30px" }}
                  variant="outlined"
                  label="Password"
                  type="password"
                  name="password"
                  onChange={manageChanges}
                  value={values.password || ""}
                  required
                />
              </div>
              <div className="field">
                <TextField
                  fullWidth
                  style={{ marginTop: "30px" }}
                  variant="outlined"
                  label="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  onChange={manageChanges}
                  value={values.confirmPassword || ""}
                  required
                />
              </div>
              <div className="attributes">
                <TextField
                  fullWidth
                  style={{ marginTop: "30px" }}
                  variant="outlined"
                  label="Mobile Number"
                  autoComplete="off"
                  type="number"
                  name="mobile_number"
                  onChange={manageChanges}
                  value={values.mobile_number || ""}
                  required
                />
              </div>
              <div className="attributes">
                <TextField
                  fullWidth
                  style={{ marginTop: "30px" }}
                  variant="outlined"
                  label="Company Name"
                  autoComplete="off"
                  type="text"
                  name="company_name"
                  onChange={manageChanges}
                  value={values.company_name || ""}
                />
              </div>
              <div className="attributes">
                <TextField
                  fullWidth
                  style={{ marginTop: "30px" }}
                  variant="outlined"
                  label="City"
                  autoComplete="off"
                  type="text"
                  name="city"
                  onChange={manageChanges}
                  value={values.city || ""}
                  required
                />
              </div>
              <div className="attributes">
                <TextField
                  fullWidth
                  style={{ marginTop: "30px" }}
                  variant="outlined"
                  label="Country"
                  autoComplete="off"
                  type="text"
                  name="country"
                  onChange={manageChanges}
                  value={values.country || ""}
                  required
                />
              </div>
              <div className="attributes">
                <TextField
                  fullWidth
                  style={{ marginTop: "30px" }}
                  variant="outlined"
                  label="About me"
                  autoComplete="off"
                  type="text"
                  name="about_me"
                  onChange={manageChanges}
                  value={values.about_me || ""}
                />
              </div>

              <div className="attributes">
                <TextField
                  fullWidth
                  style={{ marginTop: "30px" }}
                  variant="outlined"
                  label="Technology"
                  autoComplete="off"
                  type="text"
                  name="technology"
                  onChange={manageChanges}
                  value={values.technology || ""}
                  required
                />
              </div>

              <div style={{ marginTop: "30px" }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-multiple-name-label" required>
                    Market Type
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    multiple
                    required
                    value={marketTypes}
                    onChange={handleMarketTypeChange}
                    input={<OutlinedInput label="Market Type" />}
                    MenuProps={MenuProps}
                  >
                    {marketLists.map((name) => (
                      <MenuItem
                        key={name}
                        value={name}
                        style={getStyles(name, marketLists, theme)}
                      >
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>

              <div className="attributes">
                <TextField
                  fullWidth
                  style={{ marginTop: "30px" }}
                  variant="outlined"
                  label="Past Investment"
                  autoComplete="off"
                  type="text"
                  name="past_investment"
                  onChange={manageChanges}
                  value={values.past_investment || ""}
                />
              </div>

              <div className="attributes">
                <TextField
                  fullWidth
                  style={{ marginTop: "30px" }}
                  variant="outlined"
                  label="Ethnicity"
                  autoComplete="off"
                  type="text"
                  name="ethnicity"
                  onChange={manageChanges}
                  value={values.ethnicity || ""}
                  required
                />
              </div>
              <FormControl fullWidth style={{ marginTop: "30px" }}>
                <InputLabel id="demo-simple-select-label" required>
                  Who are you
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={type}
                  label="Who are you"
                  onChange={handleTypeChange}
                  required
                >
                  <MenuItem value="Investor">Investor</MenuItem>
                  <MenuItem value="Entrepreneur">Entrepreneur</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth style={{ marginTop: "30px" }}>
                <InputLabel id="demo-simple-select-label" required>
                  Gender
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={gender}
                  label="Gender"
                  onChange={handleGenderChange}
                  required
                >
                  <MenuItem value="Man">Man</MenuItem>
                  <MenuItem value="Woman">Woman</MenuItem>
                  <MenuItem value="Transgender">Transgender</MenuItem>
                  <MenuItem value="Non-Binary/non-confirming">
                    Non-Binary/non-confirming
                  </MenuItem>
                  <MenuItem value="Prefer not to respond">
                    Prefer not to respond
                  </MenuItem>
                </Select>
              </FormControl>

              <div className="attributes" style={{ marginTop: "30px" }}>
                <label htmlFor="contained-button-file">
                  <Input
                    accept="image/*"
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={onProfilePicInputChange}
                  />
                  <Button
                    variant="contained"
                    component="span"
                    color="secondary"
                  >
                    Choose Profie picture
                  </Button>
                </label>
              </div>

              <div className="attributes" style={{ marginTop: "30px" }}>
                <label htmlFor="contained-button-file-doc">
                  <Input
                    accept="image/*"
                    id="contained-button-file-doc"
                    multiple
                    type="file"
                    onChange={onAdditionalDocInputChange}
                  />
                  <Button
                    variant="contained"
                    component="span"
                    color="secondary"
                  >
                    Choose additional document
                  </Button>
                </label>
              </div>
              <button
                type="submit"
                style={{ marginTop: "30px" }}
                className="button is-block is-info is-fullwidth"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
