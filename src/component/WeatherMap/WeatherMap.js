/**
 Crate by wanjikun on 19/10/28.
*/
import axiosToken from "js/axiosToken";

import { TitleCom, MapWeatherChart,WeatherModal } from "com/index";
import topLegend from "img/topLegend.png";
import airportLegend from "img/airportLegend.png";
import weatherModalClose from "img/weatherModalClose.png";
import isLand from "img/isLand.png";
import "./WeatherMap.scss";
import { locale } from "moment";
export default class WeatherMap extends Component {
  constructor(props) {
    super(props);
    this.state={
      modalShow:true,
      weatherTop:[],
      weatherCommom:[],
    }
  }

  componentDidMount() {
    this.getData();
  }

  getData=()=>{
    axiosToken({ //国内天气
      method: 'get',
      url: realAddressUrlOne + '/screen/weatherList',
    }).then((res) => {
        // console.log('国内天气',res.data);
        const {code,result:{weatherTop,weatherCommom}} = res.data;
        if (code === 0) {
          this.setState({
            weatherTop:weatherTop,
            weatherCommom:weatherCommom,
          })
        }
    });
    // let airportTop = [[
    //   {
    //     coord: [113.309723,23.392866]
    //   },
    //   {
    //     coord: [116.609564,40.083812]
    //   }
    // ],[
    //   {
    //     coord: [113.309723,23.392866]
    //   },
    //   {
    //     coord: [121.81509,31.157478]
    //   }
    // ],[
    //   {
    //     coord: [113.309723,23.392866]
    //   },
    //   {
    //     coord: [103.958189,30.565774]
    //   }
    // ],[
    //   {
    //     coord: [113.309723,23.392866]
    //   },
    //   {
    //     coord: [113.821705,22.638172]
    //   }
    // ],[
    //   {
    //     coord: [113.309723,23.392866]
    //   },
    //   {
    //     coord: [102.935615,25.102871]
    //   }
    // ],[
    //   {
    //     coord: [113.309723,23.392866]
    //   },
    //   {
    //     coord: [121.346817,31.203347]
    //   }
    // ],[
    //   {
    //     coord: [113.309723,23.392866]
    //   },
    //   {
    //     coord: [108.768576,34.442079]
    //   }
    // ],[
    //   {
    //     coord: [113.309723,23.392866]
    //   },
    //   {
    //     coord: [106.645226,29.723155]
    //   }
    // ],[
    //   {
    //     coord: [113.309723,23.392866]
    //   },
    //   {
    //     coord: [120.443341,30.240638]
    //   }
    // ],[
    //   {
    //     coord: [113.309723,23.392866]
    //   },
    //   {
    //     coord: [87.487028,43.912386]
    //   }
    // ],[
    //   {
    //     coord: [113.309723,23.392866]
    //   },
    //   {
    //     coord: [90.918706,29.299495]
    //   }
    // ],[
    //   {
    //     coord: [113.309723,23.392866]
    //   },
    //   {
    //     coord: [126.259545,45.633583]
    //   }
    // ]]
  }

  handleWeatherTopData(data){
    let centerObj = data.filter(item => item.name === '广州')[0];
    let arr = [];
    data.map((value, index, array)=> {
  　　　let {local} = value;
        if (name !== '广州') {
          arr.push(
            [
              centerObj.local,
              local
            ]
          )
        }
    });
    return arr;
  }
  handleAirportListData(data){
    let arr = [];
    data.map((value, index, array)=> {
  　　　let {local} = value;
          arr.push({
            value:local
          })
    });
    return arr;
  }
  render() {
    const {modalShow,weatherTop,weatherCommom} = this.state;
    return (
      <div className={"WeatherMap"}>
        <div className="weatherMapTit">
          <TitleCom title="国内天气"></TitleCom>
        </div>
        <div className="legendCon">
          <div className="legendItem">
            <div className="legendImg">
              <img src={topLegend} className="topLegendImg"></img>
            </div>
            <span>TOP10机场</span>
          </div>
          <div className="legendItem">
            <div className="legendImg">
              <img src={airportLegend} className="airportLegendImg"></img>
            </div>
            <span>小机场</span>
          </div>
        </div>
        <div className="isLand">
          <img src={isLand}></img>
        </div>
        <div className={modalShow === true ? "weatherModalCom active" : "weatherModalCom"}>
          <WeatherModal weatherTop={weatherTop}></WeatherModal>          
        </div>
        <div className="MapWeatherChart">
          <MapWeatherChart weatherTop={weatherTop} weatherCommom={weatherCommom}/>
        </div>
        <div className="MapWeatherChartBg"></div>
      </div>
    );
  }
}

WeatherMap.propTypes = {};
WeatherMap.defaultProps = {};
