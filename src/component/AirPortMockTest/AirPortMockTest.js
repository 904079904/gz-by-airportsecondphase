/**
 Crate by wanjikun on 19/10/21.
*/
import { TitleCom,ToggleBtnCom } from "com/index";
import axiosToken from "js/axiosToken";

export default class AirPortMockTest extends Component{
 constructor(props) {
   super(props)
 }

 componentDidMount() {
    // this.axiosTest()
    
    
 }
axiosTest=()=>{
    axiosToken({ //进港每小时放行概览
        method: 'get',
        url: realAddressUrlOne + '/screen/arrivalTotalAndDelayRate',
    }).then((result) => {
        console.log('arrivalTotalAndDelayRate',result.data.result);
    });

    axiosToken({ //出港每小时放行概览
        method: 'get',
        url: realAddressUrlOne + '/screen/departureTotalAndDelayRate',
    }).then((result) => {
        console.log('departureTotalAndDelayRate',result.data.result);
    });

    axiosToken({ //全球出港航线
        method: 'get',
        url: realAddressUrlOne + '/screen/leaveFltRouteList',
    }).then((result) => {
        console.log('leaveFltRouteList',result.data.result);
    });

    axiosToken({ //今日靠桥率
        method: 'get',
        url: realAddressUrlOne + '/screen/positionTotalityByBridgeRate',
    }).then((result) => {
        console.log('positionTotalityByBridgeRate',result.data.result);
    });

    axiosToken({ //今日重点航司靠桥率分析
        method: 'get',
        url: realAddressUrlOne + '/screen/positionAirlineByBridgeRate',
    }).then((result) => {
        console.log('positionAirlineByBridgeRate',result.data.result);
    });

    axiosToken({ //机位空闲情况实时分析
        method: 'get',
        url: realAddressUrlOne + '/screen/positionUsedInfo',
    }).then((result) => {
        console.log('positionUsedInfo',result.data.result);
    });
    
    axiosToken({ //机位更换消息
        method: 'get',
        url: realAddressUrlOne + '/screen/positionChange',
    }).then((result) => {
        console.log('positionChange',result.data.result);
    });
    
    axiosToken({ //机位更换消息
        method: 'get',
        url: realAddressUrlOne + '/screen/positionConflict',
    }).then((result) => {
        console.log('positionConflict',result.data.result);
    });
}
onBtnClick=(type)=>{
    console.log('type',type);

}

 render() {
   return(
     <div className={'AirPortMockTest'}>
        <TitleCom></TitleCom>
        <ToggleBtnCom
            leftTxt="进港"
            rightTxt="出港"
            onBtnClick={this.onBtnClick}
        ></ToggleBtnCom>
    </div>
   )
 }
}

AirPortMockTest.propTypes = {}
AirPortMockTest.defaultProps = {}