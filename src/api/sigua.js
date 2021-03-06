import request from "./request";
import axios from 'axios';
let headers1 = {headers: {'Content-Type':'application/json;','token':window.localStorage.token}}
let base = '/api/v1';

//创建猜物
export function getPluginsGuess( params) {
  return request.post("plugins/guess/?"+`&token=`+window.localStorage.token, params);
}

//获取猜物详情
export function getPluginsGuessDesc(id) {
  return request.get("plugins/guess/" + id);
}
//获取猜物详情
export function getPluginsGuessDesc2(id) {
  return request.get("plugins/guess/detail/" + id);
}

//获取猜物列表
export function getPluginsGuessList(page) {
  return axios.get(`${base}/plugins/guess?page_size=20&random=1&page=`+page+`&state=inprogress`+`&token=`+window.localStorage.token,headers1)
    .then(res => res.data);
}


// export const getPluginsGuessList = page => {
//   return axios.get(`${base}/plugins/guess?page=`+page,headers1)
//     .then(res => res.data); };

//提交猜物答案
export function getPluginsGuessAnwser(id, params) {
  return request.post("plugins/guess/" + id + "/anwser"+`?token=`+window.localStorage.token, params);
}

//获取猜物答案列表
export function getPluginsAnwserList(params) {
  return request.get("plugins/guess/anwser", params);
}

//获取我今日的猜物次数
export function getPluginsMyCount(params) {
  return request.get("plugins/guess/my_count", params);
}

// 获取猜物答案列表
export function getPluginsGuessMy(page) {
  return axios.get(`${base}/plugins/guess/my_guess?page_size=200&page=`+page+`&token=`+window.localStorage.token,headers1)
    .then(res => res.data);
}
// 获取我的猜物答案列表
export function getPluginsGuessMyAnswer(page) {
  // return request.get("plugins/guess/my_answer?page_size=200&page="+page);
  return axios.get(`${base}/plugins/guess/my_answer?page_size=200&page=`+page+`&token=`+window.localStorage.token,headers1)
    .then(res => res.data);
}

// 转发猜物
export function getPluginsGuessForward(id) {
  return request.post("plugins/guess/" + id + "/forward");
}
