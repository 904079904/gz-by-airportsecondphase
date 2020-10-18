/**
 * Created by xiejing on 2018/12/11.
 */
var Random = Mock.Random;
const rurl = '/TestMockTemplate';
const rtype = 'get';

let template = {
    "code": 1,
    "msg": "调用TestMockTemplate接口成功！",
    "result": `TestMockTemplate接口调用成功${Random.city()}`
}
export {
    rurl,
    rtype,
    template
};
