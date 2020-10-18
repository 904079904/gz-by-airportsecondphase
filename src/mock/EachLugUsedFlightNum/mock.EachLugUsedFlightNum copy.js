
const Mock = require('mockjs')
const rurl = '/screen/eachLugUsedFlightNum';
const rtype = 'get';
let Random = Mock.Random

function createData(){
  const result = []
  for(let i = 0; i < Random.integer(10,21); i++) {
    result.push({name: `${i}`, fltNum: Random.integer(0,20)})
  }
  return result
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