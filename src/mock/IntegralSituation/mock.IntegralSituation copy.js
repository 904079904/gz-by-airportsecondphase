
const rurl = '/screen/integralSituation';
const rtype = 'get';
let Random = Mock.Random

function createData(){
    let data = {
        "offLandSortie": Random.integer(400,100000),
        "psgThroughput": Random.integer(400,100000),
        "cargoThroughput": Random.integer(400,100000),
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