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

  if (resource === 'User' && fetchType === 'UPDATE') {
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
                  mutation updateUser($data: UpdateUserInput!) {
                    data: updateUser(data:$data){
                        id
                        first_name
                        last_name
                        email
                        mobile
                        address {
                          id 
                          area
                          city
                          country
                          pincode
                          state
                          street    
                       }
                    }
                  }
      `,
      variables: {
        data: {
          id: params.data.id,
          first_name: params.data.first_name,
          last_name: params.data.last_name,
          email: params.data.email,
          mobile: params.data.mobile,
          password: params.data.password,
          address: params.data.address.map((address) => {
            return {
              id: address.id,
              area: address.area,
              city: address.city,
              country: address.country,
              pincode: address.pincode,
              state: address.state,
              street: address.street
            }
          })
        }
      }

    };
  }

  if (resource === 'Order' && fetchType === 'GET_ONE') {
    console.log(fetchType, resource, params);
    return {
      // Use the default query variables and parseResponse
      ...builtQuery,
      // Override the query
      query: gql `
                  query Order($id: String!) {
                    data: Order(id:$id){
                      id
                      customer_name
                      customer_email
                      product {
                        id
                        name
                      }
                      user {
                        id
                        first_name
                      }
                      updated_at
                      created_at
                    } 
                  }
      `
    };
  }

  if (resource === 'Order' && fetchType === 'GET_LIST') {
    console.log(fetchType, resource, params);
    return {
      // Use the default query variables and parseResponse
      ...builtQuery,
      // Override the query
      query: gql `
                  query allOrders($page: Int, $perPage: Int, $sortField: String, $sortOrder: String) {
                    items: allOrders(page: $page, perPage: $perPage, sortField: $sortField, sortOrder: $sortOrder) {
                      id   
                      customer_name
                      customer_email
                      product {
                        id
                        name
                      }
                      user {
                        id
                        first_name
                      }
                      updated_at
                      created_at
                    },
                    total: _allOrdersMeta(page: $page, perPage: $perPage) {    
                      count
                    } 
                  }
      `
    };
  }

  // query allOrders($page: Int, $perPage: Int, $sortField: String, $sortOrder: String) {↵  items: allOrders(page: $page, perPage: $perPage, sortField: $sortField, sortOrder: $sortOrder) {↵    id↵    customer_name↵    customer_email↵    product {↵      id↵      __typename↵    }↵    user {↵      id↵      __typename↵    }↵    updated_at↵    created_at↵    __typename↵  }↵  total: _allOrdersMeta(page: $page, perPage: $perPage) {↵    count↵    __typename↵  }↵}↵"

  return builtQuery;
};

export default myBuildQuery