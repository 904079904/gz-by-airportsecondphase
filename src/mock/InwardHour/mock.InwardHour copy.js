/**
 * Created by wanjikun on 2019/10/21.
 */
var Random = Mock.Random;
const rurl = '/screen/arrivalTotalAndDelayRate';
const rtype = 'get';

let template = {
    "code": 0,
    "msg": "调用TestMockGet接口成功！",
    "result": {}
}
const cb = (e) => {
    
    let time = [];
    let total = [];
    let delay = [];
    for (let i = 1; i < 13; i++) {
        time.push(i*2);
        total.push(Random.natural(1, 800));
        delay.push(Random.natural(1, 800));
    }

    const obj = {
        time:time,
        total:total,
        delay:delay
    }

    template.result = obj;
    
    return template;
}
export {
    rurl,
    rtype,
    cb
};
