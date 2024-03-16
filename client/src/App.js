import React, { useEffect } from 'react';
import './App.css';
import { Route, Switch } from 'react-router';

import { ConnectedRouter } from 'connected-react-router';
import { PersistGate } from 'redux-persist/integration/react';

import Products from "./containers/Products";
import Details from "./components/Details";

import { Provider } from 'react-redux';

import { Container, Box } from '@mui/material';
import { store, history, persistor } from './store';

import { getAuth } from './containers/Auth/actions';
import Navigation from './containers/Navigation';
import Signup from './containers/Signup';
import Login from './containers/Login';
import Checkout from './containers/Checkout';

function App() {

  useEffect(() => {

    store.dispatch(getAuth());
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
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