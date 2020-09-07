import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router';

import { ConnectedRouter } from 'connected-react-router';
import { PersistGate } from 'redux-persist/integration/react';

import Products from "./containers/Products";
import Details from "./components/Details";

import { Provider } from 'react-redux';

import { Container, Box } from '@material-ui/core';
import { store, history, persistor } from './store';

import Auth from './containers/Auth';
import Navigation from './containers/Navigation';
import Signup from './containers/Signup';
import Login from './containers/Login';
import Checkout from './containers/Checkout';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Auth />
        <Navigation />
        <Container>
          <Box py={2}>
            <ConnectedRouter history={history}>
              <Switch>
                <Route exact path="/" component={Products} />
                <Route path="/details" component={Details} />
                <Route path="/signup" component={Signup} />
                <Route path="/login" component={Login} />
                <Route path="/checkout" component={Checkout} />
              </Switch>
            </ConnectedRouter>
          </Box>
        </Container>
      </PersistGate>
    </Provider>
  );
}

export default App;