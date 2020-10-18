/**
 Crate by wanjikun on 19/10/28.
*/
import axiosToken from "js/axiosToken";

import { LineChartCom,TitleCom,ToggleBtnCom } from "com/index";
import './LeaveOverstocked.scss'
export default class LeaveOverstocked extends Component{
     constructor(props) {
           super(props);
           this.state={
               xData:[],
               yData:[],
               arrivalSpeed:0,
           }
         }
        
         componentDidMount() {
            this.getData(); // departureTotalAndDelayRate 出港
            this.setTimer();
            this.getDelay();
         }
        
        componentWillUnmount(){
            this.timer && clearInterval(this.timer);
        }

         setTimer=()=>{
             this.timer = setInterval(()=>{
                 this.getData();
                 this.getDelay();
             },globalTimer.leaveOverstockedDelay)
         }
        
         getDelay=()=>{
            
            axiosToken({ //出港积压
                method: 'get',
                url: realAddressUrlOne + '/screen/fltEnterLeaveSpeed',
            }).then((result) => {
                const {arrivalSpeed} = result.data.result;
                this.setState({
                    arrivalSpeed,
                })
                
            });
         }
        
         getData=()=>{
            axiosToken({ //出港积压
                method: 'get',
                url: realAddressUrlOne + '/screen/leaveOverstocked',
            }).then((result) => {
                const {xaxis,flightOverstockHour,flightOverstockTotal} = result.data.result;
                // console.log('result.data.result',result.data.result);
                
                this.setState({
                    xData:xaxis,
                    yData:[
                        {
                            name:'小时积压',
                            data:flightOverstockHour,
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
                            name:'累计积压',
                            data:flightOverstockTotal,
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
            });
         }

 render() {
    const {xData,yData,arrivalSpeed} = this.state;
   return(
     <div className={'LeaveOverstocked'}>
        <div className="head">
            <TitleCom title="出港积压"></TitleCom>
        </div>
        <div className="overviewChartCont">
            <LineChartCom xData={xData} yData={yData}></LineChartCom>
            <div className="overviewTxt">
                当前出港速度<span className="speedTxt"> {arrivalSpeed} </span>分钟/架
            </div>
        </div>
    </div>
   )
 }
}

LeaveOverstocked.propTypes = {}
LeaveOverstocked.defaultProps = {}