import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
} from "@mui/material";
import Feed from "./Feed";
import CircularProgress from "@mui/material/CircularProgress";
import { Container } from "@mui/system";
import { SelectChangeEvent } from "@mui/material/Select";
import useStyles from "./Style";
import httpClient from "../../thunk/interceptor";
import UtilityUser from "../Utility/UtilityUser";
/*
 * @author: Aman Singh Bhandari
 *
 */

function Feeds() {
  const classes = useStyles();
  const [feeds, setFeeds] = React.useState([]);
  const [gotFeeds, setGotFeeds] = useState(false);
  const [filter, setFilter] = useState("all");
  const [reFetch, setReFetch] = useState(false);

  useEffect(() => {}, []);

  useEffect(() => {
    UtilityUser().then(function (response) {
      //get logged in user details
      httpClient
        .post("/filterfeed", {
          //get filter feeds based on the user preferences of market and technology
          industry: response.user_data.interest_market[0],
          technology: response.user_data.technology,
        })
        .then(async (res) => {
          const interimFeeds: [any] = res.data.post_data;

          if (filter.toLowerCase() == "woman-led") {
            //woman-led will get priority
            let filteredPosts: any = [];
            for (let i = 0; i < interimFeeds.length; i++) {
              console.log(interimFeeds[i].gender.toLowerCase());
              if (interimFeeds[i].gender.toLowerCase() === "woman") {
                //filter the posts
                filteredPosts.push(interimFeeds[i]);
              }
            }
            setFeeds(filteredPosts); //set the filtered posts
          } else if (filter.toLowerCase() == "black-led") {
            //black-led will
            let filteredPosts: any = [];
            for (let i = 0; i < interimFeeds.length; i++) {
              if (interimFeeds[i].ethnicity.toLowerCase() === "black") {
                //set only black led ventures
                filteredPosts.push(interimFeeds[i]);
              }
            }
            setFeeds(filteredPosts);
          } else if (filter.toLowerCase() == "indigenous-led") {
            //filter based on indigenious led ventrures
            let filteredPosts: any = [];
            for (let i = 0; i < interimFeeds.length; i++) {
              if (interimFeeds[i].ethnicity.toLowerCase() === "indigenous") {
                filteredPosts.push(interimFeeds[i]);
              }
            }
            setFeeds(filteredPosts); //set the filters
          } else {
            const interimFeeds: any = res.data.post_data;
            setFeeds(interimFeeds); // in case there are no filters set all the feeds
          }
          setGotFeeds(true); //to stop the reload button
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }, [filter, reFetch]);

  const handleFilterChange = (event: SelectChangeEvent) => {
    setFilter(event.target.value);
  };
  return (
    <>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <div className={classes.flex}>
              <Typography
                variant="h4"
                component="div"
                style={{ margin: "20px" }}
              >
                My Feed{" "}
              </Typography>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Filter
                </InputLabel>
                <Select
                  value={filter}
                  onChange={handleFilterChange}
                  label="Filter"
                >
                  <MenuItem value="All">
                    <em>All</em>
                  </MenuItem>
                  <MenuItem value={"woman-led"}>Woman-led ventures</MenuItem>
                  <MenuItem value={"indigenous-led"}>
                    Indigenous-led ventures
                  </MenuItem>
                  <MenuItem value={"black-led"}>Black-led ventures</MenuItem>
                </Select>
              </FormControl>
            </div>
            {feeds.length > 0 ? (
              feeds.map((feed: any) => (
                <Feed {...feed} filter={filter} setFilter={setFilter} />
              ))
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
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
export default Feeds;
