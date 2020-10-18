
const rurl = '/screen/boardingGateHourlyCount';
const rtype = 'get';
let Random = Mock.Random

function createData(){
    let arr = [];
    for (let i = 0; i < 24; i++) {
        arr.push({
            hours:i,
            farNum:Random.integer(0, 100),
            nearNum:Random.integer(0, 100),
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