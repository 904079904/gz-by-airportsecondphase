/* Create by zhangqin 2019/10/28 */
import './PassRateBar.scss'
import barBg from 'img/passRate_bar_bg.png'
import scatterBg from 'img/passRate_scatter_bg.png';
// var scatterBgImg = new Image();
// scatterBgImg.src = scatterBg;
export default class PassRateBar extends Component {
    constructor(props) {
        super(props);
        this.myChart = null;
        this.defaultOption = this.defaultOption.bind(this)
        this.draw = this.draw.bind(this)
        this.renderItem = this.renderItem.bind(this)
        this.colorLabelSelection = this.colorLabelSelection.bind(this)
    }
    componentDidMount() {
        this.myChart = echarts.init(document.getElementById("PassRateBar"));
        this.defaultOption()
    }
    componentWillReceiveProps(nextProps) {
        this.draw(nextProps.barData);
    }
    renderItem(params, api) {
        // 自定义系列
        let categoryIndex = api.value(1);
        let start = api.coord([api.value(1), categoryIndex]);
        return {// 背景阴影
            type: 'image',
            style: {
                image: barBg,
                //   width: 500,
                width: 503,
                height: 17,
                x: 71,
                y: start[1] - 8.5,
            }
        }
    }

    defaultOption() {
        var option = {
            color: ['red', '#00C2F5', '#DAF3FF', '#09EDB4'],
            legend: {
                itemWidth: 17,
                itemHeight: 17,
                textStyle: {
                    color: '#F9FDFF',
                    fontSize: 20
                },
                itemGap: 28,
                right: 10,
                top: 10,
                data: ['已完成', '计划目标', '调整目标']
            },
            grid: {
                left: '3%',
                right: '5%',
                containLabel: true,
                height: 200
            },
            xAxis: {
                type: 'value',
                show: false,
                max: 100,
            },
            yAxis: {
                type: 'category',
                data: ['本月', '本年'],
                inverse: true,
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    color: '#C1C4CE',
                    fontSize: 24
                }
            },
            series: [
                {
                    type: 'custom',
                    renderItem: this.renderItem,
                    silent: true,
                    data: [100, 100],
                    itemStyle: {
                        borderColor: 'red',
                        borderWidth: 3
                    }
                },
                {
                    name: '已完成',
                    type: 'bar',
                    id: 'accomplish',
                    stack: '总量',
                    label: {
                        show: true,
                        position: 'insideRight',
                        // offset: [10, -35],
                        offset: [10, -25],
                        color: '#00C2F5',
                        formatter:'{c}%',
                        fontFamily: 'lcd',
                        fontSize: 24
                    },
                    barWidth: 11,
                    silent: true,
                    data: [],
                },
                {
                    name: '计划目标',
                    type: 'bar',
                    id: 'plan',
                    stack: '总量',
                    label: {
                        show: true,
                        position: 'insideRight',
                        // offset: [10, -35],
                        offset: [20, 20],
                        color: '#DAF1FF',
                        formatter: '{c}%',
                        fontFamily: 'lcd',
                        fontSize: 24
                    },
                    barWidth: 11,
                    silent: true,
                    data: [],
                    animationDelay: 100
                },
                {
                    name: '调整目标',
                    type: 'bar',
                    id: 'adjust',
                    stack: '总量',
                    label: {
                        show: true,
                        position: 'insideRight',
                        offset: [20, -25],
                        color: '#09EDB4',
                        formatter: (item) => {
                            if (item.value === 0) {
                                return '';
                            } else {
                                return item.value + '%';
                            }
                        },
                        fontFamily: 'lcd',
                        fontSize: 24
                    },
                    barWidth: 11,
                    silent: true,
                    data: [],
                    animationDelay: 200
                },
                {
                    name: '已完成光点',
                    type: 'scatter',
                    id: 'scatter',
                    barWidth: 11,
                    silent: true,
                    symbol: 'none',
                    symbolSize: 50,
                    data: [],
                }
            ]
        };
        this.myChart.setOption(option);
    }

    colorSelection(color) {//判断柱图显示颜色
        var barColor = null;
        switch (color) {
            case 'blue':
                barColor = new echarts.graphic.LinearGradient(
                    0, 0, 1, 0,
                    [
                        { offset: 0, color: 'rgba(10,71,175,1)' },
                        // { offset: 1, color: 'rgba(17,184,242,0.7)' }
                        { offset: 1, color: 'rgba(10,71,175,1)' }
                    ]
                )
                break;
            case 'white':
                barColor = new echarts.graphic.LinearGradient(
                    0, 0, 1, 0,
                    [
                        { offset: 0, color: 'rgba(172,205,255,0.7)' },
                        { offset: 1, color: 'rgba(172,205,255,0.7)' }
                    ]
                )
                break;
            case 'green':
                barColor = new echarts.graphic.LinearGradient(
                    0, 0, 1, 0,
                    [
                        { offset: 0, color: 'rgba(11,147,168,0.7)' },
                        { offset: 1, color: 'rgba(6,231,157,0.7)' }
                    ]
                )
                break;
        }
        return barColor
    }
    //name 判断label所需的颜色
    colorLabelSelection(name){
        switch (name) {
            case 'blue':
                return "#00C2F5";
            case 'white':
                return "#DAF1FF";
            case 'green':
                return "#09EDB4"
        }

    }

    draw(nextProps) {
        let { accomplish, plan, adjust, scatterData } = nextProps;
        this.myChart.clear();
        this.defaultOption()
        this.myChart.setOption({
            series: [
                {
                    id: 'accomplish', data: accomplish.map(item => {
                        return {
                            value: item.value,
                            itemStyle: {
                                color: this.colorSelection(item.name),
                            },
                            label:{
                                color:this.colorLabelSelection(item.name),
                            }
                        }
                    })
                },
                {
                    id: 'scatter', data: scatterData.map(item => {
                        return {
                            value: item,
                            symbol: item === 0 ? 'none' : 'image://' + scatterBg,
                        }
                    })
                },
                {
                    id: 'plan', data: plan.map(item => {
                        return {
                            value: item.value,
                            itemStyle: {
                                color: this.colorSelection(item.name),
                            },
                            label: {
                                color:this.colorLabelSelection(item.name),
                                formatter: (item) => {//label数据显示加上前一个柱条的堆叠值
                                    let data = parseFloat(this.myChart.getOption().series[1].data[item.dataIndex].value)
                                    return item.data.value===0?'':(parseFloat(item.data.value) + data) + '%'
                                     
                                },
                            }
                        }
                    })
                },
                {
                    id: 'adjust', data: adjust.map(item => {
                        return {
                            value: item.value,
                            itemStyle: {
                                color: this.colorSelection(item.name),
                            },
                            label: {
                                color: this.colorLabelSelection(item.name),
                                formatter: (item) => {//label数据显示加上前两个柱条的堆叠值
                                    switch (item.data.value) {
                                        case 0:
                                            return '';
                                        default:
                                            let data1 = parseFloat(this.myChart.getOption().series[1].data[item.dataIndex].value)
                                            let data2 = parseFloat(this.myChart.getOption().series[2].data[item.dataIndex].value)
                                            return (parseFloat(item.data.value) + data1 + data2) + '%'
                                    }
                                },
                            }
                        }
                    })
                }
            ]
        })
    }
    render() {
        return (
            <div id="PassRateBar"></div>
        )
    }
}