/**
 Crate by wanjikun on 19/11/28.
*/
import axiosToken from "js/axiosToken";

import { TitleCom ,TerminalAreaLineChart} from "com/index";
import './BaggageTurntableUsed.scss'
export default class BaggageTurntableUsed extends Component{
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
    axiosToken({ //行李转盘使用数量小时分布
        method: 'get',
        url: realAddressUrlOne + `/screen/lugFetchHourlyInternalCount/${terminal}`,
    }).then((result) => {
        const {code,result:res } = result.data;
        if (code === 0 && res.length > 0 && res !== null) {
            let time = [],internal=[],international=[];
            for (let i = 0; i < res.length; i++) {
                time.push(res[i].hours.toString()+'h');
                internal.push(res[i].internal);
                international.push(res[i].international);
            }
            // console.log('nearData',nearData);
            // console.log('farData',farData);
            

            this.setState({
                xData:time,
                yData:[
                    {
                        name:'国际',
                        data:international,
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
                        name:'国内',
                        data:internal,
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
     },globalTimer.BaggageTurntableUsedInterval)
 }

 render() {
    const {xData,yData} = this.state;
   return(
    <div className={'BaggageTurntableUsed'}>
        <TitleCom title="行李转盘使用数量小时分布"></TitleCom>
        <div className="BaggageTurntableUsedChartCon">
            <TerminalAreaLineChart xData={xData} yData={yData}></TerminalAreaLineChart>
        </div>    
    </div>
   )
 }
}

BaggageTurntableUsed.propTypes = {
    terminal:PropTypes.string.isRequired,
}
BaggageTurntableUsed.defaultProps = {}