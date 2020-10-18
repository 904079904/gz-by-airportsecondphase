/**
 * Created by xiaohe on 2018/5/7.
 */
import { Switch, Route } from "react-router-dom";
import { AirPortMockTest } from "com/index.js";
import { LeftCon, MiddleCon, RightCon,WSTest,TitleCon } from "con/index.js";
import "./Main.scss";

export default class Main extends Component {
  constructor(props, context) {
    super(props);
    this.saveToken = this.saveToken.bind(this);
  }

  componentWillMount() {
    this.saveToken();
  }
  //存储token
  saveToken() {
    // axios({ //获取token
    //     method: 'get',
    //     url: realAddressUrlOne + '/screen/arrivalTotalAndDelayRate',
    // }).then((result) => {
    // });
  }
  componentDidMount() {
    // byjc_cq.on(1024, function(msg) {
    //   //监听类型为1025的消息推送  消息类型 >1024
    //   console.log(msg.data);
    // });
  }

  render() {
    return (
      <div className={"Layer"}>
        {/*默认加载判断路由*/}

        <Switch>
          <Route path="/main/AirPortMockTest" component={AirPortMockTest} />
          <Route path="/main/LeftCon/:type" component={LeftCon} />
          <Route path="/main/MiddleCon/:type" component={MiddleCon} />
          <Route path="/main/RightCon/:type" component={RightCon} />
          <Route path="/main/wsTest" component={WSTest} />
        </Switch>
      </div>
    );
  }
}
