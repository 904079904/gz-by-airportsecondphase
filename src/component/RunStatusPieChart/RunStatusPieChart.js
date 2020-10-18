/**
 Crate by wanjikun on 19/10/28.
*/
import "./RunStatusPieChart.scss";
import boardingBridge from "img/boardingBridge.png";
import ladderControl from "img/ladderControl.png";
import runStatusEarth from "img/runStatusEarth.png";
import runStatusCircle from "img/runStatusCircle.png";
import runStatusEarthCircle from "img/runStatusEarthCircle.png";

import echarts from 'echarts'
export default class RunStatusPieChart extends Component {
    constructor(props) {
        super(props);
        this.refDom = null;
        this.myChart = null;
    }

    componentDidMount() {

        // 基于准备好的dom，初始化echarts实例
        this.myChart = echarts.init(this.refDom);

        const {seriesData} = this.props;
        this.drawChart(seriesData);
    }

    componentWillReceiveProps(newProps) {
        const {seriesData} = newProps;
        this.drawChart(seriesData);
    }

    //判断在lableline在左边还是右边
    judgeLableLineDirection=(data)=>{
        let total = 0;
        let tempData = data.filter(ele => ele.value !== 0);
        data.map((ele,ind)=>{
            total += ele.value;
        })
        for (let i = 0; i < tempData.length; i++) {
            let prveTotal = 0;
            for (let j = 0; j < i; j++) {
                prveTotal += tempData[j].value
                
            }
            tempData[i].ifRight = (tempData[i].value/2 + prveTotal)/total > 0.5 ? false : true;
        }
        return tempData;
    }

    drawChart = (seriesData) => {
        this.myChart && this.myChart.clear();
        let colors = this.props.colors;//每块的颜色

        let judgeData = this.judgeLableLineDirection(seriesData);
        let showLinePieData=[]; //外边隐形的有lableline的图的数据
        for (let i = 0; i < judgeData.length; i++) {
            const element = judgeData[i];

            let width = 50,
            padding = [],
            valuePadding=[];
            if(element.ifRight === false) {
                padding = [0, 0 - width, 0, 15]
            } else {
                padding = [0, 15, 0, 0 - width];
            }

            showLinePieData.push({
                name:element.name,
                value:element.value,
                labelLine:{
                    lineStyle:{
                        color:element.lineColor
                    },
                    length:10,
                    length2:70
                },
                label:{
                    show:true,
                    position: 'outside',
                    fontSize:20,
                    color:element.lineColor,
                    formatter: (value, i) => {
                        // return `{b|${value.name}}\n{point|}\n{c|${value.percent}%}`;
                        return `{transparent|${value.value}}\n{b|${value.name}}\n{point|}\n{c|${value.percent}%}\n{d|${value.value}}`;
                    },
                    rich:{
                        b: {
                            width: width,
                            fontSize: 20,
                            align: element.ifRight ? 'right' : 'left',
                            padding: padding,
                            color:'#fefefe',
                        },
                        point: {
                            height: 10,
                            width: 10,
                            borderRadius: 5,
                            backgroundColor: element.lineColor,
                        },
                        c: {
                            width: 50,
                            fontSize: 20,
                            align: element.ifRight ? 'right' : 'left',
                            padding: padding,
                            fontFamily: 'lcd',
                            color:element.lineColor,
                        },
                        d:{
                            width: 50,
                            fontSize: 20,
                            align:  'center',
                            padding: padding,
                            fontFamily: 'lcd',
                            color:element.lineColor,
                        },
                        transparent:{
                            width: 50,
                            fontSize: 20,
                            align: element.ifRight ? 'right' : 'left',
                            padding: padding,
                            fontFamily: 'lcd',
                            color:'transparent',
                        }
                    }
                }
            })
        }
        
        let option = {
            series: [{
                type: 'pie',
                radius: ['135', '155'],
                center: ['50%', '50%'],
                color:colors,
                itemStyle: {
                    normal: {
                        borderWidth: 2,
                        borderColor: '#031845',
                    }
                },
                data: seriesData,
                labelLine: {
                    show: false,
                },
                label:{
                    show:false
                }

            },{
                name: '',
                type: 'pie',
                animation:false,
                radius: [174, 175], //控制圈的大小，值差控制圈的宽度
                center:['50%','50%'],
                hoverAnimation: false,
                itemStyle:{
                    color:'transparent'
                },
                label:{
                    show:true
                },
                data: showLinePieData
            }]
        };

        this.myChart.setOption(option);
    }

    //计算总数
    calculateTotal(data){
        let total = 0;
        data.map(ele=>{
            total += ele.value;
        })
        return total;
    }

    render() {
        let total = this.calculateTotal(this.props.seriesData);
        return (
            <div className={'RunStatusPieChart'}>
                <div className="chartDom" ref={view => this.refDom = view}>
                </div>
                {
                    this.props.type === 'boardingBridge' ? <img src={boardingBridge} className="boardingBridge"></img> : <img src={ladderControl} className="ladderControl"></img> 
                }
                {/* // <img src={boardingBridge} className="boardingBridge"></img> */}
                <img src={runStatusEarth} className="runStatusEarth"></img>
                <img src={runStatusCircle} className="runStatusCircle"></img>
                
                <img src={runStatusEarthCircle} className="runStatusEarthCircle"></img>
                <div className="totalCount">
                    <span className="number">{total}</span>
                    <span>（台）</span>
                </div>
            </div>
        )
    }
}

RunStatusPieChart.propTypes = {
    seriesData:PropTypes.array.isRequired,
    type:PropTypes.string.isRequired,
    colors:PropTypes.array.isRequired,
}
RunStatusPieChart.defaultProps = {
    // title:'标题',
}