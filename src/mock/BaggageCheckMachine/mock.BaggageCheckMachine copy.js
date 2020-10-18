//行李安检机模块通过率mock

const rurl = '/screen/lugCheckPassAmount';
const rtype = 'get';
let Random = Mock.Random

function createData(){
    let obj={
        internal:{
            passRate:(Random.float(0, 100)).toFixed(2),
            amount:Random.integer(50, 5000)
        },
        international:{
            passRate:(Random.float(0, 100)).toFixed(2),
            amount:Random.integer(50, 5000)
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