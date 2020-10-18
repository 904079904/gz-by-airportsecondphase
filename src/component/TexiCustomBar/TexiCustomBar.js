/* Create by zhangqin on 2019/12/03 */
import './TexiCustomBar.scss';
import barBg from 'img/jskq_bar_bg.png';
import scatterImg from 'img/scatter_img.png';
import barImg from 'img/jskq_bar_img.png';
var BarImg = new Image();
BarImg.src = barImg;
import car from 'img/texi_car.png'

export default class TexiCustomBar extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
        this.myChart = null;
    }

    componentDidMount(){
        this.myChart = echarts.init(document.getElementById('TexiCustomBar'));
        // this.draw(this.props.used,this.props.rate)
    }
    componentWillReceiveProps(nextProps){
        this.draw(nextProps.used,nextProps.rate)
    }
    renderItem(params, api){
        let categoryIndex = api.value(1);
        let start = api.coord([api.value(1), categoryIndex]);
        let x = 1107*api.value(0)/100;//柱图在x轴上的长度
        return {
            type: 'group',
            children: [
                {// 纹理背景
                    type: 'image',
                    style: {
                        image: barBg,
                        width: 1157,
                        height: 59,
                        x: 0,
                        y: start[1]-30
                    }
                },
                {// 多边形
                    type: 'polygon',
                    position: [0,120],
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
                },
                {// 小车图片
                    type: 'image',
                    style: {
                        image: car,
                        width: 289,
                        height: 188,
                        x: x<165 ? -289 : x-270,
                        y: -25
                    }
                },
            ]

        }
    }

    draw(used,rate){
        this.myChart.clear()
        let option = {
            grid: {
                left: 0,
                right: 168,
                top:120,
                bottom:0
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
                renderItem: this.renderItem,
                data: [rate],
                silent: true,
                boundaryGap: false,
            },
            {
                data: [rate],
                type: 'bar',
                barWidth: 59,
                silent: true,
                label: {
                    show: true,
                    position: "right",
                    offset: [50, -8],
                    fontSize: 60,
                    color: "#F5E22B",
                    fontFamily: 'lcd',
                    formatter: '{a|'+used+'}{b|(辆)}',
                    rich: {
                        a: {
                            fontSize: 60,
                            fontFamily:'lcd',
                            color: '#F5E22B',
                        },
                        b: {
                            fontSize: 22,
                            color: '#fff',
                            padding: [-35,0,0,0]
                        },
                    }
                },
                itemStyle: {
                    color: 'rgba(0,0,0,0)'
                },
                boundaryGap: false,
            },
            {
                data: [rate],
                type: 'scatter',
                symbol: 'image://'+scatterImg,
                symbolSize: 159,
                symbolOffset: [26,0],
                symbolRotate: -4,
                silent: true,
                boundaryGap: false,
            }]
        }
        this.myChart.setOption(option)
    }
    render(){
        return(
            <div id="TexiCustomBar"></div>
        )
    }
}