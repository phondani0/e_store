import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router';

import { ConnectedRouter } from 'connected-react-router';

import Products from "./containers/Products";
import Details from "./components/Details";

import { Provider } from 'react-redux';

import { Container, Box } from '@material-ui/core';
import store, { history } from './store';

import Navigation from './containers/Navigation';
import Signup from './containers/Signup';
import Login from './containers/Login';

function App() {
  return (
    <Provider store={store}>
      <Navigation />
      <Container>
        <Box py={2}>
          <ConnectedRouter history={history}>
            <Switch>
              <Route exact path="/" component={Products} />
              <Route path="/details" component={Details} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
            </Switch>
          </ConnectedRouter>
        </Box>
      </Container>
    </Provider>
  );
}

export default App;