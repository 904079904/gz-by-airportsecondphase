/*
 * @Description: 今日重点航司靠桥率分析
 * @Author: tanjun
 * @Data: Do not edit
 * @LastEditors: tanjun
 * @LastEditTime: 2019-11-21 14:00:54
 */
import axiosToken from "js/axiosToken";
import './AirportBridge.scss';
import {TitleCom} from 'com/index';
import echarts from 'echarts';
import lineBar from 'img/hrs_line_bar.png';

export default class AirportBridge extends Component {
  constructor(props) {
    super(props);
    this.id = `apb${ new Date().getTime() }`; // 当前组件随机ID
    this.chartDom = null; // 当前图形dom
    this.setData = this.setData.bind(this);
    this.getData = this.getData.bind(this);
    this.isUnmount = false; // 是否正在卸载
  }
  componentDidMount() {
    this.getData();
    this.init();
    this.interval = setInterval(this.getData, 30000); 
  }
  componentWillUnmount() {
    clearInterval(this.interval);
    this.isUnmount = true;
  }
  getData() {
    axiosToken({
      url: realAddressUrlOne + '/screen/positionAirlineByBridgeRate',
      method: 'get'
    }).then(res => {
      if (!this.isUnmount) {
        this.setData(res.data.result);
      }
    }, err => {
      console.log(err)
    })
  }
  init() {
    this.chart = echarts.init(this.chartDom);
    this.chart.setOption(this.props.option);
  }
  setData(data) {
    // 首次加载获取计算出的最大值
    this.chart.clear();
    let preOption = _.cloneDeep(this.props.option);
    let vals = data.map(d => d.rate);
    preOption.xAxis.data = data.map(d => d.airline);
    preOption.series.push({
      name: '正常',
      type: 'bar',
      stack: '总量',
      barWidth: 13,
      data: vals,
    });
    this.chart.setOption(preOption);
    let maxVal = this.chart.getModel().getComponent('yAxis', 0).axis.scale.getExtent()[1]

    this.chart.clear();
    let newOption = _.cloneDeep(this.props.option);
    let bg = new Image();
    bg.src = lineBar;
    newOption.series.push({
      name: '暗色底图',
      type: 'bar',
      barWidth: 20,
      barGap: '-90%',
      itemStyle: {
        color: 'rgba(23, 39, 81, 0.5)'
      },
      animation: false,
      silent: true,
      data: data.map(d => maxVal),
      z: -1
    })
    // 底图填充
    newOption.series.push({
      name: '底图',
      type: 'bar',
      barWidth: 16,
      barGap: '-90%',
      itemStyle: {
        color: {
          image: bg,
          repeat: 'repeat',
        },
        borderColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0, color: 'rgba(6, 101, 169, 1)',
          },{
            offset: 1, color: 'rgba(14, 64, 125, 1)',
          }
        ]),
        borderWidth: 3,
      },
      data: vals,
      silent: true,
    });
    newOption.xAxis.data = data.map(d => d.airline);
    newOption.series.push({
      name: '正常',
      type: 'bar',
      stack: '总量',
      barWidth: 13,
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
          {
            offset: 0, color: 'rgba(0, 194, 245, 0.3)',
          },{
            offset: 1, color: 'rgba(5, 210, 246, 0.9)'
          }
        ]),
      },
      data: vals,
    });
    this.chart.setOption(newOption);
  }
  render() {
    return (
      <div id={this.id} className="AirportBridge">
        <TitleCom title={'今日重点航司靠桥率分析'}></TitleCom>
        <div ref={ref => this.chartDom = ref} className={'apb_chart AirportBridgeCont'}></div>
      </div>
    )
  }
}
AirportBridge.defaultProps = {
  option: {
    grid: {
      left: '0',
      right: '6%',
      bottom: '4%',
      top: '11%',
      containLabel: true,
    },
    title: [{
      show: true,
      text: '百分比%',
      left: '0%',
      top: '4%',
      textAlign: 'left',
      textStyle: {
          color: '#7796b0',
          fontSize: 20,
          fontFamily: 'lcd'
      }
    }],
    xAxis: {
      type: 'category',
      axisLine: {
        lineStyle: {
          color: '#727a9e',
        }
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        fontSize: 20,
        color: '#7796b0',
        margin: 11,
      },
      splitLine: {
        lineStyle: {
          color: ['#727a9e'],
        }
      },
      interval: 0,
      data: []
    },
    yAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: '#727a9e',
        }
      },
      axisLabel: {
        fontFamily: 'lcd',
        fontSize: 20,
        color: '#7796b0',
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        lineStyle: {
          color: ['#727a9e'],
        }
      },
    },
    series: []
  }
}
