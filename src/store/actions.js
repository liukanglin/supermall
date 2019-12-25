import { ADDCOUNTER, ADDTOCART } from "./mutations-types";
export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      // 1.查看是否添加过商品
      let oldProbuct = context.state.cartList.find(item => {
        return item.iid === payload.iid;
      });
      // 2. 商品数量+1或者新添加
      if (oldProbuct) {
        // oldProbuct.count += 1;
        context.commit(ADDCOUNTER, oldProbuct);
        resolve("当前商品数量+1");
      } else {
        payload.count = 1;
        // state.cartList.push(payload);
        context.commit(ADDTOCART, payload);
        resolve("添加商品成功");
      }
    });
  }
};
