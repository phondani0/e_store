import React, { Component } from 'react';
import buildGraphQLProvider from 'ra-data-graphql-simple';
import buildQuery from './dataProvider';
import { Admin, Resource } from 'react-admin';

import { UserList, UserCreate, UserEdit } from './Users';
import { ProductList, ProductCreate, ProductEdit } from './Products';
import { OrderList, OrderCreate, OrderEdit } from './Orders';
import { createUploadLink } from 'apollo-upload-client';

// import { buildQuery } from './buildQuery';

class App extends Component {
  constructor() {
    super();
    this.state = { dataProvider: null };
  }
  componentDidMount() {
    // buildGraphQLProvider({ buildQuery })
    //         .then(dataProvider => this.setState({ dataProvider }));

    buildGraphQLProvider({
      clientOptions: {
        uri: process.env.REACT_APP_API_URL,
        link: createUploadLink({
          uri: process.env.REACT_APP_API_URL
        })
      },
      buildQuery: buildQuery,
    })
      .then(dataProvider => {
        console.log(dataProvider)
        this.setState({ dataProvider })
      })
      .catch(
        error => console.log(error)
      );
  }

  render() {
    const { dataProvider } = this.state;

    if (!dataProvider) {
      return <div>Loading</div>;
    }

    return (
      <Admin dataProvider={dataProvider}>
        <Resource name="User" list={UserList} create={UserCreate} edit={UserEdit} />
        <Resource name="Product" list={ProductList} create={ProductCreate} edit={ProductEdit} />
        <Resource name="Order" list={OrderList} create={OrderCreate} edit={OrderEdit} />
      </Admin>
    );
  }
}

export default App;