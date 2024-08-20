import React, { useEffect } from "react";
import "./App.css";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    Outlet,
} from "react-router-dom";

import Products from "./containers/products";
import Details from "./components/Details";

import { Provider, useSelector } from "react-redux";

import { ThemeProvider } from "@mui/material";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { store } from "./store";
import { Global } from "@emotion/react";
import HomePage from "./pages/HomePage";

import Navigation from "./containers/Navigation";
import styled from "@emotion/styled";
import Signup from "./containers/Signup";
import Login from "./containers/Login";
import Auth from "./containers/Auth";
import Checkout from "./containers/Checkout";
import ToastNotificationContext from "./contexts/ToastNotificationContext";
// import Checkout from './containers/Checkout';

let theme = createTheme();
theme = responsiveFontSizes(theme);

const Wrapper = styled.div({
    height: "100vh",
    // To accomodate extra space from the fixed navbar
    "@media (min-width: 0px)": {
        paddingTop: "48px",
    },
    "@media (min-width: 600px)": {
        paddingTop: "64px",
    },
});

const ProtectedRoute = () => {
    const { userInfo } = useSelector((state) => state.auth);
    if (!userInfo) {
        return <Navigate to="/login" replace />;
    }
    return <Outlet />;
};

const Components = () => {
    return (
        <Provider store={store}>
            <Router>
                <Auth /> {/* @TODO: Find another way. */}
                <Navigation />
                <Wrapper>
                    <ToastNotificationContext>
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/signup" element={<Signup />} />
                            <Route path="/login" element={<Login />} />
                            <Route element={<ProtectedRoute />}>
                                <Route
                                    path="/checkout"
                                    element={<Checkout />}
                                />
                            </Route>
                            {/* <Route path="/details" element={<Details />} />*/}
                            <Route
                                path="*"
                                element={<Navigate to="/" replace />}
                            />
                        </Routes>
                    </ToastNotificationContext>
                </Wrapper>
            </Router>
        </Provider>
    );
};

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Global
                styles={{
                    "#webpack-dev-server-client-overlay": {
                        display: "none",
                    }, //TODO: remove it later
                }}
            />
            <Components />
        </ThemeProvider>
    );
}

export default App;
