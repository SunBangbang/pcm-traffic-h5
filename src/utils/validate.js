7; //const：定义一个规则常量，常量名可变， '= (rule, value, callback) => {}' 为固定格式，value 入参为验证的字段值

// 优化写法
// 是否必填
export function validateNecessary(tipInfo = '请输入', trigger = 'blur', isNeces = true) {
    return {
        required: isNeces,
        message: tipInfo,
        trigger
    };
}
// 验证最大长度
export function validateLen(len = 20) {
    return {
        max: len,
        message: '最大长度为' + len + '个字符',
        trigger: ['change', 'blur']
    };
}

export function validateSmLen(len = 2) {
    return {
        min: len,
        message: '最小长度为' + len + '个字符',
        trigger: ['change', 'blur']
    };
}

/* 账号校验*/
export const validateCode = (rule, value, callback) => {
    if (!value) {
        return callback(new Error('请输入'));
    }
    // eslint-disable-next-line
    let re = /[^\x00-\xff]/;
    // eslint-disable-next-line
    if (/[#\$%\^&\*【】@!！￥?|‘；：”“'。，、？<>+=:]+/g.test(value) || re.test(value)) {
        callback(new Error('不允许特殊字符或者中文字符'));
    }
    // /[/W]/g   /[^/d]/g
    // if (/^(?![0-9]*$)(?![a-zA-Z]*$)[a-zA-Z0-9]{6,20}$/.test(value)) {
    if (/[/W][^/d]{6,20}$/g.test(value)) {
        callback(new Error('必须为6-20位字母或数字或组合'));
    } else {
        callback();
    }
};

/* 账号校验*/
export const validateCode3 = (rule, value, callback) => {
    if (!value) {
        return callback(new Error('请输入'))
    }
     // eslint-disable-next-line
    if (/[#\$%\^&\?‘；”“'/\？<>]+/g.test(value)) {
        callback(new Error('不允许特殊字符'))
    }
    callback()
}

/* 账号校验*/
export const validateCode4 = (rule, value, callback) => {
    if (!value) {
        callback()
    }
     // eslint-disable-next-line
    if (/[#\$%\^&\?‘；”“'/\？<>]+/g.test(value)) {
        callback(new Error('不允许特殊字符'))
    }
    callback()
}

/*验证内容是否英文数字以及下划线*/
export function validatePassword(rule, value, callback) {
    const reg = /^[_a-zA-Z0-9]+$/;
    if (value == '' || value == undefined || value == null) {
        callback();
    } else {
        if (!reg.test(value)) {
            callback(new Error('密码仅由英文字母，数字以及下划线组成'));
        } else {
            callback();
        }
    }
}
/* 是否手机号码或者固话 */
export function validatePhoneTwo(rule, value, callback) {
    const reg =  /^1\d{10}$/ ;
    if (value == '' || value == undefined || value == null) {
        callback();
    } else {
        if (!reg.test(value) && value != '') {
            callback(new Error('请输入正确的电话号码或者固话号码'));
        } else {
            callback();
        }
    }
}
/* 是否手机号码*/
export function validatePhone(rule, value, callback) {
    const reg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (value == '' || value == undefined || value == null) {
        callback();
    } else {
        if (!reg.test(value) && value != '') {
            callback(new Error('请输入正确的手机号码'));
        } else {
            callback();
        }
    }
}
/* 是否身份证号码*/
export function validateIdNo(rule, value, callback) {
    const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (value == '' || value == undefined || value == null) {
        callback();
    } else {
        if (!reg.test(value) && value != '') {
            callback(new Error('请输入正确的身份证号码'));
        } else {
            callback();
        }
    }
}
/* 是否邮箱*/
export function validateEMail(rule, value, callback) {
    // eslint-disable-next-line
    const reg = /^([a-zA-Z0-9]+[-_\.]?)+@[a-zA-Z0-9]+\.[a-z]+$/;
    if (value == '' || value == undefined || value == null) {
        callback();
    } else {
        if (!reg.test(value)) {
            callback(new Error('请输入正确的邮箱地址'));
        } else {
            callback();
        }
    }
}
/*纯数字校验*/
export const validateNumber = (rule, value, callback) => {
    let numberReg = /^\d+$|^\d+[.]?\d+$/;
    if (value) {
        if (!numberReg.test(value)) {
            callback(new Error('请输入数字'));
        } else {
            callback();
        }
    } else {
        callback();
    }
};
/*中文校验*/
export const validateContacts = (rule, value, callback) => {
    if (!value) {
        return callback(new Error('请输入中文'));
    }
    if (!/^[\u0391-\uFFE5A-Za-z]+$/.test(value)) {
        callback(new Error('不可输入特殊字符'));
    } else {
        callback();
    }
};

/*中文不必填校验*/
export const validateContacts2 = (rule, value, callback) => {
    if (!value) {
        return callback();
    } else {
        if (!/^[\u0391-\uFFE5A-Za-z]+$/.test(value)) {
            callback(new Error('不可输入特殊字符'));
        } else {
            callback();
        }
    }
};

/*中英文圆点校验*/
export const validateName = (rule, value, callback) => {
    if (!value) {
        return callback(new Error('请输入内容'));
    }
    if (!/^[\u4e00-\u9fa5A-Za-z·]+$/.test(value)) {
        callback(new Error('该类型字符不可输入'));
    } else {
        callback();
    }
};

/*中英文数字下划线校验*/
export const validateCodeString = (rule, value, callback) => {
    const reg = /^[a-zA-Z0-9]+$/;
    if (value == '' || value == undefined || value == null) {
        callback();
    } else {
        if (!reg.test(value)) {
            callback(new Error('数字以及字母组成'));
        } else {
            callback();
        }
    }
};

/*中英文数字下划线校验*/
export const validateString = (rule, value, callback) => {
    if (!value) {
        return callback(new Error('请输入内容'));
    }
    if (!/^[\u4e00-\u9fa5_A-Za-z0-9]+$/.test(value)) {
        callback(new Error('该类型字符不可输入'));
    } else {
        callback();
    }
};


/* 大写字母*/
export function validateUpperCase(rule, value, callback) {
    const reg = /^[A-Z]+$/;
    if (value == '' || value == undefined || value == null) {
        return callback(new Error('请输入大写字母'));
    } else {
        if (!reg.test(value)) {
            callback(new Error('请输入大写字母'));
        } else {
            callback();
        }
    }
}
/*小写字母*/
export function validateLowerCase(val) {
    const reg = /^[a-z]+$/;
    return reg.test(val);
}
/* 大小写字母*/
export function validatAlphabets(str) {
    const reg = /^[A-Za-z]+$/;
    return reg.test(str);
}
/*验证是否整数*/
export function isInteger(rule, value, callback) {
    if (!value) {
        return callback(new Error('输入不可以为空'));
    }
    setTimeout(() => {
        if (!Number(value)) {
            callback(new Error('请输入正整数'));
        } else {
            const re = /^[0-9]*[1-9][0-9]*$/;
            const rsCheck = re.test(value);
            if (!rsCheck) {
                callback(new Error('请输入正整数'));
            } else {
                callback();
            }
        }
    }, 0);
}
export function isInteger1(rule, value, callback) {
    if (!value) {
        return callback();
    } else {
        const reg = /^[0-9]*[1-9][0-9]*$/;
        if (!reg.test(value)) {
            callback(new Error('请输入正整数'));
        } else {
            callback();
        }
    }
}
/*是否合法IP地址*/
export function validateIP(rule, value, callback) {
    if (value == '' || value == undefined || value == null) {
        callback();
    } else {
        const reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
        if (!reg.test(value) && value != '') {
            callback(new Error('请输入正确的IP地址'));
        } else {
            callback();
        }
    }
}
/* 合法uri*/
export function validateURL(rule, value, callback) {
    if (value == '' || value == undefined || value == null) {
        callback();
    } else {
        const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
        if (!urlregex.test(value) && value != '') {
            callback(new Error('请输入正确的网址'));
        } else {
            callback();
        }
    }
}
/*自动检验数值的范围*/
export function checkMax20000(rule, value, callback) {
    if (value == '' || value == undefined || value == null) {
        callback();
    } else if (!Number(value)) {
        callback(new Error('请输入[1,20000]之间的数字'));
    } else if (value < 1 || value > 20000) {
        callback(new Error('请输入[1,20000]之间的数字'));
    } else {
        callback();
    }
}

//验证数字输入框最大数值,32767
export function checkMaxVal(rule, value, callback) {
    if (value < 0 || value > 32767) {
        callback(new Error('请输入[0,32767]之间的数字'));
    } else {
        callback();
    }
}
/**
 * 验证经度输入范围在-180-180之间，且小数可7位
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
export function checkLon(rule, value, callback) {
    if (value) {
        value += '';
        // eslint-disable-next-line
        if (value.match(/^(\-|\+)?(((\d|[1-9]\d|1[0-7]\d|0{1,3})\.\d{0,7})|(\d|[1-9]\d|1[0-7]\d|0{1,3})|180\.0{0,6}|180)$/)) {
            callback();
        } else {
            callback(new Error('经度为-180~180,小数限7位!'));
        }
    } else {
        callback();
    }
}
/**
 * 验证纬度输入范围在-180-180之间，且小数可7位
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
export function checkLat(rule, value, callback) {
    if (value) {
        value += '';
        // eslint-disable-next-line
        if (value.match(/^(\-|\+)?([0-8]?\d{1}\.\d{0,7}|90\.0{0,6}|[0-8]?\d{1}|90)$/)) {
            callback();
        } else {
            callback(new Error('纬度为-90~90,小数限7位'));
        }
    } else {
        callback();
    }
}

// 中英文 数字校验
export function validateAll(rule, value, callback) {
    const reg = /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/;
    if (!reg.test(value)) {
        callback(new Error('仅支持输入中英文、数字'));
    } else {
        callback();
    }
}

export function validatePassword2(value) {
    const formatType = /[\u4E00-\u9FA5]/g;
    const formatNun = /^(?=.*?[A-Za-z]+)(?=.*?[0-9]+).*$/;
    if (!value) {
        return '请输入密码';
    }
    if (formatType.test(value)) {
        return '密码不允许输入中文';
    }
    if (formatNun.test(value) === false) {
        return '密码应至少一个数字加字母的组合';
    }
}

export function validateUsername2(value) {
    // const formatC = /[#\$%\^&\*【】@!！￥?|‘；：”“'。，、？<>+=:]+/g
    // const formatB = /[^\x00-\xff]/
    const formatCharacter = /^[0-9A-Za-z]{4,20}$/;
    if (!value) {
        return '请输入用户名';
    }
    if (formatCharacter.test(value) === false) {
        return '用户名限制4到20位的数字或字母组合';
    }
}

export function validateCode2(value, validateValue) {
    if (!value) return '请输入验证码';
    if (value.toUpperCase() !== validateValue.toUpperCase()) return '验证码错误';
}

export function validate2z50(rule, value, callback) {
    const zz = /^[0-9A-Za-z]{2,50}$/;
    if(!value) callback();
    if (!zz.test(value)) {
        callback(new Error('长度在 2-50字符'));
    } else {
        callback();
    }
}
