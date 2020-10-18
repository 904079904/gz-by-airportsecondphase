
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
        result:[
        {
            "name": "1",
            "fltNum": 8
        },
        {
            "name": "2",
            "fltNum": 3
        },
        {
            "name": "3",
            "fltNum": 7
        },
        {
            "name": "4",
            "fltNum": 2
        },
        {
            "name": "5",
            "fltNum": 9
        },
        {
            "name": "6",
            "fltNum": 2
        },
        {
            "name": "7",
            "fltNum": 3
        },
        {
            "name": "8",
            "fltNum": 2
        },
        {
            "name": "9",
            "fltNum": 1
        },
        {
            "name": "10",
            "fltNum": 6
        },
        {
            "name": "12",
            "fltNum": 3
        },
        {
            "name": "14",
            "fltNum": 4
        },
        {
            "name": "15",
            "fltNum": 6
        },
        {
            "name": "16",
            "fltNum": 4
        },
        {
            "name": "17",
            "fltNum": 7
        },
        {
            "name": "18",
            "fltNum": 5
        },
        {
            "name": "19",
            "fltNum": 7
        },
        {
            "name": "20",
            "fltNum": 6
        },
        {
            "name": "21",
            "fltNum": 7
        },
        {
            "name": "22",
            "fltNum": 5
        },
        {
            "name": "24",
            "fltNum": 6
        }
    ]
    }
    return template
}

export {
    rurl,
    rtype,
    cb,
}