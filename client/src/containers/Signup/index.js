import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createUseStyles } from "react-jss";
import { useDispatch } from "react-redux";
import { signup } from "../Auth/authApiSlice";
import { setCredentials } from "../Auth/authSlice";
import { useToastNotificationContext } from "../../contexts/ToastNotificationContext";
import { useNavigate } from "react-router-dom";
import { FormHelperText } from "@mui/material";

const useStyles = createUseStyles({
    container: {
        height: "100%",
        display: "flex",
        alignItems: "center",
    },
    paper: {
        marginTop: "16px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        border: "1px solid #ccc",
        padding: "30px 40px 40px",
    },
    avatar: {
        margin: "8px",
        backgroundColor: "#ee1111",
    },
    form: {
        width: "100%",
        marginTop: "20px",
    },
    submit: {
        margin: "24px 0 16px",
    },
});

const Signup = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { pushNotification } = useToastNotificationContext();
    const navigate = useNavigate();
    const [hasError, setHasError] = React.useState(false);

    const [formDetails, setFormDetails] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });

    const changeHandler = (e) => {
        setFormDetails((prev) => ({
            ...prev,
            [e.target.name]:
                e.target.type === "checkbox"
                    ? e.target.checked
                    : e.target.value,
        }));
    };

    const onSignupClick = async () => {
        setHasError(false);
        const response = await dispatch(
            signup.initiate({
                ...formDetails,
            })
        );

        console.log("response", response);

        if (!response.isError) {
            dispatch(setCredentials(response.data));
            pushNotification({
                type: "success",
                message: "Signed up successfully",
            });
            props.goTo("/"); // Redirect to home or login page after successful signup
        } else {
            setHasError(true);
            pushNotification({
                type: "error",
                message: "Signup failed. Please try again.",
            });
        }
    };

    const isFormValid =
        formDetails.firstName &&
        formDetails.lastName &&
        formDetails.email &&
        formDetails.password;

    return (
        <Container component="main" maxWidth="sm" className={classes.container}>
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign Up
                </Typography>
                <form className={classes.form} noValidate autoComplete="on">
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                name="firstName"
                                autoComplete="fname"
                                autoFocus
                                value={formDetails.firstName}
                                onChange={changeHandler}
                                error={hasError}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                                value={formDetails.lastName}
                                onChange={changeHandler}
                                error={hasError}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={formDetails.email}
                                onChange={changeHandler}
                                error={hasError}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={formDetails.password}
                                onChange={changeHandler}
                                error={hasError}
                            />
                        </Grid>
                        {/* <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="allowExtraEmails"
                                        color="primary"
                                        checked={formDetails.allowExtraEmails}
                                        onChange={changeHandler}
                                    />
                                }
                                label="I want to receive inspiration, marketing promotions, and updates via email."
                            />
                        </Grid> */}
                    </Grid>
                    {hasError && (
                        <FormHelperText error>
                            {"The provided form details are not valid."}
                        </FormHelperText>
                    )}
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={onSignupClick}
                        disabled={!isFormValid}
                    >
                        Sign Up
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link
                                onClick={() => navigate("/login")}
                                variant="body2"
                                style={{ cursor: "pointer" }}
                            >
                                Already have an account? Log in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
};

export default Signup;
