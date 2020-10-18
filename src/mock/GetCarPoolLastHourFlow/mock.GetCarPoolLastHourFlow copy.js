// 过去一小时流量情况
const rurl = '/screen/carPoolLastHourFlow';
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
        result: createData()
    }
    return template
}

export {
    rurl,
    rtype,
    cb,
}