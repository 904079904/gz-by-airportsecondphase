import axiosToken from "js/axiosToken";

import './TaxiDispatch.scss';
import {TitleCom,TexiPictorialBar,TexiCustomBar} from 'com/index';
import completeDispatch from 'img/texi_complete _dispatch.png';
import posDispatch from 'img/texi_pos_dispatch.png';
import CountUp from 'react-countup';
import arrowsLine from 'img/csc_line.png';
import trangle from 'img/csc_trangle.png';
export default class TaxiDispatch extends Component {
    constructor(props){
        super(props);
        this.state = {
            capacity: 0,//调度场总容量
            used: 0,//调度场使用量
            rate:0,//使用率
            pictorialData: [],//象形柱图数据
            capacityMax: 0,//蓄车池最大容量
            carPoolData: [],//蓄车池数据
        }
    }
    componentDidMount(){
        this.getData();
        this.reloadID = setInterval(() => {
            this.getData()
        },globalTimer.dispatchParkCapacity)
    }
    componentWillUnmount(){
        clearInterval(this.reloadID);
    }
    async getData() {
        let res1 = await axiosToken({//出租车调度
            method: 'get',
            url: realAddressUrlOne + '/screen/dispatchParkCapacity',
        })
        let res2 = await axiosToken({//蓄车池
            method: 'get',
            url: realAddressUrlOne + '/screen/carPoolFlowAmount',
        })
        if(res1.data.code===0&&res2.data.code===0){
            let result1 = res1.data.result,result2 = res2.data.result;
            /*获取出租车调度—调度场容量*/
            let rate = (result1.used/result1.capacity).toFixed(2)*100// 使用率*100
            
            /*获取蓄车池流量统计*/
            let sortArr = [];
            // 对返回的结果数组排序（A、B、T2）
            result2.map(item => {
                switch(item.code){
                    case 'A':
                        sortArr[0] = item
                        break;
                    case 'B':
                        sortArr[1] = item
                        break;
                    case 'T2':
                        sortArr[2] = item
                        break;
                }
            })
            result2 = sortArr;
            let carPoolData = result2.map(item => (
                    {
                        capacity: item.capacity,
                        done: item.done,
                        need: item.need,
                        pos: item.pos,
                    }
                )),
                //容量
                capacity = result2.map(item => {
                    return item.capacity
                });
            // 最大容量
            let capacityMax = capacity.sort(function(a,b){return b-a})[0]
            let pictorialData = result2.map(item => {//返回为蓄车池在场车辆的占比，留两位小数
                // return (item.wait/capacityMax).toFixed(2)
                return (item.wait/item.capacity).toFixed(2)
            })
            this.setState({
                capacity: result1.capacity,
                used: result1.used,
                rate:rate,
                pictorialData: pictorialData,
                capacityMax: capacityMax,
                carPoolData: carPoolData,
            })
        }
    }
    render(){
        let {capacity,used,rate,pictorialData,capacityMax,carPoolData} = this.state;
        return(
            <div className="TaxiDispatchCom">
                <TitleCom title={'出租车调度'}></TitleCom>
                <div className="content TaxiDispatchContent">
                    {/* 横向柱图 */}
                    <div className="customBarCom">
                        <div className="totalCapacity">今日出租车调度场总容量：
                            <CountUp end={capacity} /><i>(辆)</i>
                        </div>
                        <TexiCustomBar used={used} rate={rate} />
                    </div>

                    {/* 箭头动画+蓄车池分类名 */}
                    <div className="ItemCom">
                        {
                            (function(){
                                let itemArr = [];
                                for(let i = 0;i <3;i++){
                                    itemArr.push(
                                        <div className="item" key={i}>
                                            <div className="arrowsCom">
                                                {/* 箭头 */}
                                                <img src={arrowsLine} />
                                                <div className="arrows">
                                                    {//三角形（横向3个为一组）
                                                        (function(){
                                                            let arr = []
                                                            for(let j = 0; j < 3; j++) {
                                                                arr.push(
                                                                    <div className={"trangle trangle"+j} key={j}>
                                                                        <img src={trangle} />
                                                                        <img src={trangle} />
                                                                        <img src={trangle} />
                                                                    </div>
                                                                )
                                                            }
                                                            return arr
                                                        })()
                                                    }
                                                </div>
                                            </div>
                                                
                                            {/* 蓄车池名 */}
                                            <div className={"nameCom nameCom"+i}>
                                                <p>{i===2?"蓄车池":"区蓄车池"}</p>
                                            </div>
                                        </div>
                                    )
                                }
                                return itemArr;
                            })()
                        }
                    </div>
                    {/* 蓄车池数据（容量、完成派遣、pos机派遣） */}
                    <div className="carPoolCom">
                        <div className="flexCom">
                            {
                                carPoolData.map((item,index) => {
                                    return (
                                        <div className="flexItem" key={index}>
                                            {/* 容量 */}
                                            <p>容量：
                                                <CountUp end={item.capacity}/>
                                                <i>(辆)</i></p>
                                            {/* 派遣 */}
                                            <div className={index===1 ? "dispatch dispatch2": "dispatch"}>
                                                <div className="completeDispatch dispatchDefault">
                                                    <img src={completeDispatch} />
                                                    <div className="text">
                                                        <CountUp end={item.done}/>
                                                        <p>完成派遣数(辆)</p>
                                                    </div>
                                                </div>
                                                <div className="posDispatch dispatchDefault">
                                                    <img src={posDispatch} />
                                                    <div className="text">
                                                        <CountUp end={item.pos}/>
                                                        <p>POS机派遣数(辆)</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        {/* 纵向柱图 */}
                        <div className="pictorialBarCom">
                            <div className="barChartCom">
                                {
                                    carPoolData.map((item,index) => {
                                        return (
                                            <div className="barChart" key={index}>
                                                <TexiPictorialBar pictorialData={pictorialData[index]} id={"TexiBarChart"+index} />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            {/* 总需求 */}
                            <div className="totalDemand">
                                {
                                    carPoolData.map((item,index) => {
                                        return (
                                            <div className="flexChild" key={index}>
                                                <div className="demandItem">
                                                    总需求数:
                                                    <CountUp end={item.need} />
                                                    <i>(辆)</i>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}