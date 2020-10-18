/**
 * Created by xiejing on 2018/12/11.
 */
var Random = Mock.Random
const rurl = '/screen/warnLevel'
const rtype = 'get'

function randomStatus() {
    let a=Mock.mock({
        "array|1": [
            {
                level:0,
                text:'正常'
            },
            {
                level:1,
                text:'一般'
            },
            {
                level:2,
                text:'较重'
            },
            {
                level:3,
                text:'严重'
            },
            {
                level:4,
                text:'特别严重'
            }
        ]
      })
    return a.array;
} 
let template = {
  "code": 0,
  "msg": "success",
  "result":{}
}
  
const cb = (e) => {
    
    template.result = randomStatus()
    return template;
}
export {
    rurl,
    rtype,
    cb
}
