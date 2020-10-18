
const rurl = '/screen/closeDoorWaitCount';
const rtype = 'get';
let Random = Mock.Random

function createData(){
    let data = {
        "oneHour": Random.integer(0,300),
        "thanOneHour": Random.integer(0,300),
        "thanTwoHour": Random.integer(0,300),
        "thanFour": Random.integer(0,300),
    }
    return {
        "thanOneHour": 0,
        "oneHour": 9,
        "thanFour": 0,
        "thanTwoHour": 0
    }
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