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
  let result = {}
  result.time = []
  result.normal = []
  result.abnormal = []
  result.abnormalTop = []
  result.forbid = []
  result.hour = []
  for(let i = 10; i < 20; i++) {
    result.time.push(i)
    result.normal.push(Random.integer(0, 50))
    result.abnormal.push(Random.integer(0, 50))
    result.abnormalTop.push(Random.integer(0, 50))
    result.forbid.push(Random.integer(0, 50))
    result.hour.push(Random.integer(0, 50))
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
