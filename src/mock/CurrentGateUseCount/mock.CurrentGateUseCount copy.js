/* Created by zhangqin on 2019/11/28.*/
const rurl = '/screen/currentGateUseCount';
const rtype = 'get';
let Random = Mock.Random

function createData(){
    let data = {
        "far": Random.integer(0,1000),
        "near": Random.integer(0,1000),
    }
    return data
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