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
let airportJson =[
      {
          "name": "北京首都",
          "icon": "晴",
          "local": [
              116.4551,
              40.2539
          ],
          "airport": "PEK"
      },
      {
          "name": "上海浦东",
          "icon": "霾",
          "local": [
              121.815005,
              31.157206
          ],
          "airport": "PVG"
      },
      {
          "name": "广州",
          "icon": "晴",
          "local": [
              113.5107,
              23.2196
          ],
          "airport": "CAN"
      },
      {
          "name": "成都",
          "icon": "雾",
          "local": [
              103.9526,
              30.7617
          ],
          "airport": "CTU"
      },
      {
          "name": "昆明",
          "icon": "",
          "local": [
              102.9199,
              25.4663
          ],
          "airport": "KMG"
      },
      {
          "name": "深圳",
          "icon": "",
          "local": [
              114.5435,
              22.5439
          ],
          "airport": "SZX"
      },
      {
          "name": "上海虹桥",
          "icon": "晴",
          "local": [
              121.4648,
              31.2891
          ],
          "airport": "SHA"
      },
      {
          "name": "西安",
          "icon": "霾",
          "local": [
              109.1162,
              34.2004
          ],
          "airport": "XIY"
      },
      {
          "name": "重庆江北",
          "icon": "雾",
          "local": [
              107.7539,
              30.1904
          ],
          "airport": "CKG"
      },
      {
          "name": "杭州",
          "icon": "",
          "local": [
              119.5313,
              29.8773
          ],
          "airport": "HGH"
      }
  ]

let weatherCommom = [
    {
        "name": "珠海",
        "icon": "雾",
        "local": [
            113.381443,
            22.015618
        ],
        "airport": "ZUH"
    },
    {
        "name": "柳州",
        "icon": "",
        "local": [
            109.3799,
            24.9774
        ],
        "airport": "LZH"
    },
    {
        "name": "舟山",
        "icon": "",
        "local": [
            122.367943,
            29.938305
        ],
        "airport": "HSN"
    },
    {
        "name": "且末",
        "icon": "",
        "local": [
            85.475318,
            38.240302
        ],
        "airport": "IQM"
    },
    {
        "name": "和田",
        "icon": "",
        "local": [
            79.881159,
            37.046509
        ],
        "airport": "HTN"
    },
    {
        "name": "伊宁",
        "icon": "",
        "local": [
            81.341282,
            43.960274
        ],
        "airport": "YIN"
    },
    {
        "name": "长春",
        "icon": "",
        "local": [
            125.8154,
            44.2584
        ],
        "airport": "CGQ"
    },
    {
        "name": "银川",
        "icon": "",
        "local": [
            106.3586,
            38.1775
        ],
        "airport": "INC"
    },
    {
        "name": "厦门",
        "icon": "",
        "local": [
            118.1689,
            24.6478
        ],
        "airport": "XMN"
    },
    {
        "name": "常州",
        "icon": "晴",
        "local": [
            119.4543,
            31.5582
        ],
        "airport": "CZX"
    },
    {
        "name": "南昌",
        "icon": "雾",
        "local": [
            116.0046,
            28.6633
        ],
        "airport": "KHN"
    },
    {
        "name": "济南",
        "icon": "雾",
        "local": [
            117.1582,
            36.8701
        ],
        "airport": "TNA"
    },
    {
        "name": "衢州",
        "icon": "",
        "local": [
            118.6853,
            28.8666
        ],
        "airport": "JUZ"
    },
    {
        "name": "连云港",
        "icon": "",
        "local": [
            119.1248,
            34.552
        ],
        "airport": "LYG"
    },
    {
        "name": "临沂",
        "icon": "晴",
        "local": [
            118.3118,
            35.2936
        ],
        "airport": "LYI"
    },
    {
        "name": "宁波",
        "icon": "雾",
        "local": [
            121.5967,
            29.6466
        ],
        "airport": "NGB"
    },
    {
        "name": "南京",
        "icon": "雾",
        "local": [
            118.8062,
            31.9208
        ],
        "airport": "NKG"
    },
    {
        "name": "南通",
        "icon": "",
        "local": [
            121.1023,
            32.1625
        ],
        "airport": "NTG"
    },
    {
        "name": "合肥",
        "icon": "霾",
        "local": [
            117.29,
            32.0581
        ],
        "airport": "HFE"
    },
    {
        "name": "大连",
        "icon": "",
        "local": [
            122.2229,
            39.4409
        ],
        "airport": "DLC"
    },
    {
        "name": "盐城",
        "icon": "",
        "local": [
            120.2234,
            33.5577
        ],
        "airport": "YNZ"
    },
    {
        "name": "天津",
        "icon": "",
        "local": [
            117.4219,
            39.4189
        ],
        "airport": "TSN"
    },
    {
        "name": "北海",
        "icon": "",
        "local": [
            109.314,
            21.6211
        ],
        "airport": "BHY"
    },
    {
        "name": "惠州",
        "icon": "",
        "local": [
            114.6204,
            23.1647
        ],
        "airport": "HUZ"
    },
    {
        "name": "日照",
        "icon": "",
        "local": [
            119.2786,
            35.5023
        ],
        "airport": "RIZ"
    },
    {
        "name": "梅州",
        "icon": "",
        "local": [
            116.109856,
            24.266118
        ],
        "airport": "MXZ"
    },
    {
        "name": "南宁",
        "icon": "",
        "local": [
            108.479,
            23.1152
        ],
        "airport": "NNG"
    },
    {
        "name": "揭阳",
        "icon": "",
        "local": [
            116.518924,
            23.554713
        ],
        "airport": "SWA"
    },
    {
        "name": "三亚",
        "icon": "",
        "local": [
            109.4211,
            18.3121
        ],
        "airport": "SYX"
    },
    {
        "name": "海口",
        "icon": "",
        "local": [
            110.3893,
            19.8516
        ],
        "airport": "HAK"
    },
    {
        "name": "贵阳",
        "icon": "",
        "local": [
            106.6992,
            26.7682
        ],
        "airport": "KWE"
    },
    {
        "name": "拉萨",
        "icon": "阵雨",
        "local": [
            91.1865,
            30.1465
        ],
        "airport": "LXA"
    },
    {
        "name": "库尔勒",
        "icon": "尘",
        "local": [
            86.149627,
            41.629056
        ],
        "airport": "KRL"
    },
    {
        "name": "乌鲁木齐",
        "icon": "晴",
        "local": [
            87.481597,
            43.907518
        ],
        "airport": "URC"
    },
    {
        "name": "丹东",
        "icon": "",
        "local": [
            124.541,
            40.4242
        ],
        "airport": "DDG"
    },
    {
        "name": "哈尔滨",
        "icon": "",
        "local": [
            127.9688,
            45.368
        ],
        "airport": "HRB"
    },
    {
        "name": "武汉",
        "icon": "",
        "local": [
            114.3896,
            30.6628
        ],
        "airport": "WUH"
    },
    {
        "name": "邢台",
        "icon": "",
        "local": [
            114.8071,
            37.2821
        ],
        "airport": "XNT"
    },
    {
        "name": "太原",
        "icon": "霾",
        "local": [
            112.3352,
            37.9413
        ],
        "airport": "TYN"
    },
    {
        "name": "佛山",
        "icon": "",
        "local": [
            112.8955,
            23.1097
        ],
        "airport": "FUO"
    },
    {
        "name": "长沙",
        "icon": "",
        "local": [
            113.226467,
            28.192209
        ],
        "airport": "HHA"
    },
    {
        "name": "张家口",
        "icon": "",
        "local": [
            115.1477,
            40.8527
        ],
        "airport": "ZQZ"
    },
    {
        "name": "福州",
        "icon": "",
        "local": [
            119.4543,
            25.9222
        ],
        "airport": "FOC"
    },
    {
        "name": "济宁",
        "icon": "晴",
        "local": [
            116.8286,
            35.3375
        ],
        "airport": "JNG"
    },
    {
        "name": "兰州",
        "icon": "",
        "local": [
            103.5901,
            36.3043
        ],
        "airport": "LHW"
    },
    {
        "name": "沈阳",
        "icon": "晴",
        "local": [
            123.1238,
            42.1216
        ],
        "airport": "SHE"
    },
    {
        "name": "腾冲",
        "icon": "",
        "local": [
            98.489417,
            24.9427
        ],
        "airport": "TCZ"
    },
    {
        "name": "西宁",
        "icon": "",
        "local": [
            101.4038,
            36.8207
        ],
        "airport": "XNN"
    },
    {
        "name": "徐州",
        "icon": "晴",
        "local": [
            117.5208,
            34.3268
        ],
        "airport": "XUZ"
    },
    {
        "name": "延安",
        "icon": "晴",
        "local": [
            109.1052,
            36.4252
        ],
        "airport": "ENY"
    },
    {
        "name": "义乌",
        "icon": "",
        "local": [
            120.037568,
            29.347097
        ],
        "airport": "YIW"
    },
    {
        "name": "郑州",
        "icon": "",
        "local": [
            113.4668,
            34.6234
        ],
        "airport": "CGO"
    },
    {
        "name": "库车",
        "icon": "",
        "local": [
            82.883018,
            41.689649
        ],
        "airport": "KCA"
    },
    {
        "name": "富蕴",
        "icon": "",
        "local": [
            89.531811,
            46.848081
        ],
        "airport": "FYN"
    },
    {
        "name": "克拉玛依",
        "icon": "阵雨",
        "local": [
            84.966297,
            45.474841
        ],
        "airport": "KRY"
    },
    {
        "name": "喀什",
        "icon": "晴",
        "local": [
            76.020684,
            39.542555
        ],
        "airport": "KHG"
    },
    {
        "name": "遵义新舟",
        "icon": "",
        "local": [
            107.260641,
            27.806033
        ],
        "airport": "ZYI"
    },
    {
        "name": "青岛",
        "icon": "晴",
        "local": [
            120.4651,
            36.3373
        ],
        "airport": "TAO"
    },
    {
        "name": "泉州",
        "icon": "",
        "local": [
            118.3228,
            25.1147
        ],
        "airport": "JJN"
    },
    {
        "name": "潍坊",
        "icon": "晴",
        "local": [
            119.0918,
            36.524
        ],
        "airport": "WEF"
    },
    {
        "name": "温州",
        "icon": "",
        "local": [
            120.498,
            27.8119
        ],
        "airport": "WNZ"
    },
    {
        "name": "烟台",
        "icon": "",
        "local": [
            120.7397,
            37.5128
        ],
        "airport": "YNT"
    },
    {
        "name": "长治",
        "icon": "霾",
        "local": [
            112.8625,
            36.4746
        ],
        "airport": "CIH"
    },
    {
        "name": "呼和浩特",
        "icon": "晴",
        "local": [
            111.4124,
            40.4901
        ],
        "airport": "HET"
    },
    {
        "name": "包头",
        "icon": "",
        "local": [
            110.3467,
            41.4899
        ],
        "airport": "BAV"
    },
    {
        "name": "石家庄",
        "icon": "",
        "local": [
            114.4995,
            38.1006
        ],
        "airport": "SJW"
    },
    {
        "name": "威海",
        "icon": "",
        "local": [
            121.9482,
            37.1393
        ],
        "airport": "WEH"
    },
    {
        "name": "无锡",
        "icon": "",
        "local": [
            120.3442,
            31.5527
        ],
        "airport": "WUX"
    },
    {
        "name": "桂林",
        "icon": "雾",
        "local": [
            110.058427,
            25.222376
        ],
        "airport": "KWL"
    },
    {
        "name": "丽江",
        "icon": "",
        "local": [
            100.256567,
            26.67518
        ],
        "airport": "LJG"
    },
    {
        "name": "邯郸",
        "icon": "霾",
        "local": [
            114.4775,
            36.535
        ],
        "airport": "HDG"
    },
    {
        "name": "唐山",
        "icon": "晴",
        "local": [
            118.4766,
            39.6826
        ],
        "airport": "TVS"
    },
    {
        "name": "扬州",
        "icon": "",
        "local": [
            119.4653,
            32.8162
        ],
        "airport": "YTY"
    },
    {
        "name": "塔城",
        "icon": "",
        "local": [
            83.352741,
            46.678306
        ],
        "airport": "TCG"
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
