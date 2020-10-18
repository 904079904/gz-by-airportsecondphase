/* Create by zhangqin on 2019/12/03 */
import './TexiPictorialBar.scss';
let car = 'path://M33.6,9.6S35,9.3,35,8.2s-2.3-4.8-8.9-4.8c0,0-2.7-3.4-10.3-3.4S7.2,3.4,5.5,3.4,0,4.5,0,6.2.7,8.9.7,8.9H6.2a2.7,2.7,0,0,1,5.4.1l14.5.3a2.7,2.7,0,0,1,5.5.1ZM15.8,3.4H10.3c1.2-2.4,5.5-2.1,5.5-2.1Zm1.4-2.1C20.5,1.2,24,3.4,24,3.4H17.2V1.4Zm0,0,M26.8,9.6a2.1,2.1,0,1,0,2.1-2.1,2.1,2.1,0,0,0-2.1,2.1Zm0,0,M6.9,9.6A2.1,2.1,0,1,0,8.9,7.5,2.1,2.1,0,0,0,6.9,9.6Zm0,0'
export default class TexiPictorialBar extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
        this.myChart = null;
    }
    componentDidMount(){
        this.handlePropsData(this.props)
    }
    componentWillReceiveProps(nextProps){
        this.handlePropsData(nextProps)
    }
    dataFormat(x,data,isBg){
        //小车散点（x为散点横坐标，data处理数据，isBg判断是否为背景图）
        let _data = []
        if(isBg){
            for (let i = 0; i < data; i++) {
                if(i<3){
                    _data.push({
                        value: [x, i+0.2],
                    })
                    
                }else if(i>=3&&i<8){
                    _data.push({
                        value: [x, i+0.4],
                    })
                }else if(i>=8&&i<13){
                    _data.push({
                        value: [x, i+0.6],
                    })
                }else if(i>=13&&i<18){
                    _data.push({
                        value: [x, i+0.8],
                    })
                }else if(i>=18&&i<23){
                    _data.push({
                        value: [x, i+1],
                    })
                }else{
                    _data.push({
                        value: [x, i+1.2],
                    })
                }
            }
        }else {
            for (let i = 0; i < data; i++) {
                if(i<3){
                    _data.push({
                        value: [x, i+0.2],
                        itemStyle:{
                            color:"#6b8699"
                        }
                    })
                    
                }else if(i>=3&&i<8){
                    _data.push({
                        value: [x, i+0.4],
                        itemStyle:{
                            color:"#97f8ff"
                        }
                    })
                }else if(i>=8&&i<13){
                    _data.push({
                        value: [x, i+0.6],
                        itemStyle:{
                            color:"#31ffff"
                        }
                    })
                }else if(i>=13&&i<18){
                    _data.push({
                        value: [x, i+0.8],
                        itemStyle:{
                            color:"#f1ffb8"
                        }
                    })
                }else if(i>=18&&i<23){
                    _data.push({
                        value: [x, i+1],
                        itemStyle:{
                            color:"#ffce31"
                        }
                    })
                }else{
                    _data.push({
                        value: [x, i+1.2],
                        itemStyle:{
                            color:"#ff571d"
                        }
                    })
                }
            }
        }
        
        return _data
    }
    rectFormat(x,data,isBg){
        // 正方形(x为散点横坐标计算，data处理数据，isBg判断是否为背景图)
        let rectData = []
        if(isBg){
            for(var i=0;i<data;i++){
                switch(i){
                    case 1:
                        rectData.push({
                            value: [0.5+x,3.2]
                        });
                        break;
                    case 2:
                        rectData.push({
                            value: [0.5+x,8.3]
                        });
                        break;
                    case 3:
                        rectData.push({
                            value: [0.5+x,13.4]
                        });
                        break;
                    case 4:
                        rectData.push({
                            value: [0.5+x,18.5]
                        });
                        break;
                    case 5:
                        rectData.push({
                            value: [0.5+x,23.6]
                        });
                        break;
                    case 6:
                        rectData.push({
                            value: [0.5+x,27]
                        });
                        break;
                    default:
                        rectData.push({
                            value: [0.5+x,0]
                        });
                }
            }
        }else{
            for(var i=0;i<data;i++){
                switch(i){
                    case 1:
                        rectData.push({
                            value: [0.5+x,3.2],
                            itemStyle: {
                                color:'#97f8ff'
                            }
                        });
                        break;
                    case 2:
                        rectData.push({
                            value: [0.5+x,8.3],
                            itemStyle: {
                                color:'#6b8699'
                            }
                        });
                        break;
                    case 3:
                        rectData.push({
                            value: [0.5+x,13.4],
                            itemStyle: {
                                color:'#31ffff'
                            }
                        });
                        break;
                    case 4:
                        rectData.push({
                            value: [0.5+x,18.5],
                            itemStyle: {
                                color:'#f1ffb8'
                            }
                        });
                        break;
                    case 5:
                        rectData.push({
                            value: [0.5+x,23.6],
                            itemStyle: {
                                color:'#ffce31'
                            }
                        });
                        break;
                    case 6:
                        rectData.push({
                            value: [0.5+x,27],
                            itemStyle: {
                                color:'#ff571d'
                            }
                        });
                        break;
                    default:
                        rectData.push({
                            value: [0.5+x,0],
                            itemStyle: {
                                color:'#6b8699'
                            }
                        });
                }
            }
        }
        
        return rectData;
    }
    handlePropsData(PropsData){//处理父级传值
        let data = this.dataFormat(0.5,27*PropsData.pictorialData,false),
            bgData = this.dataFormat(0.5,27,true),
            leftRectData = this.rectFormat(0.15,7*PropsData.pictorialData,false),//柱图两边方点
            rightRectData = this.rectFormat(-0.15,7*PropsData.pictorialData,false),
            leftRectBgData = this.rectFormat(0.15,7,true),//柱图两边方点背景
            rightRectBgData = this.rectFormat(-0.15,7,true);
        let chartData = {
            data: data,
            bgData:bgData,
            leftRectData: leftRectData,
            rightRectData:rightRectData,
            leftRectBgData:leftRectBgData,
            rightRectBgData: rightRectBgData
        }
        switch(PropsData.id){
            case 'TexiBarChart1':
                this.myChart = echarts.init(document.getElementById('TexiBarChart1'));
                this.draw(chartData);
                break;
            case 'TexiBarChart2':
                this.myChart = echarts.init(document.getElementById('TexiBarChart2'));
                this.draw(chartData);
                break;
            default:
                this.myChart = echarts.init(document.getElementById('TexiBarChart0'));
                this.draw(chartData)
        }
    }
    draw(chartData){
        this.myChart.clear();
        let option = {
            color: ['#ff571d','#ffce31','#f1ffb8'],
            grid: [{
                width: '100%',
                height:350,
                left:-35,
                bottom: 25,
            },{
                width: '100%',
                height:350,
                left:0,
                bottom: 20,
            },{
                width: '100%',
                height:350,
                left:35,
                bottom: 25,
            }],
            xAxis: [
                {show: false,gridIndex:0,max: 1,splitNumber:2},
                {show: false,gridIndex:1,max: 1,splitNumber:2},
                {show: false,gridIndex:2,max: 1,splitNumber:2},

            ],
            yAxis: [
                {show:false,gridIndex:0,max:27},
                {show:false,gridIndex:1,max:27},
                {show:false,gridIndex:2,max:27},
            ],
            series: [
                // 当前数据
                {
                    symbol:car,
                    symbolSize: [30, 10],
                    type: 'scatter',
                    z:10,
                    itemStyle: {
                        opacity: 0.3
                    },
                    silent: true,
                    animationDelay: function (dataIndex, params) {
                        return dataIndex * 30;
                    },
                    data: chartData.data,
                },
                {
                    symbol:car,
                    symbolSize: [30, 10],
                    type: 'scatter',
                    z:10,
                    xAxisIndex:1,
                    yAxisIndex:1,
                    silent: true,
                    animationDelay: function (dataIndex, params) {
                        return dataIndex * 30;
                    },
                    data: chartData.data,
                },
                {
                    symbol:car,
                    symbolSize: [30, 10],
                    type: 'scatter',
                    z:10,
                    xAxisIndex:2,
                    yAxisIndex:2,
                    itemStyle: {
                        opacity: 0.3
                    },
                    silent: true,
                    animationDelay: function (dataIndex, params) {
                        return dataIndex * 30;
                    },
                    data: chartData.data,
                },
                // 背景
                {
                    symbol:car,
                    symbolSize: [30, 10],
                    type: 'scatter',
                    z:5,
                    itemStyle: {
                        color: '#354248',
                        opacity: 0.3
                    },
                    silent: true,
                    animation: false,
                    data: chartData.bgData,
                },
                {
                    symbol:car,
                    symbolSize: [30, 10],
                    type: 'scatter',
                    z:5,
                    itemStyle: {
                        color: '#354248',
                        opacity: 0.3
                    },
                    xAxisIndex:1,
                    yAxisIndex:1,
                    silent: true,
                    animation: false,
                    data: chartData.bgData,
                },
                {
                    symbol:car,
                    symbolSize: [30, 10],
                    type: 'scatter',
                    z:5,
                    itemStyle: {
                        color: '#354248',
                        opacity: 0.3
                    },
                    xAxisIndex:2,
                    yAxisIndex:2,
                    silent: true,
                    animation: false,
                    data: chartData.bgData,
                },
                // 点
                {
                    symbol:'rect',
                    symbolSize: [5, 5],
                    type: 'scatter',
                    z:10,
                    silent: true,
                    xAxisIndex:1,
                    yAxisIndex:1,
                    animationDelay: function (dataIndex, params) {
                        return dataIndex * 30;
                    },
                    data: chartData.leftRectData,
                },
                {
                    symbol:'rect',
                    symbolSize: [5, 5],
                    type: 'scatter',
                    z:10,
                    silent: true,
                    xAxisIndex:1,
                    yAxisIndex:1,
                    animationDelay: function (dataIndex, params) {
                        return dataIndex * 30;
                    },
                    data: chartData.rightRectData,
                },
                // 点背景
                {
                    symbol:'rect',
                    symbolSize: [5, 5],
                    type: 'scatter',
                    z:5,
                    itemStyle: {
                        color: '#354248',
                        opacity: 0.3
                    },
                    silent: true,
                    xAxisIndex:1,
                    yAxisIndex:1,
                    animation: false,
                    data: chartData.leftRectBgData,
                },
                {
                    symbol:'rect',
                    symbolSize: [5, 5],
                    type: 'scatter',
                    z:5,
                    itemStyle: {
                        color: '#354248',
                        opacity: 0.3
                    },
                    silent: true,
                    xAxisIndex:1,
                    yAxisIndex:1,
                    animation: false,
                    data: chartData.rightRectBgData,
                },
            ]
        };
        
        this.myChart.setOption(option)
    }
    render(){
        return(
            <div id={this.props.id}>象形柱图</div>
        )
    }
}