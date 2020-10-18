/**
 Crate by wanjikun on 19/11/13.
*/
import './PictorialBar.scss'
import pictorialBarBg  from "img/pictorialBarBg.png";
import triangle from "img/triangle.png";
export default class PictorialBar extends Component{
 constructor(props) {
   super(props);
   this.myChart = null;
   this.chartDom = null;
   this.state={
       domHeight:'100%',
   }
 }

componentWillReceiveProps(nextProps){
    const { valueData ,nameData} = nextProps;
    if (valueData.length > 0) {
        this.setHeight(valueData.length,valueData ,nameData);
    }
}
setHeight=(len,valueData ,nameData)=>{
    let height = len*40+'px';
    this.setState({
        domHeight:height
    },()=>{
        setTimeout(()=>{
            this.drawChart(valueData,nameData);
        },500)
    })

        // this.chartDom.style.height = len*40+'px';
}
drawChart=(valueData,nameData)=>{
    // this.myChart = null;
    // 基于准备好的dom，初始化echarts实例
    this.myChart = echarts.init(this.chartDom);
    
    this.myChart.clear();

    let option = {
        // backgroundColor:'red',
        grid: {
            containLabel: true,
            left: 120,
            top:0,
            right:50,
            bottom:0,
        },
        yAxis: {
            data: nameData,
            inverse: true,
            axisLine: {show: false},
            axisTick: {show: false},
            axisLabel: {
                show:false,
                margin: 30,
                color:'#4EBEE5',
                textStyle: {
                    fontSize: 36
                },
                // 使用函数模板，函数参数分别为刻度数值（类目），刻度的索引
                formatter: function (value, index) {
                    return `{a|${index+1}}{b|${value}}`
                },
                rich:{
                    a:{
                        fontSize: 36,
                    },
                    b:{
                        width:180,
                        backgroundColor:'red',
                        fontSize: 36,
                        align:'left',
                        padding:[0,20,0,0]
                    }
                }
            },
            axisPointer: {
                label: {
                    show: true,
                    margin: 30
                }
            }
        },
        xAxis: {
            splitLine: {show: false},
            axisLabel: {show: false},
            axisTick: {show: false},
            axisLine: {show: false}
        },
        series:[
            { //内渐变柱图
                name: '2011年',
                type: 'bar',
                barWidth:8,
                itemStyle:{
                  color:new echarts.graphic.LinearGradient(
                            0,1, 1, 1,
                            [
                                {offset: 0, color: '#0071b9'},
                                {offset: 1, color: '#00ffff'}
                            ]
                        ),
                    barBorderRadius: 8, 
                },
                data: valueData,
                z:8,
            },
            { //外柱图背景
                 name: 'barBg',
                 type: 'custom',
                 renderItem(params,api) {
                    const { dataIndex } = params;
                    let categoryIndex = api.value(1);
                    let start = api.coord([api.value(1), categoryIndex]);
                    return {
                        // 一组图形元素
                        type: 'group',
                        children: [{
                        type: 'image',
                        style: {
                            image: pictorialBarBg,
                            x: 120,
                            // y: 12 + dataIndex*40,
                            y: start[1] - 8,
                            width: 258,
                            height: 14,
                        },
                        }],
                    };
                 },
                 data: valueData,
                 z: 5,
             },
             { //左侧三角形
                name: 'barBg',
                type: 'custom',
                renderItem(params,api) {
                   const { dataIndex } = params;
                   let categoryIndex = api.value(1);
                   let start = api.coord([api.value(1), categoryIndex]);
                   return {
                       // 一组图形元素
                       type: 'group',
                       children: [{
                       type: 'image',
                       style: {
                           image: triangle,
                           x: 110,
                           // y: 12 + dataIndex*40,
                           y: start[1] - 16,
                           width: 40,
                           height: 33,
                       },
                       }],
                   };
                },
                data: valueData,
                z: 10,
            },
            { //右侧值
                name: 'text',
                type: 'custom',
                renderItem(params,api) {
                    const { dataIndex } = params;
                    let categoryIndex = api.value(1);
                    let start = api.coord([api.value(1), categoryIndex]);
                    return {
                        // 一组图形元素
                        type: 'group',
                        children: [{
                            type: 'text',
                            style: {
                                text: valueData[dataIndex],
                                textFont: api.font({fontSize: 20}),
                                fill:'#4dbeff',
                                textAlign: 'center',
                                textVerticalAlign: 'bottom',
                                x:400,
                                y:start[1]+10
                            },
                            // position: [400, 30 + dataIndex*40]
                        }],
                    };
                },
                data: valueData,
            },
            { //左侧姓名
                name: 'text',
                type: 'custom',
                renderItem(params,api) {
                    const { dataIndex } = params;
                    let text = nameData[dataIndex].length > 3 ? nameData[dataIndex].substring(0,3) : nameData[dataIndex];
                    let categoryIndex = api.value(1);
                    let start = api.coord([api.value(1), categoryIndex]);
                    return {
                        // 一组图形元素
                        type: 'group',
                        children: [{
                            type: 'text',
                            style: {
                                text: text,
                                textFont: api.font({fontSize: 20}),
                                fill:'#4EBEE5',
                                textAlign: 'left',
                                textVerticalAlign: 'bottom',
                                backgroundColor:'red',
                                x:50,
                                y:start[1]+10
                            },
                            // position: [50, 30 + dataIndex*40]
                        }],
                    };
                },
                data: valueData,
            },
        ]
    };
    
    this.myChart.setOption(option);
}

 render() {
    const {domHeight} = this.state;
   return(
     <div className={'PictorialBar'}   ref={view => this.chartDom = view}>
     </div>
   )
 }
}

PictorialBar.propTypes = {
    valueData:PropTypes.array.isRequired,
    nameData:PropTypes.array.isRequired,
}
PictorialBar.defaultProps = {}