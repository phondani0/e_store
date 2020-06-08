import React, { Component } from 'react';
import buildGraphQLProvider from 'ra-data-graphql-simple';
import buildQuery from './dataProvider';
import { Admin, Resource } from 'react-admin';

import { UserList, UserCreate, UserEdit } from './Users';

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
      clientOptions: { uri: 'http://localhost:3500/' },
      buildQuery: buildQuery
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
      </Admin>
    );
  }
}

export default App;