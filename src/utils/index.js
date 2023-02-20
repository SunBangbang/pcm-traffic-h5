// 获取验证码--
export function getRandomNunmer() {
    const arr =  [
        "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", 
        "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", 
        "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", 
        "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2", "3", 
        "4", "5", "6", "7", "8", "9"
    ]
     var code = Math.floor(Math.random() * arr.length);
     var code1 = Math.floor(Math.random() * arr.length);
     var code2 = Math.floor(Math.random() * arr.length);
     var code3 = Math.floor(Math.random() * arr.length);
     var nunmer = arr[code] + arr[code1] + arr[code2] + arr[code3];
     return nunmer
}


// 截取路径参数
export function getUrlParam (name) {
    const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
    const url = window.location.href.split('#')[0]
    const search = url.split('?')[1]
    if (search) {
      const r = search.substr(0).match(reg)
      if (r !== null) { return unescape(r[2]) }
      return null
    } else {
      return null
    }
  }


  // 获取字符 
export  function strlen(val) {
  var len = 0;
  for (var i = 0; i < val.length; i++) {
      var a = val.charAt(i);
      // eslint-disable-next-line no-control-regex
      if (a.match(/[^\x00-\xff]/ig) != null) {//\x00-\xff→GBK双字节编码范围
          len += 2;
      }
      else {
          len += 1;
      }
  }
  return len;
}


export function validateCode2(value, validateValue) {
  if (!value) return '请输入验证码';
  if (value.toUpperCase() !== validateValue.toUpperCase()) return '验证码错误';
}


//  获取昨日日期
export function getDateStr(dayCount) {
  if (null == dayCount) {
      dayCount = 0;
  }
  var dd = new Date();
  dd.setDate(dd.getDate() + dayCount);//设置日期
  var y = dd.getFullYear();
  var m = dd.getMonth() + 1;//获取当前月份的日期
  var d = dd.getDate();
  return y + "-" + m + "-" + d;
}

//  获取指定日期
export function getBeforeDate(n) {
  var n = n;
  var d = new Date();
  var year = d.getFullYear();
  var mon = d.getMonth() + 1;
  var day = d.getDate();
  if(day <= n) {
      if(mon > 1) {
          mon = mon - 1;
      } else {
          year = year - 1;
          mon = 12;
      }
  }
  d.setDate(d.getDate() - n);
  year = d.getFullYear();
  mon = d.getMonth() + 1;
  day = d.getDate();
  var s = year + "-" + (mon < 10 ? ('0' + mon) : mon) + "-" + (day < 10 ? ('0' + day) : day);
  return s;
}

// 格式化 单位
export function formatUnit(value) {
  if (value === 1) return 'mg'
  if (value === 2) return 'g'
  if (value === 3) return 'kg'
  if (value === 4) return 'ml'
  if (value === 5) return 'L'
}
export function AddJs (url) {
    console.log(url,'url')
    return new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.src = url
      script.type = 'text/javascript'
      document.body.appendChild(script)
      script.onload = () => {
        resolve()
      }
    })
}

export function groupArray(data,key){
  let groups={};
  data.forEach(c=>{
      let value=c[key];
      groups[value]=groups[value]||[];
      groups[value].push(c);
  });
  return groups;
}


export function debounce(fn, delay, immdiate = false, resultCallback) {
  let timer = null
  let isInvoke = false
  function _debounce(...arg) {
    if (timer) clearTimeout(timer)
    if (immdiate && !isInvoke) {
      const result = fn.apply(this, arg)
      if (resultCallback && typeof resultCallback === "function") resultCallback(result)
      isInvoke = true
    } else {
      timer = setTimeout(() => {
        const result = fn.apply(this, arg)
        if (resultCallback && typeof resultCallback === "function") resultCallback(result)
        isInvoke = false
        timer = null
      }, delay)
    }

  }

  _debounce.cancel = function () {
    if (timer) clearTimeout(timer)
    timer = null
    isInvoke = false
  }

  return _debounce
}