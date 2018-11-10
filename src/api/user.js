import request from './request'; // application/json;charset=UTF-8
// import newRequest from './newRequest'; // application/x-www-form-urlencoded
// user/other/login
export function login(username, password) {
  return request.post('admin/user/login', {
    loginName: username,
    password,
  });
}
// 用户注册
export function regist(params) {
  return request.post('user/UserRegister', params);
}
// 用户登录
export function Login(params) {
  return request.post('user/UserLogin', params);
}
// 手机验证码
export function getPhoneCode(params) {
  return request.post('requestuser/sendVerifyCode', params);
}
