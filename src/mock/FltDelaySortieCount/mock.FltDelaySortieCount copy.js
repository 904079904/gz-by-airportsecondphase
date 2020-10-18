
const rurl = '/screen/fltDelaySortieCount';
const rtype = 'get';
let Random = Mock.Random

function createData(){
    let data = {
        "oneHour": Random.integer(0,300),
        "thanOneHour": Random.integer(0,300),
        "thanTwoHour": Random.integer(0,300),
        "thanFour": Random.integer(0,300),
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