
const rurl = '/screen/monthYearPassRate';
const rtype = 'get';
let Random = Mock.Random

function createData(){
    let data = {
        "normalRates": Random.float(0,100,0,2),
        "monthReal": Random.float(0,100,0,2),
        "yearReal": Random.float(0,100,0,2),
        "monthPlan": Random.float(0,100,0,2),
        "yearPlan": Random.float(0,100,0,2),
        "month": Random.float(0,100,0,2),
        "year": Random.float(0,100,0,2),
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