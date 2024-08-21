import React from "react";
import styled from "@emotion/styled";
import MuiDrawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { LocalMall, MoneyOffCsredSharp } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { createUseStyles } from "react-jss";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

const useStyles = createUseStyles(
    {
        title: {
            display: "none",
            marginRight: "auto",
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
    },
    { name: "navigation_drawer" }
);

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
}));

const NavigationDrawer = ({ navItems, open, onClose }) => {
    const classes = useStyles();

    const navigate = useNavigate();

    return (
        <MuiDrawer
            sx={{
                width: 350,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: 350,
                    boxSizing: "border-box",
                },
            }}
            anchor="left"
            open={open}
            onClose={() => {
                console.log("on close");
                onClose();
            }}
        >
            <DrawerHeader>
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
                <IconButton onClick={onClose}>
                    <ChevronLeftIcon />
                </IconButton>
            </DrawerHeader>
            <Divider />

            <List>
                {navItems.map((item, index) => (
                    <ListItem key={index} disablePadding>
                        <ListItemButton onClick={() => item.onClick()}>
                            <ListItemIcon>
                                <MoneyOffCsredSharp />
                            </ListItemIcon>
                            <ListItemText primary={item.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </MuiDrawer>
    );
};

export default NavigationDrawer;
