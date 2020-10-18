
const rurl = '/sys/login';
const rtype = 'post';
let Random = Mock.Random

const cb = (e) => {
    let template = {
        code: 200,
        msg: 'success',
        "result": {
            "userInfo": {
                "id": "68a9bcf8ef605d1dfee2a2cec56c6425",
                "username": "haiyun",
                "realname": "海云测试",
                "password": "f7118fb6d576b5fb",
                "salt": "d35BLULf",
                "avatar": null,
                "birthday": null,
                "sex": null,
                "email": null,
                "phone": null,
                "status": 1,
                "delFlag": "0",
                "createBy": null,
                "createTime": "2019-11-05 09:41:38",
                "updateBy": null,
                "updateTime": null,
                "type": 0
            },
            "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NzI5MzUxNjgsInVzZXJuYW1lIjoiaGFpeXVuIn0.C97XxnNhdvkEh2Z78zCG5-H0Wfs9nf1dTh26wSBDcQg"
        },
    }
    return template
}

export {
    rurl,
    rtype,
    cb,
}