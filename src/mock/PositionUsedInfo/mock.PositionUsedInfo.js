
/**
 * Created by wanjikun on 2019/10/21.
 */
var Random = Mock.Random;
const rurl = '/screen/positionUsedInfo';
const rtype = 'get';

let template = {
    "code": 0,
    "msg": "调用TestMockGet接口成功！",
    // "result": []
    "result": [{ "name": "B类", "used": 2, "free": 49 }, { "name": "C类", "used": 55, "free": 117 }, { "name": "D类", "used": 43, "free": 94 }, { "name": "E类", "used": 44, "free": 34 }, { "name": "F类", "used": 8, "free": 3 }]
}
const cb = (e) => {
    let array = [];
    for (let i = 1; i < 6; i++) {
        array.push({
            type: Random.word(3),
            used: Random.natural(1, 800),
            free: Random.natural(1, 800),
        })
    }

    template.result = array;

    return template;
}
export {
    rurl,
    rtype,
    // cb
    template
};