/**
 Crate by wanjikun on 19/11/28.
*/
import axiosToken from "js/axiosToken";

import { TitleCom ,TerminalAreaLineChart} from "com/index";
import './CarPoolLastHourFlow.scss'
export default class CarPoolLastHourFlow extends Component{
 constructor(props) {
   super(props);
   this.state={
    xData:[],
    yData:[]
   }
 }

 componentDidMount() {
    this.getData();
    this.setTimer();
 }

componentWillUnmount() {
    clearInterval(this.timer);
}

getData=()=>{
    axiosToken({
        method: 'get',
        url: realAddressUrlOne + `/screen/carPoolLastHourFlow`,
    }).then((result) => {
        const {code,result:res } = result.data;
        if (code === 0 && res.length > 0 && res !== null) {
            let code = [],out=[],enter=[];
            for (let i = 0; i < res.length; i++) {
                code.push(res[i].code);
                out.push(res[i].out);
                enter.push(res[i].enter);
            }

            this.setState({
                xData:code,
                yData:[
                    {
                        name:'流入',
                        data:enter,
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
                        name:'流出',
                        data:out,
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
        this.getData();
     },globalTimer.CarPoolLastHourFlowInterval)
 }

 render() {
    const {xData,yData} = this.state;
   return(
    <div className={'CarPoolLastHourFlow'}>
        <TitleCom title="过去一小时流量情况"></TitleCom>
        <div className="CarPoolLastHourFlowChartCon">
            <TerminalAreaLineChart xData={xData} yData={yData}></TerminalAreaLineChart>
        </div>    
    </div>
   )
 }
}

CarPoolLastHourFlow.propTypes = {}
CarPoolLastHourFlow.defaultProps = {}