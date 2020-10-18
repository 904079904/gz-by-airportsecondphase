/* Create by zhangqin on 2019/10/28 */
import axiosToken from "js/axiosToken";

import {ImplementationRateBar,TitleCom} from 'com/index'
import './ImplementationRate.scss';
import CountUp from 'react-countup';
export default class ImplementationRate extends Component {
     constructor(props) {
       super(props);
        this.state = {
            global: 0,
            PsgCabin: [],
            CargoCabin: [],
        }
        this.getData = this.getData.bind(this);
     }
    
    componentDidMount() {
        this.getData();
        this.reloadId = setInterval(() => {
            this.getData();
        },globalTimer.safeguardExecRate);
    }
    getData(){
        axiosToken({
            method: 'get',
            url: realAddressUrlOne + '/screen/safeguardExecRate',
        }).then((res) => {
            if(res.data.code === 0){
                let result = res.data.result;
                this.setState({
                    global: result.global,
                    PsgCabin: [result.airportPsgCabin,result.airportCargoCabin],
                    CargoCabin: [-result.czPsgCabin, -result.czCargoCabin],
                })
            }
        });
    }

    componentWillUnmount(){
        clearInterval(this.reloadId);
    }
    
     render() {
        let {global,PsgCabin,CargoCabin} = this.state;
        let barData = {PsgCabin,CargoCabin}
       return(
         <div className="ImplementationRate">
            <TitleCom title="今日目标保障完成时刻的执行率分析"></TitleCom>
            <div className="ImplementationRateBarCom">
                <div className="global">整体符合率：
                    <span className="number"><CountUp end={global} duration={3}></CountUp></span>
                    <i>%</i>
                </div>
                <ImplementationRateBar barData={barData} />
            </div>
        </div>
       )
     }
    }
    