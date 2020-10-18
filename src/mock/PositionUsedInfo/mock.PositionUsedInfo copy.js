
/**
 * Created by wanjikun on 2019/10/21.
 */
var Random = Mock.Random;
const rurl = '/screen/positionUsedInfo';
const rtype = 'get';

let template = {
    "code": 0,
    "msg": "调用TestMockGet接口成功！",
    "result": []
}
const cb = (e) => {
    let array = [];
    for (let i = 1; i < 6; i++) {
        array.push({
            type:Random.word(3),
            used:Random.natural(1, 800),
            free:Random.natural(1, 800),
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