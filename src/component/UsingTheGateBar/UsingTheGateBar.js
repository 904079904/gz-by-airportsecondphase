import './UsingTheGateBar.scss';
import barBg from 'img/using_bar_bg.png';

import barImg from 'img/jskq_bar_img.png';
var BarImg = new Image();
BarImg.src = barImg;

import scatterImg from 'img/scatter_img.png';

export default class UsingTheGateBar extends Component {
    constructor(props){
        super(props);
        this.state = {

        };
        this.myChart = null;
        this.draw = this.draw.bind(this);
    }
    componentDidMount(){
        switch(this.props.id){
            case 'FarBar':
                this.myChart = echarts.init(document.getElementById('FarBar'));
                this.draw(this.props.farRate);
                break;
            case 'NearBar':
                this.myChart = echarts.init(document.getElementById('NearBar'));
                this.draw(this.props.nearRate);
                break;
        }
    }
    componentWillReceiveProps(nextProps) {
        switch(this.props.id){
            case 'FarBar':
                this.draw(nextProps.farRate);
                break;
            case 'NearBar':
                this.draw(nextProps.nearRate);
                break;
        }
    }
    renderItem(params, api){
        let categoryIndex = api.value(1);
        let start = api.coord([api.value(1), categoryIndex]);
        let x = 445*api.value(0)/100;//柱图在x轴上的长度(485=纹理背景长度-多边形下边减上边的值)
        return {
            type: 'group',
            children: [
                {// 纹理背景
                    type: 'image',
                    style: {
                        image: barBg,
                        width: 482,
                        height: 50,
                        x: 45,
                        y: start[1]-15
                    }
                },
                {// 多边形
                    type: 'polygon',
                    position: [45,92.5],
                    shape: {
                        points:[[0,0], [0, 50], [x+37, 50], [x, 0]],
                    },
                    style: {
                        fill: new echarts.graphic.LinearGradient(
                            0, 0, 1, 0,
                            [
                                {offset: 0, color: 'rgba(0,63,156,0.3)'},
                                {offset: 1, color: 'rgba(0,220,212,0.7)'}
                            ]
                        )
                    }
                }
            ]

        }
    }
    draw(rate){
        this.myChart.clear();
        var option = {
            grid: {
                left: 45,
                right: 65,
                bottom: 45
            },
            xAxis: {
                type: 'value',
                show: false,
                max: 100,
            },
            yAxis: {
                type: 'category',
                show: false,
                data: [],
            },
            series: [
                {
                type: 'custom',
                id: 'barBg',
                renderItem: this.renderItem,
                data: [rate],
                silent: true,
            },
            {
                data: [rate],
                type: 'bar',
                id: 'rate',
                barWidth: 50,
                silent: true,
                label: {
                    show: true,
                    position: "insideRight",
                    offset: [70, -75],
                    fontSize: 48,
                    color: "#F5E22B",
                    fontFamily: 'lcd',
                    formatter: "{c}%"
                },
                itemStyle: {
                    color: 'rgba(0,0,0,0)'
                }
            },
            {
                data: [rate],
                type: 'scatter',
                id: 'scatter',
                symbol: 'image://'+scatterImg,
                symbolSize: 159,
                symbolOffset: [20,10],
                symbolRotate: -8,
                silent: true,
            }
        ]
        }
        this.myChart.setOption(option)
    }
    render(){
        return(
            <div id={this.props.id}></div>
        )
    }
}