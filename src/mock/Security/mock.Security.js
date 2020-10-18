
const rurl = '/screen/coordinateSafeguard';
const rtype = 'get';
let Random = Mock.Random

function createData(){
    let data = {
        "TOBT": 5,
        "CTOT": 5,
        "COBT": 5,
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