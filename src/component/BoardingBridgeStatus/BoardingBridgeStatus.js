/**
 Crate by wanjikun on 19/11/28.
*/
import axiosToken from "js/axiosToken";

import { TitleCom ,RunStatusPieChart} from "com/index";
import './BoardingBridgeStatus.scss'
export default class BoardingBridgeStatus extends Component{
 constructor(props) {
   super(props);
   this.state={
     seriesData:[],
     seriesColors:['#F9FF45','#008CFE','#BDCCD4'],
   }
 }

 componentDidMount() {
    this.getData(this.props.terminal);
    this.setTimer();
 }

 componentWillReceiveProps(nextProps){
     let {terminal} = nextProps;
     this.timer && clearInterval(this.timer);
     this.getData(terminal);
     this.setTimer();

 }

 componentWillUnmount() {
    clearInterval(this.timer);
 }

 getData=(terminal)=>{
    axiosToken({ 
        method: 'get',
        url: realAddressUrlOne + `/screen/boardingBridgeRunStatus/${terminal}`,
    }).then((result) => {
        const {code,result:{fault,operation,unused} } = result.data;
        if (code === 0) {
            let arr = [
                {
                    value:Number(fault),
                    name:'故障',
                    lineColor:'#F9FF45'
                },
                {
                    value:Number(operation),
                    name:'运行',
                    lineColor:'#008CFE'
                },
                {
                    value:Number(unused),
                    name:'未使用',
                    lineColor:'#BDCCD4'
                }
            ]
            this.setState({
                seriesData:arr
            })
        }
    });
 }

 setTimer=()=>{
     this.timer = setInterval(()=>{
        this.getData(this.props.terminal);
     },globalTimer.BoardingBridgeStatusInterval)
 }

 render() {
   let {seriesData,seriesColors} = this.state;
   return(
    <div className={'BoardingBridgeStatus'}>
        <TitleCom title="登机桥实时运行状态分析"></TitleCom>
        <div className="BoardingBridgeStatusChartCon">
            <RunStatusPieChart type="boardingBridge" seriesData={seriesData} colors={seriesColors}></RunStatusPieChart>
        </div>    
    </div>
   )
 }
}

BoardingBridgeStatus.propTypes = {
    terminal:PropTypes.string.isRequired,
}
BoardingBridgeStatus.defaultProps = {}