import React, { useEffect, useLayoutEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {
    Alert,
    Fade,
    FormHelperText,
    Grow,
    Slide,
    Snackbar,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { createUseStyles } from "react-jss";
import { login } from "../Auth/authApiSlice";
import { setCredentials } from "../Auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useToastNotificationContext } from "../../contexts/ToastNotificationContext";

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
        marginTop: "8px",
    },
    submit: {
        margin: "24px 0 16px",
    },
});

const Login = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userInfo } = useSelector((state) => state.auth);

    const { pushNotification } = useToastNotificationContext();

    const [hasError, setHasError] = React.useState(false);

    const [formDetails, setFormDetails] = useState({
        email: "",
        password: "",
    });

    const changeHandler = (e) => {
        setHasError(false);
        setFormDetails((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const onLoginClick = async () => {
        setHasError(false);
        const response = await dispatch(
            login.initiate({
                email: formDetails.email,
                password: formDetails.password,
            })
        );

        console.log("response", response);

        if (!response.isError) {
            dispatch(setCredentials(response.data));
        } else if (response?.error?.status === 401) {
            setHasError(true);
        }
        // else  @TODO: show toast notification.
    };

    useLayoutEffect(() => {
        if (userInfo) {
            pushNotification({
                type: "success",
                message: "Logged in successfully",
            });

            navigate("/");
        }
    }, [userInfo]);

    return (
        <Container component="main" maxWidth="sm" className={classes.container}>
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    {"Log in"}
                </Typography>
                <form className={classes.form} noValidate autoComplete="on">
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={formDetails.email}
                        onChange={changeHandler}
                        error={hasError}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
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
                    {hasError && (
                        <FormHelperText error>
                            {
                                "The provided email address or password is incorrect."
                            }
                        </FormHelperText>
                    )}
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={onLoginClick}
                    >
                        Log In
                    </Button>

                    <Grid container>
                        {/* <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid> */}
                        <Grid item>
                            <Link
                                onClick={() => navigate("/signup")}
                                variant="body2"
                                style={{ cursor: "pointer" }}
                            >
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>

                    <FormHelperText style={{ marginTop: "20px" }}>
                        For testing use email: <b>admin@gmail.com</b> and
                        password: <b>admin@1234</b>
                    </FormHelperText>
                </form>
            </div>
        </Container>
    );
};

export default Login;
