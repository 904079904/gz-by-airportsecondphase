/*
* @Author: lvjn
* @Date:   2018-03-26 15:43:04
* @Last Modified by:   lvjn
* @Last Modified time: 2018-04-03 15:29:36
* @Email: lvjiannan@hiynn.com
* @FilePath: D:\hy_JiannanLv\hy_Program\airport-by-screen\src\component\WarnLevelCom\index.js
* @FileName: index.js
* @Descript: {Descript}
*/
import React, { Component } from 'react';
import { render } from 'react-dom';
import axiosToken from "js/axiosToken";

import warn from 'img/title/warn.png';
import warnSerious from 'img/title/warn-serious.png';
import warnSerious1 from 'img/title/warn-serious1.png';
// import  { get }  from 'src/utils/fetch';

// // config(服务器ip及端口)
// import config from 'public/libs/commonJs/config';

// css
import './WarnLevelCom.scss';

class WarnLevelCom extends Component {

	constructor(props) {
		super(props);
		this.state = {
			warnData: {}
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
		// const fetchUrl = 'public/mock/titleData/warnLevel.json';
		// const fetchUrl = `http://${config.ip}:${config.port}/${config.path}/warnLevel`;
		// get(fetchUrl, {/* 这里是json数据 */}).then(res=>{
		// 	res.code === 0 && this.setState({warnData: res.result});
		// }).catch(err=>{
		// 	console.error(err)
		// })
		axiosToken({ //国内天气
			method: 'get',
			url: realAddressUrlOne + `/screen/warnLevel`,
		  }).then((res) => {
			  // console.log('国内天气详情',res.data);
			  const {code,result} = res.data;
			  if (code === 0) {
				this.setState({
					warnData:result
				})
			  }
		  });
	}

	// getImgName 
	getImgName = (level) => {
		let imgName = null;
		switch(level) {
			case 0: 
				imgName = warn;
				break;
			case 1: 
				imgName = warn;
				break;
			case 2 :
				imgName = warnSerious1;
				break;
			case 3 :
				imgName = warnSerious;
				break;
			case 4 :
				imgName = warnSerious;
				break;
			default: 
				imgName = '';
		}
		return imgName;
	}

	getClassName = (level) =>{
		let name = null;
		switch(level) {
			case 0: 
			    name = 'warn-level-span';
				break;
			case 1: 
			    name = 'warn-level-span';
				break;
			case 2 :
				name = 'warn-level-yellow';
				break;
			case 3 :
				name = 'warn-level-red';
				break;
			case 4 :
				name = 'warn-level-red';
				break;
			default: 
			    name = '';
		}
		return name;
	}
	// addHandleTimer
	addHandleTimer = () => {
		this.timer = setInterval(() => {
			this.handleFetch();
		}, 8000);
	}

	// removeHandleTimer
	removeHandleTimer = () => {
		this.timer && clearInterval(this.timer);
	}

	render() {

		const { warnData } = this.state;
		const imgName = this.getImgName(warnData.level);
		const _className = this.getClassName(warnData.level);
		return(
			<div className='warn-level-com'>
				<span>预警级别</span>
				<img src={imgName} />
				{/* <span className={'warn-level-span' + warnData.level === 2 ? 'warn-level-yellow' : ( warnData.level === 1 ? '' : 'warn-level-red') }>{warnData.text ? warnData.text : '正常'}</span> */}
				<span className={_className}>{warnData.text ? warnData.text : '正常'}</span>
			</div>
		);
	}
}

export default WarnLevelCom;