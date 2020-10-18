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
    return '0';
} 
function createData(str){
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
    let T2NameArr=[
        {
            id: "CM201",
            name:'CD岛',
            status:randomStatus()
          },
          {
            id: "CM202",
            name:'DE岛',
            status:randomStatus()
          },
          {
            id: "CM203",
            name:'EF岛',
            status:randomStatus()
          },
          {
            id: "CM204",
            name:'FG岛',
            status:randomStatus()
          },
          {
            id: "CM205",
            name:'GH岛',
            status:randomStatus()
          },
          {
            id: "CM206",
            name:'HJ岛',
            status:randomStatus()
          },
          {
            id: "CM251",
            name:'KL岛',
            status:randomStatus()
          },
          {
            id: "CM252",
            name:'LM岛',
            status:randomStatus()
          },
          {
            id: "CM253",
            name:'MN岛',
            status:randomStatus()
          },
          {
            id: "CM254",
            name:'NP岛',
            status:randomStatus()
          },
          {
            id: "CM255",
            name:'PQ岛',
            status:randomStatus()
          }
    ]
    return str === 'T1' ? nameArr : T2NameArr;
}

const cb = (e) => {
    let str = e.url.match(/checkMachineStatus\/(\S*)/)[1];
    
    let template = {
        code: 0,
        msg: 'success',
        result: createData(str)
    }
    return template
}

export {
    rurl,
    rtype,
    cb,
}