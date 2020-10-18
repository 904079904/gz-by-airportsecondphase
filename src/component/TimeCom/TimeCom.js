/*
* @Author: lvjn
* @Date:   2018-03-26 14:04:15
* @Last Modified by:   lvjn
* @Last Modified time: 2018-03-26 15:15:42
* @Email: lvjiannan@hiynn.com
* @FilePath: D:\hy_JiannanLv\hy_Program\airport-by-screen\src\component\TimeCom\index.js
* @FileName: index.js
* @Descript: {Descript}
*/
import React ,{ Component } from 'react';
import { render } from 'react-dom';

// css
import './TimeCom.scss';

class TimeCom extends Component {

	constructor(props) {
		super(props);
		this.state = ({
			'fullYear': '',
			'fullTime': '',
			'weekDay': ''
		})
	}

	componentWillMount() {
		this.makeTime();
		this.addHandleTimer();
	}

	componentWillUnmount() {
		this.removeHandleTimer();
	}

	makeTime = () => {
		const weekObj = {
			1: '一',
			2: '二',
			3: '三',
			4: '四',
			5: '五',
			6: '六',
			0: '日'
		};
		let myDate = new Date();
		const yearTime = myDate.getFullYear();
		const monthTime = Number(myDate.getMonth()) + 1;
		const dayTime = myDate.getDate();
		const hourTime = myDate.getHours();
		const minuteTime = myDate.getMinutes() < 10 ? '0' + myDate.getMinutes() : myDate.getMinutes();
		const secondsTime = myDate.getSeconds() < 10 ? '0' + myDate.getSeconds() : myDate.getSeconds();
		const weekDay = myDate.getDay();
		const fullYear = `${yearTime}-${monthTime}-${dayTime}`;
		const fullTime = `${hourTime}:${minuteTime}:${secondsTime}`;
		this.setState({
			'fullYear': fullYear,
			'fullTime': fullTime,
			'weekDay': weekObj[weekDay]
		});
	}

	// addHandleTimer
	addHandleTimer = () => {
		this.timer = setInterval(() => {
			this.makeTime();
		} ,1000);
	}

	// removeHandleTimer
	removeHandleTimer = () => {
		this.timer && clearInterval(this.timer);
	}

	render() {

		const { fullYear, fullTime, weekDay } = this.state;
		return(
			<div className='time-com'>
				<span className='time-com-date'>{fullYear}</span>
				<span className='time-com-time'>{fullTime}</span>
				<span className='time-com-week'>{'星期' + weekDay}</span>
			</div>
		);
	}
}
export default TimeCom;