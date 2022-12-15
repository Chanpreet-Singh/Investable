import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import { CardActionArea, Menu, MenuItem } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Chip, Avatar, IconButton, Grid, Button, Popover } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import moment from "moment";
import useStyles from "./Style";
import React, { useState } from "react";

import "react-toastify/dist/ReactToastify.css";

/**
 * Data to each feed to be shown on activity feed
 */
export interface feed {
  _id: string;
  email: any;
  company: string;
  industry: string; //2
  investors: string;
  abstract: string;
  founders: string;
  founded: string; //1
  headquarter: any;
  locations: string;
  valuation: any;
  total_employees: any; //3
  funding_total: any;
  funding_required: string;
  company_info: string;
  founder_info: string;
  team_info: string;
  logo: string;
  technology: string;
  post_create_time: string;
  additional_doc: string;
}
/*
 * @author: Aman Singh Bhandari
 *
 */
function Feed(props: feed) {
  const classes = useStyles();
  const navigate = useNavigate();

  const [feed, setFeed] = useState({
    _id: props._id,
    email: props.email,
    company: props.company,
    industry: props.industry,
    investors: props.investors,
    abstract: props.abstract,
    founders: props.founders,
    founded: props.founded,
    headquarter: props.headquarter,
    locations: props.locations,
    valuation: props.valuation,
    total_employees: props.total_employees,
    funding_total: props.funding_total,
    funding_required: props.funding_required,
    team_info: props.team_info,
    company_info: props.company_info,
    logo: props.logo,
    technology: props.technology,
    founder_info: props.founder_info,
    post_create_time: props.post_create_time,
    additional_doc: props.additional_doc,
  });
  //on click of a feed
  const redirectToPost = () => {
    navigate("/post", {
      state: {
        feed: JSON.parse(JSON.stringify(feed)),
      },
    });
  };

  return (
    <>
      <br />
      <Card style={{ backgroundColor: "#E6E6FA" }}>
        <CardContent>
          <div className={classes.flex}>
            <div className={classes.tags}>
              <Avatar className={classes.avatar}>
                <img src={props.logo} style={{ height: "40px" }} />
              </Avatar>
              <div>
                <Typography variant="h5" component="div">
                  {props.company}
                </Typography>
                <Typography
                  variant="body2"
                  component="div"
                  color="text.secondary"
                >
                  {moment(props.post_create_time).format("MMM Do YYYY")}
                </Typography>
              </div>

              <Chip
                label={"Estd. " + props.founded}
                className={classes.foundedOn}
              />
              <Chip label={props.industry} className={classes.marketIndustry} />
              <Chip
                label={props.technology}
                className={classes.marketIndustry}
              />
              <Chip
                label={props.total_employees + " Employees"}
                className={classes.employees}
              />
            </div>
          </div>
          <CardActionArea onClick={redirectToPost}>
            <Typography gutterBottom variant="body2">
              {props.abstract}
            </Typography>
          </CardActionArea>

          <div className={classes.lastRow}>
            <Grid container spacing={2} className={classes.lastRow}>
              <Grid item md={4} xs={12}>
                <div className={classes.tags}>
                  <Chip
                    label={props.valuation + " Valuation"}
                    className={classes.valuation}
                  />
                </div>
              </Grid>
            </Grid>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default Feed;
