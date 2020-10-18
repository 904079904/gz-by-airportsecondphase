/* Create by zhangqin on 2019/10/29 */
import axiosToken from "js/axiosToken";

import './FreePlanPosition.scss'
import {FreePlanPositionBar,TitleCom} from 'com/index';
export default class FreePlanPosition extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: [],
            used: [],
            free: [],
            maxNumber: null
        }
        this.getData = this.getData.bind(this);
    }
    componentDidMount(){
        this.getData();
        this.reloadID = setInterval(() => {
            this.getData();
        }, globalTimer.positionUsedInfo);
    }
    componentWillUnmount(){
        clearInterval(this.reloadID);
    }
    getData(){
        axiosToken({
            method: 'get',
            url: realAddressUrlOne + '/screen/positionUsedInfo',
        }).then((res) => {
            if(res.data.code === 0){
                let result = res.data.result,name = [],used = [], free = [],allNumber = [];
                for(var i in result){
                    name.push(result[i].name);
                    used.push(-result[i].used);
                    free.push(result[i].free);
                    allNumber.push(result[i].used,result[i].free)
                }
                allNumber.sort(function(a, b){return b - a});//倒序
                this.setState({
                    name: name,
                    used: used,
                    free: free,
                    maxNumber: allNumber[0]
                })
            }
        });
    }

    render(){
        let {name,used,free,maxNumber} = this.state;
        let barData = {name,used,free}
        return(
            <div className="FreePlanPosition">
                <TitleCom title="机位空闲情况实时分析"></TitleCom>
                <div className="FreePlanPositionCont">
                    <FreePlanPositionBar barData={barData} maxNumber={maxNumber}/>
                </div>
            </div>
        )
    }
}