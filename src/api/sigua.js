import request from "./request";

//创建猜物
export function getPluginsGuess( params) {
  return request.post("plugins/guess/", params);
}

//获取猜物详情
export function getPluginsGuessDesc(id) {
  return request.get("plugins/guess/" + id);
}

//获取猜物列表
export function getPluginsGuessList(page) {
  return request.get("plugins/guess?page="+page);
}

//提交猜物答案
export function getPluginsGuessAnwser(id, params) {
  return request.post("plugins/guess/" + id + "/anwser", params);
}

//获取猜物答案列表
export function getPluginsAnwserList(params) {
  return request.get("plugins/guess/anwser", params);
}

//获取我今日的猜物次数
export function getPluginsMyCount(params) {
  return request.get("plugins/guess/my_count", params);
}

//获取猜物答案列表
export function getPluginsGuessMy(params) {
  return request.get("plugins/guess/my_guess", params);
}
// 获取我的猜物答案列表
export function getPluginsGuessMyAnswer(params) {
  return request.get("plugins/guess/my_answer", params);
}

//转发猜物
export function getPluginsGuessForward(id) {
  return request.post("plugins/guess/" + id + "/forward");
}
