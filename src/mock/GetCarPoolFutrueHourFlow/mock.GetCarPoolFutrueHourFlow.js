// 未来一小时流量情况
const rurl = '/screen/carPoolFutrueHourFlow';
const rtype = 'get';
let Random = Mock.Random

function createData(){
    let arr = [];
    let xdata=['A','B','T2']
    for (let i = 0; i < 3; i++) {
        arr.push({
            code:xdata[i],
            out:Random.integer(0, 30),
            enter:Random.integer(0, 30),
        })
    }
    return arr;
}

const cb = (e) => {
    let template = {
        code: 0,
        msg: 'success',
        result: [
            {
                "code": "A",
                "out": 23,
                "enter": 30
            },
            {
                "code": "B",
                "out": 28,
                "enter": 33
            },
            {
                "code": "T2",
                "out": 56,
                "enter": 74
            }
        ]
    }
    return template
}

export {
    rurl,
    rtype,
    cb,
}