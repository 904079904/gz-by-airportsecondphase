
const rurl = '/screen/monthYearPassRate';
const rtype = 'get';
let Random = Mock.Random

function createData() {
    let data = {
        "normalRates": Random.float(0, 100, 0, 2),
        "monthReal": Random.float(0, 100, 0, 2),
        "yearReal": Random.float(0, 100, 0, 2),
        "monthPlan": Random.float(0, 100, 0, 2),
        "yearPlan": Random.float(0, 100, 0, 2),
        "month": Random.float(0, 100, 0, 2),
        "year": Random.float(0, 100, 0, 2),
    }
    return data
}

const cb = (e) => {
    let template = {
        code: 0,
        msg: 'success',
        result: {
            "yearPlan": 80.00,
            "normalRates": 93.93,
            // "month": 74.00,
            "month": 94.00,
            "year": 94.00,
            "monthReal": 82.01,
            "monthPlan": 90.00,
            "yearReal": 60.59
        }
    }
    return template
}

export {
    rurl,
    rtype,
    cb,
}