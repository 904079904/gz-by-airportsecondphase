/**
 * Created by xiejing on 2018/12/11.
 */
var Random = Mock.Random
const rurl = '/screen/corridorReleaseRate'
const rtype = 'get'


let template = {
  "code": 0,
  "msg": "success",
  "result": createResult()
}


function createResult() {
  let result = {}
  result.xaxis = []
  result.fplrouteDepRate = []
  result.fplrouteSchedule = []
  result.fplrouteNormal = []
  result.fplrouteAbnormal = []
  for(let i = 0; i < 3; i++) {
    result.xaxis.push(i)
    result.fplrouteDepRate.push(Random.integer(0, 50))
    result.fplrouteSchedule.push(Random.integer(0, 50))
    result.fplrouteNormal.push(Random.integer(0, 50))
    result.fplrouteAbnormal.push(Random.integer(0, 50))
  } 
  return result
}

const cb = (e) => {
    return template
}
export {
    rurl,
    rtype,
    cb
}
