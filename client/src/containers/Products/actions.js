export const fetchProducts = () => {
  return async (dispatch) => {
    dispatch({
      type: "FETCH_PRODUCTS", payload: [{
        id: "p1",
        name: "One Plus",
        category: "mobiles",
        price: "35000",
        description: "This is the description of the oneplus mobile."
      }, {
        id: "p2",
        name: "Apple Iphone XR",
        category: "mobiles",
        price: "80000",
        description: "This is the description of the Iphone xr mobile."
      }]
    })
  }
}
