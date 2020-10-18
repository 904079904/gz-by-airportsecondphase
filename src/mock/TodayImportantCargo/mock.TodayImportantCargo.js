/* Create by zhangqin on 2019/11/29 */
var Random = Mock.Random;
const rurl = '/screen/todayImportantCargo';
const rtype = 'get';

let template = {
    "code": 0,
    "msg": "调用TestMockGet接口成功！",
    "result": [{ "type": "管制类", "internal": 146, "international": 86 },
    { "type": "危险品", "internal": 192, "international": 150 },
    { "type": "货物类", "internal": 158, "international": 98 },
    { "type": "菌种类", "internal": 162, "international": 126 },
    { "type": "普通类", "internal": 146, "international": 75 },
    { "type": "生鲜", "internal": 182, "international": 62 },
    { "type": "其他", "internal": 162, "international": 118 }]
}
const cb = (e) => {

    return template;
}
export {
    rurl,
    rtype,
    cb
};