function formatNumber (n) {
  const str = n.toString();
  return str[1] ? str : `0${str}`;
}

export function formatTime (date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  const t1 = [year, month, day].map(formatNumber).join('/');
  const t2 = [hour, minute, second].map(formatNumber).join(':');

  return `${t1} ${t2}`;
}

/* *
 * 表单校验
 */
export const rule = {
  alert: function (mess) {
    wx.showToast({
      title: mess,
      icon: 'none',
      duration: 2000
    });
  },
  empty: function (str, mess) { // 不能为空
    if (str === '') {
      this.alert(mess);
      return false;
    } else {
      return true;
    }
  },
  phone: function (str) { // 手机号校验
    var myReg = /^(13[0-9]|15[012356789]|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
    if (!myReg.test(str)) {
      this.alert('手机号码有误');
      return false;
    } else {
      return true;
    }
  }
};

export default {
  formatNumber,
  formatTime,
  rule
};
