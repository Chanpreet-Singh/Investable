import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import LogoutIcon from "@mui/icons-material/Logout";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import MoreIcon from "@mui/icons-material/MoreVert";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import icon from "./assets/app-icon.png";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Badge,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import CardHeader from "@mui/material/CardHeader";
import NotificationsIcon from "@mui/icons-material/Notifications";
import useStyles from "./Style";

import Modal from "@mui/material/Modal";
import { display } from "@mui/system";
import UtilityUser from "./components/Utility/UtilityUser";
const style = {
  position: "absolute" as "absolute",
  top: "15%",
  right: "2%",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const NavigationBar = () => {
  const loggedInUserEmailId = localStorage.getItem("loggedInUserEmail");
  console.log("email", loggedInUserEmailId);

  const [imagedata, setimagedata] = React.useState<string>();
  const [invisible, setInvisible] = React.useState(false);
  const [notification, setNotification] = React.useState(true);

  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [isInvestor, setIsInvestor] = React.useState(true);

  const [searchValue, setSearchValue] = React.useState<{
    groupBy: any;
    search: any;
  }>();

  const handleOpen = () => {
    setOpen(true);
    setInvisible(true);
  };
  const handleClose = () => setOpen(false);
  function avatarclick() {
    navigate("/userprofile");
  }
  function searchclick() {
    navigate("/search");
  }
  function createPostClick() {
    navigate("/createPost");
  }
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const classes = useStyles();

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <Button color="inherit" onClick={createPostClick}>
          {" "}
          <AddIcon />
          Create Post
        </Button>
      </MenuItem>
      <MenuItem>
        <Button onClick={handleOpen} color="inherit">
          <NotificationsIcon className={classes.menus} /> Notifications
        </Button>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <Button
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <CardHeader
            avatar={
              <Avatar
                alt="Tony Stark"
                src={imagedata}
                sx={{ width: 30, height: 30 }}
              />
            }
          />
          {/* <Avatar
            alt="Remy Sharp"
            src={imagedata}
            sx={{ width: 30, height: 30 }}
            onClick={avatarclick}
          /> */}
        </Button>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
  useEffect(() => {
    UtilityUser().then((response) => {
      setimagedata(response.user_data.profile_pic);

      if (response.user_data.profile_type.toLowerCase() === "entrepreneur") {
        setIsInvestor(false);
      }
    });
  }, []);

  const dispatch = useDispatch();
  return (
    <AppBar position="static" style={{ backgroundColor: "#654ea3" }}>
      <Toolbar>
        <a href="/feeds" className={classes.link}>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <img
              src={icon}
              style={{ width: "55px", height: "55px", marginTop: "5px" }}
              alt="Icon"
              className="imageIcon"
            />
            <Typography
              m={2}
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              Investable
            </Typography>
          </Box>
        </a>
        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          {isInvestor === false ? (
            <Button color="inherit" onClick={createPostClick}>
              {" "}
              <AddIcon />
              Create Post
            </Button>
          ) : (
            <div />
          )}
          <Button
            color="inherit"
            onClick={() => {
              localStorage.removeItem("isUserLoggedIn");
              localStorage.removeItem("loggedInUserEmail");
              navigate("/login");
            }}
          >
            {" "}
            <LogoutIcon />
            Logout
          </Button>

          <IconButton onClick={handleOpen} color="inherit">
            <Badge color="secondary" variant="dot" invisible={invisible}>
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <IconButton color="inherit">
            <Avatar
              alt="Remy Sharp"
              src={imagedata}
              sx={{ width: 50, height: 50, backgroundColor: "white" }}
              onClick={avatarclick}
            ></Avatar>
          </IconButton>
        </Box>
        <Box sx={{ display: { xs: "flex", md: "none" }, marginLeft: "30px" }}>
          <IconButton
            size="large"
            aria-label="show more"
            aria-controls={mobileMenuId}
            aria-haspopup="true"
            onClick={handleMobileMenuOpen}
            color="inherit"
          >
            <MoreIcon />
          </IconButton>{" "}
          {renderMobileMenu}
        </Box>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <>
            <Box sx={style}>
              <Card sx={{ minWidth: 275 }}>
                <div className="div">
                  <CardHeader
                    action={
                      <IconButton
                        onClick={() => {
                          setOpen(false);
                          setNotification(false);
                        }}
                        aria-label="settings"
                      >
                        <CloseIcon />
                      </IconButton>
                    }
                    subheader="There are new posts added of your interests"
                  />
                </div>
              </Card>

              <Card sx={{ minWidth: 275 }} style={{ marginTop: "20px" }}>
                <div className="div">
                  <CardHeader
                    action={
                      <IconButton
                        onClick={() => {
                          setOpen(false);
                          setNotification(false);
                        }}
                        aria-label="settings"
                      >
                        <CloseIcon />
                      </IconButton>
                    }
                    subheader="Now connect to founders with just one click"
                  />
                </div>
              </Card>
            </Box>
          </>
        </Modal>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
