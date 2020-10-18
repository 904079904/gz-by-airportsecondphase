
const rurl = '/screen/fltLargeDelay';
const rtype = 'get';
let Random = Mock.Random

function createData(){
    let levelList = [
        {
            "color": "GREEN",
            "value": "<55"
        },
        {
            "color": "BLUE",
            "value": ">=55"
        },
        {
            "color": "YELLOW",
            "value": ">=80"
        },
        {
            "color": "ORANGE",
            "value": ">=105"
        },
        {
            "color": "RED",
            "value": ">=140"
        }
    ],
    crurrentLevel = levelList[Random.integer(0,4)].color
    return {
		"crurrentLevel": crurrentLevel,
		"levelList": levelList
	}
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