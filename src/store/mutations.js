import { ADDCOUNTER, ADDTOCART } from "./mutations-types";

export default {
  [ADDCOUNTER](state, payload) {
    payload.count += 1;
  },
  [ADDTOCART](state, payload) {
    payload.checked = true;
    state.cartList.push(payload);
  }
};
