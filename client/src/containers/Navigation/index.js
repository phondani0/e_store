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
import { connect, useDispatch, useSelector } from "react-redux";
import actions from "../../actions";
import { createUseStyles } from "react-jss";
import { useNavigate } from "react-router-dom";
import { logout } from "../Auth/authSlice";
import { LocalMall } from "@mui/icons-material";
import NavigationDrawer from "../../components/core/navigation_drawer/NavigationDrawer";

const useStyles = createUseStyles(
    {
        container: {
            position: "fixed",
            width: "100%",
            zIndex: 1000,

            "& $sectionDesktop": {
                marginLeft: "auto",
            },
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
        appIcon: {
            marginRight: "20px",

            "& > svg": {
                marginRight: "8px",
                marginBottom: "5px",
                width: "25px",
                height: "25px",
            },
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
    },
    { classNamePrefix: "navigation" }
);

function Navigation(props) {
    const classes = useStyles();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

    const { userInfo } = useSelector((state) => state.auth);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const onLogoutClick = () => {
        dispatch(logout());
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
            {userInfo ? (
                <MenuItem onClick={onLogoutClick}>Logout</MenuItem>
            ) : (
                <></>
            )}
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
            {userInfo ? (
                <MenuItem onClick={onLogoutClick}>
                    <IconButton
                        aria-label="logout"
                        color="inherit"
                        size="large"
                    >
                        <LockIcon />
                    </IconButton>
                    <p>Logout</p>
                </MenuItem>
            ) : (
                <MenuItem onClick={() => navigate("/login")}>
                    <IconButton aria-label="login" color="inherit" size="large">
                        <LockIcon />
                    </IconButton>
                    <p>Log in</p>
                </MenuItem>
            )}
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
        <div className={classes.container}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                        size="large"
                        onClick={() => setIsDrawerOpen((prev) => !prev)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        className={classes.title}
                        variant="h6"
                        onClick={() => navigate("/")}
                    >
                        <Button
                            className={classes.appIcon}
                            color="inherit"
                            size="large"
                        >
                            <LocalMall /> {"E-Store"}
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

                    <div className={classes.sectionDesktop}>
                        {userInfo ? (
                            <Typography>{`${userInfo?.first_name} ${userInfo?.last_name}`}</Typography>
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

                <NavigationDrawer
                    navItems={[
                        {
                            name: "Orders",
                            onClick: () => navigate("/orders"),
                        },
                    ]}
                    open={isDrawerOpen}
                    onClose={() => setIsDrawerOpen(false)}
                />
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </div>
    );
}
export default Navigation;
