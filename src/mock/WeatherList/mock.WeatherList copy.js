/**
 * Created by xiejing on 2018/12/11.
 */
var Random = Mock.Random
const rurl = '/screen/weatherList'
const rtype = 'get'
let weatherArr = [
    '晴天',
    '阵雨',
    '霾',
    '小雨',
    '小雪',
    '雾',
    '中雨'
]
let airportJson =[{
                      airport:'PEK',
                      name: '北京首都国际机场',
                      icon: weatherArr[Random.integer(0, 6)],
                      local: [116.609564,40.083812]
                },
                {
                      airport:'PVG',
                      name: '上海浦东国际机场',
                      icon: weatherArr[Random.integer(0, 6)],
                      local: [121.81509,31.157478]
                },
                {
                      airport:'CAN',
                      name: '广州白云国际机场',
                      icon: weatherArr[Random.integer(0, 6)],
                      local: [113.309723,23.392866]
                },
                {
                      airport:'CTU',
                      name: '成都双流国际机场',
                      icon: weatherArr[Random.integer(0, 6)],
                      local: [103.958189,30.565774]
                },
                {
                      airport:'SZX',
                      name: '深圳宝安国际机场',
                      icon: weatherArr[Random.integer(0, 6)],
                      local: [113.821705,22.638172]
                },
                {
                      airport:'KMG',
                      name: '昆明巫家坝机场',
                      icon: weatherArr[Random.integer(0, 6)],
                      local: [102.935615,25.102871]
                },
                {
                      airport:'SHA',
                      name: '上海虹桥国际机场',
                      icon: weatherArr[Random.integer(0, 6)],
                      local: [121.346817,31.203347]
                },
                {
                      airport:'XIY',
                      name: '西安咸阳国际机场',
                      icon: weatherArr[Random.integer(0, 6)],
                      local: [108.768576,34.442079]
                },
                {
                      airport:'CKG',
                      name: '重庆江北国际机场',
                      icon: weatherArr[Random.integer(0, 6)],
                      local: [106.645226,29.723155]
                },
                {
                      airport:'HGH',
                      name: '杭州萧山国际机场',
                      icon: weatherArr[Random.integer(0, 6)],
                      local: [120.443341,30.240638]
                },
                {
                      airport:'URC',
                      name: '乌鲁木齐地窝堡国际机场',
                      icon: weatherArr[Random.integer(0, 6)],
                      local: [87.487028,43.912386]
                },
                {
                      airport:'LXA',
                      name: '拉萨贡嘎国际机场',
                      icon: weatherArr[Random.integer(0, 6)],
                      local: [90.918706,29.299495]
                },
                {
                      airport:'HRB',
                      name: '哈尔滨太平国际机场',
                      icon: weatherArr[Random.integer(0, 6)],
                      local: [126.259545,45.633583]
                }
                ]

let weatherCommom = [{
                        airport:Random.word(5),
                        name: '西宁曹家堡国际机场',
                        icon: weatherArr[Random.integer(0, 6)],
                        local: [102.046712,36.53521]
                  },{
                        airport:Random.word(5),
                        name: '贵阳龙洞堡国际机场',
                        icon: weatherArr[Random.integer(0, 6)],
                        local: [106.807162,26.549112]
                  },{
                        airport:Random.word(5),
                        name: '西安咸阳国际机场',
                        icon: weatherArr[Random.integer(0, 6)],
                        local: [108.768576,34.442079]
                  }
                  ]

let template = {
  "code": 0,
  "msg": "success",
  "result": createResult()
}


function createResult() {
  let result = {}
  result.weatherCommom = weatherCommom;
  result.weatherTop = airportJson;
  return result
}


const cb = (e) => {
    return template
}
export {
    rurl,
    rtype,
    cb
}
