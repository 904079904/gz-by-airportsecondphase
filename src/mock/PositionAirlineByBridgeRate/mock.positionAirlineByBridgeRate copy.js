
/**
 * Created by wanjikun on 2019/10/21.
 */
var Random = Mock.Random;
const rurl = '/screen/positionAirlineByBridgeRate';
const rtype = 'get';

let template = {
    "code": 0,
    "msg": "调用TestMockGet接口成功！",
    "result": []
}
const cb = (e) => {
    let array = [];
    for (let i = 1; i < 13; i++) {
        array.push({
            airline:Random.word(3),
            rate:Random.float( 1,100),
        })
    }

    template.result = array;
    
    return template;
}
export {
    rurl,
    rtype,
    cb
};
