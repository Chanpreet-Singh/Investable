import { Stack, styled, TextField } from "@mui/material";
import { Typography, Grid, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate, useLocation } from "react-router-dom";
import "./Post.css";
import UtilityUser from "../Utility/UtilityUser";
import httpClient from "../../thunk/interceptor";
import { toast } from "react-toastify";
import { post } from "../ProfilePage/FounderPosts";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "3px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

interface postInterface {
  post: post;
}

function EditPost() {

  const navigate = useNavigate();

  const location = useLocation();

  const state = location.state as postInterface;

  const [postToEdit, setPostToEdit] = useState<post>(state.post);

  // Declaring all the field's variables and erros pertaining to that variables, initializing the variables with the stored data.

  const [company, setCompnay] = React.useState<string>(postToEdit.company);
  const [errorscompany, setErrorscompany] = React.useState<{ name: string }>();

  const [industry, setIndustry] = React.useState<string>(postToEdit.industry);
  const [errorsindustry, setErrorsindustry] = React.useState<{ name: string; }>();

  const [companyInfo, setCompnayInfo] = React.useState<string>(postToEdit.company_info);
  const [errorscompanyinfo, setErrorscompanyinfo] = React.useState<{ name: string; }>();

  const [abstract, setAbstract] = React.useState<string>(postToEdit.abstract);
  const [errorsabstract, setErrorsabstract] = React.useState<{ name: string; }>();

  const [technology, setTechnology] = React.useState<string>(postToEdit.technology);
  const [errorstechnology, setErrorstechnology] = React.useState<{ name: string; }>();

  const [investors, setInvestors] = React.useState<string>(postToEdit.investors);
  const [errorsinvestors, setErrorsinvestors] = React.useState<{ name: string; }>();

  const [founders, setFounders] = React.useState<string>(postToEdit.founders);
  const [errorsfounders, setErrorsfounders] = React.useState<{ name: string; }>();

  const [foundersInfo, setFoundersInfo] = React.useState<string>(postToEdit.founder_info);
  const [errorsfoundersinfo, setErrorsfoundersinfo] = React.useState<{ name: string; }>();

  const [foundedIn, setFoundedIn] = React.useState<string>(postToEdit.founded);
  const [errorsfoundedin, setErrorsfoundedin] = React.useState<{ name: string; }>();

  const [headquarters, setHeadquarters] = React.useState<string>(postToEdit.headquarter);
  const [errorsheadquarters, setErrorsheadquarters] = React.useState<{ name: string; }>();

  const [branches, setBranches] = React.useState<string>(postToEdit.locations);
  const [errorsbranches, setErrorsbranches] = React.useState<{ name: string; }>();

  const [valuation, setValuation] = React.useState<string>(postToEdit.valuation);
  const [errorsvaluation, setErrorsvaluation] = React.useState<{ name: string; }>();

  const [employees, setEmployees] = React.useState<string>(postToEdit.total_employees);
  const [errorsemployees, setErrorsemployees] = React.useState<{ name: string; }>();

  const [teamInfo, setteamInfo] = React.useState<string>(postToEdit.team_info);
  const [errorsteaminfo, setErrorsteaminfo] = React.useState<{ name: string; }>();

  const [funding, setFunding] = React.useState<string>(postToEdit.funding_total);
  const [errorsfunding, setErrorsfunding] = React.useState<{ name: string }>();

  const [fundingSeeking, setFundingSeeking] = React.useState<string>(postToEdit.funding_required);
  const [errorsfundingseeking, setErrorsfundingseeking] = React.useState<{ name: string; }>();

  const [logo, setlogo] = React.useState<any>(postToEdit.logo);

  const [userId, setUserId] = useState();

  useEffect(() => {
    UtilityUser().then(function (response) {
      setUserId(response.user._id);
    });
  }, []);

  // Sets the variable for logo with the value of selected logo from the user.
  function onProfilePicInputChange(event: any) {
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setlogo(reader.result);
    };
  }

// Function is called when the user clicks edit post button.
  const postClick = () => {

    // Initially set the variable errors to null string.

    setErrorscompany({ name: "" });
    setErrorsindustry({ name: "" });
    setErrorscompanyinfo({ name: "" });
    setErrorsabstract({ name: "" });
    setErrorstechnology({ name: "" });
    setErrorsinvestors({ name: "" });
    setErrorsfounders({ name: "" });
    setErrorsfoundersinfo({ name: "" });
    setErrorsfoundedin({ name: "" });
    setErrorsheadquarters({ name: "" });
    setErrorsbranches({ name: "" });
    setErrorsvaluation({ name: "" });
    setErrorsemployees({ name: "" });
    setErrorsteaminfo({ name: "" });
    setErrorsfunding({ name: "" });
    setErrorsfundingseeking({ name: "" });

    // Initialize an error counter with value 0.
    let errorState: number = 0;

    // Checks if every required field has an input or not, if error exists increment the error counter with 1.
    let value = company || "";
    let standardString = typeof value === "string" ? value.trim() : "";
    if (standardString.length === 0) {
      setErrorscompany({ name: "Company Name cannot be empty" });
      errorState = errorState + 1;
    }

    value = industry || "";
    standardString = typeof value === "string" ? value.trim() : "";
    if (standardString.length === 0) {
      setErrorsindustry({ name: "Industry information cannot be empty" });
      errorState = errorState + 1;
    }

    value = abstract || "";
    standardString = typeof value === "string" ? value.trim() : "";
    if (standardString.length === 0) {
      setErrorsabstract({ name: "Abstract cannot be empty" });
      errorState = errorState + 1;
    }

    value = technology || "";
    standardString = typeof value === "string" ? value.trim() : "";
    if (standardString.length === 0) {
      setErrorstechnology({ name: "Technology information cannot be empty" });
      errorState = errorState + 1;
    }

    value = companyInfo || "";
    standardString = typeof value === "string" ? value.trim() : "";
    if (standardString.length === 0) {
      setErrorscompanyinfo({ name: "Company Information cannot be empty" });
      errorState = errorState + 1;
    }

    value = investors || "";
    standardString = typeof value === "string" ? value.trim() : "";
    if (standardString.length === 0) {
      setErrorsinvestors({ name: "Investors information cannot be empty" });
      errorState = errorState + 1;
    }

    value = founders || "";
    standardString = typeof value === "string" ? value.trim() : "";
    if (standardString.length === 0) {
      setErrorsfounders({ name: "Founders cannot be empty" });
      errorState = errorState + 1;
    }

    value = foundersInfo || "";
    standardString = typeof value === "string" ? value.trim() : "";
    if (standardString.length === 0) {
      setErrorsfoundersinfo({ name: "Founders information cannot be empty" });
      errorState = errorState + 1;
    }

    value = foundedIn || "";
    standardString = typeof value === "string" ? value.trim() : "";
    if (standardString.length === 0) {
      setErrorsfoundedin({ name: "Founded In cannot be empty" });
      errorState = errorState + 1;
    }

    value = headquarters || "";
    standardString = typeof value === "string" ? value.trim() : "";
    if (standardString.length === 0) {
      setErrorsheadquarters({ name: "headquarters cannot be empty" });
      errorState = errorState + 1;
    }

    value = branches || "";
    standardString = typeof value === "string" ? value.trim() : "";
    if (standardString.length === 0) {
      setErrorsbranches({ name: "Branches cannot be empty" });
      errorState = errorState + 1;
    }

    value = valuation || "";
    standardString = typeof value === "string" ? value.trim() : "";
    if (standardString.length === 0) {
      setErrorsvaluation({ name: "Valuation cannot be empty" });
      errorState = errorState + 1;
    }

    value = employees || "";
    standardString = typeof value === "string" ? value.trim() : "";
    if (standardString.length === 0) {
      setErrorsbranches({ name: "Branches cannot be empty" });
      errorState = errorState + 1;
    }

    value = teamInfo || "";
    standardString = typeof value === "string" ? value.trim() : "";
    if (standardString.length === 0) {
      setErrorsteaminfo({ name: "Team information cannot be empty" });
      errorState = errorState + 1;
    }

    value = funding || "";
    standardString = typeof value === "string" ? value.trim() : "";
    if (standardString.length === 0) {
      setErrorsfunding({ name: "Funding cannot be empty" });
      errorState = errorState + 1;
    }

    value = fundingSeeking || "";
    standardString = typeof value === "string" ? value.trim() : "";
    if (standardString.length === 0) {
      setErrorsfundingseeking({
        name: "Funding seeking information cannot be empty",
      });
      errorState = errorState + 1;
    }

    // If the error counter is 0, post request is sent to backend.
    if (errorState == 0) {

      httpClient
        .post("/updatepost", {
          _id: postToEdit._id,
          email: localStorage.getItem("loggedInUserEmail"),
          company: company,
          industry: industry,
          investors: investors,
          abstract: abstract,
          technology: technology,
          founders: founders,
          founded: foundedIn,
          headquarter: headquarters,
          locations: branches,
          valuation: valuation,
          total_employees: employees,
          funding_total: funding,
          funding_required: fundingSeeking,
          team_info: teamInfo,
          company_info: companyInfo,
          founder_info: foundersInfo,
          logo: logo,
        })
        .then((response: any) => {
          if (response.data.message === "Post details updated successfully.") {
            navigate("/userprofile");
          } else {
            toast.error(response.data.message);
          }
        })
        .catch((error: any) => {
          toast.error(error.message);
        });
    }
  };

  // If user chooses to discard the post, it will navigate to the feed page.
  const discardClick = () => {
    navigate("/userprofile");
  };

  // When the user enters the value, its stored in its repective variable.
  const handleChangeInCompany = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const {
      target: { value },
    } = event;
    setCompnay(value);
  };

  const handleChangeInIndustry = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const {
      target: { value },
    } = event;
    setIndustry(value);
  };

  const handleChangeInAbstract = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const {
      target: { value },
    } = event;
    setAbstract(value);
  };

  const handleChangeInTechnology = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const {
      target: { value },
    } = event;
    setTechnology(value);
  };

  const handleChangeInCompanyInfo = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const {
      target: { value },
    } = event;
    setCompnayInfo(value);
  };

  const handleChangeInInvestors = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const {
      target: { value },
    } = event;
    setInvestors(value);
  };

  const handleChangeInFounders = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const {
      target: { value },
    } = event;
    setFounders(value);
  };

  const handleChangeInFoundersInfo = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const {
      target: { value },
    } = event;
    setFoundersInfo(value);
  };

  const handleChangeInFoundedIn = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const {
      target: { value },
    } = event;
    setFoundedIn(value);
  };

  const handleChangeInHeadquarters = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const {
      target: { value },
    } = event;
    setHeadquarters(value);
  };

  const handleChangeInBranches = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const {
      target: { value },
    } = event;
    setBranches(value);
  };

  const handleChangeInValuation = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const {
      target: { value },
    } = event;
    setValuation(value);
  };

  const handleChangeInEmployees = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const {
      target: { value },
    } = event;
    setEmployees(value);
  };

  const handleChangeInTeamInfo = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const {
      target: { value },
    } = event;
    setteamInfo(value);
  };

  const handleChangeInFunding = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const {
      target: { value },
    } = event;
    setFunding(value);
  };

  const handleChangeInFundingSeeking = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const {
      target: { value },
    } = event;
    setFundingSeeking(value);
  };

  const Input = styled("input")({
    display: "none",
  });

  return (
    <Grid item xs={12} md={12}>
      <Stack
        direction="column"
        spacing={3}
        justifyContent="flex-start"
        alignItems="left"
        className="grid-container"
      >
        <Stack
          direction="column"
          spacing={3}
          sx={{ paddingTop: "1%" }}
          justifyContent="flex-start"
          alignItems="left"
          className="grid-container-child"
        >
          <Stack spacing={2}>
            <Typography variant="h5" style={{ fontWeight: 600 }}>
              Company
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              value={company}
              onChange={handleChangeInCompany}
              id="company"
              placeholder="Company Name"
              name="company"
              autoFocus
              error={Boolean(errorscompany?.name)}
              helperText={errorscompany?.name}
            />
          </Stack>
          <Stack spacing={2}>
            <Typography variant="h5" style={{ fontWeight: 600 }}>
              Industry
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              name="industry"
              placeholder="Industry it aims for."
              value={industry}
              onChange={handleChangeInIndustry}
              multiline
              id="industry"
              error={Boolean(errorsindustry?.name)}
              helperText={errorsindustry?.name}
            />
          </Stack>
          <Stack spacing={2}>
            <Typography variant="h5" style={{ fontWeight: 600 }}>
              Abstract
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              name="abstract"
              placeholder="Abstract of the company."
              value={abstract}
              onChange={handleChangeInAbstract}
              multiline
              id="abstract"
              error={Boolean(errorsabstract?.name)}
              helperText={errorsabstract?.name}
            />
          </Stack>
          <Stack spacing={2}>
            <Typography variant="h5" style={{ fontWeight: 600 }}>
              Technology
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              name="technology"
              placeholder="Technology it aims for."
              value={technology}
              onChange={handleChangeInTechnology}
              id="technology"
              error={Boolean(errorstechnology?.name)}
              helperText={errorstechnology?.name}
            />
          </Stack>
          <Stack spacing={2}>
            <Typography variant="h5" style={{ fontWeight: 600 }}>
              Company Information
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              name="body"
              placeholder="Information about the company."
              value={companyInfo}
              onChange={handleChangeInCompanyInfo}
              id="companyInfo"
              error={Boolean(errorscompanyinfo?.name)}
              helperText={errorscompanyinfo?.name}
            />
          </Stack>
          <Stack spacing={2}>
            <Typography variant="h5" style={{ fontWeight: 600 }}>
              Investors
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              name="investors"
              placeholder="Investors till date."
              value={investors}
              onChange={handleChangeInInvestors}
              multiline
              id="investors"
              error={Boolean(errorsinvestors?.name)}
              helperText={errorsinvestors?.name}
            />
          </Stack>
          <Stack spacing={2}>
            <Typography variant="h5" style={{ fontWeight: 600 }}>
              Founder(s) of the company
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              name="founders"
              placeholder="Founders of the company."
              value={founders}
              onChange={handleChangeInFounders}
              id="founders"
              error={Boolean(errorsfounders?.name)}
              helperText={errorsfounders?.name}
            />
          </Stack>
          <Stack spacing={2}>
            <Typography variant="h5" style={{ fontWeight: 600 }}>
              Founder(s) Information
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              name="foundersInfo"
              placeholder="Information about the company's founder(s)."
              value={foundersInfo}
              onChange={handleChangeInFoundersInfo}
              id="foundersInfo"
              error={Boolean(errorsfoundersinfo?.name)}
              helperText={errorsfoundersinfo?.name}
            />
          </Stack>
          <Stack spacing={2}>
            <Typography variant="h5" style={{ fontWeight: 600 }}>
              Founded in
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              name="foundedIn"
              placeholder="Year the company was founded in."
              value={foundedIn}
              onChange={handleChangeInFoundedIn}
              id="foundedIn"
              error={Boolean(errorsfoundedin?.name)}
              helperText={errorsfoundedin?.name}
            />
          </Stack>
          <Stack spacing={2}>
            <Typography variant="h5" style={{ fontWeight: 600 }}>
              Headquarters
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              name="headquarters"
              placeholder="Headquarter location."
              value={headquarters}
              onChange={handleChangeInHeadquarters}
              id="body"
              error={Boolean(errorsheadquarters?.name)}
              helperText={errorsheadquarters?.name}
            />
          </Stack>
          <Stack spacing={2}>
            <Typography variant="h5" style={{ fontWeight: 600 }}>
              Branches
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              name="branches"
              placeholder="Branches location."
              value={branches}
              onChange={handleChangeInBranches}
              id="branches"
              error={Boolean(errorsbranches?.name)}
              helperText={errorsbranches?.name}
            />
          </Stack>
          <Stack spacing={2}>
            <Typography variant="h5" style={{ fontWeight: 600 }}>
              Valuation of the company
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              name="valuation"
              placeholder="Valuation of the company."
              value={valuation}
              onChange={handleChangeInValuation}
              id="body"
              error={Boolean(errorsvaluation?.name)}
              helperText={errorsvaluation?.name}
            />
          </Stack>
          <Stack spacing={2}>
            <Typography variant="h5" style={{ fontWeight: 600 }}>
              Employess in the company
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              name="employees"
              placeholder="Number of employess."
              value={employees}
              onChange={handleChangeInEmployees}
              id="employees"
              error={Boolean(errorsemployees?.name)}
              helperText={errorsemployees?.name}
            />
          </Stack>
          <Stack spacing={2}>
            <Typography variant="h5" style={{ fontWeight: 600 }}>
              Team Information
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              name="teamInfo"
              placeholder="Information about the team."
              multiline
              value={teamInfo}
              onChange={handleChangeInTeamInfo}
              id="teamInfo"
              error={Boolean(errorsteaminfo?.name)}
              helperText={errorsteaminfo?.name}
            />
          </Stack>
          <Stack spacing={2}>
            <Typography variant="h5" style={{ fontWeight: 600 }}>
              Funding
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              name="funding"
              placeholder="Funding recieved by the company till date."
              value={funding}
              onChange={handleChangeInFunding}
              id="funding"
              error={Boolean(errorsfunding?.name)}
              helperText={errorsfunding?.name}
            />
          </Stack>
          <Stack spacing={2}>
            <Typography variant="h5" style={{ fontWeight: 600 }}>
              Funding seeking
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              name="fundingSeeking"
              placeholder="Funds company is seeking from the investors."
              value={fundingSeeking}
              onChange={handleChangeInFundingSeeking}
              id="fundingSeeking"
              error={Boolean(errorsfundingseeking?.name)}
              helperText={errorsfundingseeking?.name}
            />
          </Stack>
          <div className="attributes" style={{ marginTop: "30px" }}>
            <label htmlFor="contained-button-file">
              <Input
                accept="image/*"
                id="contained-button-file"
                multiple
                type="file"
                onChange={onProfilePicInputChange}
              />
              <Button variant="contained" component="span" color="secondary">
                Choose Profie picture
              </Button>
            </label>
          </div>
          <Stack direction="row" spacing={1}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              endIcon={<SendIcon />}
              onClick={() => postClick()}
            >
              Post
            </Button>
            <Button
              href="#discard-button"
              fullWidth
              variant="outlined"
              startIcon={<DeleteIcon />}
              onClick={discardClick}
            >
              Discard
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Grid>
  );
}

export default EditPost;
