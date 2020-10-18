/**
 * Created by wanjikun on 2019/10/21.
 */
var Random = Mock.Random;
const rurl = '/screen/departureTotalAndDelayRate';
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

    template.result = {
        "total": [
            9,
            7,
            7,
            12,
            14,
            12,
            37,
            41,
            47,
            40,
            31,
            37,
            32,
            37,
            1
        ],
        "delay": [
            2,
            2,
            2,
            9,
            3,
            4,
            1,
            1,
            4,
            3,
            3,
            5,
            5,
            2,
            0
        ],
        "time": [
            0,
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14
        ]
    };
    
    return template;
}
export {
    rurl,
    rtype,
    cb
};
