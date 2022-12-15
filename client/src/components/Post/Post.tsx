import { useState, useEffect } from "react";
import { feed } from "../Feed/Feed";
import { useLocation } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Avatar } from "@mui/material";
import { ToastContainer } from "react-toastify";
import moment from "moment";
import "react-toastify/dist/ReactToastify.css";
import UtilityUser from "../Utility/UtilityUser";
import { Container } from "@mui/system";
import { Typography, Grid, Button } from "@mui/material";
import useStyles from "../Feed/Style";
import Divider from "@mui/material/Divider";

interface feedInterface {
  feed: feed;
}

function Post(props: any) {
  const location = useLocation();
  const state = location.state as feedInterface;

  const [feedc, setFeedc] = useState<feed>(state.feed);
  const [user, setUser] = useState<any>("");
  
  const classes = useStyles();

  useEffect(() => {
    UtilityUser().then(function (response) {
      setUser(response.user_data);
    });
  }, []);

  return (
    <Container className="mt-3">
      <Card style={{ backgroundColor: "#E6E6FA" }}>
        {" "}
        <CardContent>
          <Grid container>
            <Grid item xs={6}>
              <div className={classes.flex}>
                <div className={classes.tags}>
                  <Avatar className={classes.avatar}>
                    <img src={feedc.logo} style={{ height: "40px" }} />
                  </Avatar>
                  <div>
                    <Typography variant="h5" component="div">
                      <b>{feedc.company}</b>
                    </Typography>
                    <Typography
                      variant="body2"
                      component="div"
                      color="text.secondary"
                    >
                      <b>
                        {moment(feedc.post_create_time).format("MMM Do YYYY")}
                      </b>
                    </Typography>
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div style={{ textAlign: "right" }}>
                <Button
                  variant="contained"
                  onClick={(e) => {
                    window.open(
                      "mailto:" +
                      feedc.email +
                      "?subject=Let's Connect!&body=Hello,%0D%0AI came across your profile and your venture on the Investable platform. I am interested in knowing more about your venture. %0D%0A %0D%0A Let's connect! %0D%0A %0D%0A Best%0D%0A" +
                      user.first_name +
                      " " +
                      user.last_name +
                      "%0D%0A" +
                      user.company_name
                    );
                  }}
                >
                  Connect with founder
                </Button>
              </div>
            </Grid>
          </Grid>

          <Typography
            variant="h6"
            component="div"
            style={{ marginTop: "20px", textAlign: "center" }}
          >
            <b>Business Model</b>
          </Typography>
          <Typography
            gutterBottom
            variant="body2"
            style={{ marginTop: "10px", textAlign: "center" }}
          >
            <img
              src={feedc.additional_doc}
              style={{
                width: "600px",
                marginTop: "20px",
                margin: "0 auto",
              }}
            />{" "}
          </Typography>

          <Divider sx={{ bgcolor: "white" }} />

          <Typography
            variant="h6"
            component="div"
            style={{ marginTop: "20px" }}
          >
            <b>Vision</b>
          </Typography>
          <Typography
            gutterBottom
            variant="body2"
            style={{ marginTop: "10px" }}
          >
            {feedc.abstract}
          </Typography>
          <Divider sx={{ bgcolor: "white" }} />

          <Typography
            variant="h6"
            component="div"
            style={{ marginTop: "20px" }}
          >
            <b>Description</b>
          </Typography>
          <Typography
            gutterBottom
            variant="body2"
            style={{ marginTop: "10px" }}
          >
            {feedc.company_info}
          </Typography>
          <Divider sx={{ bgcolor: "white" }} />

          <Grid container>
            <Grid item xs={6}>
              <Typography
                variant="h6"
                component="div"
                style={{ marginTop: "20px" }}
              >
                <b>Rounds of funding so far</b>
              </Typography>
              <Typography
                gutterBottom
                variant="body2"
                style={{ marginTop: "10px" }}
              >
                {feedc.funding_total}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="h6"
                component="div"
                style={{ marginTop: "20px" }}
              >
                <b>Targeted Industries and Technologies</b>
              </Typography>
              <Typography
                gutterBottom
                variant="body2"
                style={{ marginTop: "10px" }}
              >
                {feedc.industry}
              </Typography>
              <Typography
                gutterBottom
                variant="body2"
                style={{ marginTop: "5px" }}
              >
                {feedc.technology}
              </Typography>
            </Grid>
          </Grid>

          <Divider sx={{ bgcolor: "white" }} />

          <Grid container>
            <Grid item xs={6}>
              <Typography
                variant="h6"
                component="div"
                style={{ marginTop: "20px" }}
              >
                <b>Funds looking for</b>
              </Typography>
              <Typography
                gutterBottom
                variant="body2"
                style={{ marginTop: "10px" }}
              >
                {feedc.funding_required}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="h6"
                component="div"
                style={{ marginTop: "20px" }}
              >
                <b>Past Investments</b>
              </Typography>
              <Typography
                gutterBottom
                variant="body2"
                style={{ marginTop: "10px" }}
              >
                {feedc.investors}
              </Typography>
            </Grid>
          </Grid>

          <Divider sx={{ bgcolor: "white" }} />

          <Grid container>
            <Grid item xs={6}>
              <Typography
                variant="h6"
                component="div"
                style={{ marginTop: "20px" }}
              >
                <b>About Founders</b>
              </Typography>
              <Typography
                gutterBottom
                variant="body2"
                style={{ marginTop: "10px" }}
              >
                {feedc.founder_info}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="h6"
                component="div"
                style={{ marginTop: "20px" }}
              >
                <b>Team Information</b>
              </Typography>
              <Typography
                gutterBottom
                variant="body2"
                style={{ marginTop: "10px" }}
              >
                {feedc.team_info}
              </Typography>
            </Grid>
          </Grid>
          <Divider sx={{ bgcolor: "white" }} />

          <Grid container>
            <Grid item xs={6}>
              <Typography
                variant="h6"
                component="div"
                style={{ marginTop: "20px" }}
              >
                <b>Founders</b>
              </Typography>
              <Typography
                gutterBottom
                variant="body2"
                style={{ marginTop: "10px" }}
              >
                {feedc.founders}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="h6"
                component="div"
                style={{ marginTop: "20px" }}
              >
                <b>Total Employees</b>
              </Typography>
              <Typography
                gutterBottom
                variant="body2"
                style={{ marginTop: "10px" }}
              >
                {feedc.total_employees}
              </Typography>
            </Grid>
          </Grid>
          <Divider sx={{ bgcolor: "white" }} />

          <Grid container>
            <Grid item xs={6}>
              <Typography
                variant="h6"
                component="div"
                style={{ marginTop: "20px" }}
              >
                <b>Headquarter</b>
              </Typography>
              <Typography
                gutterBottom
                variant="body2"
                style={{ marginTop: "10px" }}
              >
                {feedc.headquarter}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="h6"
                component="div"
                style={{ marginTop: "20px" }}
              >
                <b>Other offices locations</b>
              </Typography>
              <Typography
                gutterBottom
                variant="body2"
                style={{ marginTop: "10px" }}
              >
                {feedc.locations}
              </Typography>
            </Grid>
          </Grid>
          <Divider sx={{ bgcolor: "white" }} />
        </CardContent>
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Card>
    </Container>
  );
}

export default Post;
