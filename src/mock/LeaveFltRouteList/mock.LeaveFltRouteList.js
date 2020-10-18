/**
 * Created by wanjikun on 2019/10/21.
 */
var Random = Mock.Random;
const rurl = '/screen/leaveFltRouteList';
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
            origin:'三级码',
            destination:Random.word(3),
            location:[
                Random.float( 100,200),
                Random.float( 10,200)
            ]
        })
    }

    template.result = [
        {
            "fly": 1,
            "code": "AKL",
            "plan": 2
        },
        {
            "fly": 2,
            "code": "AMS",
            "plan": 2
        },
        {
            "fly": 0,
            "code": "CAI",
            "plan": 1
        },
        {
            "fly": 1,
            "code": "CDG",
            "plan": 1
        },
        {
            "fly": 3,
            "code": "DPS",
            "plan": 4
        },
        {
            "fly": 1,
            "code": "DXB",
            "plan": 2
        },
        {
            "fly": 1,
            "code": "JFK",
            "plan": 1
        },
        {
            "fly": 1,
            "code": "LHR",
            "plan": 1
        },
        {
            "fly": 1,
            "code": "MEL",
            "plan": 2
        },
        {
            "fly": 3,
            "code": "NRT",
            "plan": 3
        },
        {
            "fly": 4,
            "code": "SIN",
            "plan": 8
        }
    ];
    
    return template;
}
export {
    rurl,
    rtype,
    cb
};