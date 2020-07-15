export const fetchProducts = () => {
  return async (dispatch) => {
    dispatch({
      type: "FETCH_PRODUCTS", payload: [{
        id: "p1",
        name: "One Plus",
        category: "mobiles",
        price: "200",
        description: "This is the description of the oneplus mobile."
      }]
    })
  }
}
