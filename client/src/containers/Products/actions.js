import { gql } from '@apollo/client';
import { client } from '../../graphql';

export const fetchProducts = () => {
  return async (dispatch) => {

    client.query({
      query: gql`
      query allProducts {
        allProducts {
          id
          name
          category
          price
          description
          image
        }
      }
    `
    })
      .then(result => {
        const data = result.data.allProducts;

        dispatch({
          type: "FETCH_PRODUCTS", payload: data
        })
      });
  }
}
