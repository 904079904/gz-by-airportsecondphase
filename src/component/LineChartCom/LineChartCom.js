/**
 Crate by wanjikun on 19/10/29.
*/
import "./LineChartCom.scss";
export default class LineChartCom extends Component{
 constructor(props) {
   super(props);
   this.myChart = null;
   this.chartDom = null;
 }

 componentDidMount() {
    const {xData,yData} = this.props;
    this.drawChart(xData,yData);
 }

componentWillReceiveProps(newProps) {
    const {xData,yData} = newProps;
    this.drawChart(xData,yData);
}

 drawChart=(xData,yData)=>{


     // 基于准备好的dom，初始化echarts实例
     this.myChart = echarts.init(this.chartDom);
 
     const seriesData = [];
     const legendName = [];
     const legendColor=[]
     for (let i = 0; i < yData.length; i++) {
        const element = {
            name:yData[i].name,
            symbol:'none',
            // smooth:true,
            stack: '总量',
            type:'line',
            lineStyle:{
                color:yData[i].color
            },
            areaStyle: {
                color:yData[i].areaStylecolor
            },
            data:yData[i].data,
            
        }
         seriesData.push(element);
         legendName.push(yData[i].name);
         legendColor.push(yData[i].color)
     }
     
    //  console.log('xData',xData);
    //  console.log('yData',yData);

     
     // 指定图表的配置项和数据
     let option = {
        legend: {
            data:legendName,
            textStyle:{
                color:'#fff',
                fontSize: 20
            },
            right:100,
            top:20
        },
        grid:{
            // top:100,
            // left:60,
            left: '3%',
            right: '4%',
            bottom: '3%',
            top: '16%',
            containLabel: true,
        },
        color:legendColor,
        xAxis: {
            type: 'category',
            // boundaryGap: false,
            data: xData,
            axisTick:{
                show:false
            },
            axisLine:{
                lineStyle:{
                    color:'#6E779D',
                }
            },
            axisLabel:{
                fontSize:20
            }
        },
        yAxis: {
            type: 'value',
            name:'架/次',
            nameTextStyle:{
                fontSize:20
            },
            axisTick:{
                show:false
            },
            axisLine:{
                lineStyle:{
                    color:'#6E779D'
                }
            },
            axisLabel:{
                fontSize:20
            },
            //网格样式
            splitLine: {
                show: true,
                lineStyle:{
                    color: '#575D83',
                }
            }
        },
        series: seriesData
    };



    
    this.myChart.clear();

     // 使用刚指定的配置项和数据显示图表。
     this.myChart.setOption(option);
    
 }

 render() {
   return(
     <div className={'LineChartCom'} ref = {ref => this.chartDom = ref}></div>
   )
 }
}

LineChartCom.propTypes = {
    xData:PropTypes.array.isRequired,
    yData:PropTypes.array.isRequired,
}
LineChartCom.defaultProps = {}