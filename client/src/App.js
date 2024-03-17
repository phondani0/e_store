import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Products from "./containers/products";
import Details from "./components/Details";

import { Provider } from "react-redux";

import { Container, Box, ThemeProvider } from "@mui/material";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { store } from "./store";
import { Global } from "@emotion/react";

// import { getAuth } from './containers/Auth/actions';
// import Navigation from './containers/Navigation';
// import Signup from './containers/Signup';
// import Login from './containers/Login';
// import Checkout from './containers/Checkout';

let theme = createTheme();
theme = responsiveFontSizes(theme);

const Component = () => {
  return (
    <Provider store={store}>
      {/* <Navigation /> */}
      <Container>
        <Box py={2}>
          <Router>
            <Routes>
              <Route path="/" element={<Products />} />
              {/* <Route path="/details" element={<Details />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/checkout" element={<Checkout />} /> */}
            </Routes>
          </Router>
        </Box>
      </Container>
    </Provider>
  );
};

function App() {
  // useEffect(() => {

  //   store.dispatch(getAuth());
  // }, []);

  return (
    <ThemeProvider theme={theme}>
      <Global
        styles={{
          "#webpack-dev-server-client-overlay": {
            display: "none",
          }, //TODO: remove it later
        }}
      />
      <Component />
    </ThemeProvider>
  );
}

export default App;
