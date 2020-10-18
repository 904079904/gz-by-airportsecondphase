/* Create by zhangqin on 2019/10/29 */
import './FreePlanPositionBar.scss'
import barBg from 'img/jwkx_bar_bg.png'
import textureBg from 'img/texture_bg.png';
var textureBgImg = new Image();
textureBgImg.src = textureBg;
export default class FreePlanPositionBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            yData: []
        }
        this.myChart = null;
        this.defaultOption = this.defaultOption.bind(this)
        this.draw = this.draw.bind(this);
        this.renderItem = this.renderItem.bind(this);
    }
    componentDidMount(){
        this.myChart = echarts.init(document.getElementById("FreePlanPositionBar"))
        this.defaultOption()
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            yData:nextProps.barData.name
        },()=>{
            this.draw(nextProps.barData,nextProps.maxNumber);
        })
    }
    
    renderItem(params, api){ // 自定义系列
        let {yData} = this.state;
        let categoryIndex = api.value(1), index =params.dataIndex;
        let start = api.coord([api.value(1), categoryIndex]);
        return {
            type: 'group',
            children: [{
                type: 'image',// 背景阴影
                style: {
                image: barBg,
                width: 462,
                height: 25,
                x: 58,
                y: start[1] - 12,
                },
            },{
                type: 'text',//文字
                position: [0,start[1] - 10],
                style: {
                    text: yData[index],
                    fill: '#6F9DBC',
                    fontSize: 20,
                }
            }]
        }
    }
    defaultOption(){// 初始化
        var option = {
            color: ["red","#0aeeb4","#00c3f6"],
            legend: {
                itemWidth: 17,
                itemHeight: 17,
                textStyle: {
                    color: '#F9FDFF',
                    fontSize:20
                },
                top: 15,
                right: '4%',
                itemGap: 30,
                data:['空闲', '占用']
            },
            grid: {
                left: 58,
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type : 'value',
                // max: 
                axisTick : {show: false},
                axisLine: {
                    lineStyle: {
                        width: 2,
                        color: '#42455E'
                    }
                },
                axisLabel: {
                    color: '#6F9DBC',
                    formatter: function(value){
                        return Math.abs(value)
                    },
                    fontSize: 20,
                    fontFamily: 'lcd'
                },
                splitLine: {
                    lineStyle: {
                        width: 2,
                        color: 'rgba(225,225,225,0.08)'
                    }
                },
            },
            yAxis : {
                type : 'category',
                axisTick : {show: false},
                axisLabel: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#70738E'
                    }
                },
                data: [],
                // data : ['B类','C类','D类','E类','F类']
            },
            series : [{
                type: 'custom',
                renderItem:this.renderItem,
                silent: true,
                data:[320, 302,320, 302,320]
            },{
                name:'空闲',
                type:'bar',
                id: 'free',
                stack: '总量',
                barWidth: 16,
                itemStyle: {
                    barBorderRadius: [0,10,10,0]
                },
                label: {
                    show:false
                },
                data:[]
            },{
                name:'占用',
                id: 'used',
                type:'bar',
                stack: '总量',
                barWidth: 16,
                itemStyle: {
                    barBorderRadius: [10,0,0,10],
                },
                label: {
                    show: false
                },
                data:[]
            },{
                name:'背景纹理',
                id: 'freeBg',
                type:'bar',
                barWidth: 16,
                data:[],
                barGap: '-100%',
                itemStyle: {
                    barBorderRadius: [0,10,10,0],
                    color: {
                        image: textureBgImg,
                        repeat: 'repeat'
                    }
                }
            },{
                name:'背景纹理',
                id: 'usedBg',
                type:'bar',
                barWidth: 16,
                data:[],
                barGap: '-100%',
                itemStyle: {
                    barBorderRadius: [0,10,10,0],
                    color: {
                        image: textureBgImg,
                        repeat: 'repeat'
                    }
                }
            }]
        }
        this.myChart.setOption(option)
    }
    draw(barData,maxNumber){// 根据数据绘图
        this.myChart.clear()
        this.defaultOption()
        this.myChart.setOption({
            xAxis: {// x轴线上刻度等分
                interval: maxNumber < 1000?_.ceil(maxNumber/3,-1):_.ceil(maxNumber/3,-2),
                max: function(value){
                    return maxNumber < 1000?_.ceil(maxNumber/3,-1)*3:_.ceil(maxNumber/3,-2)*3
                },
                min: function(value){
                    return -(maxNumber < 1000?_.ceil(maxNumber/3,-1)*3:_.ceil(maxNumber/3,-2)*3)
                }
            },
            yAxis: {
                data: barData.name
            },
            series: [
                {id: 'free', data: barData.free.map(item => {
                    return {
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 1, 0,
                                [
                                    { offset: 0, color: 'rgba(9,237,179,.5)'},
                                    { offset: 1, color: 'rgba(9,237,179,.9)'}
                                ]
                            )
                        },
                        value: item,
                        
                    }
                })},
                {id: 'used', data: barData.used.map(item => {
                    return {
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 1, 0,
                                [
                                    { offset: 0, color: 'rgba(0,194,245,.9)' },
                                    { offset: 1, color: 'rgba(0,194,245,.5)' }
                                ]
                            ),
                        },
                        value: item,
                        
                    }
                })},
                {id: 'freeBg', data: barData.free},
                {id: 'usedBg', data: barData.used}
            ]
        })
    }
    render(){
        return(
            <div id="FreePlanPositionBar"></div>
        )
    }
}