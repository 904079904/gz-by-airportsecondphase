/**
 Crate by wanjikun on 19/12/02.
*/
import axiosToken from "js/axiosToken";

import { TitleCom ,RunStatusPieChart} from "com/index";
import './LadderControlEquipment.scss'
export default class LadderControlEquipment extends Component{
 constructor(props) {
   super(props);
   this.state={
     seriesData:[],
     seriesColors:['#F9FF45','#008CFE','#09EDB3'],
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
        url: realAddressUrlOne + `/screen/elevatorRunStatus/${terminal}`,
    }).then((result) => {
        const {code,result:{fault,operation,wait} } = result.data;
        if (code === 0) {
            let arr = [
                {
                    value:fault,
                    name:'故障',
                    lineColor:'#F9FF45'
                },
                {
                    value:operation,
                    name:'运行',
                    lineColor:'#008CFE'
                },
                {
                    value:wait,
                    name:'待机',
                    lineColor:'#09EDB3'
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
     },globalTimer.LadderControlEquipmentInterval)
 }

 render() {
   let {seriesData,seriesColors} = this.state;
   return(
    <div className={'LadderControlEquipment'}>
        <TitleCom title="梯控设备实时运行状态分析"></TitleCom>
        <div className="LadderControlEquipmentChartCon">
            <RunStatusPieChart type="ladderControl" colors={seriesColors} seriesData={seriesData}></RunStatusPieChart>
        </div>    
    </div>
   )
 }
}

LadderControlEquipment.propTypes = {
    terminal:PropTypes.string.isRequired,
}
LadderControlEquipment.defaultProps = {}