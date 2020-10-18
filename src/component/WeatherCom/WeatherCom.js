/*
* @Author: lvjn
* @Date:   2018-03-26 15:16:35
* @Last Modified by:   lvjn
* @Last Modified time: 2018-04-02 20:31:56
* @Email: lvjiannan@hiynn.com
* @FilePath: D:\hy_JiannanLv\hy_Program\airport-by-screen\src\component\WeatherCom\index.js
* @FileName: index.js
* @Descript: {Descript}
*/
import React, { Component } from 'react';
import { render } from 'react-dom';
import axiosToken from "js/axiosToken";

// import  { get }  from 'src/utils/fetch';

// // config(服务器ip及端口)
// import config from 'public/libs/commonJs/config';


// weather
import WeatherIcon from './weatherIcons';
// css
import './WeatherCom.scss';

class WeatherCom extends Component {

	constructor(props) {
		super(props);
		this.state = {
			weatherData: {}
		};
	}

	componentWillMount() {
		this.handleFetch();
	}

	componentDidMount() {
		this.addHandleTimer();
	}

	componentWillUnmount() {
		this.removeHandleTimer();
	}

	// handleFetch
	handleFetch = () => {
		// const fetchUrl = 'http://localhost:3000/corridorReleaseRate';
		// const fetchUrl = `http://${config.ip}:${config.port}/${config.path}/weatherDetail/CAN`;
		// get(fetchUrl, {/* 这里是json数据 */}).then(res=>{
		// 	res.code === 0 && this.setState({weatherData: res.result});
		// }).catch(err=>{
		// 	console.error(err)
		// })
		axiosToken({ //国内天气
			method: 'get',
			url: realAddressUrlOne + `/screen/weatherDetail/CAN`,
		  }).then((res) => {
			  // console.log('国内天气详情',res.data);
			  const {code,result} = res.data;
			  if (code === 0) {
				this.setState({
					weatherData:result
				})
			  }
		  });
	}

	// addHandleTimer
	addHandleTimer = () => {
		this.timer = setInterval(() => {
			this.handleFetch();
		}, 5000);
	}

	// removeHandleTimer
	removeHandleTimer = () => {
		this.timer && clearInterval(this.timer);
	}

	render() {

		const { weatherData } = this.state;
		
		return(
			<div className='weather-com'>
				<span className='weather-img'  dangerouslySetInnerHTML={{__html: WeatherIcon[weatherData.type ? weatherData.type : '晴']}}></span>
				<span className='weather-temp'>{weatherData.temp}</span>
				<span className='weather-decrip'>{weatherData.type ? weatherData.type : '晴'}</span>
				<span className='weather-wind'>{weatherData.windDirection + weatherData.windScale}</span>
			</div>
		);
	}
}

export default WeatherCom;