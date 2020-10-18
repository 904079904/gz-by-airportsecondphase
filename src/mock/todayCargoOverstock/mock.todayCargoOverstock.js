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
    msg: "调用成功!",
    result: [
      { hour: "0", internal: 13, international: 16 },
      { hour: "1", internal: 16, international: 18 },
      { hour: "2", internal: 13, international: 23 },
      { hour: "3", internal: 21, international: 13 },
      { hour: "4", internal: 16, international: 19 },
      { hour: "5", internal: 25, international: 32 },
      { hour: "6", internal: 15, international: 23 },
      { hour: "7", internal: 32, international: 19 },
      { hour: "8", internal: 11, international: 16 },
      { hour: "9", internal: 32, international: 11 },
      { hour: "10", internal: 15, international: 12 },
      { hour: "11", internal: 14, international: 21 },
      { hour: "12", internal: 12, international: 16 },
      { hour: "13", internal: 19, international: 25 }
    ]
  };
  return template;
};
export { rurl, rtype, cb };
