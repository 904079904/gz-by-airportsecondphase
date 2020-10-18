/*
* @Author: lvjn
* @Date:   2018-03-26 16:04:23
* @Last Modified by:   lvjn
* @Last Modified time: 2018-04-03 15:35:39
* @Email: lvjiannan@hiynn.com
* @FilePath: D:\hy_JiannanLv\hy_Program\airport-by-screen\src\component\OnDutyCom\index.js
* @FileName: index.js
* @Descript: {Descript}
*/
import React ,{ Component } from 'react';
import { render } from 'react-dom';
import axiosToken from "js/axiosToken";

// import  { get }  from 'src/utils/fetch';

// // config(服务器ip及端口)
// import config from 'public/libs/commonJs/config';

// css
import './OnDutyCom.scss';

class OnDutyCom extends Component {

	constructor(props) {
		super(props);
		this.state = {
			dutyList: []
		};
	}

	componentWillMount() {
		this.handleFetch();
		this.addHandleTimer();
	}

	componentWillUnmount() {
		this.removeHandleTimer();
	}


	// handleFetch
	handleFetch = () => {
		// const fetchUrl = 'public/mock/titleData/onDutyList.json';
		// const fetchUrl = `http://${config.ip}:${config.port}/${config.path}/onDutyList`;
		// get(fetchUrl, {/* 这里是json数据 */}).then(res=>{
		// 	res.code === 0 && this.setState({dutyList: res.result});
		// }).catch(err=>{
		// 	console.error(err)
		// })
		axiosToken({ //国内天气
			method: 'get',
			url: realAddressUrlOne + `/screen/workLogInfo`,
		}).then((res) => {
			const {code,result} = res.data;
			if (code === 0) {
				this.setState({
					dutyList:result
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

	removeHandleTimer = () => {
		this.timer && clearInterval(this.timer);
	}

	render() {

		const { dutyList } = this.state;
		return(
			<div className='on-duty-com'>
				<ul className='on-duty-ul'>
				{
					dutyList && dutyList.map((item, index) => {
						return(
							<li key={index}>{item.org} : {item.name}</li>
						)
					})
				}
				</ul>
			</div>
		);
	}
}

export default OnDutyCom;