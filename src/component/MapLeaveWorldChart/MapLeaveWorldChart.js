import * as material from "./MapLeaveWorldData.js";
import "echarts/map/js/world.js";

class MapLeaveWorldChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      effect1: {
        show: true,
        period: 8,
        trailLength: 0,
        symbolSize: 25,
        symbol: "image://" + material.lineAirplan
      },
      effect2: {
        show: true,
        period: 8,
        trailLength: 0.1,
        symbolSize: 5,
        symbol: "circle"
      },
      lineStyle1: {
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: "#ffffff" // 0% 处的颜色
            },
            {
              offset: 0.3,
              opacity: 0.7,
              color: "#fbed21" // 0% 处的颜色
            },
            {
              offset: 0.7,
              color: "#3fecff" // 0% 处的颜色
            },
            {
              offset: 1,
              color: "#ffffff" // 100% 处的颜色
            }
          ],
          global: false // 缺省为 false,
        },
        shadowColor: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: "#ffffff" // 0% 处的颜色
            },
            {
              offset: 0.3,
              opacity: 0.7,
              color: "#fbed21" // 0% 处的颜色
            },
            {
              offset: 0.7,
              color: "#3fecff" // 0% 处的颜色
            },
            {
              offset: 1,
              color: "#ffffff" // 100% 处的颜色
            }
          ]
        },
        shadowBlur: 20,
        width: 3,
        opacity: 0.35,
        curveness: -0.4
      },
      lineStyle2: {
        color: "#00ffff",
        width: 3,
        opacity: 0,
        curveness: -0.4
      }
    };
    this._drawChart = this._drawChart.bind(this);
    this._createAbroadPoint = this._createAbroadPoint.bind(this);
    this._createLine = this._createLine.bind(this);
  }
  _createAbroadPoint(e) {
    let array = Object.keys(e).map(item => {
      return {
        name: item,
        symbol: "image://" + material.littleAirportImg,
        symbolSize: 80,
        value: material.abroadAirplanPoint[item].coord
      };
    });
    return array;
  }
  //创造连线数据
  _createLine(source, targect) {
    let array = Object.keys(targect).map((i, j) => {
      return [
        {
          coord: source
        },
        {
          coord: targect[i].coord
        }
      ];
    });
    return array;
  }

  //创造机场名称label
  _createBigPointLabel(e) {
    let array = Object.keys(e).map((item, index) => {
      return {
        name: material.abroadAirplanPoint[item].city,
        value: material.abroadAirplanPoint[item].coord,
        label: {
          show: true,
          offset: [0,50],
          color: "rgba(255,255,255,1)",
          fontSize: 20,
          formatter: params => {
            return params.data.name;
          }
        }
      };
    });
    return array;
  }

  //接口获取的数据匹配abroadAirplanPoint返回新的数据
  _handleFltData(fltData){
    let obj = {};
    fltData.map(ele=>{
      if (material.abroadAirplanPointSwitch[ele.code] && material.abroadAirplanPoint[ele.code]) {
        obj[ele.code] = material.abroadAirplanPoint[ele.code];
      }
    })
    return obj;
  }

  _drawChart(fltData) {

    let _abroadAirplanPoint = this._handleFltData(fltData);

    let myChart = echarts.init(document.getElementById("MapLeaveWorldChart"));

    let option = {
      geo: {
        map: "world",
        left: "10%",
        top: "14%",
        zoom: 1.4,
        roam: false,
        itemStyle: {
          opacity: 0
        },
        silent:true
      },
      series: [
        //绚光1
        {
          name: "绚光1",
          type: "lines",
          coordinateSystem: "geo",
          lineStyle: this.state.lineStyle1,
          effect: this.state.effect1,
          // data: this.state.lineData
          data: this._createLine(
            material.centerAirplanPoint.CAN,
            // material.abroadAirplanPoint
            _abroadAirplanPoint
          )
        },
        //绚光2
        {
          name: "绚光2",
          type: "lines",
          coordinateSystem: "geo",
          lineStyle: this.state.lineStyle2,
          effect: this.state.effect2,
          data: this._createLine(
            material.centerAirplanPoint.CAN,
            // material.abroadAirplanPoint
            _abroadAirplanPoint
          ),
          zlevel: 1
        },
        //中心机场-动画
        {
          type: "effectScatter",
          name: "十大机场-动画",
          coordinateSystem: "geo",
          data: [
            {
              name: "centerLight",
              value: material.centerAirplanPoint.CAN,
              symbol: "image://" + material.centerAirportImg,
              symbolSize: 40,
              itemStyle: {
                color: "blue"
              }
            }
          ]
        },
        //境外机场
        {
          type: "scatter",
          name: "境外机场",
          coordinateSystem: "geo",
          // data: this._createAbroadPoint(material.abroadAirplanPoint)
          data: this._createAbroadPoint(_abroadAirplanPoint)
        },
        //境外机场-名称
        {
          type: "scatter",
          name: "境外机场-名称",
          coordinateSystem: "geo",
          symbol: "circle",
          itemStyle: {
            color: "rgba(255,255,255,0)"
          },
          data: this._createBigPointLabel(_abroadAirplanPoint)
        }
      ]
    };
    myChart.setOption(option);
    myChart.on("click", params => {
      console.log(params.data.name);
    });
  }

  componentDidMount() {
    // this._drawChart();
  }

  componentWillReceiveProps(newProps) {
    const {fltData} = newProps;
    if (fltData.length > 0) {
      this._drawChart(fltData);
    }
  }

  render() {
    return <div id={"MapLeaveWorldChart"}></div>;
  }
}
MapLeaveWorldChart.propTypes = {
  fltData:PropTypes.array.isRequired,
};
MapLeaveWorldChart.defaultProps = {
  
};
export default MapLeaveWorldChart;
