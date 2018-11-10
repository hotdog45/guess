/**
 * Created by lishunfeng on 2018/9/12.
 */
import request from './request';
import request2 from './request2';

//添加用户地址
export function getAddAddress(params) {
  return request.post('addAddress', params);
}

//查询用户地址
export function getQueryAllAddress(params) {
  return request.post('queryAllAddress', params);
}

//获得areaCode的接口
export function getAreaCode(params) {
  return request.get('baidu', params);
}

//获取用户当前匹配到的地址
export function getMatchAddress(params) {
  return request.post('getMatchAddress', params);
}

//登录
export function getH5Login(params) {
  return request.post('requestuser/h5Login', params);
}

//发送验证码
export function getSendVerifyCode(params) {
  return request.post('requestuser/sendVerifyCode', params);
}

//绑定
export function getVerifyCodeIsOk(params) {
  return request.post('requestuser/verifyCodeIsOk', params);
}

// 下单
export function getOrderCreateOrder(params) {
  return request.post('order/createOrder', params);
}
//产生预付订单
export function getOrderH5Pay(params) {
  return request.post('order/h5Pay', params);
}

// 分享
export function getShareH5(params) {
  return request.post('shareH5', params);
}

// 群二维码
export function getShopGroupQR(params) {
  return request.post('getShopGroupQR', params);
}


//
export function getH5DecodeUrl(params) {
  return request.post('h5/decodeUrl', params);
}
//
export function getH5isPartner(params) {
  return request.post('h5/isPartner', params);
}














export function getWeixinWapPayTicket(params) {
  return request2.post('order/getWeixinWapPayTicket.json', params);
}


