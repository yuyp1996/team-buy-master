// 过滤白名单
export default {
  // 不显示加载提示
  loading: [
    '/route/list'
  ],
  // 不重定向
  route: [
    '/mock',
    '/isLogin'
  ],
  // 不带token的url
  nullHeaderToken: [
    '/isLogin',
    '/getTopCat',
    '/getGoodsListByCid',
    '/getShopDetail',
    '/getCode',
    '/loginByCode',
    '/getMyOrders',
    '/getGoodsSort',
    '/getGoodDetail',
    '/getShoppingCart'
  ]
};
