import common from "img/sec_common.png";
import active from "img/sec_active.png";
const Random = Mock.Random;

export default class SecCheckAnalysisBar extends Component {
  constructor(props) {
    super(props);
  }

  _drawChart() {
    let myChart = echarts.init(
      document.getElementById("SecCheckAnalysisBar" + this.props.id)
    );
    let xAxisData = [
      "equipment1",
      "equipment2",
      "equipment3",
      "equipment4",
      "equipment5",
      "equipment6",
      "equipment7",
      "equipment8",
      "equipment9",
      "equipment10"
    ];
    let length = xAxisData.length;
    let data = this.props.data || {};
    let scale = (data.open / data.total) * length;
    let index = 0;
    if (!isNaN(scale)) {
      index = Math.round(scale);
    }
    let dataArr = [];
    for (let i = 0; i < length; i++) {
      let waitTime = data.waitTime || 0;
      waitTime = waitTime > 0 ? waitTime - 0.5 : 0;
      if (waitTime && i < index) {
        waitTime = waitTime + Math.floor(Random.float(-1, 1));
        waitTime = waitTime < 0.5 ? 0.5 : waitTime;
        dataArr.push(waitTime);
      } else {
        dataArr.push(0);
      }
    }
    let width = 102,
      height = 121,
      gap = 10;
    let option = {
      grid: {
        left: 50,
        right: 140,
        bottom: 50,
        top: 140,
        containLabel: false
      },
      xAxis: [
        {
          type: "category",
          data: xAxisData,
          position: "top",
          inverse: true,
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
          position: "right",
          max: 15,
          inverse: true,
          axisLine: {
            show: false
          },
          axisLabel: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          }
        }
      ],
      // 右侧样式
      graphic: {
        elements: [
          {
            type: "group",
            right: 65,
            top: 200,
            children: [
              {
                type: "text",
                style: { text: "0-5", fill: "#0AEEB3", font: '40px "lcd"' }
              },
              {
                type: "text",
                top: 55,
                style: {
                  text: "mins",
                  fill: "#0AEEB3",
                  font: "30px 'Microsoft YaHei', sans-serif"
                }
              }
            ]
          },
          {
            type: "group",
            right: 50,
            top: 500,
            children: [
              {
                type: "text",
                style: { text: "5-10", fill: "#F8FF44", font: '40px "lcd"' }
              },
              {
                type: "text",
                top: 55,
                style: {
                  text: "mins",
                  fill: "#F8FF44",
                  font: "30px 'Microsoft YaHei', sans-serif"
                }
              }
            ]
          },
          {
            type: "group",
            right: 10,
            top: 800,
            children: [
              {
                type: "text",
                style: { text: "15", fill: "#F72928", font: '40px "lcd"' }
              },
              {
                type: "text",
                top: 55,
                style: {
                  text: "mins以上",
                  fill: "#F72928",
                  font: "30px 'Microsoft YaHei', sans-serif"
                }
              }
            ]
          }
        ]
      },
      series: [
        // 单个柱图
        {
          type: "custom",
          name: "All",
          silent: true,
          animation: false,
          renderItem: (params, api) => {
            let bottomPoint = api.coord([api.value(0), 0]);
            return {
              type: "group",
              children: [
                // 背景条样式
                {
                  type: "rect",
                  shape: {
                    x: bottomPoint[0] - width / 2 + gap / 2,
                    y: bottomPoint[1],
                    width: width - 10 - gap,
                    height: 290
                  },
                  style: {
                    fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      {
                        offset: 0,
                        color: "rgba(10,238,179,0.1)"
                      },
                      {
                        offset: 0.5,
                        color: "rgba(10,238,179,0.2)"
                      },
                      {
                        offset: 1,
                        color: "rgba(10,238,179,0.1)"
                      }
                    ])
                  }
                },
                {
                  type: "rect",
                  shape: {
                    x: bottomPoint[0] - width / 2 + gap / 2,
                    y: bottomPoint[1] + 290,
                    width: width - 10 - gap,
                    height: 290
                  },
                  style: {
                    fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      {
                        offset: 0,
                        color: "rgba(248,255,68,0.1)"
                      },
                      {
                        offset: 0.5,
                        color: "rgba(248,255,68,0.2)"
                      },
                      {
                        offset: 1,
                        color: "rgba(248,255,68,0.1)"
                      }
                    ])
                  }
                },
                {
                  type: "rect",
                  shape: {
                    x: bottomPoint[0] - width / 2 + gap / 2,
                    y: bottomPoint[1] + 290 + 290,
                    width: width - 10 - gap,
                    height: 290
                  },
                  style: {
                    fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      {
                        offset: 0,
                        color: "rgba(247,41,40,0.1)"
                      },
                      {
                        offset: 0.5,
                        color: "rgba(247,41,40,0.2)"
                      },
                      {
                        offset: 1,
                        color: "rgba(247,41,40,0.1)"
                      }
                    ])
                  }
                }
              ]
            };
          },
          data: dataArr
        },
        {
          type: "custom",
          name: "All",
          silent: true,
          animation: false,
          renderItem: (params, api) => {
            let centerPoint = api.coord([api.value(0), api.value(1)]);
            return {
              type: "group",
              children: [
                // label
                {
                  type: "image",
                  style: {
                    image: params.dataIndex > index - 1 ? common : active,
                    x: centerPoint[0] - width / 2,
                    y: 10,
                    width: width - 10,
                    height: height
                  }
                }
              ]
            };
          },
          data: dataArr
        },
        {
          name: "柱图",
          type: "pictorialBar",
          barWidth: "30%",
          symbol: peopleImage,
          symbolOffset: [-5, 5],
          symbolSize: [20, 45],
          symbolRepeat: true,
          data: dataArr
        }
      ]
    };
    myChart.setOption(option);
  }

  getRandom(min, max) {}

  componentDidMount() {
    this._drawChart();
  }

  componentDidUpdate() {
    this._drawChart();
  }

  render() {
    return (
      <div
        id={"SecCheckAnalysisBar" + this.props.id}
        style={{ width: "100%", height: "95%" }}
      ></div>
    );
  }
}

const peopleImage =
  "image://data:image/png;base64,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";

SecCheckAnalysisBar.propTypes = {};
SecCheckAnalysisBar.defaultProps = {
  id: 0
};
