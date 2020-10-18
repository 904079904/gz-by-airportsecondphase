// 行李转盘使用数量小时分布
const rurl = '/screen/lugFetchHourlyInternalCount';
const rtype = 'get';
let Random = Mock.Random

function createData(){
    let arr = [];
    for (let i = 0; i < 24; i++) {
        arr.push({
            hours:i,
            internal:Random.integer(0, 30),
            international:Random.integer(0, 30),
        })
        
    }
    return arr;
}

const cb = (e) => {
    let template = {
        code: 0,
        msg: 'success',
        result: [
            {
                "hours": "0",
                "internal": 13,
                "international": 3
            },
            {
                "hours": "1",
                "internal": 18,
                "international": 5
            },
            {
                "hours": "2",
                "internal": 12,
                "international": 4
            },
            {
                "hours": "3",
                "internal": 0,
                "international": 7
            },
            {
                "hours": "4",
                "internal": 0,
                "international": 6
            },
            {
                "hours": "5",
                "internal": 0,
                "international": 3
            },
            {
                "hours": "6",
                "internal": 0,
                "international": 1
            },
            {
                "hours": "7",
                "internal": 1,
                "international": 0
            },
            {
                "hours": "8",
                "internal": 6,
                "international": 0
            },
            {
                "hours": "9",
                "internal": 13,
                "international": 3
            },
            {
                "hours": "10",
                "internal": 18,
                "international": 2
            },
            {
                "hours": "11",
                "internal": 6,
                "international": 0
            },
            {
                "hours": "12",
                "internal": 0,
                "international": 0
            },
            {
                "hours": "13",
                "internal": 0,
                "international": 0
            },
            {
                "hours": "14",
                "internal": 0,
                "international": 0
            },
            {
                "hours": "15",
                "internal": 0,
                "international": 0
            },
            {
                "hours": "16",
                "internal": 0,
                "international": 0
            },
            {
                "hours": "17",
                "internal": 0,
                "international": 0
            },
            {
                "hours": "18",
                "internal": 0,
                "international": 0
            },
            {
                "hours": "19",
                "internal": 0,
                "international": 0
            },
            {
                "hours": "20",
                "internal": 0,
                "international": 0
            },
            {
                "hours": "21",
                "internal": 0,
                "international": 0
            },
            {
                "hours": "22",
                "internal": 0,
                "international": 0
            },
            {
                "hours": "23",
                "internal": 0,
                "international": 0
            }
        ]
    }
    return template
}

export {
    rurl,
    rtype,
    cb,
}