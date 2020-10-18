/**
 * Created by xiejing on 2018/12/11.
 */
var Random = Mock.Random;
const rurl = "/screen/todayCargoOverstock";
const rtype = "get";

function createResult() {
  let result = [];
  for (let i = 0; i < 12; i++) {
    result.push({
      hour: i + ":00",
      internal: Random.integer(100, 300),
      international: Random.integer(100, 300)
    });
  }
  return result;
}

const cb = e => {
  let template = {
    code: 0,
    msg: "success",
    result: createResult()
  };
  return template;
};
export { rurl, rtype, cb };
