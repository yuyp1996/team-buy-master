import fly from './fly/flyio';

const api = {
  userLogin: (data) => fly.get('/mock', data),
  getTopCat: (data) => fly.get('/getTopCat', data),
  getGoodsListByCid: (data) => fly.post('/getGoodsListByCid', data),
  getShopDetail: (data) => fly.get('/getShopDetail', data),
  getCode: (data) => fly.post('/getCode', data),
  loginByCode: (data) => fly.post('/loginByCode', data),
  getShoppingCart: (data) => fly.post('/getShoppingCart', data),
  getMyOrders: (data) => fly.post('/getMyOrders', data),
  getGoodsSort: (data) => fly.post('/getGoodsSort', data),
  getGoodDetail: (data) => fly.get('/getGoodDetail', data)
};

/* export function userLogin (data) {
  console.log(data)
  return fly.get('/mock',data)
} */

export default api;
