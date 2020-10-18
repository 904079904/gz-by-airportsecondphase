
const rurl = '/screen/boardingGateHourlyCount';
const rtype = 'get';
let Random = Mock.Random

function createData(){
    let arr = [
        {
            "hours": "0",
            "farNum": 0,
            "nearNum": 1
        },
        {
            "hours": "1",
            "farNum": 0,
            "nearNum": 3
        },
        {
            "hours": "2",
            "farNum": 0,
            "nearNum": 6
        },
        {
            "hours": "3",
            "farNum": 0,
            "nearNum": 3
        },
        {
            "hours": "4",
            "farNum": 0,
            "nearNum": 5
        },
        {
            "hours": "5",
            "farNum": 12,
            "nearNum": 8
        },
        {
            "hours": "6",
            "farNum": 10,
            "nearNum": 19
        },
        {
            "hours": "7",
            "farNum": 4,
            "nearNum": 9
        },
        {
            "hours": "8",
            "farNum": 4,
            "nearNum": 14
        },
        {
            "hours": "9",
            "farNum": 3,
            "nearNum": 11
        },
        {
            "hours": "10",
            "farNum": 1,
            "nearNum": 17
        },
        {
            "hours": "11",
            "farNum": 0,
            "nearNum": 9
        },
        {
            "hours": "12",
            "farNum": 0,
            "nearNum": 0
        },
        {
            "hours": "13",
            "farNum": 0,
            "nearNum": 0
        },
        {
            "hours": "14",
            "farNum": 0,
            "nearNum": 0
        },
        {
            "hours": "15",
            "farNum": 0,
            "nearNum": 0
        },
        {
            "hours": "16",
            "farNum": 0,
            "nearNum": 0
        },
        {
            "hours": "17",
            "farNum": 0,
            "nearNum": 0
        },
        {
            "hours": "18",
            "farNum": 0,
            "nearNum": 0
        },
        {
            "hours": "19",
            "farNum": 0,
            "nearNum": 0
        },
        {
            "hours": "20",
            "farNum": 0,
            "nearNum": 0
        },
        {
            "hours": "21",
            "farNum": 0,
            "nearNum": 0
        },
        {
            "hours": "22",
            "farNum": 0,
            "nearNum": 0
        },
        {
            "hours": "23",
            "farNum": 0,
            "nearNum": 0
        }
    ]
    return arr;
}

const cb = (e) => {
    let template = {
        code: 0,
        msg: 'success',
        result: createData()
    }
    return template
}

export {
    rurl,
    rtype,
    cb,
}