export const fetchProducts = () => {
  return async (dispatch) => {
    dispatch({
      type: "FETCH_PRODUCTS", payload: [{
        name: "One Plus",
        category: "mobiles",
        price: "200",
        description: "This is the description of the oneplus mobile."
      }]
    })
  }
}
