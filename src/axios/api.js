import axios from "axios";
import { Toast } from "vant";
import comm from "../common/comm.js";
import router from '../router';

axios.defaults.timeout = 30000;
axios.defaults.baseURL = comm.SERVER_PATH;
axios.defaults.headers = {
  "X-Requested-With": "XMLHttpRequest",
  // 'Content-Type':"application/x-www-form-urlencoded",
};

function callback(res, resolve) {
  if (res.data.code == comm.RESULT_CODE.SUCCESS) {
    //SUCCESS_NO_MSG
    // Message.success({
    //   message: res.data.msg,
    // });
  }
  if (res.data.code == comm.RESULT_CODE.NOT_LOGIN) {
    //SUCCESS_MSG
    Toast.fail('登录超时'); 
  }
  if (res.data.code == comm.RESULT_CODE.LOGIN_ERROR) {
    //WARNING
    Toast.fail(res.data.errMsg); 
  }
  if (res.data.code ==  comm.RESULT_CODE.ERROR) {
    Toast.fail(res.data.errMsg); 
  }
  resolve(res.data);
}

function error(err, resolve) {
  Toast.fail({
    message: err.errMsg
  });
}

export default {
  addRandom(url){
    if(url.indexOf("?")>=0){
    }
    else{
      url+="?";
    }
    url+="&t="+Math.random();
    return url;
  },
  // get请求
  get(url, param) {
    url = this.addRandom(url);
    
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
    });
    return new Promise(resolve => {
      axios({
        method: "get",
        url: comm.urlPrefix + url,
        params: param || {}
      })
        .then(res => callback(res, resolve))
        .catch(err => error(err, resolve));
    });
  },
  // post请求
  post(url, param) {
    url = this.addRandom(url);
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 300
    });
    return new Promise((resolve, reject) => {
      axios({
        method: "post",
        url: comm.urlPrefix + url,
        data: param || {}
      })
        .then(res => callback(res, resolve))
        .catch(err => error(err, resolve));
    });
  }
};
