/**
 Crate by wanjikun on 19/10/28.
*/
import "./TerminalAreaPie.scss";
import echarts from 'echarts'
import areaPie1 from 'img/area-pie1.png'
import areaPie2 from 'img/area-pie2.png'
import areaPie3 from 'img/area-pie3.png'
import areaPie4 from 'img/area-pie4.png'
export default class TerminalAreaPie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            maxPer: ''
        }
        this.refDom = null;
        this.myChart = null;
        this.color = ['rgb(249,255,69)','rgb(0,133,254)']

    }

    componentDidMount() {
        this.myChart = echarts.init(this.refDom);
    }

    componentWillReceiveProps(newProps) {
        const {seriesData} = newProps;
        this.drawChart(this.formatData(seriesData));
        let option = this.myChart.getOption()
    }

    formatData = (data) => {
        let seriesData = data.filter(ele => ele.value !== 0);
        if(seriesData.length === 0) return seriesData
        let valueSum = seriesData.reduce((prev, cur) => {
            return prev.value + cur.value
        })
        seriesData.forEach(item => {
            item.pre = ((item.value / valueSum).toFixed(4) * 100).toFixed(2)
        })
        let maxPer = 0
        maxPer = seriesData.reduce((prev, cur) => {return prev.value > cur.value ? prev.pre : cur.pre})
        this.setState({maxPer: maxPer})
        let result = [], sum = 0
        for(let i = 0; i < seriesData.length; i++) {
            let obj = {...seriesData[i]}
            if((sum + seriesData[i].value / 2) / valueSum >=0.5) {
                obj.dir = 'left'
            } else {
                obj.dir = 'right'
            }
            // 设置label
            this.setLable(obj, i)
            sum += obj.value
            result.push(obj)
        }
        return result
    }

    setLable = (item, i) => {
        let width = 50,
            padding = []
        if(item.dir === 'left') {
            padding = [0, 0 - width, 0, 15]
        } else {
            padding = [0, 15, 0, 0 - width]
        }
        item.label =  {
            show: true,
            formatter: (value, i) => {
                // return `{b|${value.name}}\n{point|}\n{c|${item.pre}%}`;
                return `{transparent|${value.value}}\n{b|${value.name}}\n{point|}\n{c|${item.pre}%}\n{d|${value.value}}`;
            },
            show: true,
            fontSize:18,
            rich:{
                b: {
                    width: width,
                    fontSize: 20,
                    align: item.dir,
                    padding: padding,
                    color:'#fefefe'
                },
                point: {
                    height: 10,
                    width: 10,
                    borderRadius: 5,
                    backgroundColor: this.color[i],
                },
                c: {
                    width: 50,
                    fontSize: 20,
                    align: item.dir,
                    padding: padding,
                    fontFamily: 'lcd'
                },
                d:{
                    width: 50,
                    fontSize: 20,
                    align: item.dir,
                    padding: padding,
                    fontFamily: 'lcd',
                    // color:colors[i],
                },
                transparent:{
                    width: 50,
                    fontSize: 20,
                    align: item.dir,
                    padding: padding,
                    fontFamily: 'lcd',
                    color:'transparent',
                }
            }
        }

    }

    drawChart = (seriesData) => {
        this.myChart && this.myChart.clear();
        let option = {         
            series: [{
                type: 'pie',
                radius: ['150', '175'],
                center: ['50%', '50%'],
                color: this.color,
                itemStyle: {
                    normal: {
                        borderWidth: 2,
                        borderColor: '#031845',
                    }
                },
                data: seriesData,
                labelLine: {
                    normal: {
                        length:30,
                        length2:120
                    },
                },

            }]
        };

        this.myChart.setOption(option);
    }


    render() {
        const {maxPer} = this.state
        
        return (
            <div className={'TerminalAreaPie'}>
                {maxPer !== '' ? <span className={'maxPer'}>{maxPer}%</span> : null}
                
                <div className="chartDom" ref={view => this.refDom = view}>
                </div>
                <img className={'areapie'} src={areaPie1} />
                <img className={'areapie'} src={areaPie2} />
                <img className={'areapie'} src={areaPie3} />
                <img className={'areapie'} src={areaPie4} />
            </div>
        )
    }
}

TerminalAreaPie.propTypes = {
    seriesData:PropTypes.array.isRequired,
}
TerminalAreaPie.defaultProps = {
    // title:'标题',
}