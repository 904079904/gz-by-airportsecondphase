import { TitleCom } from "com/index";
import SecCheckAnalysisBar from "./SecCheckAnalysisBar";
import "./SecCheckAnalysis.scss";
import axiosToken from "js/axiosToken";

export default class SecCheckAnalysis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      internal: {},
      international: {}
    };
  }

  componentDidMount() {
    this.getTotalData();
    this.timer = setInterval(() => {
      this.getTotalData();
    }, globalTimer.secCheckAnalysis);
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
      }, globalTimer.secCheckAnalysis);
    }
  }

  getTotalData = () => {
    axiosToken({
      //进港每小时放行概览
      method: "get",
      url:
        realAddressUrlOne +
        `/screen/psgSecCheckAnalysis/${this.props.terminal}`
    }).then(result => {
      const data = result.data.result;
      this.setState({
        internal: data.internal || { total: 20, open: 0, number: 0 },
        international: data.international || { total: 20, open: 0, number: 0 }
      });
    });
  };

  render() {
    const { internal, international } = this.state;
    return (
      <div className={"SecCheckAnalysis"}>
        <TitleCom title="安检效能分析" />
        <div className={"Sec_legend"}>
          <div className={"Sec_legendItem"}>
            <span className={"Sec_legendBlock"} />
            <span className={"Sec_legendName"}>舒适</span>
          </div>
          <div className={"Sec_legendItem"}>
            <span className={"Sec_legendBlock"} />
            <span className={"Sec_legendName"}>无聊</span>
          </div>
          <div className={"Sec_legendItem"}>
            <span className={"Sec_legendBlock"} />
            <span className={"Sec_legendName"}>烦躁</span>
          </div>
        </div>
        <div className={"Sec_Container"}>
          <div className={"Sec_Internal"}>
            <div className={"Sec_Name"}>
              国内安检通道状态：open/all
              <span className={"Sec_Value"}>
                {internal.open}/{internal.total}
              </span>
            </div>
            <SecCheckAnalysisBar id={0} data={internal} />
          </div>
          <div className={"Sec_splitLine"} />
          <div className={"Sec_International"}>
            <div className={"Sec_Name"}>
              国际安检通道状态：open/all
              <span className={"Sec_Value"}>
                {international.open}/{international.total}
              </span>
            </div>
            <SecCheckAnalysisBar id={1} data={international} />
          </div>
        </div>
      </div>
    );
  }
}

SecCheckAnalysis.propTypes = {};
SecCheckAnalysis.defaultProps = {};
