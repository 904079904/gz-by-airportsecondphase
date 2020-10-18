
const rurl = '/screen/fltEnterLeaveSpeed';
const rtype = 'get';
let Random = Mock.Random

function createData(){
    let data = {
        "arrivalSpeed": Random.integer(0,10),
        "departureSpeed": Random.integer(0,10),
        "arrival1H": Random.integer(0,300),
        "departure1H": Random.integer(0,300),
        'arrivalOTD': Random.integer(0,100),
        'departureOTD': Random.integer(0,100),
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