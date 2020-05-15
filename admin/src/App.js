import React, { Component } from 'react';
import buildGraphQLProvider from 'ra-data-graphql-simple';
import { Admin, Resource, ListGuesser } from 'react-admin';

// import { PostCreate, PostEdit, PostList } from './posts';

class App extends Component {
  constructor() {
    super();
    this.state = { dataProvider: null };
  }
  componentDidMount() {
    buildGraphQLProvider({ clientOptions: { uri: 'http://localhost:3500/graphql' } })
      .then(dataProvider => this.setState({ dataProvider }))
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
        <Resource name="User" list={ListGuesser} />
      </Admin>
    );
  }
}

export default App;