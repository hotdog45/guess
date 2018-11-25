import axios from "axios";
import https from "https";
// api root
export const apiRoot = `/host/api/v1`;
var newRquest = axios.create({
  baseURL: apiRoot,
  httpsAgent: new https.Agent({ keepAlive: true, rejectUnauthorized: false }),
  transformRequest(params) {
    return JSON.stringify(params);
  }
});

// request interceptor
newRquest.interceptors.request.use(
  config => {
    // access token
    const { method } = config;
    const token = window.localStorage.token;

    if (method === "get") {
      config.params = {
        ...config.params,
        token
      };
    } else {
      config.data = {
        ...config.data,
        token
      };
    }

    return config;
  },
  error => {
    // Do something with request error
    Promise.reject(error);
  }
);

// respone interceptor
newRquest.interceptors.response.use(
  response => {
    const res = response.data;
    const { msg, status } = res;

    if (status !== 0) {
      console.log("msg", msg);
    }

    return res;
  },
  error => Promise.reject(error)
);
newRquest.defaults.headers.post["Content-Type"] = "application/json";
newRquest.defaults.headers.get["Content-Type"] = "application/json";
// var token = window.localStorage.token;
// if (token) {
//   newRquest.defaults.headers.get["token"] = token;
//   newRquest.defaults.headers.post["token"] = token;
// } else {
// newRquest.defaults.headers.get["token"] =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTg4LCJpYXQiOjE1NDIyOTYyODIsImV4cCI6MTU3MzgzMjI4Mn0.bYm01K1MLi-cp1w91PkG8m2ySa5jAgZWvwr0dcwJNQU"
// newRquest.defaults.headers.post["token"] =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTg4LCJpYXQiOjE1NDIyOTYyODIsImV4cCI6MTU3MzgzMjI4Mn0.bYm01K1MLi-cp1w91PkG8m2ySa5jAgZWvwr0dcwJNQU";
// }
export default newRquest;
