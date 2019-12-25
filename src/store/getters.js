export default {
  cartList(state) {
    return state.cartList;
  },
  Length(state, getters) {
    return getters.cartList.length;
  }
};
