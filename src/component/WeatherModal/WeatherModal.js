/**
 Crate by wanjikun on 19/11/12.
*/
import axiosToken from "js/axiosToken";

import weatherModalClose from "img/weatherModalClose.png";
import './WeatherModal.scss'
export default class WeatherModal extends Component{
 constructor(props) {
   super(props);
   this.state = {
      name:'',
      type:'',
      temp:'',
      visibility:'',
      windSpeed:'',
      windDirection:'',
      windScale:'',
      clouds:'',
      ifAnimate:false,
   }

   this.timer = null;
 }

componentWillReceiveProps(nextProps){
    let { weatherTop } = nextProps;

    console.log('weatherTopweatherTopweatherTop',weatherTop);
    // this.getWeatherData(weatherTop);
    this.setTimer(weatherTop)
}
componentWillUnmount(){
    this.timer && clearInterval(this.timer);
}
getWeatherData=(e)=>{
    let data = e;
    axiosToken({ //国内天气
      method: 'get',
      url: realAddressUrlOne + `/screen/weatherDetail/${data.airport}`,
    }).then((res) => {
        // console.log('国内天气详情',res.data);
        const {code,result} = res.data;
        if (code === 0) {
            this.setState({
                ifAnimate:true
            })
            setTimeout(()=>{
                this.setState({
                  name:result.name,
                  temp:result.temp,
                  visibility:result.visibility,
                  windSpeed:result.windSpeed,
                  windDirection:result.windDirection,
                  clouds:result.clouds,
                  type:result.type,
                  windScale:result.windScale,
                  ifAnimate:false
                })
            },1000)
        }
    });
} 
setTimer=(e)=>{
    let data = e;
    let index = 0;
    this.getWeatherData(data[index]);
    this.timer = setInterval(() => {
        index++;
        if (index > data.length - 1) {
            index = 0;
            this.getWeatherData(data[index]);
            return;
        }
        this.getWeatherData(data[index]);
    }, globalTimer.weatherDetailDelay);
}

 render() {
   const {name,type,temp,visibility,windSpeed,windDirection,windScale,clouds,ifAnimate} = this.state;
   return(
    <div className={ifAnimate === true ? 'WeatherModal  fadeOut' : 'WeatherModal'}>
        <img src={weatherModalClose} className="weatherModalClose"></img>
        <div className="modalCont">
            <div className="modalContItem">
            <div className="itemTit">
                机场名称
            </div>
            <div className="itemCont">
                <div className="airportName">
                {name}
                </div>
            </div>
            </div>
            <div className="modalContItem">
                <div className="itemTit">
                    天气类型
                </div>
                <div className="itemCont">
                    {type}
                </div>
            </div>
            <div className="modalContItem">
                <div className="itemTit">
                    温度
                </div>
                <div className="itemCont">
                    {temp}
                </div>
            </div>
            <div className="modalContItem">
            <div className="itemTit">
                能见度
            </div>
            <div className="itemCont">
                {visibility}
            </div>
            </div>
            <div className="modalContItem">
            <div className="itemTit">
                风速风向
            </div>
            <div className="itemCont">
                {windSpeed+' '+windDirection}
            </div>
            </div>
            <div className="modalContItem">
            <div className="itemTit">
                云层
            </div>
            <div className="itemCont">
                {clouds}
            </div>
            </div>
        </div>
    </div>
   )
 }
}

WeatherModal.propTypes = {
    weatherTop:PropTypes.array.isRequired,
}
WeatherModal.defaultProps = {}