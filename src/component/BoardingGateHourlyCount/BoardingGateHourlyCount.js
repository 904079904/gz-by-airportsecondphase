/**
 Crate by wanjikun on 19/11/28.
*/
import axiosToken from "js/axiosToken";

import { TitleCom ,TerminalAreaLineChart} from "com/index";
import './BoardingGateHourlyCount.scss'
export default class BoardingGateHourlyCount extends Component{
 constructor(props) {
   super(props);
   this.state={
    xData:[],
    yData:[]
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
    axiosToken({ //登机口的使用数量小时分布
        method: 'get',
        url: realAddressUrlOne + `/screen/boardingGateHourlyCount/${terminal}`,
    }).then((result) => {
        const {code,result:res } = result.data;
        if (code === 0 && res.length > 0 && res !== null) {
            let time = [],farData=[],nearData=[];
            for (let i = 0; i < res.length; i++) {
                time.push(res[i].hours.toString()+'h');
                farData.push(res[i].farNum);
                nearData.push(res[i].nearNum);
            }
            // console.log('nearData',nearData);
            // console.log('farData',farData);
            

            this.setState({
                xData:time,
                yData:[
                    {
                        name:'近机位登机口',
                        data:nearData,
                        areaStylecolor:{
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: 'rgba(29,215,252,0.3)' // 0% 处的颜色
                            }, {
                                offset: 1, color: 'rgba(0,39,191,0.05)' // 100% 处的颜色
                            }],
                            global: false // 缺省为 false
                        },
                        color:'#00bfea'
                    }
                    ,{
                        name:'远机位登机口',
                        data:farData,
                        areaStylecolor:{
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: 'rgba(9,237,179,0.3)' // 0% 处的颜色
                            }, {
                                offset: 1, color: 'rgba(0,39,191,0.05)' // 100% 处的颜色
                            }],
                            global: false // 缺省为 false
                        },
                        color:'#12e9b0'
                    }
                ]
            })
        }
    });
 }

 setTimer=()=>{
     this.timer = setInterval(()=>{
        this.getData(this.props.terminal);
     },globalTimer.boardingGateHourlyCountInterval)
 }

 render() {
    const {xData,yData} = this.state;
   return(
    <div className={'BoardingGateHourlyCount'}>
        <TitleCom title="登机口的使用数量小时分布"></TitleCom>
        <div className="BoardingGateHourlyCountChartCon">
            <TerminalAreaLineChart xData={xData} yData={yData}></TerminalAreaLineChart>
        </div>    
    </div>
   )
 }
}

BoardingGateHourlyCount.propTypes = {
    terminal:PropTypes.string.isRequired,
}
BoardingGateHourlyCount.defaultProps = {}