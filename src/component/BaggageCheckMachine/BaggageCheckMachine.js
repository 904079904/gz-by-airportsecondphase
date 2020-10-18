/**
 Crate by wanjikun on 19/12/02.
*/
import axiosToken from "js/axiosToken";

import { TitleCom, BaggageCheckMachineChart } from "com/index";
import "./BaggageCheckMachine.scss";
export default class BaggageCheckMachine extends Component {
  constructor(props) {
    super(props);
    this.state={
      chartData:[],
      internalPassRate:0,
      internalAmount:0,
      internationalPassRate:0,
      internationalAmount:0,
    }
    this.timer = null;
  }

  componentDidMount() {
    this.getData(this.props.terminal);
    this.setTimer();
  }

  componentWillReceiveProps(nextProps){
    let {terminal} = nextProps;
    
    this.timer && clearInterval(this.timer);
    this.getData(terminal);
    this.setTimer();

  }

  async getData(terminal) {
    
    let res1 = await axiosToken({
        method: 'get',
        url: realAddressUrlOne + `/screen/lugCheckPassAmount/${terminal}`,
    })
    let res2 = await axiosToken({
        method: 'get',
        url: realAddressUrlOne + `/screen/checkMachineStatus/${terminal}`,
    })
    if(res1.data.code===0 && res2.data.code===0 && res2.data.result !== null){
        let {internal,international} = res1.data.result;
        let { result } = res2.data;

        this.setState({
          chartData:result,
          internalPassRate:internal.passRate || 0,
          internalAmount:internal.amount || 0,
          internationalPassRate:international.passRate || 0,
          internationalAmount:international.amount || 0,
        })
        
    }
  }

  setTimer=()=>{
    this.timer = setInterval(()=>{
       this.getData(this.props.terminal);
    },globalTimer.baggageAnalyzeInterval)
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    let {chartData,internalPassRate,internalAmount,internationalPassRate,internationalAmount} = this.state;
    let {terminal} = this.props;
    console.log('行李安检机terminal',terminal === 'T1' ? 6 : 5);
    
    return (
      <div className={"BaggageCheckMachine"}>
        <TitleCom title="行李安检机"></TitleCom>
        <div className={"Sec_legend"}>
          <div className={"Sec_legendItem"}>
            <span className={"Sec_legendBlock"} />
            <span className={"Sec_legendName"}>运行</span>
          </div>
          <div className={"Sec_legendItem"}>
            <span className={"Sec_legendBlock"} />
            <span className={"Sec_legendName"}>维保</span>
          </div>
          <div className={"Sec_legendItem"}>
            <span className={"Sec_legendBlock"} />
            <span className={"Sec_legendName"}>待机</span>
          </div>
          <div className={"Sec_legendItem"}>
            <span className={"Sec_legendBlock"} />
            <span className={"Sec_legendName"}>故障</span>
          </div>
          <div className={"Sec_legendItem"}>
            <span className={"Sec_legendBlock"} />
            <span className={"Sec_legendName"}>关机</span>
          </div>
        </div>
        <div className="BaggageCheckMachineChartCon">
          {/* mod只判断T1或T2 其中T1是6，6 T2是6，5 */}
          <BaggageCheckMachineChart mod={terminal} upNum={6} downNum={terminal === 'T1' ? 6 : 5} data={chartData}/>
          <div className="statistics internal">
              <div className="tit">国内行李安检</div>
                <div className="descItem">通过率：<span className="percent">{internalPassRate}%</span></div>
                <div className="descItem">总流量：<span className="percent">{internalAmount}</span></div>
          </div>
          <div className="statistics international">
              <div className="tit">国际行李安检</div>
                <div className="descItem">通过率：<span className="percent">{internationalPassRate}%</span></div>
                <div className="descItem">总流量：<span className="percent">{internationalAmount}</span></div>
          </div>

        </div>
      </div>
    );
  }
}

BaggageCheckMachine.propTypes = {
  terminal:PropTypes.string.isRequired,
};
BaggageCheckMachine.defaultProps = {};
