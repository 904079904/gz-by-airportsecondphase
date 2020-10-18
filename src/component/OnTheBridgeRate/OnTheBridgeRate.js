/* Create by zhangqin on 2019/10/30 */
import axiosToken from "js/axiosToken";

import './OnTheBridgeRate.scss'
import {TitleCom} from 'com/index'
import barBg from 'img/jskq_bar_bg.png';
import barImg from 'img/jskq_bar_img.png';
import scatterImg from 'img/scatter_img.png';
var BarImg = new Image();
BarImg.src = barImg;

export default class OnTheBridgeRate extends Component {
    constructor(props){
        super(props);
        this.state = {
            rate: null
        };
        this.myChart = null;
        this.defaultOption = this.defaultOption.bind(this)
    }
    componentDidMount(){
        this.myChart = echarts.init(document.getElementById("barChart"))
        this.defaultOption();
        this.getData();
        this.reloadID = setInterval(() => {
            this.myChart.clear();
            this.defaultOption();
            this.draw(this.state.rate)
        },globalTimer.positionTotalityByBridgeRate)
    }
    getData(){// 获取数据
        axiosToken({
            method: 'get',
            url: realAddressUrlOne + '/screen/positionTotalityByBridgeRate',
        }).then((res) => {
            if(res.data.code === 0){
                let result = res.data.result;
                this.draw(result.rate);
                this.setState({
                    rate: result.rate
                })
            }
        });
    }
    componentWillUnmount(){
        clearInterval(this.reloadID);
    }
    renderItem(params, api){
        let categoryIndex = api.value(1);
        let start = api.coord([api.value(1), categoryIndex]);
        let x = 1115*api.value(0)/100;//柱图在x轴上的长度
        return {
            type: 'group',
            children: [
                {// 纹理背景
                    type: 'image',
                    style: {
                        image: barBg,
                        width: 1165,
                        height: 59,
                        x: 0,
                        y: start[1]-30
                    }
                },
                {// 多边形
                    type: 'polygon',
                    position: [0,88],
                    shape: {
                        points:[[0,0], [0, 59], [x+50, 59], [x, 0]],
                    },
                    style: {
                        fill: new echarts.graphic.LinearGradient(
                            0, 0, 1, 0,
                            [
                                {offset: 0, color: 'rgba(0,63,156,0.3)'},
                                {offset: 1, color: 'rgba(0,220,212,0.7)'}
                            ]
                        )
                    }
                }
            ]

        }
    }
    defaultOption(){
        var option = {
            grid: {
                left: 0,
                right: 50,
            },
            xAxis: {
                type: 'value',
                show: false,
                max: 100,
            },
            yAxis: {
                type: 'category',
                show: false,
                data: [],
            },
            series: [
                {
                type: 'custom',
                id: 'barBg',
                renderItem: this.renderItem,
                data: [],
                silent: true,
            },
            {
                data: [65],
                type: 'bar',
                id: 'rate',
                barWidth: 59,
                silent: true,
                label: {
                    show: true,
                    position: "insideRight",
                    // offset: [50, -80],
                    offset: [100, -80],
                    fontSize: 60,
                    color: "#F5E22B",
                    fontFamily: 'lcd',
                    formatter: "{c}%"
                },
                itemStyle: {
                    color: 'rgba(0,0,0,0)'
                }
            },
            {
                data: [100],
                type: 'scatter',
                id: 'scatter',
                symbol: 'image://'+scatterImg,
                symbolSize: 159,
                symbolOffset: [26,0],
                symbolOffset: [70,0],
                symbolRotate: -4,
                silent: true,
            }
        ]
        }
        this.myChart.setOption(option)
    }
    draw(rate){
        this.myChart.setOption({
            series: [
                {id: 'rate', data: [rate]},
                {id: 'barBg', data: [rate]},
                {id: 'scatter', data: [rate]},
            ]
        })
    }
    render(){
        return(
            <div className="OnTheBridgeRate">
                <TitleCom title="今日靠桥率"></TitleCom>
                <div className="OnTheBridgeRateCont">
                    <div id="barChart"></div>
                </div>
                {/* <canvas id="myCanvas" width="200" height="100"></canvas> */}
            </div>
        )
    }
}