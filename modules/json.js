const util = require('util');

class json {
    encode(obj) {
        if (util.isObject(obj)) {
            const key = Object.getOwnPropertyNames(obj);
            let dataStr = '';
            key.forEach(name => {
                if (util.isString(obj[name])) {
                    dataStr += this.isString(name, obj[name]);
                } else if (util.isNumber(obj[name]) || util.isBoolean(obj[name])) {
                    dataStr += this.isNumBoolObj(name, obj[name]);
                } else if (util.isDate(obj[name])) {
                    dataStr += this.isDate(name, obj[name]);
                } else if (util.isBuffer(obj[name])) {
                    dataStr += this.isBuffer(name, obj[name]);
                } else if (util.isArray(obj[name])) {
                    dataStr += this.isArray(name, obj[name]);
                } else if (util.isObject(obj[name])) {
                    dataStr += this.isNumBoolObj(name, this.encode(obj[name])); // 递归
                }
                dataStr += ',';
            });
            return `{${dataStr.substr(0, dataStr.length - 1)}}`;
        } else {
            throw new Error('不是一个对象');
        }
    }

    decode() {

    }

    isString(key, value) {
        return `"${key}":"${value}"`;
    }

    isNumBoolObj(key, value) {
        return `"${key}":${value}`;
    }

    isDate(key, value) {
        return `"${key}":{"type":"Date","data":"${value.toISOString()}"}`;
    }

    isBuffer(key, value) {
        return `"${key}":{"type":"Buffer","data":"${value}"}`;
    }

    isArray(key, value) {
        let arrString = '[';
        value.forEach(key => {
            if (util.isObject(key)) {
                arrString += this.encode(key) + ","; // 递归
            } else if(util.isNumber(key)){
                arrString += `${key},`
            } else {
                arrString += `"${key}",`
            }
        });
        arrString = `${arrString.substr(0, arrString.length - 1)}]`;
        return `"${key}":${arrString}`;
    }
}

module.exports = json;