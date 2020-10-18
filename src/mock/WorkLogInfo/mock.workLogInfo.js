/**
 * Created by xiejing on 2018/12/11.
 */
var Random = Mock.Random
const rurl = '/screen/workLogInfo'
const rtype = 'get'
let template = {
  "code": 0,
  "msg": "success",
  "result":[]
}
  
const cb = (e) => {
    
    template.result = [
		{
			"org": "公司领导",
			"name": "罗旭",
			"tel": "13902261967"
		},
		{
			"org": "股份本部",
			"name": "谭庭状",
			"tel": "13926484850"
		},
		{
			"org": "运行控制中心",
			"name": "雷刚",
			"tel": "13902201190"
		}
	]
    return template;
}
export {
    rurl,
    rtype,
    cb
}
