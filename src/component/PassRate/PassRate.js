/**
 Create by zhangqin on 2019/10/28
*/
import axiosToken from "js/axiosToken";

import {PassRateBar,TitleCom} from 'com/index'
import './PassRate.scss'
import airPlane from 'img/fxl_airplane.png';
import CountUp from 'react-countup';

import out from 'img/fxl_out.png';
import inside from 'img/fxl_inside.png';
export default class PassRate extends Component {
     constructor(props) {
       super(props);
        this.state = {
            normalRates: 0,
            accomplish: [],
            plan: [],
            adjust: [],
            scatterData: []
        }
     }
    
    componentDidMount() {
        this.getData();
        this.reloadId = setInterval(() => {
            this.getData();
        },globalTimer.monthYearPassRate)
     }
    getData(){
        axiosToken({
            method: 'get',
            url: realAddressUrlOne + '/screen/monthYearPassRate',
        }).then((res) => {
            if(res.data.code === 0){
                let result = res.data.result;
                //处理月数据
                let mothResult = this.compareData(result.month,result.monthPlan,result.monthReal)
                // 处理年数据
                let yearResult = this.compareData(result.year,result.yearPlan,result.yearReal)
                this.setState({
                    normalRates: result.normalRates,
                    accomplish: [mothResult.firstData, yearResult.firstData],
                    plan: [mothResult.secondData, yearResult.secondData],
                    adjust: [mothResult.thirdData,yearResult.thirdData],
                    scatterData: [result.month, result.year]// 光亮点
                })
            }
        });
    }

    compareData(accomplish,plan,adjust){//比较完成量、计划量的大小
        let subtraction = accomplish-plan,result={};
        if(subtraction>0){//完成大于计划
            result.firstData = {
                name: 'white',
                value:plan
            };
            result.secondData = {
                name: 'blue',
                value: subtraction
            };
            result.thirdData = {
                name: 'green',
                value: 0
            }
        }else if(subtraction<0){//完成小于计划
            result.firstData = {
                name: 'blue',
                value: accomplish
            };
            result.secondData = {
                name:'white',
                value: plan-accomplish
            };
            result.thirdData = {
                name:'green',
                value: Math.abs(adjust-plan).toFixed(2)
            }
        }else{//完成等于计划
            result.firstData = {
                name: 'blue',
                value: accomplish
            };
            result.secondData = {
                name:'white',
                value: 0
            };
            result.thirdData = {
                name:'green',
                value: 0
            }
        }
        return result
    }
    componentWillUnmount(){
        clearInterval(this.reloadId);
    }
    
     render() {
        let {normalRates,accomplish,plan,adjust,scatterData} = this.state;
        let barData = {normalRates,accomplish,plan,adjust,scatterData};
       return(
         <div className="PassRate">
            <TitleCom title="放行率"></TitleCom>
            <div className="passRateAnimateCom">
                <img src={out} className="outCircle" />
                <img src={inside} className="insidebg" />
                <div className="inside">
                    <img src={airPlane} />
                    <div className="number">
                        <CountUp end={normalRates} decimals={2}></CountUp>
                        <i>%</i>
                    </div>
                </div>
            </div>
            {/* <img src={out} className="outCircle" />
            <img src={inside} className="insidebg" />
            <div className="inside">
                <img src={airPlane} />
                <div className="number">
                    <CountUp end={normalRates}></CountUp>
                    <i>%</i>
                </div>
            </div> */}
            
            <div className="PassRateBarCom">
                <PassRateBar barData={barData} />
            </div>
        </div>
       )
     }
    }
    