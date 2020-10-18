/**
 * Created by xiejing on 2018/12/11.
 */
var Random = Mock.Random
const rurl = '/screen/safeguardExecRate'
const rtype = 'get'


let template = {
  "code": 0,
  "msg": "success",
  "result": createResult()
}


function createResult() {
  let result = {}
  result.global = Random.float(0,100,0,2)
  result.airportPsgCabin = Random.float(0,100,0,2)
  result.airportCargoCabin = Random.float(0,100,0,2)
  result.czPsgCabin = Random.float(0,100,0,2)
  result.czCargoCabin = Random.float(0,100,0,2)
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
