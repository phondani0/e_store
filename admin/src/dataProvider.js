// in src/dataProvider.js
import {
  buildQuery
} from 'ra-data-graphql-simple';

import gql from 'graphql-tag';

const myBuildQuery = introspection => (fetchType, resource, params) => {
  const builtQuery = buildQuery(introspection)(fetchType, resource, params);
  console.log(fetchType, resource, params);

  if (resource === 'User' && fetchType === 'CREATE') {
    console.log(fetchType, resource, params);
    return {
      // Use the default query variables and parseResponse
      ...builtQuery,
      // Override the query
      // query: gql `
      //           query User($id: String!) {
      //             data: User(id: $id) {
      //                 id
      //                 first_name
      //                 last_name
      //                 email
      //                 mobile
      //                 created_at
      //                 updated_at    
      //               }              
      //           }`,
      query: gql `
                  mutation createUser($data: CreateUserInput!) {
                    data: createUser(data:$data){
                        id
                        first_name
                        last_name
                        email
                        mobile
                        created_at
                        updated_at    
                      }
                  }
      `,
      variables: {
        data: {
          first_name: params.data.first_name,
          last_name: params.data.last_name,
          email: params.data.email,
          mobile: params.data.mobile,
          password: params.data.password
        }
      }
    };
  }

  return builtQuery;
};

export default myBuildQuery