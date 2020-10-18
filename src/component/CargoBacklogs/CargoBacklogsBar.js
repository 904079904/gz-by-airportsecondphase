import lineBar from "img/texture_bg.png";
let bg = new Image();
bg.src = lineBar;

export default class CargoBacklogsBar extends Component {
  constructor(props) {
    super(props);
  }

  _drawChart() {
    let myChart = echarts.init(document.getElementById("CargoBacklogsBar"));
    let barWidth = "20%";
    let bgArr = new Array(
      (this.props.time && this.props.time.length) || 0
    ).fill(1);
    let legendColorArr = new Array(
      (this.props.time && this.props.time.length) || 0
    ).fill(0);
    let option = {
      grid: {
        left: 120,
        right: 0,
        bottom: 50,
        top: 60,
        containLabel: false
      },
      color: ["#00c2f5", "#09EDB3"],
      legend: {
        right: 0,
        itemWidth: 15,
        itemHeight: 15,
        selectedMode: false,
        itemGap: 10,
        icon: "roundRect",
        textStyle: {
          color: "#ffffff",
          fontSize: 20,
          padding: [5, 0, 0, 0]
        },
        data: [
          {
            name: "国内"
          },
          {
            name: "国际"
          }
        ]
      },
      xAxis: [
        {
          type: "category",
          data: this.props.time || [],
          axisLine: {
            lineStyle: {
              color: "#727a9e"
            }
          },
          axisLabel: {
            margin: 16,
            textStyle: {
              fontSize: 20,
              color: "#4CB8F7"
            }
          },
          axisTick: {
            show: false
          }
        },
        {
          type: "category",
          data: this.props.time || [],
          axisLine: {
            show: false
          },
          axisLabel: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        {
          type: "category",
          data: this.props.time || [],
          axisLine: {
            show: false
          },
          axisLabel: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        {
          type: "category",
          data: this.props.time || [],
          axisLine: {
            show: false
          },
          axisLabel: {
            show: false
          },
          axisTick: {
            show: false
          }
        }
      ],
      yAxis: [
        {
          type: "value",
          name: "(吨)",
          nameTextStyle: {
            fontSize: 16,
            color: "#4CB8F7",
            padding: [0, 60, 0, 0]
          },
          max: value => {
            return value.max + value.max * 0.3;
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#727a9e",
              width: 2
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#727a9e",
              width: 2
            }
          },
          axisLabel: {
            margin: 16,
            textStyle: {
              fontFamily: "lcd",
              fontSize: 24,
              color: "#4CB8F7"
            }
          },
          axisTick: {
            show: false
          }
        },
        {
          type: "value",
          max: 1,
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            show: false
          },
          axisTick: {
            show: false
          }
        }
      ],
      series: [
        // 国内柱图的数据
        {
          name: "国内1",
          type: "bar",
          barWidth: barWidth,
          label: {
            show: true,
            position: "top",
            color: pargam => {},
            fontFamily: "lcd",
            fontSize: 20,
            offset: [-3, 0]
          },
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#00c2f5"
                },
                {
                  offset: 1,
                  color: "rgba(0,210,245,0.1)"
                }
              ])
            }
          },
          data: this.props.internal || []
        },
        {
          //柱图背景
          name: "bg1",
          type: "bar",
          z: -1,
          xAxisIndex: 1,
          yAxisIndex: 1,
          slient: true,
          barWidth: barWidth,
          itemStyle: {
            normal: {
              color: "rgba(0,113,188, 0.2)"
            }
          },
          data: bgArr
        },
        {
          // 国内柱图背景纹理
          type: "bar",
          name: "repeat1",
          barWidth: barWidth,
          xAxisIndex: 2,
          itemStyle: {
            color: {
              image: bg,
              repeat: "repeat"
            }
          },
          data: this.props.internal || []
        },
        {
          type: "bar",
          name: "国内",
          xAxisIndex: 3,
          data: legendColorArr
        },
        // 国际柱图
        {
          name: "国际1",
          type: "bar",
          barWidth: barWidth,
          label: {
            show: true,
            position: "top",
            color: pargam => {},
            fontFamily: "lcd",
            fontSize: 20,
            offset: [3, 0]
          },
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#00d36f"
                },
                {
                  offset: 1,
                  color: "rgba(0,211,111,0.1)"
                }
              ])
            }
          },
          data: this.props.international || []
        },
        // 国际柱图背景
        {
          name: "bg2",
          type: "bar",
          barWidth: barWidth,
          xAxisIndex: 1,
          yAxisIndex: 1,
          z: -1,
          itemStyle: {
            normal: {
              color: "rgba(0,113,188, 0.2)"
            }
          },
          slient: true,
          data: bgArr
        },
        {
          // 国际柱图背景纹理
          type: "bar",
          name: "repeat1",
          barWidth: barWidth,
          xAxisIndex: 2,
          itemStyle: {
            color: {
              image: bg,
              repeat: "repeat"
            }
          },
          data: this.props.international || []
        },
        {
          type: "bar",
          name: "国际",
          xAxisIndex: 3,
          data: legendColorArr
        }
      ]
    };
    myChart.setOption(option);
  }

  componentDidMount() {
    this._drawChart();
  }

  componentDidUpdate() {
    this._drawChart();
  }

  render() {
    return (
      <div
        id={"CargoBacklogsBar"}
        className="CargoBacklogsBar"
        style={{ width: "100%", height: "90%" }}
      ></div>
    );
  }
}

CargoBacklogsBar.propTypes = {};
CargoBacklogsBar.defaultProps = {};
