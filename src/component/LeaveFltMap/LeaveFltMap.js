/**
 Crate by wanjikun on 19/10/28.
*/
import axiosToken from "js/axiosToken";

import { TitleCom, MapLeaveWorldChart } from "com/index";
import "./LeaveFltMap.scss";

export default class LeaveFltMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fltData:[]
    }
  }

  componentDidMount() {
    this.getData();
  }
  getData=()=>{
    axiosToken({ //全球出港航线
          method: 'get',
          url: realAddressUrlOne + '/screen/leaveFltRouteList',
      }).then((result) => {
          console.log('leaveFltRouteList',result.data.result);
          if (result.data.code === 0) {
            this.setState({
              fltData:result.data.result
            })
          }
      });
  }

  render() {
    const {fltData} = this.state;
    return (
      <div className={"LeaveFltMap"}>
        <div className="LeaveFltMapTit">
          <TitleCom title="全球出港航线"></TitleCom>
        </div>
        <div className="MapLeaveWorldChart">
          <MapLeaveWorldChart fltData={fltData}/>
        </div>
      </div>
    );
  }
}

LeaveFltMap.propTypes = {};
LeaveFltMap.defaultProps = {};
