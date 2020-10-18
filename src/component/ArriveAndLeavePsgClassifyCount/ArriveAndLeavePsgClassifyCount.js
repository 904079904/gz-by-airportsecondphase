/**
 Crate by wanjikun on 19/10/28.
*/
import axiosToken from "js/axiosToken";

import { TitleCom, ToggleBtnCom, ThreeDBarChart } from "com/index";
import "./ArriveAndLeavePsgClassifyCount.scss";

export default class ArriveAndLeavePsgClassifyCount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ifArrive: false,
      total: 0,
      enter: {},
      out: {}
    };
  }

  componentDidMount() {
    this.getTotalData();
    this.timer = setInterval(() => {
      this.getTotalData();
      this.setState({
        ifArrive: !this.state.ifArrive
      });
    }, globalTimer.psgHourlyDistribution);
  }

  componentWillUnmount() {
    this.timer && clearInterval(this.timer);
  }

  componentWillReciveProps(nextProps) {
    if (this.props.terminal !== nextProps.terminal) {
      this.timer && clearInterval(this.timer);
      this.getTotalData();
      this.timer = setInterval(() => {
        this.getTotalData();
        this.setState({
          ifArrive: !this.state.ifArrive
        });
      }, globalTimer.psgHourlyDistribution);
    }
  }

  getTotalData = () => {
    axiosToken({
      //进港每小时放行概览
      method: "get",
      url:
        realAddressUrlOne +
        `/screen/psgEnterOutTotalNum/${this.props.terminal}`
    }).then(result => {
      const { total, enter, out } = result.data.result;
      this.setState({
        total: total,
        enter,
        out
      });
    });
  };

  render() {
    const { ifArrive, total, enter, out } = this.state;
    let internal = [],
      international = [],
      orderArr = ["todayAmount", "lastTwoHourAmount", "futureTwoHourAmount"];
    orderArr.forEach(ele => {
      if (!enter[ele]) return;
      if (!out[ele]) return;
      if (ifArrive) {
        internal.push(enter[ele]["internal"]);
        international.push(enter[ele]["international"]);
      } else {
        internal.push(out[ele]["internal"]);
        international.push(out[ele]["international"]);
      }
    });

    return (
      <div className={"ArriveAndLeavePsgClassifyCount"}>
        <div className="head">
          <div className={"numberHeader"}>
            <TitleCom title="今日进出港游客总量" />
            <span className={"totalNumber"}>{total}</span>
          </div>
          <div className="headBtn">
            <ToggleBtnCom
              leftTxt="进港"
              rightTxt="出港"
              activeIndex={ifArrive === true ? 0 : 1}
            ></ToggleBtnCom>
          </div>
        </div>
        <ThreeDBarChart internal={internal} international={international} />
      </div>
    );
  }
}

ArriveAndLeavePsgClassifyCount.propTypes = {};
ArriveAndLeavePsgClassifyCount.defaultProps = {};
