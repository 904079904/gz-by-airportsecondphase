/**
 Crate by jgmiu on 19/10/28.
*/
import './RightCon.scss'
import {FreePlanPosition,OnTheBridgeRate, AirportBridge, 
  Notification,RunwayHourlySortie,LeaveOverstocked,LeaveFltMap,
  BaggageSort,BaggageAnalyze,BoardingGateHourlyCount,UsingTheGate,
  EachLugUsed,CargoBacklogs,BaggageTurntableUsed,PriorityGoodsAnalysis,
  BoardingBridgeStatus,LadderControlEquipment,CarPoolLastHourFlow,
  CarPoolFutrueHourFlow,BaggageCheckMachine,TaxiDispatch,AnalysisOfFreight} from 'com/index'
import rightBorder from 'img/right-border.png'
import comBorder from 'img/com-bg.png'
import title4 from 'img/big-title-4.png'
import title5 from 'img/big-title-5.png'
import tTile3 from 'img/t-title-3.png'
import tTile4 from 'img/t-title-4.png'
import cTile3 from 'img/c-title-3.png'
import cTile4 from 'img/c-title-4.png'
export default class RightCon extends Component{
  constructor(props) {
    super(props)
    // 飞行区(fly) 航站区(terminal) 公共区(common)
    this.state = {
      type: '',
      terminal:'T1'
    }
    this.transformSwitch={
      RunwayHourlySortieCont:0.9,//跑道今日繁忙程度分析
      overviewChartCont:0.9,//出港积压
      MapLeaveWorldChart:0.9,//全球出港航线
      OnTheBridgeRateCont:0.9,//今日靠桥率
      // AirportBridgeCont:0.9,//今日重点航司靠桥率分析
      FreePlanPositionCont:0.9,//机位空闲实时分析
      // list:0.9,//消息通告
      // 以下为航站区
      BaggageAnalyzeChartCon:0.9,//每月行李正常性分析
      BaggageSort:0.9,//行李分拣系统每小时处理行李总数
      BaggageCheckMachineChartCon:0.9,//行李安检机
      TerminalAreaLineChart:0.9,//登机口的使用数量小时分布
      chartCom:0.9,//正在使用的登机口数量实时统计
      BoardingBridgeStatusChartCon:0.9,//登机桥实时运行状态分析
      LadderControlEquipmentChartCon:0.9,//梯控设备实时运行状态分析
      EachLugUsedChart:0.9,//各行李转盘使用航班数量实时分析
      BaggageTurntableUsedChartCon:0.9,//行李转盘使用数量小时分布
      // 以下为公共区
      TaxiDispatchContent:0.9,//出租车调度
      CarPoolLastHourFlowChartCon:0.9, //过去一小时流量情况
      CarPoolFutrueHourFlowChartCon:0.9,//未来一小时流量情况
      CargoBacklogsBar:0.9,//今日货物积压分析
      PriorityGoodsAnalysis:0.9,//今日重点货物分析
      mapChartCont:0.9,//货运分析地图
    }
  }
  componentWillMount() {
    this.setState({
      type: this.props.match.params.type
    })
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      type: nextProps.match.params.type
    })
  }
  componentDidMount() {
    this.transformDom();
    let that = this;
    byjc_cq.on(monitorType, function (msg) {
      //监听类型为1025的消息推送  消息类型 >1024
      if (msg.data.area && msg.data.area === "LS_FA") {
        that.props.history.push('/main/RightCon/fly');
      }
      if (msg.data.area && msg.data.area === "LS_PA") {
        that.props.history.push('/main/RightCon/common');
      }
      if (msg.data.area && msg.data.area === "LS_TA1") {
        that.props.history.push('/main/RightCon/terminal1');
      }
      if (msg.data.area && msg.data.area === "LS_TA2") {
        that.props.history.push('/main/RightCon/terminal2');
      }
    });
  }

  //右侧模块每个小模块适应大屏的缩放
  transformDom=()=>{
    Object.keys(this.transformSwitch).map(ele=>{
      var submitObj = document.getElementsByClassName(ele)[0];
      if (submitObj !== undefined) {
        submitObj.style.transform = 'scaleX(' + this.transformSwitch[ele] + ')';
      }
    })
  }

  render() {
    let {type} = this.state
    let terminal = type === 'terminal1' ? 'T1' : 'T2' 
    return(
      <div className={'RightCon'}>
        <img style={this.type === 'common' ? {display: 'none'}:{}} src={rightBorder} className={'rightBorder'} />
        <img style={this.type === 'common' ? {}:{display: 'none'}} src={comBorder} className={'comBorder'} />
        {
          (function(type) {
            if(type === 'fly')
              return(
                <div className={'flyCon'}>
                  <div className={'left'}>
                    <div className={'title'}><img src={title4} className="leftTitImg"/></div>
                    <div className={'chartWrapper'}>
                      <div className={'lineChart'}>
                        <RunwayHourlySortie></RunwayHourlySortie>
                      </div>
                      <div className={'lineChart'}>
                        <LeaveOverstocked></LeaveOverstocked>
                      </div>
                    </div>
                    <div className={'map'}>
                      <LeaveFltMap></LeaveFltMap>
                    </div>
                  </div>
                  <div className={'right'}>
                    <div className={'title'}><img src={title5} /></div>
                    <div className={'bridge'}>
                      <OnTheBridgeRate />
                    </div>
                    <div className={'chartWrapper'}>
                      <div className={'barChart'}>
                        <AirportBridge />
                      </div>
                      <div className={'barChart'}>
                        <FreePlanPosition />
                      </div>
                    </div>
                    <div className={'info'}>
                    <Notification />
                  </div>
                  </div>
                </div>
              )              
            if(type === 'terminal1' || type === 'terminal2')
              return(
                <div className={'terminalCon'}>
                  <div className={'baggage'}>
                    <div className={'title'}><img src={tTile3} className="leftTitImg"/></div>
                    <div className={'baggagePie'}>
                      <BaggageAnalyze terminal={terminal}/>
                    </div>
                    <div className={'baggageBar'}>
                      <BaggageSort terminal={terminal}/>
                    </div>
                    <div className={'baggageCheck'}>
                      <BaggageCheckMachine terminal={terminal}></BaggageCheckMachine>
                    </div>
                  </div>
                  <div className={'monitor'}>
                    <div className={'title'}><img src={tTile4} className="leftTitImg"/></div>
                    <div className={'monitorItem'}>
                      <BoardingGateHourlyCount terminal={terminal}></BoardingGateHourlyCount>
                    </div>
                    <div className={'monitorItem'}>
                      <UsingTheGate terminal={terminal} />
                    </div>
                    <div className={'monitorItem'}>
                      <BoardingBridgeStatus terminal={terminal}/>
                    </div>
                    <div className={'monitorItem'}>
                      <LadderControlEquipment terminal={terminal}/>
                    </div>
                    <div className={'monitorItem'}>
                      <EachLugUsed terminal={terminal} />
                    </div>
                    <div className={'monitorItem'}>
                      <BaggageTurntableUsed terminal={terminal}></BaggageTurntableUsed>
                    </div>
                  </div>
                </div>
              )
            if(type === 'common')
              return(
                <div className={'commonCon'}>
                  <div className={'taxiInfo'}>
                    <div className={'title'}><img src={cTile3} className="leftTitImg"/></div>
                    <div className={'taxiTop'}>
                      <TaxiDispatch />
                    </div>
                    <div className={'taxiBottomLeft'}>
                      <CarPoolLastHourFlow/>
                    </div>
                    <div className={'taxiBottomRight'}>
                      <CarPoolFutrueHourFlow/>
                    </div>
                  </div>
                  <div className={'freight'}>
                    <div className={'title'}><img src={cTile4} className="leftTitImg"/></div>
                    <div className={'freightTop'}>
                      <div className={'freightTopLeft'}>
                        <CargoBacklogs />
                      </div>
                      <div className={'freightTopRight'}>
                        <PriorityGoodsAnalysis />
                      </div>
                    </div>
                    <div className={'freightBottom'}>
                        <AnalysisOfFreight></AnalysisOfFreight>
                    </div>
                  </div>
            </div>
              )
          })(this.state.type)
        }
      </div>
    )
  }
}

RightCon.propTypes = {}
RightCon.defaultProps = {}