/**
 * Created by wanjikun on 2019/10/21.
 */
var Random = Mock.Random;
const rurl = '/screen/positionTotalityByBridgeRate';
const rtype = 'get';

let template = {
    "code": 0,
    "msg": "调用TestMockGet接口成功！",
    "result": {}
}
const cb = (e) => {
    let obj = {
        rate:Random.float( 1,100,0,2)
    }

    template.result = obj;
    
    return template;
}
export {
    rurl,
    rtype,
    cb
};
