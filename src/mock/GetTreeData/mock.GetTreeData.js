/**
 * Created by xiejing on 2018/12/11.
 */
var Random = Mock.Random;
const rurl = '/GetTreeData';
const rtype = 'get';

let template = {
    "code": 1,
    "msg": "调用TestMockGet接口成功！",
    "result": []
}
const cb = (e) => {
    template.result=[{
        title: "第一层",
        key: '1',
        children: [{
            title: "第二层-1",
            key: '2-1'
        }, {
            title: "第二层-2",
            key: '2-2',
            children:[{
                title: "第三层-1",
                key: '3-1',
            }]
        }]
    }]
    return template
}
export {
    rurl,
    rtype,
    cb
};
