const assert = require('assert');
const jsonM = require('./modules/json');
const jsonO = new jsonM();
const json = {
    string: 'hello world',
    number: 100,
    date: new Date(),
    buf: new Buffer('hello world'),
    arr: ['name', 'start'],
    obj: {
        type: 'Buffer',
        data: [104,101,108,108,111,32,119,111,114,108,100]
    }
};
// console.log(JSON.stringify(json));
// const jsonStr = JSON.stringify(json);
// const obj = JSON.parse(jsonStr);
// console.log(obj);
console.log(jsonO.encode(json));
// assert.deepEqual(json, obj);