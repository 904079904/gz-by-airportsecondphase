/**
 * Created by xiejing on 2018/12/11.
 */
var Random = Mock.Random;
const rurl = '/Test/';
const rtype = 'get';

let template = {
    "code": 1,
    "msg": "调用TestMockGet接口成功！",
    "result": []
}
const cb = (e) => {
    console.log("TestMockGet调用")
    console.log(e)
    let str =`TestMockGet接口成功 调用方式：${e.type} 传值参数：${e.url.split("=")[1]} 随机生成：${Random.city()}`
    template.result=str
    return template
}
export {
    rurl,
    rtype,
    cb
};
