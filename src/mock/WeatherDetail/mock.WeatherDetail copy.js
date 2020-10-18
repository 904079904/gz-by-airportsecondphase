/**
 * Created by xiejing on 2018/12/11.
 */
var Random = Mock.Random
const rurl = '/screen/weatherDetail'
const rtype = 'get'

//机场三字码对应
let airportCode=[
  //北京首都机场
  {code:"PEK",name:"北京首都机场"},
  //上海浦东机场
  {code:"PVG",name:"上海浦东机场"},
  //成都双流机场
  {code:"CTU",name:"成都双流机场"},
  //深圳宝安国际机场
  {code:"SZX",name:"深圳宝安国际机场"},
  //昆明巫家坝机场
  {code:"KMG",name:"昆明巫家坝机场"},
  //上海虹桥机场
  {code:"SHA",name:"上海虹桥机场"},
  //西安咸阳机场
  {code:"XIY",name:"西安咸阳机场"},
  //重庆江北机场	
  {code:"CKG",name:"重庆江北机场"},
  //杭州萧山机场	
  {code:"HGH",name:"杭州萧山机场"},
  //广州白云机场,
  {code:"CAN",name:"广州白云机场"},
  //乌鲁木齐地窝铺机场
  {code:"URC",name:"乌鲁木齐地窝铺机场"},
  //哈尔滨太平机场
  {code:"HRB",name:"哈尔滨太平机场"},
  //拉萨贡嘎机场
  {code:"LXA",name:"拉萨贡嘎机场"}
]
let weatherArr = [
  '晴天',
  '阵雨',
  '霾',
  '小雨',
  '小雪',
  '雾',
  '中雨'
]
let template = {
  "code": 0,
  "msg": "success",
  "result":[]
}

const cb = (e) => {
    let result = {}
    result.name = airportCode[parseInt(Math.random()*6)].name
    result.type = weatherArr[parseInt(Math.random()*6)]
    result.temp = Random.integer(0, 25) + '度'
    result.visibility = Random.integer(0, 25) + '能见度'
    result.windSpeed = Random.integer(0, 25) + '风速'
    result.windDirection = '东'
    result.windScale = Random.integer(0,25) + '级'
    result.clouds = '云层'

    template.result = result;
    return template;
}
export {
    rurl,
    rtype,
    cb
}
