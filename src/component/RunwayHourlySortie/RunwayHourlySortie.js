/**
 Crate by wanjikun on 19/10/28.
*/
import axiosToken from "js/axiosToken";

import { LineChartCom,TitleCom,ToggleBtnCom } from "com/index";
import './RunwayHourlySortie.scss'
export default class RunwayHourlySortie extends Component{
 constructor(props) {
   super(props);
   this.state={
        xData:[],
        yData:[],
        arrivalSpeed:0,
        departureSpeed:0,
        ifNorth:true,//向北或向南
    }
}

 componentDidMount() {
    this.getData('north'); // departureTotalAndDelayRate 出港
    this.setTimer();
 }

componentWillUnmount(){
    this.timer && clearInterval(this.timer);
}

setTimer=()=>{
        this.timer = setInterval(()=>{
            const {ifNorth} = this.state;
            const status = !ifNorth;
            const direction = status === true ? 'north' : 'south';
            this.setState({
               ifNorth:status
            })
            this.getData(direction)
        },globalTimer.runwayHourlySortieDelay)
}
getData=(direction)=>{
    axiosToken({ //跑道今日繁忙程度分析
           method: 'get',
           url: realAddressUrlOne + `/screen/runwayHourlySortie/${direction}`,
       }).then((result) => {
        //    console.log('跑道今日繁忙程度分析',result.data);
           const {code,result:{data,hours}} = result.data;
           if (code === 0) {
               const xData = this.handleXdata(hours);
               const yData = this.handleYdata(data);

                this.setState({
                    xData:xData,
                    yData:yData
                })
           }
       });
}
//处理x轴数据
handleXdata(data){
    return data.map(ele=>{
       return ele + '时';
    })
}
//处理Y数据
handleYdata(data){
    let colorArr = [
        {
            lineColor:'#fefe4b',
            startColor:'rgba(249,255,69,0.3)',
            stopColor:'rgba(0,39,191,0.05)'
        },
        {
            lineColor:'#00bfea',
            startColor:'rgba(9,237,179,0.3)',
            stopColor:'rgba(0,39,191,0.05)'
        },
        {
            lineColor:'#0be6a9',
            startColor:'rgba(29,215,252,0.3)',
            stopColor:'rgba(0,39,191,0.05)'
        }
    ]
    return data.map((ele,index)=>{
        return {
            name:ele.name,
            data:ele.sorties,
            areaStylecolor:{
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                    offset: 0, color: colorArr[index].startColor // 0% 处的颜色
                }, {
                    offset: 1, color: colorArr[index].stopColor // 100% 处的颜色
                }],
                global: false // 缺省为 false
            },
            color:colorArr[index].lineColor
        }
    });

}

 render() {
    const {xData,yData,ifNorth,arrivalSpeed,departureSpeed} = this.state;

   return(
     <div className={'RunwayHourlySortie'}>
        <div className="head">
            <TitleCom title="跑道今日繁忙程度分析"></TitleCom>
            <ToggleBtnCom
                leftTxt="向北"
                rightTxt="向南"
                // onBtnClick={this.onBtnClick}
                activeIndex={ifNorth === true ? 0 : 1}
            ></ToggleBtnCom>
        </div>
        <div className="RunwayHourlySortieCont">
            <LineChartCom xData={xData} yData={yData}></LineChartCom>
        </div>
     </div>
   )
 }
}

RunwayHourlySortie.propTypes = {}
RunwayHourlySortie.defaultProps = {}