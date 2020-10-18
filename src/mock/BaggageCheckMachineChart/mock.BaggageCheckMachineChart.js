//行李安检机模块  各安检机实时运行状态mock

const rurl = '/screen/checkMachineStatus';
const rtype = 'get';
let Random = Mock.Random
function randomStatus() {
    let a=Mock.mock({
        "array|1": [
          "0",
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7"
        ]
      })
    return a.array;
} 
function createData(){
    let nameArr = [
        {
            "id":'HB2-1',
            "name":'G岛',
            "status":randomStatus()
        },
        {
            "id":'HB2-10',
            "name":'M岛',
            "status":randomStatus()
        },
        {
            "id":'HB2-11',
            "name":'Q岛',
            "status":randomStatus()
        },
        {
            "id":'HB2-12',
            "name":'N岛',
            "status":randomStatus()
        },
        {
            "id":'HB2-2',
            "name":'H岛',
            "status":randomStatus()
        },
        {
            "id":'HB2-3',
            "name":'F岛',
            "status":randomStatus()
        },
        {
            "id":'HB2-4',
            "name":'J岛',
            "status":randomStatus()
        },
        {
            "id":'HB2-5',
            "name":'E岛',
            "status":randomStatus()
        },
        {
            "id":'HB2-6',
            "name":'K岛',
            "status":randomStatus()
        },
        {
            "id":'HB2-7',
            "name":'D岛',
            "status":randomStatus()
        },
        {
            "id":'HB2-8',
            "name":'L岛',
            "status":randomStatus()
        },
        {
            "id":'HB2-9',
            "name":'C岛',
            "status":randomStatus()
        },
    ]
    return nameArr;
}

const cb = (e) => {
    let template = {
        code: 0,
        msg: 'success',
        result: [
            {
                "name": "G岛",
                "id": "HB2-1",
                "status": "1"
            },
            {
                "name": "M岛",
                "id": "HB2-10",
                "status": "0"
            },
            {
                "name": "Q岛",
                "id": "HB2-11",
                "status": "0"
            },
            {
                "name": "N岛",
                "id": "HB2-12",
                "status": "1"
            },
            {
                "name": "H岛",
                "id": "HB2-2",
                "status": "1"
            },
            {
                "name": "F岛",
                "id": "HB2-3",
                "status": "0"
            },
            {
                "name": "J岛",
                "id": "HB2-4",
                "status": "1"
            },
            {
                "name": "E岛",
                "id": "HB2-5",
                "status": "0"
            },
            {
                "name": "K岛",
                "id": "HB2-6",
                "status": "3"
            },
            {
                "name": "D岛",
                "id": "HB2-7",
                "status": "0"
            },
            {
                "name": "L岛",
                "id": "HB2-8",
                "status": "1"
            },
            {
                "name": "C岛",
                "id": "HB2-9",
                "status": "0"
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