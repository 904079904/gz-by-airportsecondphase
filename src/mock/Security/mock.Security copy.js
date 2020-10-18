
const rurl = '/screen/coordinateSafeguard';
const rtype = 'get';
let Random = Mock.Random

function createData(){
    let data = {
        "TOBT": Random.integer(0,300),
        "CTOT": Random.integer(0,300),
        "COBT": Random.integer(0,300),
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