import axiosToken from "js/axiosToken";

import { TitleCom } from "com/index";
import CargoBacklogsBar from "./CargoBacklogsBar";
import "./CargoBacklogs.scss";

export default class CargoBacklogs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: [],
      internal: [],
      international: []
    };
  }

  componentDidMount() {
    this.getTotalData();
    this.timer = setInterval(() => {
      this.getTotalData();
    }, globalTimer.todayCargoOverstock);
  }

  componentWillUnmount() {
    this.timer && clearInterval(this.timer);
  }

  getTotalData = () => {
    axiosToken({
      //进港每小时放行概览
      method: "get",
      url: realAddressUrlOne + `/screen/todayCargoOverstock`
    }).then(result => {
      const data = result.data.result;
      let time = [],
        internal = [],
        international = [];
      data &&
        data.forEach(ele => {
          time.push(ele.hour);
          internal.push(ele.internal);
          international.push(ele.international);
        });
      this.setState({
        time,
        internal,
        international
      });
    });
  };

  render() {
    const { time, internal, international } = this.state;
    return (
      <div className={"CargoBacklogs"}>
        <TitleCom title="今日货物积压分析" />
        <CargoBacklogsBar
          time={time}
          internal={internal}
          international={international}
        />
      </div>
    );
  }
}

CargoBacklogs.propTypes = {};
CargoBacklogs.defaultProps = {};
