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
  return {
    "hours": ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"],
    "data": [{
        "name": "01",
        "sorties": [23, 16, 23, 16, 23, 18, 25, 20, 30, 33, 33, 31, 34, 35, 24, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }, {
        "name": "02L",
        "sorties": [7, 5, 0, 0, 0, 0, 12, 21, 17, 19, 21, 25, 18, 21, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }, {
        "name": "02R",
        "sorties": [16, 8, 0, 0, 0, 5, 2, 11, 17, 17, 10, 17, 19, 22, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }]
};
}

const cb = (e) => {
    return template
}
export {
    rurl,
    rtype,
    cb
}
