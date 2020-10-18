/* Create by zhangqin on 2019/11/29 */
import axiosToken from "js/axiosToken";

import './PriorityGoodsAnalysis.scss';
import {TitleCom} from 'com/index';
import textureBg from 'img/texture_bg.png';
var textureBgImg = new Image();
textureBgImg.src = textureBg;
export default class PriorityGoodsAnalysis extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
        this.myChart = null;
    }
    componentDidMount(){
        this.myChart = echarts.init(document.getElementById('PriorityGoodsAnalysis'));
        this.getData();
        this.reloadID = setInterval(() => {
            this.getData();
        },globalTimer.todayImportantCargo)
    }
   
    componentWillUnmount(){
        clearInterval(this.reloadID);
    }
    getData(terminal){// 获取数据
        axiosToken({
            method: 'get',
            url: realAddressUrlOne + '/screen/todayImportantCargo',
        }).then((res) => {
            if(res.data.code === 0){
                let result = res.data.result;
                // y轴类目值
                let yData = result.map(item => {
                    return item.type
                }),
                //国内
                internalData = result.map(item => {
                    return -item.internal
                }),
                //国际
                internationalData = result.map(item => {
                    return item.international
                });
                // 将国内数据和国际数据汇总取最大值
                let allValue = []
                for(var i in internalData){
                    allValue.push(-internalData[i],internationalData[i])
                }
                allValue.sort(function(a,b){return b-a});//倒序
                let maxNumber = allValue[0];//取value最大值
                this.draw(yData,internalData,internationalData,maxNumber);
            }
        });
    }
    draw(yData,internalData,internationalData,maxNumber){
        this.myChart.clear();
        var option = {
            color: ["#00c3f6","#0aeeb4"],
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
                data:['国内', '国际']
            },
            grid: {
                left: 58,
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type : 'value',
                name: '(吨)',
                nameTextStyle: {
                    color: '#55daff',
                    fontSize: 14,
                    padding: [45,0,0,5]
                },
                axisTick : {show: false},
                axisLine: {
                    lineStyle: {
                        width: 2,
                        color: '#464c6b'
                    }
                },
                axisLabel: {
                    formatter: function(value){
                        return Math.abs(value)
                    },
                    color: '#55daff',
                    fontSize: 20,
                    fontFamily: 'lcd',
                    
                },
                splitLine: {
                    show: false
                },
                // 根据value最大值进行等分
                interval: maxNumber < 1000?_.ceil(maxNumber/6,-1):_.ceil(maxNumber/6,-2),
                max: function(value){
                    return maxNumber < 1000?_.ceil(maxNumber/6,-1)*6:_.ceil(maxNumber/6,-2)*6
                },
                min: function(value){
                    return -(maxNumber < 1000?_.ceil(maxNumber/6,-1)*6:_.ceil(maxNumber/6,-2)*6)
                }
            },
            yAxis : [{
                type : 'category',
                inverse:true,
                axisTick : {show: false},
                axisLabel: {
                    fontSize: 20,
                    color: '#55daff',
                    margin: 30
                },
                axisLine: {
                    show: false,
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        width: 2,
                        color: '#464c6b'
                    }
                },
                data: yData
                // data : ['其他','生鲜','普通物','菌种类','活动物','危险品','管制物']
            },{
                type: 'category',
                show: true,
                position: 'left',
                axisLine: {
                    lineStyle: {
                        width: 2,
                        color: '#464c6b'
                    }
                },
            }],
            series : [
            {
                name:'国内',
                type:'bar',
                id: 'free',
                stack: '总量',
                barWidth: 16,
                itemStyle: {
                    barBorderRadius: [10,0,0,10],
                },
                label: {
                    show:true,
                    formatter: (value) => {
                        return Math.abs(value.value)
                    },
                    color: '#00c3f6',
                    fontSize:16,
                    fontFamily: 'lcd',
                    position: 'left',
                    offset: [0,-2]
                },
                data: internalData.map(item => {
                    return {
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 1, 1,
                                [
                                    { offset: 0, color: 'rgba(0,194,245,.9)' },
                                    { offset: 1, color: 'rgba(0,194,245,.2)' }
                                ]
                            ),
                        },
                        value: item
                    }
                })
                // data:[-86,-150,-98,-126,-75,-62,-118]
            },{
                name:'国际',
                id: 'used',
                type:'bar',
                stack: '总量',
                barWidth: 16,
                itemStyle: {
                    barBorderRadius: [0,10,10,0]
                },
                label: {
                    show: true,
                    formatter: (value) => {
                        return Math.abs(value.value)
                    },
                    color: '#0aeeb4',
                    fontSize:16,
                    fontFamily: 'lcd',
                    position: 'right',
                    offset: [0,-2]
                },
                data: internationalData.map(item => {
                    return {

                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 1, 1,
                                [
                                    { offset: 0, color: 'rgba(9,237,179,.2)' },
                                    { offset: 1, color: 'rgba(9,237,179,.9)' }
                                ]
                            ),
                        },
                        value: item
                    }
                })
            },{
                name:'背景纹理',//国内
                type:'bar',
                barWidth: 16,
                barGap: '-100%',
                itemStyle: {
                    barBorderRadius: [10,0,0,10],
                    color: {
                        image: textureBgImg,
                        repeat: 'repeat'
                    }
                },
                data: internalData
            },{
                name:'背景纹理',//国际
                type:'bar',
                barWidth: 16,
                barGap: '-100%',
                itemStyle: {
                    barBorderRadius: [0,10,10,0],
                    color: {
                        image: textureBgImg,
                        repeat: 'repeat'
                    }
                },
                data: internationalData
            }]
        }
        this.myChart.setOption(option)
    }
    render(){
        return(
            <div className="PriorityGoodsAnalysisCom">
                <TitleCom title={'今日重点货物分析'}></TitleCom>
                <div id="PriorityGoodsAnalysis" className="PriorityGoodsAnalysis"></div>
            </div>
        )
    }
}