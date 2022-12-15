import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { Chip, Avatar, IconButton } from "@mui/material";
import useStyles from "../Feed/Style.js";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CardActionArea, Menu, MenuItem } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import moment from "moment";
import { Container } from "@mui/system";
import httpClient from "../../thunk/interceptor.js";

export interface post {
  _id: string;
  company: string;
  industry: string;
  investors: string;
  abstract: string;
  technology: string;
  founders: string;
  founded: string;
  headquarter: string;
  locations: string;
  valuation: string;
  total_employees: string;
  funding_total: string;
  funding_required: string;
  team_info: string;
  company_info: string;
  founder_info: string;
  logo: string;
  post_create_time: string;
}

/*The code has been referenced from: https://mui.com/material-ui/react-modal/*/
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

function FounderPosts(props: post) {

  const classes = useStyles();
  const navigate = useNavigate();

  const handleDeleteOpenOption = () => setDel(true);
  const handleDeleteCloseOption = () => setDel(false);

  const [post, setPost] = useState({
    _id: props._id,
    company: props.company,
    industry: props.industry,
    investors: props.investors,
    founders: props.founders,
    abstract: props.abstract,
    technology: props.technology,
    founded: props.founded,
    headquarter: props.headquarter,
    locations: props.locations,
    valuation: props.valuation,
    total_employees: props.total_employees,
    funding_total: props.funding_total,
    funding_required: props.funding_required,
    team_info: props.team_info,
    company_info: props.company_info,
    founder_info: props.founder_info,
    logo: props.logo,
    post_create_time: props.post_create_time,
  });

  {
    /* Below code was referenced from https://mui.com/material-ui/react-menu/#customization */
  }

  const [anchorElement, setAnchorElement] = React.useState<null | HTMLElement>(
    null
  );

  const [del, setDel] = React.useState(false);
  const [id, setId] = React.useState();
  const open = Boolean(anchorElement);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElement(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorElement(null);
  };

  const handleEdit = () => {
    navigate("/editpost", {
      state: { post: JSON.parse(JSON.stringify(post)) },
    });
  };

  const handleDelete = (id: string) => {
    httpClient.post("/deletepost", {
      _id: id,
    });

    navigate("/userprofile");
  };

  return (
    // The below code is referred from https://mui.com/material-ui/react-card/#complex-interaction
    <Container className="mt-3">
      <Card sx={{ margin: 2, boxShadow: 2, gap: 2, borderRadius: 2 }}>
        <div>
          <Modal open={del} onClose={handleDeleteCloseOption}>
            <Box sx={style}>
              <Typography id="title" variant="h6" component="h2">
                This post has been deleted.
              </Typography>
            </Box>
          </Modal>
        </div>
        <CardContent>
          <div className={classes.flex}>
            <div className={classes.tags}>
              <Avatar className={classes.avatar}>
                {props.logo ? (
                  <img src={props.logo} style={{ height: "40px" }} />
                ) : null}
              </Avatar>
              <div>
                <Typography gutterBottom variant="h5">
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
            <IconButton onClick={handleOpenMenu}>
              {" "}
              <MoreVertIcon className={classes.moreIcon} />
            </IconButton>

            {/* Below code was referenced from https://mui.com/material-ui/react-menu/#customization */}

            <Menu
              anchorEl={anchorElement}
              open={open}
              onClose={handleCloseMenu}
            >
              <MenuItem onClick={handleEdit}>Edit</MenuItem>
              <MenuItem onClick={() => handleDelete(post._id)}>Delete</MenuItem>
            </Menu>
          </div>
          <CardActionArea>
            <Typography gutterBottom variant="body2">
              {props.abstract}
            </Typography>
          </CardActionArea>

          <div className={classes.lastRow}>
            <div className={classes.tags}>
              {" "}
            </div>
            <div></div>
          </div>
        </CardContent>
      </Card>
    </Container>
  );
}

export default FounderPosts;
