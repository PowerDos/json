const assert = require('assert');

const json = {
    string: 'hello world',
    number: 100,
    date: new Date(),
    buf: new Buffer('hello world')
};

const encode = (json) => {
    if (typeof (json) === 'object') {
        const key = Object.getOwnPropertyNames(json);
        let dataStr = '';
        key.forEach(name => {
            switch (typeof (json[name])) {
                case 'string':
                    dataStr = `${dataStr}"${name}":"${json[name]}",`;
                    break;
                case 'number':
                    dataStr = `${dataStr}"${name}":${json[name]},`;
                    break;
                case 'object':
                    if (Buffer.isBuffer(json[name])) {
                        dataStr = `${dataStr}"${name}":{"type":"Buffer","data":"${json[name]}"},`
                    } else {
                        dataStr = `${dataStr}"${name}":{"type":"Date","data":"${json[name].toISOString()}"},`;
                    }
                    break;
            }
        });
        const parseJson = `{${dataStr.substr(0, dataStr.length - 1)}}`;
        return parseJson;
    } else {
        throw new Error('不是一个对象');
    }
}

const decode = (jsonStr) => {
    if (typeof (jsonStr) === 'string') {
        let json = {};
        const str = jsonStr.substr(1, jsonStr.length - 2);
        const arr = []
        let temp = '';
        for (let item of str) {
            if (item === ',') {
                arr.push(temp);
            } else if (item === '{') {
                arr.push(temp);
            }
        }
        console.log(str);
    } else {
        throw new Error('不是一个字符串');
    }

}

const jsonStr = encode(json);
const obj = decode(jsonStr);

assert.deepEqual(json, obj);