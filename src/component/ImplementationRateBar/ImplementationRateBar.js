/* Create by zhangqin on 2019/10/28 */
import './ImplementationRateBar.scss'
import barBg from 'img/implementation_bar_bg.png';
import yAxisBg from 'img/implementation_yAxis_bg.png';
export default class ImplementationRateBar extends Component {
    constructor(props) {
        super(props);
        this.myChart = null;
        this.defaultOption = this.defaultOption.bind(this);
        this.draw = this.draw.bind(this);
    }
    componentDidMount() {
        this.myChart = echarts.init(document.getElementById("ImplementationRateBar"));
        this.defaultOption()
    }
    componentWillReceiveProps(nextProps) {
        this.myChart.clear();
        this.defaultOption()
        this.draw(nextProps.barData)
    }
    renderItem(params, api) {
        // 自定义系列
        let categoryIndex = api.value(1);
        let start = api.coord([api.value(1), categoryIndex]);
        return {
            type: 'group',
            children: [{// 背景纹理
                type: 'image',
                style: {
                    image: barBg,
                    width: 338,
                    height:32,
                    x: 150,
                    y: start[1] - 16,
                }
            }, {// 中垂线
                type: 'image',
                style: {
                    image: yAxisBg,
                    x: 312.5,
                    y: 62,
                }
            }]
        }
    }

    defaultOption() {
        var option = {
            color: ["blue", "#00C2F5","#DAF3FF"],
            legend: {
                itemWidth: 17,
                itemHeight: 17,
                textStyle: {
                    color: '#ffffff',
                    fontSize: 20
                },
                data: ['客舱门', '货舱门'],
                itemGap: 28,
                top: 10,
                right: '5%'
            },
            grid: {
                left: '2%',
                right: '5%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                show: false,
                min: -100,
                max: 100,
            }
            ,
            yAxis: {
                type: 'category',
                axisTick: { show: false },
                inverse: true,
                axisLabel: {
                    color: '#ffffff',
                    fontSize: 18
                },
                axisLine: {
                    show: false
                },
                data: ['机场代理：', '南航及其他代理：']
            },
            series: [
                {
                    type: 'custom',
                    renderItem: this.renderItem,
                    silent: true,
                    data: [100,100]
                },
                {
                    name: '客舱门',
                    id: 'psg',
                    type: 'bar',
                    stack: '总量',
                    barWidth: 20,
                    label: {
                        show: true,
                        position: 'insideRight',
                        formatter: '{c}%',
                        color: '#fff',
                        fontFamily: 'lcd',
                        fontSize: 20,
                        offset: [-4, -2]
                    },
                    data: []
                },
                {
                    name: '货舱门',
                    id: 'cargo',
                    type: 'bar',
                    stack: '总量',
                    barWidth: 20,
                    label: {
                        show: true,
                        position: 'insideLeft',
                        formatter: function (value) {
                            let num = null;
                            num = Math.abs(value.value);
                            return num + '%'
                        },
                        color: '#fff',
                        fontFamily: 'lcd',
                        fontSize: 20,
                        offset: [4, -2]
                    },
                    data: []
                }
            ]
        };
        this.myChart.setOption(option);
    }
    draw(barData) {
        this.myChart.setOption({
            series: [
                {
                    id: 'psg', data: barData.PsgCabin.map((i, j) => {
                        return {

                            itemStyle: {
                                barBorderRadius: [0, 10, 10, 0],
                                color: new echarts.graphic.LinearGradient(
                                    0, 0, 1, 1,
                                    [
                                        { offset: 0, color: 'rgba(9,237,179,.2)' },
                                        { offset: 1, color: 'rgba(9,237,179,.9)' }
                                    ]
                                )
                            },
                            value: i
                        }
                    })
                },
                {
                    id: 'cargo', data: barData.CargoCabin.map((i, j) => {
                        return {

                            itemStyle: {
                                barBorderRadius: [10, 0, 0, 10],
                                color: new echarts.graphic.LinearGradient(
                                    0, 0, 1, 1,
                                    [
                                        { offset: 0, color: 'rgba(0,194,245,.9)' },
                                        { offset: 1, color: 'rgba(0,194,245,.2)' }
                                    ]
                                ),
                            },
                            value: i
                        }
                    })
                }
            ]
        })
    }
    render() {
        return (
            <div id="ImplementationRateBar"></div>
        )
    }
}