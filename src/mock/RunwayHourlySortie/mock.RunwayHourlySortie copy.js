/**
 * Created by xiejing on 2018/12/11.
 */
var Random = Mock.Random
const rurl = '/screen/runwayHourlySortie'
const rtype = 'get'


let template = {
  "code": 0,
  "msg": "success",
  "result": createResult()
}


function createResult() {
  let arr = [];
  let hours = [];
  for(let i = 0; i < 24; i++) {
    hours.push(i);
  }
  let nameArr = ['01','02L','02R'];
  for (let j = 0; j < 3; j++) {
    let sorties = [];
    for (let n = 0; n < 24; n++) {
      sorties.push(Random.integer(0, 50))
    }
    arr.push({
      name:nameArr[j],
      sorties:sorties
    })
  }
  let data = {
    hours:hours,
    data:arr
  }
  return data;
}

const cb = (e) => {
    return template
}
export {
    rurl,
    rtype,
    cb
}
