
const rurl = '/screen/elevatorRunStatus';
const rtype = 'get';
let Random = Mock.Random

function createData(){
    let obj={
        fault:Random.integer(0, 50), //故障数
        operation:Random.integer(50, 500),//运行数
        wait:Random.integer(50, 500),//等待数
    }
    return obj;
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