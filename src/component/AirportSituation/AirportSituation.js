/* Create by zhangqin on 19/10/28 */
import axiosToken from "js/axiosToken";

import './AirportSituation.scss'
import takeoff from 'img/jczt_takeoff.png'
import passenger from 'img/jczt_passenger.png'
import cargo from 'img/jczt_cargo.png'
import CountUp from 'react-countup';
export default class AirportSituation extends Component {
    constructor(props) {
       super(props);
        this.state ={
            offLandSortie: 0,
            psgThroughput: 0,
            cargoThroughput: 0
        }
        this.getData = this.getData.bind(this);
    }
    
    componentDidMount() {
        console.log('realAddress',realAddress);
        
        this.getData();
        this.reloadId = setInterval(() => {
            this.getData();
        },globalTimer.integralSituation);
    }
    getData() {
        axiosToken({
            method: 'get',
            url: realAddressUrlOne + '/screen/integralSituation',
        }).then((res) => {
            if(res.data.code === 0){
                let result = res.data.result;
                this.setState({
                    offLandSortie: result.offLandSortie,
                    psgThroughput: result.psgThroughput,
                    cargoThroughput: result.cargoThroughput
                })
            }
        });
    }
    
    componentWillUnmount(){
        clearInterval(this.reloadId);
    }

    numberFormat=(value)=> {
            
        return Math.round(value/10000);
   }
    
    render() {
        let {offLandSortie, psgThroughput, cargoThroughput} = this.state
        let dataArr = [{
            name: '年起降架次',
            value: offLandSortie,
            icon: takeoff
        },{
            name: '年旅客吞吐',
            value: psgThroughput,
            icon: passenger
        },{
            name: '年货邮吞吐',
            value: cargoThroughput,
            icon: cargo
        }]
        return(
            <div className="AirportSituation">
                {
                    dataArr.map((item, index) => {
                        return (
                            <div className="item" key={index}>
                                <div className="left">
                                    <div className="inside"></div>
                                    <img src={item.icon}></img>
                                </div>
                                <div className="right">
                                    <p><CountUp end={this.numberFormat(item.value)} /><span className="unit">万</span></p>
                                    <span>{item.name}</span>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}
    