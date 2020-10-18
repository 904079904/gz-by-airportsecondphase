/**
 * Created by xiejing on 2018/12/11.
 */
var Random = Mock.Random
const rurl = '/screen/hourReleaseSituation'
const rtype = 'get'


let template = {
  "code": 0,
  "msg": "success",
  "result": createResult()
}


function createResult() {
  return {
    "normal":[11,4,6,10,8,13,37,44,43,37,36,32,34,22,0,0,0,0,0,0,0,0,0,0],
    "abnormalTop":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    "abnormal":[2,2,2,5,2,1,1,1,4,3,2,5,2,1,0,0,0,0,0,0,0,0,0,0],
    "hour":["84.62","66.67","75.0","66.67","80.0","92.86","97.37","97.78","91.49","92.5","94.74","86.49","94.44","95.65","","","","","","","","","",""],
    "time":["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23"],
    "forbid":["90.0","85.71","88.89","84.62","85.71","88.24","94.44","95.73","94.48","94.09","94.17","93.14","93.29","93.29","","","","","","","","","",""]
  }
}

const cb = (e) => {
    return template
}
export {
    rurl,
    rtype,
    cb
}
