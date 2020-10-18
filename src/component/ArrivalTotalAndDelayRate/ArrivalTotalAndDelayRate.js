/**
 Crate by wanjikun on 19/10/28.
*/
import axiosToken from "js/axiosToken";

import { LineChartCom,TitleCom,ToggleBtnCom } from "com/index";
import "./ArrivalTotalAndDelayRate.scss";
export default class ArrivalTotalAndDelayRate extends Component{
 constructor(props) {
   super(props);
   this.state={
       xData:[],
       yData:[],
       arrivalSpeed:0,
       departureSpeed:0,
       ifArrive:true,//进港或出港
   }
 }

 componentDidMount() {
    this.getData('arrivalTotalAndDelayRate'); // departureTotalAndDelayRate 出港
    this.setTimer();
    this.getDelay();
 }

componentWillUnmount(){
    this.timer && clearInterval(this.timer);
}

 setTimer=()=>{
     this.timer = setInterval(()=>{
         const {ifArrive} = this.state;
         const status = !ifArrive;
         const url = status === true ? 'arrivalTotalAndDelayRate' : 'departureTotalAndDelayRate';
         this.setState({
            ifArrive:status
         })
         this.getData(url)
     },globalTimer.arrivalTotalDelay)
 }

 getDelay=()=>{
    
    axiosToken({ //进港每小时放行概览
        method: 'get',
        url: realAddressUrlOne + '/screen/fltEnterLeaveSpeed',
    }).then((result) => {
        const {arrivalSpeed,departureSpeed} = result.data.result;
        this.setState({
            arrivalSpeed,
            departureSpeed
        })
        
    });
 }

 getData=(url)=>{
    //  console.log('url',url);
    axiosToken({ //进港每小时放行概览
        method: 'get',
        url: realAddressUrlOne + `/screen/${url}`,
    }).then((result) => {
        const {delay,time,total} = result.data.result;
        this.setState({
            xData:time,
            yData:[
                {
                    name:'执行总量',
                    data:total,
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
                    name:'延误占比',
                    data:delay,
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

//  onBtnClick=(type)=>{
//      console.log('btn',type);
//  }

 render() {
    const {xData,yData,ifArrive,arrivalSpeed,departureSpeed} = this.state;
   return(
     <div className={'ArrivalTotalAndDelayRate'}>
        <div className="head">
            <TitleCom title="进出港每小时放行概览"></TitleCom>
            <div className="headBtn">
                <ToggleBtnCom
                    leftTxt="进港"
                    rightTxt="出港"
                    // onBtnClick={this.onBtnClick}
                    activeIndex={ifArrive === true ? 0 : 1}
                ></ToggleBtnCom>
            </div>
        </div>
        <div className="overviewChartCont">
            <LineChartCom xData={xData} yData={yData}></LineChartCom>
            <div className="overviewTxt">
                当前{ifArrive === true ? '进' : '出'}港速度<span className="speedTxt"> {ifArrive === true ? arrivalSpeed : departureSpeed} </span>分钟/架
            </div>
        </div>
     </div>
   )
 }
}

ArrivalTotalAndDelayRate.propTypes = {}
ArrivalTotalAndDelayRate.defaultProps = {}