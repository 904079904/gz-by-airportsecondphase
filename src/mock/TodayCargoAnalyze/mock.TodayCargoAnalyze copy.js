//货运情况—货运分析 mock
const rurl = '/screen/todayCargoAnalyze';
const rtype = 'get';
let Random = Mock.Random

function createData(){
    let areaArr=['东南亚','南美洲','欧洲','大洋洲','中西亚','南亚','北美洲','东北亚','其他'];
    let len =  Random.integer(8,9);
    let allArea=[];
    let total = 0;
    for (let i = 0; i < len; i++) {
        let num = Random.integer(50,500)
        allArea.push({
            area:areaArr[i],
            num:num
        })
        total += num        
    }
    let obj={
        internal:{
            total:Random.integer(50, 5000),
            allArea:[]
        },
        international:{
            total:total,
            allArea:allArea
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