class ThreeDBarChart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _drawChart() {
    let myChart = echarts.init(document.getElementById("ThreeDBarChart"));
    let width = 25,
      gradient = 0.4,
      gap = 10;
    let option = {
      color: ["#00C4F4", "#09EDB3"],
      grid: {
        top: 100,
        left: 50,
        right: 0
      },
      legend: {
        right: 90,
        itemWidth: 15,
        itemHeight: 15,
        selectedMode: false,
        itemGap: 20,
        icon: "roundRect",
        textStyle: {
          color: "#ffffff",
          fontSize: 20,
          padding: [5, 0, 0, 5]
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
      xAxis: {
        type: "category",
        axisLine: {
          show: true,
          lineStyle: {
            color: "#727a9e"
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: true,
          color: "#ffffff",
          fontSize: "20",
          fontFamily: "lcd"
        },
        data: ["今日累计", "2小时内", "未来2小时"]
      },
      yAxis: {
        // name: "人",
        // nameTextStyle: {
        //   color: "#727a9e",
        //   fontSize: "20",
        //   fontFamily: "lcd",
        //   padding: [0, 50, 0, 0]
        // },
        splitNumber: 3,
        nameGap: 30,
        splitLine: {
          show: true,
          lineStyle: {
            color: "#727a9e",
            width: 2
          }
        },
        axisLabel: {
          show: true,
          color: "#727a9e",
          fontSize: "20",
          fontFamily: "lcd"
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: "#727a9e",
            width: 2
          }
        },
        axisTick: {
          show: false
        }
      },
      series: [
        {
          type: "custom",
          name: "国内",
          silent: true,
          renderItem: (params, api) => {
            let centerPoint = api.coord([api.value(0), api.value(1)]);
            let bottomPoint = api.coord([api.value(0), 0]);
            return {
              type: "group",
              position: [-(width + gap), 0],
              children: [
                // 左侧柱子
                {
                  type: "polygon",
                  shape: {
                    points: [
                      [centerPoint[0], centerPoint[1]],
                      [centerPoint[0], bottomPoint[1]],
                      [
                        centerPoint[0] - width,
                        bottomPoint[1] - width * gradient
                      ],
                      [
                        centerPoint[0] - width,
                        centerPoint[1] - width * gradient
                      ]
                    ]
                  },
                  style: api.style({
                    fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      {
                        offset: 0,
                        color: "rgba(0,255,255,0.6)"
                      },
                      {
                        offset: 1,
                        color: "rgba(22,64,194,0.2)"
                      }
                    ])
                  })
                },
                // 右侧柱子
                {
                  type: "polygon",
                  shape: {
                    points: [
                      [centerPoint[0], centerPoint[1]],
                      [centerPoint[0], bottomPoint[1]],
                      [
                        centerPoint[0] + width,
                        bottomPoint[1] - width * gradient
                      ],
                      [
                        centerPoint[0] + width,
                        centerPoint[1] - width * gradient
                      ]
                    ]
                  },
                  style: api.style({
                    fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      {
                        offset: 0,
                        color: "rgba(0,255,255,0.3)"
                      },
                      {
                        offset: 1,
                        color: "rgba(22,64,194,0.05)"
                      }
                    ])
                  })
                },
                // 顶部
                {
                  type: "polygon",
                  shape: {
                    points: [
                      [centerPoint[0], centerPoint[1]],
                      [
                        centerPoint[0] - width,
                        centerPoint[1] - width * gradient
                      ],
                      [centerPoint[0], centerPoint[1] - 2 * width * gradient],
                      [
                        centerPoint[0] + width,
                        centerPoint[1] - width * gradient
                      ]
                    ]
                  },
                  style: api.style({
                    fill: api.style().fill
                  })
                },
                {
                  type: "text",
                  style: {
                    text: api.value(1),
                    x: centerPoint[0],
                    y: centerPoint[1] - width * 2.5,
                    fill: api.style().fill,
                    textAlign: "center",
                    font: '30px "lcd"'
                  }
                }
              ]
            };
          },
          data: this.props.internal
        },
        {
          type: "custom",
          name: "国际",
          silent: true,
          renderItem: (params, api) => {
            let centerPoint = api.coord([api.value(0), api.value(1)]);
            let bottomPoint = api.coord([api.value(0), 0]);
            return {
              type: "group",
              position: [width + gap, 0],
              children: [
                // 左侧柱子
                {
                  type: "polygon",
                  shape: {
                    points: [
                      [centerPoint[0], centerPoint[1]],
                      [centerPoint[0], bottomPoint[1]],
                      [
                        centerPoint[0] - width,
                        bottomPoint[1] - width * gradient
                      ],
                      [
                        centerPoint[0] - width,
                        centerPoint[1] - width * gradient
                      ]
                    ]
                  },
                  style: api.style({
                    fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      {
                        offset: 0,
                        color: "rgba(94,255,180,0.6)"
                      },
                      {
                        offset: 1,
                        color: "rgba(22,64,194,0.2)"
                      }
                    ])
                  })
                },
                // 右侧柱子
                {
                  type: "polygon",
                  shape: {
                    points: [
                      [centerPoint[0], centerPoint[1]],
                      [centerPoint[0], bottomPoint[1]],
                      [
                        centerPoint[0] + width,
                        bottomPoint[1] - width * gradient
                      ],
                      [
                        centerPoint[0] + width,
                        centerPoint[1] - width * gradient
                      ]
                    ]
                  },
                  style: api.style({
                    fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      {
                        offset: 0,
                        color: "rgba(94,255,180,0.3)"
                      },
                      {
                        offset: 1,
                        color: "rgba(22,64,194,0.05)"
                      }
                    ])
                  })
                },
                //顶部
                {
                  type: "polygon",
                  shape: {
                    points: [
                      [centerPoint[0], centerPoint[1]],
                      [
                        centerPoint[0] - width,
                        centerPoint[1] - width * gradient
                      ],
                      [centerPoint[0], centerPoint[1] - 2 * width * gradient],
                      [
                        centerPoint[0] + width,
                        centerPoint[1] - width * gradient
                      ]
                    ]
                  },
                  style: api.style({
                    fill: api.style().fill
                  })
                },
                {
                  type: "text",
                  style: {
                    text: api.value(1),
                    x: centerPoint[0],
                    y: centerPoint[1] - width * 2.5,
                    fill: api.style().fill,
                    textAlign: "center",
                    font: '30px "lcd"'
                  }
                }
              ]
            };
          },
          data: this.props.international
        }
      ]
    };
    setTimeout(() => {
      myChart.setOption(option);
    }, 0);
  }

  componentDidMount() {
    this._drawChart();
  }

  componentDidUpdate() {
    this._drawChart();
  }

  componentWillReceiveProps(newProps) {}

  render() {
    return (
      <div id={"ThreeDBarChart"} className="ThreeDBarChart" style={{ width: "100%", height: "90%" }}></div>
    );
  }
}
ThreeDBarChart.propTypes = {};
ThreeDBarChart.defaultProps = {};
export default ThreeDBarChart;
