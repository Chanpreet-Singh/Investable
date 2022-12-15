import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled, Grid, Button } from "@material-ui/core";
import "./Profile.css";
import { Container } from "@mui/system";
import React, { useEffect } from "react";
import httpClient from "../../thunk/interceptor";
import { Buffer } from "buffer";
import Avatar from "@mui/material/Avatar";
import CardHeader from "@mui/material/CardHeader";
import ReactSelect, { components, GroupBase, OptionProps } from "react-select";
import UtilityUser from "../Utility/UtilityUser";
import moment from "moment";
import { Theme, useTheme } from "@mui/material/styles";

const MyComponent = styled("div")({
  color: "white",
  backgroundColor: "#414379",
  padding: 10,
  borderRadius: 60,
  alignContent: "center",
});

const Input = styled("input")({
  display: "none",
});

const Profile = () => {
  const theme = useTheme();

  const loggedInUserEmailId = localStorage.getItem("loggedInUserEmail");

  const navigate = useNavigate();

  const [dob, setdob] = React.useState<Date | null>(null);

  const [disable, setDisable] = React.useState(false);

  const [firstname, setfirstname] = React.useState<string>();
  const [errorsfirstname, setErrosfirstname] = React.useState<{
    name: string;
  }>();

  const [lastname, setlastname] = React.useState<string>();
  const [errorslastname, setErroslastname] = React.useState<{ name: string }>();

  const [city, setcity] = React.useState<string>();
  const [errorscity, setErroscity] = React.useState<{ name: string }>();

  const [country, setCountry] = React.useState<string>();
  const [errorscountry, setErroscountry] = React.useState<{ name: string }>();

  const [email, setemail] = React.useState<String>();
  const [errorsemail, setErrosemail] = React.useState<{ name: string }>();

  const [phone, setPhone] = React.useState<string>();
  const [errorsphone, setErrosphone] = React.useState<{ name: string }>();

  const [company, setCompnay] = React.useState<string>();
  const [errorscompany, setErroscompany] = React.useState<{ name: string }>();

  const [aboutCompany, setAboutCompnay] = React.useState<string>();
  const [errorsaboutcompany, setErrosaboutcompany] = React.useState<{
    name: string;
  }>();

  const [technology, setTechnology] = React.useState<string>();
  const [errorstechnology, setErrostechnology] = React.useState<{
    name: string;
  }>();

  const [ethnicity, setEthnicity] = React.useState<string>();
  const [errorsethnicity, setErrosethnicity] = React.useState<{
    name: string;
  }>();

  const [pastInvestments, setPastInvestments] = React.useState<string>();
  const [errorspastinvestments, setErrospastinvesments] = React.useState<{
    name: string;
  }>();

  const [gender, setGender] = React.useState<string>();

  const [imagedata, setimagedata] = React.useState<string>();

  const [additionalDoc, setadditionaldoc] = React.useState<string>();

  const [profileType, setprofileType] = React.useState<string>();

  const [marketTypes, setMarketTypes] = React.useState<string[]>([]);

  const [profile_create_time, setprofile_create_time] =
    React.useState<string>();

  useEffect(() => {
    UtilityUser().then(function (response) {
      setfirstname(response.user_data.first_name);
      setlastname(response.user_data.last_name);
      setcity(response.user_data.city);
      setCountry(response.user_data.country);
      setemail(response.user_data.email);
      setPhone(response.user_data.mobile_num);
      setCompnay(response.user_data.company_name);
      setAboutCompnay(response.user_data.about);
      setTechnology(response.user_data.technology);
      setEthnicity(response.user_data.ethnicity);
      setPastInvestments(response.user_data.past_investments);
      setprofileType(response.user_data.profile_type);
      setprofile_create_time(response.user_data.profile_create_time);
      setimagedata(response.user_data.profile_pic);
      setadditionaldoc(response.user_data.additional_doc);
    });
  }, []);

  const handleMarketTypeChange = (
    event: SelectChangeEvent<typeof marketTypes>
  ) => {
    const {
      target: { value },
    } = event;
    setMarketTypes(typeof value === "string" ? value.split(",") : value);
  };

  const handleGenderChange = (event: SelectChangeEvent) => {
    setGender(event.target.value as string);
  };

  const checkforEmptyValue = (
    firstname: any,
    lastname: any,
    city: any,
    country: any,
    email: any,
    phone: any,
    company: any,
    aboutCompany: any,
    technology: any,
    ethnicity: any,
    pastInvestments: any
  ) => {
    setErrosfirstname({ name: "" });
    setErroslastname({ name: "" });
    setErroscity({ name: "" });
    setErroscountry({ name: "" });
    setErrosemail({ name: "" });
    setErrosphone({ name: "" });
    setErroscompany({ name: "" });
    setErrosaboutcompany({ name: "" });
    setErrostechnology({ name: "" });
    setErrosethnicity({ name: "" });
    setErrospastinvesments({ name: "" });

    let err: number = 0;

    let str = firstname || "";
    let result1 = typeof str === "string" ? str.trim() : "";
    if (result1.length === 0) {
      setErrosfirstname({ name: "First Name cannot be empty" });
      err = err + 1;
    }

    str = lastname || "";
    result1 = typeof str === "string" ? str.trim() : "";
    if (result1.length === 0) {
      setErroslastname({ name: "Last Name cannot be empty" });
      err = err + 1;
    }

    str = city || "";
    result1 = typeof str === "string" ? str.trim() : "";
    if (result1.length === 0) {
      setErroscity({ name: "City cannot be empty" });
      err = err + 1;
    }

    str = country || "";
    result1 = typeof str === "string" ? str.trim() : "";
    if (result1.length === 0) {
      setErroscountry({ name: "Country cannot be empty" });
      err = err + 1;
    }

    str = email || "";
    result1 = typeof str === "string" ? str.trim() : "";
    if (result1.length === 0) {
      setErrosemail({ name: "Email cannot be empty" });
      err = err + 1;
    }

    str = phone || "";
    result1 = typeof str === "string" ? str.trim() : "";
    if (result1.length === 0) {
      setErrosphone({ name: "Mobile Number cannot be empty" });
      err = err + 1;
    }

    str = company || "";
    result1 = typeof str === "string" ? str.trim() : "";
    if (result1.length === 0) {
      setErroscompany({ name: "Company cannot be empty" });
      err = err + 1;
    }

    str = aboutCompany || "";
    result1 = typeof str === "string" ? str.trim() : "";
    if (result1.length === 0) {
      setErrosaboutcompany({ name: "About company cannot be empty" });
      err = err + 1;
    }

    str = technology || "";
    result1 = typeof str === "string" ? str.trim() : "";
    if (result1.length === 0) {
      setErrostechnology({ name: "Technology cannot be empty" });
      err = err + 1;
    }

    str = ethnicity || "";
    result1 = typeof str === "string" ? str.trim() : "";
    if (result1.length === 0) {
      setErrosethnicity({ name: "Ethnicity cannot be empty" });
      err = err + 1;
    }

    str = pastInvestments || "";
    result1 = typeof str === "string" ? str.trim() : "";
    if (result1.length === 0) {
      setErrospastinvesments({ name: "Past investments cannot be empty" });
      err = err + 1;
    }

    if (err === 0) {
      httpClient
        .post("/updateuser", {
          first_name: firstname,
          last_name: lastname,
          email: email,
          mobile_num: phone,
          city: city,
          company_name: company,
          about: aboutCompany,
          country: country,
          profile_type: profileType,
          technology: technology,
          interest_market: marketTypes,
          ethnicity: ethnicity,
          past_investments: pastInvestments,
          gender: gender,
          profile_pic: imagedata,
          additional_doc: additionalDoc,
          profile_create_time: profile_create_time,
        })
        .then((res) => {
          if (profileType?.toLowerCase() === "investor") {
            navigate("/feeds");
          } else {
            window.location.reload();
          }
        })
        .catch((err) => {
          alert("Alert: System error!");
        });
    }
  };

  const [errors, setErrors] = React.useState<{ phone: string }>();

  const handleChangeInFirstName = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDisable(false);
    const {
      target: { value },
    } = event;
    setErrosfirstname({ name: "" });
    setfirstname(value);
    let reg = new RegExp(/^[a-zA-Z][a-zA-Z ]*$/).test(value);
    if (!reg) {
      setDisable(true);
      setErrosfirstname({ name: "Only Alphabets are allowed with spaces" });
    }
  };

  const handleChangeInLastName = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDisable(false);
    const {
      target: { value },
    } = event;
    setErroslastname({ name: "" });
    setlastname(value);
    let reg = new RegExp(/^[a-zA-Z][a-zA-Z ]*$/).test(value);
    if (!reg) {
      setDisable(true);
      setErroslastname({ name: "Only Alphabets are allowed with spaces" });
    }
  };

  const handleChangeInCity = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDisable(false);
    const {
      target: { value },
    } = event;
    setErroscity({ name: "" });
    setcity(value);
  };

  const handleChangeInCountry = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDisable(false);
    const {
      target: { value },
    } = event;
    setErroscountry({ name: "" });
    setCountry(value);
  };

  const handleChangeInEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDisable(false);
    const {
      target: { value },
    } = event;
    setErrosemail({ name: "" });
    setemail(value);
  };

  const handleChangeInMobileNo = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDisable(false);
    const {
      target: { value },
    } = event;
    setErrors({ phone: "" });
    setPhone(value);
    let reg = new RegExp(/^\d*$/).test(value);
    if (!reg) {
      setDisable(true);
      setErrosphone({ name: "Only numbers are permitted" });
    }
  };

  const handleChangeInComapny = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDisable(false);
    const {
      target: { value },
    } = event;
    setErroscompany({ name: "" });
    setCompnay(value);
  };

  const handleChangeInAboutComapny = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDisable(false);
    const {
      target: { value },
    } = event;
    setErrosaboutcompany({ name: "" });
    setAboutCompnay(value);
  };

  const handleChangeInTechnology = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDisable(false);
    const {
      target: { value },
    } = event;
    setErrostechnology({ name: "" });
    setTechnology(value);
  };

  const handleChangeInEthnicity = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDisable(false);
    const {
      target: { value },
    } = event;
    setErrosethnicity({ name: "" });
    setEthnicity(value);
  };

  const handleChangeInPastInvestments = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDisable(false);
    const {
      target: { value },
    } = event;
    setErrospastinvesments({ name: "" });
    setPastInvestments(value);
  };

  const uploadImage = () => {
    let str = imagedata;
    let result1 = typeof str === "string" ? str.trim() : "";
    if (result1.length === 0 && false) {
    } else {
      httpClient
        .post("/userprofile/uploadImage?email=" + loggedInUserEmailId, {
          image: imagedata,
        })
        .then((res) => {
          window.location.reload();
        })
        .catch((err) => {
          alert("Alert: System error!");
        });
    }
  };

  const uploadExtraImage = () => {
    let str = additionalDoc;
    let result1 = typeof str === "string" ? str.trim() : "";
    if (result1.length === 0 && false) {
    } else {
      httpClient
        .post("/userprofile/uploadImage?email=" + loggedInUserEmailId, {
          image: additionalDoc,
        })
        .then((res) => {
          window.location.reload();
        })
        .catch((err) => {
          alert("Alert: System error!");
        });
    }
  };

  function onImageInputChange(event: any) {
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      let text = reader.result?.toString();
      setimagedata(text);
    };
  }

  function onAdditionalDocChange(event: any) {
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      let text = reader.result?.toString();
      setadditionaldoc(text);
    };
  }

  function getStyles(name: string, personName: string[], theme: Theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const marketLists = [
    "Automotive",
    "Finance",
    "Food",
    "Hospitalitiy",
    "Entertainment",
    "Construction",
    "Social Media",
    "IT",
  ];

  return (
    <Container>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                InputLabelProps={{ shrink: true }}
                label="First Name"
                id="fullname"
                onChange={handleChangeInFirstName}
                variant="outlined"
                required
                value={firstname}
                error={Boolean(errorsfirstname?.name)}
                helperText={errorsfirstname?.name}
                fullWidth
              ></TextField>
            </Grid>{" "}
            <Grid item xs={12} md={6}>
              <TextField
                InputLabelProps={{ shrink: true }}
                label="Last Name"
                id="lastname"
                onChange={handleChangeInLastName}
                variant="outlined"
                required
                value={lastname}
                error={Boolean(errorslastname?.name)}
                helperText={errorslastname?.name}
                fullWidth
              ></TextField>
            </Grid>{" "}
            <Grid item xs={12} md={3}>
              <TextField
                InputLabelProps={{ shrink: true }}
                onChange={handleChangeInCity}
                label="City"
                variant="outlined"
                value={city}
                required
                error={Boolean(errorscity?.name)}
                helperText={errorscity?.name}
                fullWidth
              ></TextField>{" "}
            </Grid>{" "}
            <Grid item xs={12} md={3}>
              <TextField
                InputLabelProps={{ shrink: true }}
                onChange={handleChangeInCountry}
                label="Country"
                variant="outlined"
                value={country}
                required
                error={Boolean(errorscountry?.name)}
                helperText={errorscountry?.name}
                fullWidth
              ></TextField>{" "}
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                InputLabelProps={{ shrink: true }}
                onChange={handleChangeInEmail}
                label="Email ID"
                value={email}
                variant="outlined"
                required
                error={Boolean(errorsemail?.name)}
                helperText={errorsemail?.name}
                aria-readonly
                fullWidth
              ></TextField>{" "}
            </Grid>{" "}
            <Grid item xs={12} md={6}>
              <TextField
                InputLabelProps={{ shrink: true }}
                onChange={handleChangeInMobileNo}
                label="Mobile No"
                variant="outlined"
                required
                value={phone}
                error={Boolean(errors?.phone || errorsphone?.name)}
                helperText={errors?.phone || errorsphone?.name}
                fullWidth
              ></TextField>{" "}
            </Grid>{" "}
            <Grid item xs={12} md={6}>
              <TextField
                InputLabelProps={{ shrink: true }}
                onChange={handleChangeInComapny}
                label="Company Name"
                value={company}
                variant="outlined"
                required
                error={Boolean(errorscompany?.name)}
                helperText={errorscompany?.name}
                aria-readonly
                fullWidth
              ></TextField>{" "}
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                InputLabelProps={{ shrink: true }}
                onChange={handleChangeInAboutComapny}
                multiline={true}
                label="About Company"
                value={aboutCompany}
                variant="outlined"
                required
                error={Boolean(errorsaboutcompany?.name)}
                helperText={errorsaboutcompany?.name}
                aria-readonly
                fullWidth
              ></TextField>{" "}
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                InputLabelProps={{ shrink: true }}
                onChange={handleChangeInTechnology}
                label="Technology"
                value={technology}
                variant="outlined"
                required
                error={Boolean(errorstechnology?.name)}
                helperText={errorstechnology?.name}
                aria-readonly
                fullWidth
              ></TextField>{" "}
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                InputLabelProps={{ shrink: true }}
                onChange={handleChangeInEthnicity}
                label="Ethnicity"
                value={ethnicity}
                variant="outlined"
                required
                error={Boolean(errorsethnicity?.name)}
                helperText={errorsethnicity?.name}
                aria-readonly
                fullWidth
              ></TextField>{" "}
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                multiline={true}
                InputLabelProps={{ shrink: true }}
                onChange={handleChangeInPastInvestments}
                label="Past Investments"
                value={pastInvestments}
                variant="outlined"
                required
                error={Boolean(errorspastinvestments?.name)}
                helperText={errorspastinvestments?.name}
                aria-readonly
                fullWidth
              ></TextField>{" "}
            </Grid>
            <Grid item xs={12} md={12}>
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
            </Grid>
            <Grid item xs={12} md={12}>
              <FormControl fullWidth style={{ marginTop: "01px" }}>
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
            </Grid>
            <Grid item xs={12} md={12}>
              <Button
                disabled={disable}
                variant="contained"
                color="primary"
                onClick={() =>
                  checkforEmptyValue(
                    firstname,
                    lastname,
                    //address,
                    city,
                    country,
                    email,
                    phone,
                    company,
                    aboutCompany,
                    technology,
                    ethnicity,
                    pastInvestments
                  )
                }
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <div className="col-xl-4">
            <div className="card mb-4 mb-xl-0 p-3">
              <div className="card-header">Profile Picture</div>
              <div className="card-body text-center">
                <div className="cardBodyItems m-3">
                  <div>
                    <CardHeader
                      avatar={
                        <Avatar
                          alt="Tony Stark"
                          src={imagedata}
                          sx={{ width: 110, height: 110 }}
                        />
                      }
                    />
                  </div>
                  <div>
                    <div className="small font-italic text-muted mb-4">
                      JPG or PNG no larger than 5 MB
                    </div>
                  </div>
                  <div>
                    <label htmlFor="contained-button-file">
                      <Input
                        accept="image/*"
                        id="contained-button-file"
                        multiple
                        type="file"
                        onChange={onImageInputChange}
                      />
                      <Button
                        variant="contained"
                        component="span"
                        color="secondary"
                      >
                        Choose File
                      </Button>
                    </label>
                    {"   "}
                    <Button
                      variant="contained"
                      component="span"
                      color="primary"
                      onClick={uploadImage}
                    >
                      Upload
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4">
            <div className="card mb-4 mb-xl-0 p-3">
              <div className="card-header">Additional Document</div>
              <div className="card-body text-center">
                <div className="cardBodyItems m-3">
                  <div>
                    <CardHeader
                      avatar={
                        <Avatar
                          alt="Tony Stark"
                          src={additionalDoc}
                          sx={{ width: 110, height: 110 }}
                        />
                      }
                    />
                  </div>
                  <div>
                    <div className="small font-italic text-muted mb-4">
                      JPG or PNG no larger than 5 MB
                    </div>
                  </div>
                  <div>
                    <label htmlFor="contained-button-file1">
                      <Input
                        accept="image/*"
                        id="contained-button-file1"
                        multiple
                        type="file"
                        onChange={onAdditionalDocChange}
                      />
                      <Button
                        variant="contained"
                        component="span"
                        color="secondary"
                      >
                        Choose File
                      </Button>
                    </label>
                    {"   "}
                    <Button
                      variant="contained"
                      component="span"
                      color="primary"
                      onClick={uploadExtraImage}
                    >
                      Upload
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
