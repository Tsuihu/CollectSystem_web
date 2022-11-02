import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { Toast } from 'vant';
import comm from "./common/comm";

import "./styles/global.styl";
import 'vant/es/toast/style';
import 'vant/lib/index.css';

Vue.config.productionTip = false;
Vue.prototype.$comm = comm;


Vue.use(Toast);

Vue.filter("numFilter", function(value, len) {
  if (!value) return "";
  // 截取当前数据到小数点后两位
  let realVal = parseFloat(value).toFixed(len);
  return realVal;
});
Vue.filter("filterHtml", function(value) {
  return value ? value.replace(/<[^>]*>/g, "") : ""; //去除文字的<...></...>标签
});
//截取字符串
Vue.filter("cutStr", function(value, len) {
  if (!value) return "";
  if (value.length <= len) return value;
  else return value.substr(0, len) + "...";
});
Vue.filter("date", function(value, fmt = "YYYY-MM-DD HH:mm:ss") {
  if (!value) return "";
  let date = new Date(value);
  let now = new Date();
  var o = {
    "M+": date.getMonth() + 1,
    "D+": date.getDate(),
    "h+": date.getHours() % 12 === 0 ? 12 : date.getHours() % 12,
    "H+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds(),
    "q+": Math.floor((date.getMonth() + 3) / 3),
    S: date.getMilliseconds()
  };
  var week = {
    "0": "\u65e5",
    "1": "\u4e00",
    "2": "\u4e8c",
    "3": "\u4e09",
    "4": "\u56db",
    "5": "\u4e94",
    "6": "\u516d"
  };
  let timeSpan = (now - date) / 1000;
  if (fmt === "diffday") {
    return parseInt(timeSpan / (3600 * 24));
  } else if (fmt === "span") {
    if (timeSpan < 60 * 5) {
      return "刚刚";
    } else if (timeSpan >= 60 * 5 && timeSpan < 60 * 60) {
      return parseInt(timeSpan / 60) + "分钟前";
    } else if (timeSpan >= 60 * 60 && timeSpan < 60 * 60 * 24) {
      return parseInt(timeSpan / 3600) + "小时前";
    } else if (timeSpan >= 60 * 60 * 24 && timeSpan < 60 * 60 * 24 * 7) {
      return parseInt(timeSpan / (3600 * 24)) + "天前";
    } else if (timeSpan >= 60 * 60 * 24 * 7 && timeSpan < 60 * 60 * 24 * 30) {
      return parseInt(timeSpan / (3600 * 24 * 7)) + "周前";
    } else {
      return (
        date.getFullYear() +
        "年" +
        (date.getMonth() + 1) +
        "月" +
        date.getDate() +
        ""
      );
    }
  } else {
    if (/(Y+)/.test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        (date.getFullYear() + "").substr(4 - RegExp.$1.length)
      );
    }
    if (/(E+)/.test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        (RegExp.$1.length > 1
          ? RegExp.$1.length > 2
            ? "\u661f\u671f"
            : "\u5468"
          : "") + week[date.getDay() + ""]
      );
    }
    for (var k in o) {
      if (new RegExp("(" + k + ")").test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length === 1
            ? o[k]
            : ("00" + o[k]).substr(("" + o[k]).length)
        );
      }
    }
    return fmt;
  }
});
const app = new Vue({
  router,
  render: h => h(App)
});
app.$mount("#app");
