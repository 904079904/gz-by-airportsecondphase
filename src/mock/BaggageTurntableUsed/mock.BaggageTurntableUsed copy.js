// 行李转盘使用数量小时分布
const rurl = '/screen/lugFetchHourlyInternalCount';
const rtype = 'get';
let Random = Mock.Random

function createData(){
    let arr = [];
    for (let i = 0; i < 24; i++) {
        arr.push({
            hours:i,
            internal:Random.integer(0, 30),
            international:Random.integer(0, 30),
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