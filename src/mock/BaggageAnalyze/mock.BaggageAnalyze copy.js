
const rurl = '/screen/lugNormalityAnalyze';
const rtype = 'get';
let Random = Mock.Random

function createData(){
    let obj={
        month:{
            delay:Random.integer(50, 5000),
            normal:Random.integer(50, 5000)
        },
        year:{
            delay:Random.integer(50, 5000),
            normal:Random.integer(50, 5000)
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