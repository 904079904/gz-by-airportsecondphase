
/**
 * Created by wanjikun on 2019/10/21.
 */
var Random = Mock.Random;
const rurl = '/screen/positionAirlineByBridgeRate';
const rtype = 'get';

let template = {
    "code": 0,
    "msg": "调用TestMockGet接口成功！",
    "result": []
}
const cb = (e) => {
    template.result = [
        {
          "rate":100.00,
          "airline":"3U"
        },{
          "rate":88.24,
          "airline":"9C"
        },{
          "rate":50.00,
          "airline":"AQ"
        },{
          "rate":100.00,
          "airline":"CA"
        },{
          "rate":77.93,
          "airline":"CZ"
        },{
          "rate":83.33,
          "airline":"FM"
        },{
          "rate":88.37,
          "airline":"HU"
        },{
          "rate":72.73,
          "airline":"JD"
        },{
          "rate":88.24,
          "airline":"MU"
        },{
          "rate":76.60,
          "airline":"ZH"
        }
      ];
    
    return template;
}
export {
    rurl,
    rtype,
    cb
};
