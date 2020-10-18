/**
 * Created by xiejing on 2018/12/11.
 */
var Random = Mock.Random;
const rurl = "/screen/psgEnterOutTotalNum";
const rtype = "get";

function createResult() {
  let result = {
    total: Random.integer(1000, 15000),
    enter: {
      futureTwoHourAmount: {
        internal: Random.integer(1000, 1500),
        international: Random.integer(1000, 1500)
      },
      todayAmount: {
        internal: Random.integer(1000, 1500),
        international: Random.integer(1000, 1500)
      },
      lastTwoHourAmount: {
        internal: Random.integer(1000, 1500),
        international: Random.integer(1000, 1500)
      }
    },
    out: {
      futureTwoHourAmount: {
        internal: Random.integer(1000, 1500),
        international: Random.integer(1000, 1500)
      },
      todayAmount: {
        internal: Random.integer(1000, 1500),
        international: Random.integer(1000, 1500)
      },
      lastTwoHourAmount: {
        internal: Random.integer(1000, 1500),
        international: Random.integer(1000, 1500)
      }
    }
  };
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
