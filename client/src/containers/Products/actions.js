
export const fetchProducts = () => {
  return async (dispatch) => {

    dispatch({
      type: "FETCH_PRODUCTS", payload: [{
        name: "One Plus",
        category: "mobiles",
        price: "200"
      }]
    })

  }
}
