/**
 * Created by xiaohe on 2018/8/5.
 */
var _ = require('lodash');
const project = require('../config/project.config.js');
/*真实地址集合*/
let realAddress = [];
switch (_.isArray(project.realUrl)) {
    case true:
        if (project.realUrl.length <= 0) {
            console.warn('project.realUrl数组长度为0')
            break;
        }
        realAddress = project.realUrl.map((i, j) => {
            if (!_.isObject(i)) {
                console.warn(`project.realUrl中第${j + 1}个，应为object类型`)
                return
            }
            let url = `${i.protocol}://${i.url}:${i.port}${i.path}`;
            return {
                name: i.name,
                url: url
            };
        })
        break;
    default:
        console.warn('project.realUrl不是数组')
        break;
}


console.log(`"%c真实接口地址:"`, "color:red;font-weight:bold")
console.table(realAddress)
module.exports = realAddress

