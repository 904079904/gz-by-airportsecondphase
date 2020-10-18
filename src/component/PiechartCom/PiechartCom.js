/**
 Crate by wanjikun on 19/10/28.
*/
import "./PiechartCom.scss";
import pieChartPlane from "img/pieChartPlane.png";
import pieChartCircle from "img/pieChartCircle.png";
export default class PiechartCom extends Component {
    constructor(props) {
        super(props);
        this.refDom = null;
        this.myChart = null;
    }

    componentDidMount() {

        // 基于准备好的dom，初始化echarts实例
        this.myChart = echarts.init(this.refDom);

        const {seriesData,color} = this.props;
        this.drawChart(seriesData,color);
    }

    componentWillReceiveProps(newProps) {
        const {seriesData,color} = newProps;
        this.drawChart(seriesData,color);
    }

    drawChart = (seriesData,color) => {
        this.myChart && this.myChart.clear();

        let option = {
            
            legend: {
                show: true,
                orient: 'vertical',
                selectedMode:false,//取消图例上的点击事件
                right: '15%',
                top:50,
                textStyle:{
                    fontSize:20,
                    color:'#c1c1c1',
                    padding:[5,0,0,10]
                },
                itemGap:30,
                // data:legendData,
                itemWidth:15,
                itemHeight:15,
            },
            
            series: [{
                type: 'pie',
                radius: ['80', '100'],
                center: ['32%', '50%'],
                color:color,
                itemStyle: {
                    normal: {
                        borderWidth: 5,
                        borderColor: '#031845',
                    }
                },
                // minAngle:5,
                data: seriesData,
                label: {
                    show: true,
                    normal: {
                        formatter: ele=>{
                            return ele.value === 0 ? '' :`{a|${ele.value}}` ;
                            // return ele.value === 0 ? '' : ele.value ;
                        },
                        show: true,
                        fontSize:18,
                        rich:{
                            a:{
                                padding:[0,0,10,10],
                                fontSize:20,
                            }
                        }
                    },
                },
                labelLine: {
                    normal: {
                        show: false,
                        length:24,
                        length2:10
                    },
                },

            }]
        };

        this.myChart.setOption(option);
    }


    render() {
        // const {title} = this.props;
        return (
            <div className={'PiechartCom'}>
                <div className="chartDom" ref={view => this.refDom = view}>
                    {/* {title} */}
                            饼图组件
                </div>
                <img src={pieChartPlane} className="pieChartPlane"></img>
                <img src={pieChartCircle} className="pieChartCircle"></img>
            </div>
        )
    }
}

PiechartCom.propTypes = {
    seriesData:PropTypes.array.isRequired,
    color:PropTypes.array.isRequired,
}
PiechartCom.defaultProps = {
    // title:'标题',
}