/* Create by zhangqin on 2019/11/29 */
var Random = Mock.Random;
const rurl = '/screen/todayImportantCargo';
const rtype = 'get';

let template = {
    "code": 0,
    "msg": "调用TestMockGet接口成功！",
    "result": []
}
const cb = (e) => {
    let data = [];
    for (let i = 0; i < 7; i++) {
        data.push({
            type:Random.word(3),
            internal:Random.natural(1, 1000),//国内
            international:Random.natural(1, 1000),//国际
        })
    }
    template.result = data;
    
    return template;
}
export {
    rurl,
    rtype,
    cb
};