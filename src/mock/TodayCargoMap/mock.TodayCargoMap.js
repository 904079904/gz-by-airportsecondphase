/**
 * Created by wanjikun on 2019/10/21.
 */
var Random = Mock.Random;
const rurl = '/screen/todayCargoMap';
const rtype = 'get';

let template = {
    "code": 0,
    "msg": "调用TestMockGet接口成功！",
    "result": {}
}
const cb = (e) => {
    template.result.international = [
        {
            "code": "AKL",
            "num":Random.integer(50,500),
        },
        {
            "code": "AMS",
            "num":Random.integer(50,500),
        },
        {
            "code": "CAI",
            "num":Random.integer(50,500),
        },
        {
            
            "code": "CDG",
            "num":Random.integer(50,500),
        },
        {
            
            "code": "DPS",
            "num":Random.integer(50,500),
        },
        {
            
            "code": "DXB",
            "num":Random.integer(50,500),
        },
        {
            
            "code": "JFK",
            "num":Random.integer(50,500),
        },
        {
            
            "code": "LHR",
            "num":Random.integer(50,500),
        },
        {
            
            "code": "MEL",
            "num":Random.integer(50,500),
        },
        {
            
            "code": "NRT",
            "num":Random.integer(50,500),
        },
        {
            "code": "SIN",
            "num":Random.integer(50,500),
        }
    ];
    template.result.internal=[];
    return template;
}
export {
    rurl,
    rtype,
    cb
};