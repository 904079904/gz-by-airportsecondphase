/* Create by zhangqin on 2019/11/29 */
const rurl = '/screen/psgHourlyDistribution';
const rtype = 'get';
let Random = Mock.Random

function createData(){
    let data = [],currentTime = Random.integer(0,23);
    for(var i = 0; i< 24;i++){
        let dataItem = {}
        if(i<currentTime){
            dataItem = {
                "hour": i,
                "enterPlan": 0,//进港计划人数
                "enterActual": Random.integer(0,10000),//进港实际人数
                "outPlan": 0,//出港计划人数
                "outActual": Random.integer(0,10000),//出港实际人数
            }
        }else {
            dataItem = {
                "hour": i,
                "enterPlan": Random.integer(0,10000),//进港计划人数
                "enterActual": 0,//进港实际人数
                "outPlan": Random.integer(0,10000),//出港计划人数
                "outActual": 0,//出港实际人数
            }
        }
        data.push(dataItem)
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