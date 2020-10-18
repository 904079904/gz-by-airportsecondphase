//货运情况—货运分析 mock
const rurl = '/screen/todayCargoAnalyze';
const rtype = 'get';
let Random = Mock.Random

function createData(){
    let areaArr=['东南亚','南美洲','欧洲','大洋洲','中西亚','南亚','北美洲','东北亚','其他'];
    let len =  Random.integer(8,9);
    let allArea=[];
    let total = 0;
    for (let i = 0; i < len; i++) {
        let num = Random.integer(50,500)
        allArea.push({
            area:areaArr[i],
            num:num
        })
        total += num        
    }
    let obj={
        internal:{
            total:Random.integer(50, 5000),
            allArea:[]
        },
        international:{
            total:total,
            allArea:allArea
        }
    }
    return obj;
}

const cb = (e) => {
    let template = {
        code: 0,
        msg: 'success',
        result: {
            "internal": {
                "total": 60,
                "allArea": [
                    {
                        "area": "华北",
                        "num": 15
                    },
                    {
                        "area": "东北",
                        "num": 13
                    },
                    {
                        "area": "华东",
                        "num": 12
                    },
                    {
                        "area": "中南",
                        "num": 23
                    },
                    {
                        "area": "西南",
                        "num": 19
                    },
                    {
                        "area": "西北",
                        "num": 27
                    },
                    {
                        "area": "新疆",
                        "num": 15
                    }
                ]
            },
            "international": {
                "total": 40,
                "allArea": [
                    {
                        "area": "东南亚",
                        "num": 37
                    },
                    {
                        "area": "南美洲",
                        "num": 20
                    },
                    {
                        "area": "欧洲",
                        "num": 15
                    },
                    {
                        "area": "大洋洲",
                        "num": 10
                    },
                    {
                        "area": "中西亚",
                        "num": 5
                    },
                    {
                        "area": "南亚",
                        "num": 5
                    },
                    {
                        "area": "北美洲",
                        "num": 4
                    },
                    {
                        "area": "东北亚",
                        "num": 3
                    },
                    {
                        "area": "其他",
                        "num": 1
                    }
                ]
            }
        }
    }
    return template
}

export {
    rurl,
    rtype,
    cb,
}