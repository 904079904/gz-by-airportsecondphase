/**
 Crate by jgmiu on 19/10/28.
*/
import { ArrivalTotalAndDelayRate } from "com/index";
import './LeftCon.scss'
import {
  PassRate, ImplementationRate, CorridorReleaseRate,
  HourReleaseSituationCom, CoordinationSecurityCom, FilghtDelay, AirportSituation, FltDelaySortieCount, CloseDoorWaitCount, WeatherMap,
  ArriveAndLeavePsgClassifyCount, PassengerNum, SecCheckAnalysis
} from 'com/index.js'
import leftBorder from 'img/left-border.png'
import title1 from 'img/big-title-1.png'
import title2 from 'img/big-title-2.png'
import tTitle1 from 'img/t-title-1.png'
import cTitle1 from 'img/c-title-1.png'

export default class LeftCon extends Component {
  constructor(props) {
    super(props)
    this.state = {
      type: ''
    }
    this.transformSwitch = {
      // 以下为飞行区模块
      MapWeatherChart: 0.9,//国内天气模块地图容器
      MapWeatherChartBg: 0.9,//国内天气模块地图容器背景图
      overviewChartCont: 0.9,//进出港每小时放行概览
      CorridorReleaseRateBar: 0.9,//走廊口放行率
      passRateAnimateCom: 0.9, //放行率百分比动画图
      PassRateBarCom: 0.9,//放行率本月本年动画图
      chartBox: 0.9,//延误架次实时分析
      CloseDoorWaitCountBox: 0.9,//关舱门等待时长分析
      ImplementationRateBarCom: 0.9, //今日目标完成时刻的分析
      FilghtDelayCont: 0.9,//大面积航延实时分析
      hrsChart: 0.9, //右侧放行率
      protectionCont: 0.9,//协同保障监管
      AirportSituation: 0.9,//机场整体运行情况
      // 以下为航站区模块
      ThreeDBarChart: 0.9,//今日进出港游客总量
      PassengerNumChart: 0.9,//旅客数量小时分布
      Sec_Container: 0.9,//安检效能分析
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
      console.log('msg',msg);
      
      
      //监听类型为1025的消息推送  消息类型 >1024
      if (msg.data.area && msg.data.area === "LS_FA") {
        that.props.history.push('/main/LeftCon/fly');
      }
      if (msg.data.area && msg.data.area === "LS_PA") {
        that.props.history.push('/main/LeftCon/common');
      }
      if (msg.data.area && msg.data.area === "LS_TA1") {
        that.props.history.push('/main/LeftCon/terminal1');
      }
      if (msg.data.area && msg.data.area === "LS_TA2") {
        that.props.history.push('/main/LeftCon/terminal2');
      }
    });
  }

  //左侧模块每个小模块适应大屏的缩放
  transformDom = () => {
    Object.keys(this.transformSwitch).map(ele => {
      var submitObj = document.getElementsByClassName(ele)[0];
      if (submitObj !== undefined) {
        submitObj.style.transform = 'scaleX(' + this.transformSwitch[ele] + ')';
      }
    })
  }

  render() {
    let {type} = this.state
    let terminal = type === 'terminal1' ? 'T1' : 'T2' 
    return (
      <div className={'LeftCon'}>
        <img className={'borderImg'} src={leftBorder} />
        {
          (function (type) {
            if (type === 'fly') {
              return (
                <div className={'flyCon'}>
                  <div className={'operational '}>
                    <div className={'title'}> <img src={title1} /> </div>
                    <div className={'airport'}>
                      <AirportSituation />
                    </div>
                    <div className={'chartWrapper'}>
                      <div className={'left'}>
                        <div className={'releaseRate'}>
                          <PassRate />
                        </div>
                        <div className={'protection'}>
                          <CoordinationSecurityCom></CoordinationSecurityCom>
                        </div>
                      </div>
                      <div className={'right'}>
                        <div className={'pieChart'}>
                          <FltDelaySortieCount></FltDelaySortieCount>
                        </div>
                        <div className={'pieChart'}>
                          <CloseDoorWaitCount></CloseDoorWaitCount>
                        </div>
                        <div className={'pieChart'}>
                          <FilghtDelay />
                        </div>
                        <div className={'barChart'}>
                          <ImplementationRate />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={'weather'}>
                    <div className={'title'}><img src={title2} className="rightImg" /></div>
                    <div className={'top'}>
                      <div className={'releaseRate'}>
                        <HourReleaseSituationCom></HourReleaseSituationCom>
                      </div>
                      <div className={'corridor'}>
                        <CorridorReleaseRate />
                      </div>
                      <div className={'entryExit'}>
                        <ArrivalTotalAndDelayRate></ArrivalTotalAndDelayRate>
                      </div>
                    </div>
                    <div className={'bottom'}>
                      <WeatherMap></WeatherMap>
                    </div>
                  </div>
                </div>
              )
            }
            if (type === 'terminal1' || type === 'terminal2') {
              return (
                <div className={'terminalCon'}>
                  <div className={'operational '}>
                    <div className={'title'}> <img src={title1} /> </div>
                    <div className={'airport'}>
                      <AirportSituation  terminal={terminal}/>
                    </div>
                    <div className={'chartWrapper'}>
                      <div className={'left'}>
                        <div className={'releaseRate'}>
                          <PassRate  terminal={terminal}/>
                        </div>
                        <div className={'protection'}>
                          <CoordinationSecurityCom terminal={terminal}></CoordinationSecurityCom>
                        </div>
                      </div>
                      <div className={'right'}>
                        <div className={'pieChart'}>
                          <FltDelaySortieCount terminal={terminal}></FltDelaySortieCount>
                        </div>
                        <div className={'pieChart'}>
                          <CloseDoorWaitCount terminal={terminal}></CloseDoorWaitCount>
                        </div>
                        <div className={'pieChart'}>
                          <FilghtDelay  terminal={terminal}/>
                        </div>
                        <div className={'barChart'}>
                          <ImplementationRate  terminal={terminal}/>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={'passenger'}>
                    <div className={'title'}> <img src={tTitle1} /> </div>
                    <div className={'chartWrapper'}>
                      <ArriveAndLeavePsgClassifyCount  terminal={terminal}/>
                    </div>
                    <div className={'chartWrapper right'}>
                      <PassengerNum  terminal={terminal}/>
                    </div>
                    <div className={'securityCheck'}>
                      <SecCheckAnalysis  terminal={terminal}/>
                    </div>
                  </div>
                </div>
              )
            }
            if (type === 'common') {
              return (
                <div className={'commonCon'}>
                  <div className={'operational '}>
                    <div className={'title'}> <img src={title1} /> </div>
                    <div className={'airport'}>
                      <AirportSituation />
                    </div>
                    <div className={'chartWrapper'}>
                      <div className={'left'}>
                        <div className={'releaseRate'}>
                          <PassRate />
                        </div>
                        <div className={'protection'}>
                          <CoordinationSecurityCom></CoordinationSecurityCom>
                        </div>
                      </div>
                      <div className={'right'}>
                        <div className={'pieChart'}>
                          <FltDelaySortieCount></FltDelaySortieCount>
                        </div>
                        <div className={'pieChart'}>
                          <CloseDoorWaitCount></CloseDoorWaitCount>
                        </div>
                        <div className={'pieChart'}>
                          <FilghtDelay />
                        </div>
                        <div className={'barChart'}>
                          <ImplementationRate />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={'road'}>
                    <div className={'title'}> <img src={cTitle1} /> </div>
                    <div className={'roadMap'}>
                      <div className={'roadMapIframe'}>
                          <iframe width="2328" height="1648" src={realAddressUrlTwo+'/lukuang.html'}></iframe>
                      </div>
                    </div>
                  </div>
                </div>
              )
            }
          })(this.state.type)
        }
      </div>
    )
  }
}

LeftCon.propTypes = {}
LeftCon.defaultProps = {}