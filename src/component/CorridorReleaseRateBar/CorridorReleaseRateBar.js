/* Create by zhangqin on 2019/10/29 */
import "./CorridorReleaseRateBar.scss";
import lineBar from "img/texture_bg.png";
var barBg = new Image();
barBg.src = lineBar;
export default class CorridorReleaseRateBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.myChart = null;
    this.draw = this.draw.bind(this);
  }
  componentDidMount() {
    this.myChart = echarts.init(
      document.getElementById("CorridorReleaseRateBar")
    );
  }
  componentWillReceiveProps(nextProps) {
    this.myChart.clear();
    this.draw(nextProps.barData, nextProps.bgData);
  }
  draw(barData, bgData) {
    var option = {
      color: ["#f8b80b", "#0aeeb4", "#00c3f6", "#f9ff49"],
      title: [{
        text: '百分比%',
        textAlign: 'right',
        right: -50,
        top: 51,
        textStyle: {
          fontSize: 20,
          color: '#727a9e',
          fontFamily: 'lcd',
        }
      }],
      legend: {
        itemWidth: 20,
        itemHeight: 20,
        textAlign: "right",
        data: ["计划", "不正常", "正常", "放行率"],
        textStyle: {
          color: "#f7fffb",
          fontSize: 20
        },
        itemGap: 36,
        top: "4%",
        right: 35
      },
      grid: [
        {
          x: "5%",
          y: "16%",
          width: "90%",
          height: "77%"
        },
        {
          x: "11%",
          y: "16%",
          width: "90%",
          height: "77%"
        }
      ],
      xAxis: [
        {
          gridIndex: 0,
          type: "category",
          data: barData.xaxis,
          axisLabel: {
            color: "#727a9e",
            fontFamily: "lcd",
            fontSize:20,
            padding: [0, 0, 0, 50]
          },
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: "#757C9D"
            }
          }
        },
        {
          gridIndex: 1,
          type: "category",
          show: false
        }
      ],
      yAxis: [
        {
          gridIndex: 0,
          type: "value",
          name: "架/次",
          nameTextStyle: {
            color: "#727a9e",
            fontFamily: "lcd",
            fontSize:20
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: "#727a9e",
            fontFamily: "lcd",
            fontSize:20
          },
          axisLine: {
            lineStyle: {
              color: "#757C9D"
            }
          },
          splitLine: {
            lineStyle: {
              color: "#555d84",
              width: 2
            }
          },
          splitNumber: 5
        },
        {
          gridIndex: 1,
          type: "value",
          name: "架/次",
          show: false,
          splitNumber: 5
        },
        {
          gridIndex: 0,
          type: "value",
          nameTextStyle: {
            color: "#727a9e",
            fontSize:20,
            fontFamily: "lcd",
          },
          max: 100,
          axisTick: {
            show: false
          },
          axisLabel: {
            color: "#727a9e",
            fontFamily: "lcd",
            fontSize:20
          },
          axisLine: {
            lineStyle: {
              color: "#727a9e"
            }
          },
          splitLine: {
            show: false
          },
          splitNumber: 5,
          interval: 20
        }
      ],
      series: [
        {
          data: barData.fplrouteSchedule,
          type: "bar",
          xAxisIndex: 0,
          yAxisIndex: 0,
          barWidth: 27,
          itemStyle: {
            color: {
              image: barBg,
              repeat: "repeat"
            },
            borderWidth: 3,
            borderColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "rgba(225,225,225,.2)" },
              { offset: 0.99, color: "rgba(225,225,225,.2)" },
              { offset: 1, color: "rgba(225,225,225,0)" }
            ])
          },
          silent: true,
          barGap: "-94%"
        },
        {
          name: "计划",
          data: barData.fplrouteSchedule
            ? barData.fplrouteSchedule.map(item => {
                return {
                  value: item,
                  itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      { offset: 0, color: "rgba(249,182,11,.9)" },
                      { offset: 1, color: "rgba(249,182,11,.5)" }
                    ])
                  }
                };
              })
            : [],
          type: "bar",
          xAxisIndex: 0,
          yAxisIndex: 0,
          barWidth: 24,
          silent: true
        },
        {
          // 背景纹理
          data: bgData,
          type: "bar",
          xAxisIndex: 1,
          yAxisIndex: 1,
          barWidth: 27,
          itemStyle: {
            color: {
              image: barBg,
              repeat: "repeat"
            },
            borderWidth: 3,
            borderColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "rgba(225,225,225,.2)" },
              { offset: 0.99, color: "rgba(225,225,225,.2)" },
              { offset: 1, color: "rgba(225,225,225,0)" }
            ])
          },
          silent: true,
          barGap: "-94%"
        },
        {
          // 不正常
          name: "不正常",
          data: barData.fplrouteAbnormal
            ? barData.fplrouteAbnormal.map(item => {
                return {
                  value: item,
                  itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      { offset: 0, color: "rgba(9,237,179,.9)" },
                      { offset: 1, color: "rgba(9,237,179,.5)" }
                    ])
                  }
                };
              })
            : [],
          type: "bar",
          xAxisIndex: 1,
          yAxisIndex: 1,
          stack: "总量",
          barWidth: 24,
          silent: true,
          animationDelay: 200
        },
        {
          // 正常
          name: "正常",
          data: barData.fplrouteNormal
            ? barData.fplrouteNormal.map(item => {
                return {
                  value: item,
                  itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      { offset: 0, color: "rgba(0,194,245, .9)" },
                      { offset: 1, color: "rgba(0,194,245, .5)" }
                    ])
                  }
                };
              })
            : [],
          type: "bar",
          xAxisIndex: 1,
          yAxisIndex: 1,
          stack: "总量",
          barWidth: 24,
          silent: true,
          animationDelay: 300
        },
        {
          // 放行率
          name: "放行率",
          data: barData.fplrouteDepRate,
          type: "line",
          xAxisIndex: 0,
          yAxisIndex: 2,
          symbol: "line",
          silent: true
        },
        {
          // 计划柱图顶部border
          data: barData.fplrouteSchedule,
          type: "pictorialBar",
          symbolSize: [30, 1.5],
          symbol: "rect",
          symbolPosition: "end",
          symbolOffset: [0.7, -3],
          color: "rgba(225,225,225,0.2)",
          silent: true,
          animationDelay: 650
        },
        {
          // 不正常+正常堆叠柱图顶部border
          data: bgData,
          type: "pictorialBar",
          symbolSize: [30, 1.5],
          symbol: "rect",
          symbolPosition: "end",
          symbolOffset: [0.7, -3],
          color: "rgba(225,225,225,0.2)",
          silent: true,
          animationDelay: 650,
          xAxisIndex: 1,
          yAxisIndex: 1
        }
      ]
    };
    this.myChart.setOption(option);
  }
  render() {
    return (
      <div id="CorridorReleaseRateBar" className="CorridorReleaseRateBar"></div>
    );
  }
}
