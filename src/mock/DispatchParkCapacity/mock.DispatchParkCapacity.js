// 出租车调度—调度场容量
const rurl = '/screen/dispatchParkCapacity';
const rtype = 'get';
let Random = Mock.Random

function createData(){
    let num = Random.integer(100, 300)
    let obj={
        capacity:num,
        used:Random.integer(0, num),
    }
    return obj;
}

const cb = (e) => {
    let template = {
        code: 0,
        msg: 'success',
        result: {"capacity":500,"used":269}
    }
    return template
}

export {
    rurl,
    rtype,
    cb,
}