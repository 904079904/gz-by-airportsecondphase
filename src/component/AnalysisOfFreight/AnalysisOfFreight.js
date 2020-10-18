/**
 Crate by wanjikun on 19/11/28.
*/
import axiosToken from "js/axiosToken";

import { TitleCom ,PictorialBar,FreightWorldMap} from "com/index";
import './AnalysisOfFreight.scss'
export default class AnalysisOfFreight extends Component{
 constructor(props) {
   super(props);
   this.state={
    freightTotal:0,//货流吞吐总量
    internalTotal:0,//国内吞吐总量
    internationalTotal:0,//国际吞吐总量
    rankBarValueData:[], //排行图只数组
    rankBarNameData:[], //排行图名称数组
    fltData:[],//地图数据
   }
 }

 componentDidMount() {
    this.getData();
    this.setTimer();
 }

 componentWillUnmount() {
    clearInterval(this.timer);
 }

 async getData(){
     let res2 = await axiosToken({ //获取货运地图数据
         method: 'get',
         url: realAddressUrlOne + '/screen/todayCargoMap',
     });
    let res1 = await axiosToken({  //获取货运排行榜数据
        method: 'get',
        url: realAddressUrlOne + '/screen/todayCargoAnalyze',
    })
    if (res1.data.code === 0 && res2.data.code ===0) {
        const {result:{internal,international} } = res1.data;
        const {result:{internal:res2Internal,international:res2Intertional} } = res2.data;

        let internationalTotal = international.total;
        let internationalAllArea = international.allArea;
        let internalTotal = internal.total;
        let { values,names } = this.handlePictorialBarData(international.allArea);

        this.setState({
            freightTotal:internalTotal+internationalTotal,
            internalTotal:internalTotal,
            internationalTotal:internationalTotal,
            rankBarValueData:values,
            rankBarNameData:names,
            fltData:res2Intertional
        })
    }
 }

 handlePictorialBarData=(data)=>{
    let values=[],names=[];
    data.map(ele=>{
        values.push(ele.num);
        names.push(ele.area);
    })
    return {
        values,names
    }
 }

 setTimer=()=>{
     this.timer = setInterval(()=>{
        this.getData();
     },globalTimer.analysisOfFreightInterval)
 }

 render() {
   let {rankBarValueData,rankBarNameData,internalTotal,freightTotal,internationalTotal,fltData} = this.state;
   let internalPercent =freightTotal === 0 ? 0 : parseInt((internalTotal/freightTotal)*100)
   let internationalPercent =100-internalPercent;
   return(
    <div className={'AnalysisOfFreight'}>
        <TitleCom title="货运分析"></TitleCom>
        <div className="AnalysisOfFreightChartCon">
            <div className="contTop">
                <div className="rankBarCont">
                    <div className="PictorialBarCont">
                        <PictorialBar valueData={rankBarValueData} nameData={rankBarNameData}></PictorialBar>
                    </div>
                    <div className="freightTotalCont">
                        今日货流吞吐量<span className="num">{freightTotal}</span>万吨
                    </div>
                </div>
                <div className="mapChartCont">
                    <div className="freightMap">
                        <FreightWorldMap fltData={fltData}></FreightWorldMap>
                    </div>
                </div>
            </div>
            <div className="contBottom">
                <div className="showNumCont">
                    <div className="percent">
                        <span className="percentNum">{internalPercent}</span>%
                    </div>
                    <div>
                        国内
                    </div>
                </div>
                <div className="barCont">
                    <div className="barContMain">
                        <div className="barContLeft" style={{width:internalPercent+'%'}}></div>
                        <div className="barContRight" style={{width:internationalPercent+'%'}}></div>
                    </div>
                </div>
                <div className="showNumCont">
                    <div className="percent">
                        <span className="percentNum international">{internationalPercent}</span>%
                    </div>
                    <div>
                        国际
                    </div>
                </div>
            </div>
        </div>    
    </div>
   )
 }
}

AnalysisOfFreight.propTypes = {
    // terminal:PropTypes.string.isRequired,
}
AnalysisOfFreight.defaultProps = {}