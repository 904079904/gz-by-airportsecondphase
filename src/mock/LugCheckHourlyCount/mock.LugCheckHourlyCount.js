/* Created by zhangqin on 2019/11/28.*/
const rurl = '/screen/lugCheckHourlyCount';
const rtype = 'get';
let Random = Mock.Random

function createData() {
    let data = [];
    for (var i = 0; i < 12; i++) {
        data.push({
            "hour": (i + 1) * 2 + 'h',
            "amount": Random.integer(0, 800),
        })
    }
    return data
}

const cb = (e) => {
    let template = {
        code: 0,
        msg: 'success',
        result: [{ "amount": "447", "hour": "0" },
        { "amount": "484", "hour": "1" },
        { "amount": "316", "hour": "2" },
        { "amount": "456", "hour": "3" },
        { "amount": "1117", "hour": "4" },
        { "amount": "1750", "hour": "5" },
        { "amount": "148", "hour": "6" },
        { "amount": "0", "hour": "7" },
        { "amount": "0", "hour": "8" },
        { "amount": "0", "hour": "9" },
        { "amount": "0", "hour": "10" },
        { "amount": "0", "hour": "11" },
        { "amount": "0", "hour": "12" },
        { "amount": "0", "hour": "13" },
        { "amount": "0", "hour": "14" },
        { "amount": "0", "hour": "15" },
        { "amount": "0", "hour": "16" },
        { "amount": "0", "hour": "17" },
        { "amount": "0", "hour": "18" },
        { "amount": "0", "hour": "19" },
        { "amount": "0", "hour": "20" },
        { "amount": "0", "hour": "21" },
        { "amount": "0", "hour": "22" },
        { "amount": "0", "hour": "23" }]
    }
    return template
}

export {
    rurl,
    rtype,
    cb,
}