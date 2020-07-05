import React from 'react';
import './App.css';
import { Switch, Route, BrowserRouter as Router, } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Products from "./containers/Products";
import Details from "./components/Details";
import Cart from "./components/Cart";
import Default from "./components/Default";
import { Provider } from 'react-redux';
import { Container } from '@material-ui/core';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <Container>
        <Navbar />
        <Router>
          <Switch>
            <Route exact path="/" component={Products} />
            <Route path="/details" component={Details} />
            <Route path="/cart" component={Cart} />
            <Route component={Default} />
          </Switch>
        </Router>
      </Container>
    </Provider>
  );
}

export default App;