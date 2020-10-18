
const rurl = '/screen/fltLargeDelay';
const rtype = 'get';
let Random = Mock.Random


const cb = (e) => {
  
    return {
        "code": 0,
        "msg": "调用成功!",
        "result": {
          "crurrentLevel": "YELLOW",
          "levelList": [
            {
              "color": "GREEN",
              "value": "<55"
            },
            {
              "color": "BLUE",
              "value": ">=55"
            },
            {
              "color": "YELLOW",
              "value": ">=80"
            },
            {
              "color": "ORANGE",
              "value": ">=105"
            },
            {
              "color": "RED",
              "value": ">=140"
            }
          ]
        }
      }
}

export {
    rurl,
    rtype,
    cb,
}