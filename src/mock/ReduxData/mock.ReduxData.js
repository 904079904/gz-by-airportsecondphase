/**
 * Created by xiejing on 2018/12/11.
 */
var Random = Mock.Random;
const rurl = '/ReduxData';
const rtype = 'post';

let template = {
    "code": 1,
    "msg": "调用TestMockPost接口成功！",
    "result": []
}
const cb = (e) => {
    console.log("TestMockGet调用")
    console.log(e)
    if (e.type=="POST"&&JSON.parse(e.body).name=="张三"){
        let str = `TestMockPost接口成功 调用方式：${e.type} 传值参数：${JSON.parse(e.body).name} mock随机生成：${Random.ctitle()}`
        template.result = str
    }else{
        let str = `验证失败，请检查参数`
        template.result = str
    }

    return template
}
export {
    rurl,
    rtype,
    cb
};
