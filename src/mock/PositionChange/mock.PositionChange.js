
/**
 * Created by wanjikun on 2019/10/21.
 */
var Random = Mock.Random;
const rurl = '/screen/positionChange';
const rtype = 'get';

function createDate() {
  let result = []
  for(let i = 0; i < Random.integer(1, 1); i++) {
    result.push(
      {
        "before": "509",
        "changeAir": "B8870",
        "willFly": "",
        "arrivePort": "CZ322",
        "time": "2019-11-19 09:12",
        "after": "169",
        "leavePort": "",
        "realArrive": "11-19 05:49",
        "msgId": Random.integer(0, 20) + ''
      }
    )
  }
  return result
}

const cb = (e) => {
    return {
        "code": 0,
        "msg": "调用成功!",
        "result": createDate()
      }
}
export {
    rurl,
    rtype,
    cb
};
