/*
 * @Description: 小时放行率柱状图模块
 * @Author: tanjun
 * @Data: Do not edit
 * @LastEditors: tanjun
 * @LastEditTime: 2019-11-22 16:33:51
 */
import axiosToken from "js/axiosToken";

import './HourReleaseSituationCom.scss';
import lineBar from 'img/texture_bg.png';
import {TitleCom} from 'com/index';

export default class HourReleaseSituationCom extends Component {
  constructor(props) {
    super(props);
    this.id = `hrs${ new Date().getTime() }`; // 当前组件随机ID
    this.getData = this.getData.bind(this);
    this.isUnmount = false; // 是否销毁
  }
  componentDidMount() {
    this.chart = echarts.init(document.querySelector(`#${this.id}>.hrs-chart`));
    this.chart.setOption(this.props.option);
    this.getData();
    this.interValTime = setInterval(this.getData, 30000);
  }
  componentWillUnmount() {
    clearInterval(this.interValTime);
    this.isUnmount = true;
  }
  /**
   * @description: 获取数据
   * @param {type} 
   * @return: 
   */
  getData() {
    axiosToken({
      url: realAddressUrlOne + '/screen/hourReleaseSituation',
      method: 'get',
      cache: false,
    }).then((res) => {
      if (!this.isUnmount) {
        this.setData(res.data.result)
      }
    }, (err) => {
      console.log(err);
    })
  }
  /**
   * @description: 将数据填充到页面
   * @param {type} 
   * @return: 
   */
  setData(data) {
    this.chart.clear();
    // 复制默认option
    let newOption = _.cloneDeep(this.props.option);
    let bg = new Image();
    bg.src = lineBar;
    // 底图填充
    newOption.series.push({
      name: '底图',
      type: 'bar',
      stack: '底图总量',
      barWidth: 16,
      barGap: '-90%',
      // z: 9,
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
      data: data.time.map((d, i) => {
        return data.abnormalTop[i] + data.normal[i] + data.abnormal[i];
      }),
      silent: true,
      animationDuration: 1400,
    })
    newOption.series.push({
      name: '顶部线条',
      type: 'bar',
      stack: '底图总量',
      barWidth: 16,
      data: data.time.map(d => 0),
      itemStyle: {
        color: 'rgba(14, 64, 125, 1)',
        borderWidth: 3,
      },
      barMinHeight: 3,
      silent: true,
      animationDelay: 1000,
    })
    newOption.series.push({
      name: '不正常',
      type: 'bar',
      stack: '总量',
      barWidth: 13,
      itemStyle: {
        color: '#0aeeb4'
      },
      data: data.abnormal.map(d => {
        return {
          value: d,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
              {
                offset: 0, color: 'rgba(9, 237, 179, 0.3)',
              },{
                offset: 1, color: 'rgba(9, 237, 179, 0.9)'
              }
            ]),
          }
        }
      }),
      animationDelay: 400,
    });
    newOption.series.push({
      name: '不正常区域TOP1',
      type: 'bar',
      stack: '总量',
      barWidth: 13,
      itemStyle: {
        color: '#daf4ff'
      },
      data: data.abnormalTop.map(d => {
        return {
          value: d,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
              {
                offset: 0, color: 'rgba(255, 255, 255, 0.3)',
              },{
                offset: 1, color: 'rgba(255, 255, 255, 0.9)'
              }
            ])
          }
        }
      }),
      animationDelay: 200,
    });
    newOption.series.push({
      name: '正常',
      type: 'bar',
      stack: '总量',
      barWidth: 13,
      itemStyle: {
        color: '#00c3f6'
      },
      data: data.normal.map(d => {
        return {
          value: d,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
              {
                offset: 0, color: 'rgba(0, 194, 245, 0.3)',
              },{
                offset: 1, color: 'rgba(5, 210, 246, 0.9)'
              }
            ]),
          }
        }
      }),
    });
    
    newOption.series.push({
      name: '小时放行率',
      type: 'line',
      data: data.hour,
      z: 10,
      itemStyle: {
        color: '#ffb308',
      },
      yAxisIndex: 1,
      symbolSize: 0,
    });
    newOption.series.push({
      name: '截止放行率',
      type: 'line',
      data: data.forbid,
      z: 11,
      itemStyle: {
        color: '#fefe44',
      },
      yAxisIndex: 1,
      symbolSize: 0,
    });
    newOption.xAxis.data = data.time;
    this.chart.setOption(newOption);
  }
  render() {
    return (
      <div id={this.id} className={ 'hrs-container' }>
        <TitleCom title="放行率"></TitleCom>
        <div className={'hrs-chart hrsChart'}></div>
      </div>
    )
  }
}
HourReleaseSituationCom.defaultProps = {
  option: {
    title: [{
      text: '百分比%',
      textAlign: 'right',
      right: '-2%',
      top: '10%',
      textStyle: {
        fontSize: 20,
        color: '#727a9e',
        fontFamily: 'lcd',
      }
    }],
    legend: {
      top: '4%',
      itemGap: 20,
      itemWidth: 20,
      itemHeight: 20,
      selectedMode: false,
      textStyle: {
        color: '#f7fffb',
        fontSize: 20,
      },
      data: [{
        name: '不正常区域TOP1',
        textStyle: {
          color: '#fff'
        }
      },{
        name: '正常',
        textStyle: {
          color: '#fff'
        }
      },{
        name: '不正常',
        textStyle: {
          color: '#fff'
        }
      },{
        name: '小时放行率',
        icon: 'line',
        textStyle: {
          color: '#fff'
        }
      },{
        name: '截止放行率',
        icon: 'line',
        textStyle: {
          color: '#fff'
        }
      }],
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '16%',
      containLabel: true,
    },
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
        fontFamily: 'lcd',
        fontSize: 20,
      },
      splitLine: {
        lineStyle: {
          color: ['#727a9e'],
        }
      },
      data: []
    },
    yAxis: [{
      type: 'value',
      axisLine: {
        lineStyle: {
          color: '#727a9e',
        }
      },
      axisLabel: {
        fontFamily: 'lcd',
        fontSize: 20,
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        lineStyle: {
          color: ['#727a9e'],
        }
      },
    },{
      type: 'value',
      axisLine: {
        lineStyle: {
          color: '#727a9e',
        }
      },
      axisLabel: {
        fontFamily: 'lcd',
        fontSize: 20,
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: ['#727a9e'],
        }
      },
    }],
    series: []
  }
}
