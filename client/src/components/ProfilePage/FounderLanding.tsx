import * as React from "react";
import FounderPosts from "./FounderPosts";
import { Box, Grid, Tabs, Typography, Card, CardContent } from "@mui/material";
import Tab from "@mui/material/Tab";
import axios from "axios";
import Profile from "./Profile";
import TabContext from "@mui/lab/TabContext";
import { Container } from "@mui/system";
import CircularProgress from "@mui/material/CircularProgress";
import "./FounderLanding.css";
import TabPanel from "@mui/lab/TabPanel";
import UtilityUser from "../Utility/UtilityUser";

export default function FounderLanding() {

  const [value, setValue] = React.useState("1");
  const [posts, setPosts] = React.useState([]);
  const [gotFeeds, setGotFeeds] = React.useState(false);
  const [isInvestor, setIsInvestor] = React.useState(true);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    fetchPosts();

    UtilityUser().then((response) => {
      if (response.user_data.profile_type.toLowerCase() === "entrepreneur") {
        setIsInvestor(false);
      } else {
        setValue("2");
      }
    });
  }, []);

  const fetchPosts = (): void => {
    axios
      .post(
        "https://vdw10x8lxi.execute-api.us-east-1.amazonaws.com/prod/mypost",
        { email: localStorage.getItem("loggedInUserEmail") }
      )
      .then((result) => {
        setPosts(result.data.post_data);
        setGotFeeds(true);
      })
      .catch((err) => {
        alert("Alert: Sysytem Error!")
      });
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <div className="Tabs">
            <Tabs
              onChange={handleChange}
              aria-label="lab API tabs example"
              variant="scrollable"
              centered
              sx={{ width: "100%" }}
              scrollButtons="auto"
            >
              {isInvestor === false && <Tab label="My Posts" value="1" />}
              <Tab label="Profile Settings" value="2" />
            </Tabs>
          </div>
        </Box>
        <TabPanel value="2">
          <Profile></Profile>
        </TabPanel>
        {isInvestor === false && (
          <TabPanel value="1">
            <Container>
              <Grid container spacing={2}>
                {posts.length > 0 ? (
                  posts.map((post: any) => <FounderPosts {...post} />)
                ) : (
                  <Card color="red">
                    <CardContent>
                      <Typography gutterBottom variant="h6" align="center">
                        {gotFeeds === true ? (
                          "No Posts Found"
                        ) : (
                          <CircularProgress color="secondary" />
                        )}
                      </Typography>
                    </CardContent>
                  </Card>
                )}
              </Grid>{" "}
            </Container>
          </TabPanel>
        )}
      </TabContext>
    </Box>
  );
}
