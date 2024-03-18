import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import InputBase from "@mui/material/InputBase";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import LockIcon from "@mui/icons-material/Lock";
import { connect } from "react-redux";
import actions from "../../actions";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: "16px",
    display: "none",
    "@media (min-width: 768px)": {
      display: "block",
    },
  },
  title: {
    display: "none",
    "@media (min-width: 768px)": {
      display: "block",
    },
    cursor: "pointer",
  },
  search: {
    position: "relative",
    borderRadius: "5px",
    // backgroundColor: "#ffffff",
    // "&:hover": {
    //   backgroundColor: "#ffffff",
    // },
    marginRight: "16px",
    marginLeft: 0,
    width: "100%",
    "@media (min-width: 768px)": {
      marginLeft: "15px",
      width: "auto",
    },
  },
  searchIcon: {
    padding: "0px 16px",
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: "5px 15px",
    // transition: theme.transitions.create('width'),
    width: "200px",
    "@media (min-width: 768px)": {
      width: "20ch",
    },
    borderRadius: "16px",
    backgroundColor: "#ffffff",
    color: "#000000",
  },
  sectionDesktop: {
    display: "none",
    "@media (min-width: 768px)": {
      display: "flex",
      alignItems: "center",
    },
  },
  sectionMobile: {
    display: "flex",
    "@media (min-width: 768px)": {
      display: "none",
    },
  },
});

function Navigation(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isAuth = true; // TODO: move auth layer to slice

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    console.log("close");
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const onLogoutClick = () => {
    console.log("Logout");
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      {isAuth ? <MenuItem onClick={onLogoutClick}>Logout</MenuItem> : <></>}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {isAuth ? (
        <MenuItem onClick={onLogoutClick}>
          <IconButton aria-label="logout" color="inherit" size="large">
            <LockIcon />
          </IconButton>
          <p>Logout</p>
        </MenuItem>
      ) : (
        <MenuItem MenuItem onClick={() => navigate("/login")}>
          <IconButton aria-label="login" color="inherit" size="large">
            <LockIcon />
          </IconButton>
          <p>Log in</p>
        </MenuItem>
      )}

      <MenuItem>
        <IconButton
          aria-label="show 5 new notifications"
          color="inherit"
          size="large"
        >
          <Badge badgeContent={5} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
          size="large"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            size="large"
          >
            <MenuIcon />
          </IconButton>
          <Typography
            className={classes.title}
            variant="h6"
            onClick={() => navigate("/")}
          >
            <Button
              color="inherit"
              size="large"
              style={{ "white-space": "nowrap" }}
            >
              E-Store
            </Button>
          </Typography>
          <div className={classes.search}>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {isAuth ? (
              <>
                <Typography>{"User"}</Typography>
              </>
            ) : (
              <Button
                aria-label="login"
                color="inherit"
                onClick={() => navigate("/login")}
                startIcon={<LockIcon />}
              >
                Log in
              </Button>
            )}

            <IconButton
              aria-label="show new notifications"
              color="inherit"
              size="large"
            >
              <Badge badgeContent={5} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
              size="large"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
              size="large"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}

export default Navigation;
