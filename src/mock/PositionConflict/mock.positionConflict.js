
/**
 * Created by wanjikun on 2019/10/21.
 */
var Random = Mock.Random;
const rurl = '/screen/positionConflict';
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
            time: Random.datetime(),
            content:Random.paragraph(10, 20 ),
            arrivePort:Random.word(3),
            leavePort: Random.word(3),
            realArrive: Random.datetime(),
            willFly: Random.datetime()
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
