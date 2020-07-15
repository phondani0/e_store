import React from 'react';
import './App.css';
import { Switch, Route, BrowserRouter as Router, } from 'react-router-dom';
import Products from "./containers/Products";
import Details from "./components/Details";
import Default from "./components/Default";
import { Provider } from 'react-redux';
import { Container } from '@material-ui/core';
import store from './store';
import Navigation from './containers/Navigation';

function App() {
  return (
    <Provider store={store}>
      <Navigation />
      <Container>
        <Router>
          <Switch>
            <Route exact path="/" component={Products} />
            <Route path="/details" component={Details} />
            <Route component={Default} />
          </Switch>
        </Router>
      </Container>
    </Provider>
  );
}

export default App;