import * as material from "./MapWeatherData.js";

import "echarts/map/js/china.js";
class MapWeatherChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      effect1: {
        show: true,
        period: 3,
        trailLength: 0.1,
        symbolSize: 5
      },
      effect2: {
        show: true,
        delay: 4000,
        period: 2,
        trailLength: 0.1,
        symbolSize: 5
      },
      // data: effectData,
      lineStyle: {
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
        width: 3,
        opacity: 0.03,
        // curveness: -0.3,
        curveness:0.4,
      }
    };
    this._drawChart = this._drawChart.bind(this);
    this._createBigPoint = this._createBigPoint.bind(this);
    this._createBigPointLabel = this._createBigPointLabel.bind(this);
    this._createLittlePoint = this._createLittlePoint.bind(this);
    this._switchWeather = this._switchWeather.bind(this);
  }
  //创造大机场点位
  _createBigPoint(e,weatherTopData) {
    let array = Object.keys(e).map((item, index) => {
      let weather = this._getAirportWeather(item,weatherTopData);
      return {
        symbol: "image://" + material.bigAirportImg,
        // symbolSize: 30,
        symbolSize: [90,114],
        label: {
          show: true,
          position: ["10%", "-30%"],
          padding: [19, 15, 19, 15],
          width: 62,
          height: 58,
          color: "rgba(255,255,0,0)",
          backgroundColor: {
            image: this._switchWeather(weather)
          },
          formatter: params => {
            return "占位符";
          }
        },
        value: material.bigAirplanPoint[item]
      };
    });
    return array;
  }
  //创造大机场名称label
  _createBigPointLabel(e) {
    let array = Object.keys(e).map((item, index) => {
      return {
        name: material.airportCode[item],
        value: material.bigAirplanPoint[item],
        label: {
          show: true,
          offset: [0, 70],
          color: "rgba(255,255,255,1)",
          fontSize: 14,
          formatter: params => {
            return params.data.name;
          }
        }
      };
    });
    return array;
  }
  //创造小机场点位
  _createLittlePoint(e) {
    let array = Object.keys(e).map((item, index) => {
      return {
        symbol: "image://" + material.littleAirportImg,
        symbolSize: 30,
        value: material.littleAirplanPoint[item]
      };
    });
    return array;
  }
  //天气标志判断
  _switchWeather(e) {
    switch (e.trim()) {
      case "雾":
        return material.fog;
      case "晴":
        return material.sun;
      case "阵雨":
        return material.shower;
      case "霾":
        return material.haze;
      case "小雪":
        return material.lightSnow;
      case "小雨":
        return material.lightRain;
      case "中雨":
        return material.rain;
      default:
        break;
    }
  }

  //处理普通机场数据
  _handleairportData(data){
    let _littleAirplanPoint = material.littleAirplanPoint;
    let json = {
    }
    data.map(ele=>{
      if (_littleAirplanPoint[ele.airport]) {
        json[ele.airport] = _littleAirplanPoint[ele.airport];
      }
    })
    return json;
  }

  _drawChart(weatherTop,weatherCommom) {

    let centerWeather = this._getAirportWeather('CAN',weatherTop); //广州的天气

    let littleAirplanPoint = this._handleairportData(weatherCommom);


    let myChart = echarts.init(document.getElementById("MapWeatherChart"));
    let option = {
      geo: {
        map: "china",
        left: "16%",
        top: "10%",
        zoom: 1.28,
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
          lineStyle: this.state.lineStyle,
          effect: this.state.effect1,
          data: material.lineData
        },
        //绚光2
        {
          name: "绚光2",
          type: "lines",
          coordinateSystem: "geo",
          lineStyle: this.state.lineStyle,
          effect: this.state.effect2,
          data: material.lineData
        },
        //中心机场-动画
        {
          type: "scatter",
          name: "中心机场-动画",
          coordinateSystem: "geo",
          data: [
            {
              name: "centerLight",
              value: material.centerAirplanPoint.CAN,
              symbol: "image://" + material.centerAirportImg,
              offset: [0, 0],
              symbolSize:[ 105,134],
            }
          ],
          z: 100,
          label: {
            show: true,
            offset: [0, -30],
            padding: [19, 15, 19, 15],
            width: 62,
            height: 48,
            color: "rgba(255,255,0,0)",
            backgroundColor: {
              image: this._switchWeather(centerWeather)
            },
            formatter: params => {
              return "占位符";
            }
          },
        },
        //十大机场-动画
        {
          type: "scatter",
          name: "十大机场-动画",
          coordinateSystem: "geo",
          data: this._createBigPoint(material.bigAirplanPoint,weatherTop)
        },

        //十大机场-名称
        {
          type: "scatter",
          name: "十大机场-名称",
          coordinateSystem: "geo",
          symbol: "circle",
          itemStyle: {
            color: "rgba(255,255,255,0)"
          },
          data: this._createBigPointLabel(material.bigAirplanPoint)
        }
        ,
        //小机场点位
        {
          type: "scatter",
          name: "小机场",
          coordinateSystem: "geo",
          data: this._createLittlePoint(littleAirplanPoint)
        }
      ]
    };
    myChart.setOption(option);
  }
  //根据 material 里的机场的三字码取得数据里对应的天气情况
  _getAirportWeather(code,weatherTop){
    
    let arr = weatherTop.filter(ele => ele.airport === code);
    return arr.length > 0 ? arr[0].icon : '晴天';
  }

  componentDidMount() {
    const {weatherTop,weatherCommom} = this.props;
    this._drawChart(weatherTop,weatherCommom);
  }

  componentWillReceiveProps(newProps) {
    const {weatherTop,weatherCommom} = newProps;
    if (weatherTop.length > 0) {
      this._drawChart(weatherTop,weatherCommom);
    }
  }
  render() {
    return <div id={"MapWeatherChart"}></div>;
  }
}

MapWeatherChart.propTypes = {
  weatherTop:PropTypes.array.isRequired,
  weatherCommom:PropTypes.array.isRequired,
};
MapWeatherChart.defaultProps = {};
export default MapWeatherChart;
