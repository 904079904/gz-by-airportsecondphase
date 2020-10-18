/* Create by zhangqin 2019/10/29 */
import axiosToken from "js/axiosToken";

import {CorridorReleaseRateBar,TitleCom} from 'com/index.js'
import './CorridorReleaseRate.scss'
export default class CorridorReleaseRate extends Component {
    constructor(props){
        super(props);
        this.state = {
            barData: {},
            bgData: []
        }
        this.getData = this.getData.bind(this);
    };

    componentDidMount() {
        this.getData()
        this.reloadId = setInterval(() => {
            this.getData();
        },globalTimer.corridorReleaseRate)
    }
    
    componentWillUnmount(){
        clearInterval(this.reloadId);
    }
    getData(){
        axiosToken({
            method: 'get',
            url: realAddressUrlOne + '/screen/corridorReleaseRate',
        }).then((res) => {
            if(res.data.code === 0){
                let result = res.data.result,bgData = [], item = null;
                for(var i =0 ; i < result.fplrouteAbnormal.length; i++){
                    item = parseInt(result.fplrouteAbnormal[i])+parseInt(result.fplrouteNormal[i])
                    bgData.push(item)
                }
                this.setState({
                    barData: result,
                    bgData: bgData
                })
            }
        });
    }
    render(){
        let {barData, bgData} = this.state
        return(
            <div className="CorridorReleaseRate">
                <TitleCom title="走廊口放行率"></TitleCom>
                <CorridorReleaseRateBar barData={barData} bgData={bgData} />
            </div>
        )
    }
    
}