/**
 * Created by xiejing on 2018/12/11.
 */
var Random = Mock.Random
const rurl = '/screen/leaveOverstocked'
const rtype = 'get'


let template = {
  "code": 0,
  "msg": "success",
  "result": createResult()
}


function createResult() {
  let result = {}
  result.xaxis = []
  result.flightOverstockTotal = []
  result.flightOverstockHour = []
  for(let i = 10; i < 20; i++) {
    result.xaxis.push(i)
    result.flightOverstockTotal.push(Random.integer(0, 25))
    result.flightOverstockHour.push(Random.integer(0, 25))
  } 
  return {
    "xaxis": [
        "09时",
        "10时",
        "11时",
        "12时",
        "13时",
        "14时",
        "15时",
        "16时"
    ],
    "flightOverstockTotal": [
        "0",
        "0",
        "0",
        "0",
        "0",
        "1",
        "15",
        "53"
    ],
    "flightOverstockHour": [
        "0",
        "4",
        "1",
        "0",
        "0",
        "7",
        "14",
        "38"
    ]
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
