export default {
  SERVER_PATH: "/",
  VERSION: "V1.0",
  urlPrefix: "/api",
  //返回代码常量，要和后台的常量定义保持一致/** */
  RESULT_CODE: {
    SUCCESS: 0, ERROR: 100, LOGIN_ERROR: 101,NOT_LOGIN:102
  },
  utils: {
    nullToEmpty(obj) {
      if (obj == null || typeof (obj) == "undefined") {
        return "";
      }
      return obj;
    },
    formatDate(value, fmt = "YYYY-MM-DD") {
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
    }
  },
};
