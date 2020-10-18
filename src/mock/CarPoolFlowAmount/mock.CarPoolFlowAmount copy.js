// 蓄车池流量统计
const rurl = '/screen/carPoolFlowAmount';
const rtype = 'get';
let Random = Mock.Random

function createData(){
    let arr = [];
    let xdata=['A','B','T2']
    for (let i = 0; i < 3; i++) {
        arr.push({
            code:xdata[i], //蓄车池编号
            name:xdata[i], //蓄车池名称
            capacity:Random.integer(300, 500), //总容量
            need:Random.integer(200, 400), //总需求数
            done:Random.integer(100, 200), //完成派遣数
            pos:Random.integer(50, 100), //Pos机派遣数
            wait:Random.integer(50, 400), //在场车辆数
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