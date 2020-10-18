
const rurl = '/screen/lugNormalityAnalyze';
const rtype = 'get';
let Random = Mock.Random

function createData(){
    let obj={
        "month": {
            "delay": 106,
            "normal": 668412
        },
        "year": {
            "delay": 1123,
            "normal": 6384120
        }
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