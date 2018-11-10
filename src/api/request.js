import axios from 'axios';
import https from 'https';
// api root
export const apiRoot = `/api/cxwap`;//cxwap

// headers :{'token': window.localStorage.token},
var newRquest = axios.create({
  baseURL: apiRoot,
  httpsAgent: new https.Agent({ keepAlive: true, rejectUnauthorized: false }),
  transformRequest(params) {

    return JSON.stringify(params);
  },
});

// request interceptor
newRquest.interceptors.request.use(
  (config) => {
    // access token
    const { method } = config;
    // const token = getToken();

    if (method === 'get') {
      config.params = {
        ...config.params,
      };
    } else {
      config.data = {
        ...config.data,
      };
    }

    return config;
  },
  (error) => {
    // Do something with request error
    Promise.reject(error);
  },
);

// respone interceptor
newRquest.interceptors.response.use(
  (response) => {
    const res = response.data;
    const { msg, status } = res;

    if (status !== 0) {
      console.log('msg', msg);
    }

    return res;
  },
  error => Promise.reject(error),
);
newRquest.defaults.headers.post['Content-Type'] = 'application/json';
var token = window.localStorage.token;
if (token){
  newRquest.defaults.headers.post['token'] = token;
}else {
  newRquest.defaults.headers.post['token'] = 'a3516c97fdcb5e143b78da4b8279a791';
}
var inviteCode = window.localStorage.inviteCode;
if (inviteCode){
  newRquest.defaults.headers.post['inviteCode'] = inviteCode;
}
export default newRquest;
