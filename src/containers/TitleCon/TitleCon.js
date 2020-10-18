/*
* @Author: lvjn
* @Date:   2018-03-26 13:53:00
* @Last Modified by:   lvjn
* @Last Modified time: 2018-04-03 15:20:31
* @Email: lvjiannan@hiynn.com
* @FilePath: D:\hy_JiannanLv\hy_Program\airport-by-screen\src\containers\Title\index.js
* @FileName: index.js
* @Descript: {Descript}
*/
import React ,{ Component } from 'react';
import { render } from 'react-dom';
import { message } from 'antd';
// components
import {TimeCom,WeatherCom,WarnLevelCom,DeicticWordCom,OnDutyCom} from 'com/index';

// css
import './TitleCon.scss';

class TitleCon extends Component {

	constructor(props) {
		super(props);
		this.state = {
			valueText: '',
			styleObj: '',
			scroll: 0
		};
		this.styleObj = {};
		this.colorArr = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'purple'];
	}

	// handleClick
	handleClick = () => {
		const titleInput = this.refs['titleInput'];
		const valueText = titleInput.value;
		// if(valueText && valueText.length >= 25) {
		// 	message.warning('文字超出25字限制');
		// 	return;
		// }
		this.setState({
			valueText: valueText
		});
	}
	// handleChange
	handleChange = (key, event) => {
		const ev = event || window.event;
		if(key === 'color') {
			const textIndex = ev.target.selectedIndex;
			this.styleObj[key] = this.colorArr[textIndex];
		}else {
			const textValue = ev.target.value;
			this.styleObj[key] = textValue.toString();
		}
	}
	// handleSureClick
	handleSureClick = () => {
		this.setState({
			styleObj: this.styleObj
		})
	}

	// changeName
	changeName = (e) => {
		this.setState({
			scroll: e.target.selectedIndex
		});
	}

	render() {

		const { valueText, styleObj, scroll } = this.state;
		return(
			<div className='title-con'>
				<TimeCom />
				<WeatherCom />
				<WarnLevelCom />
				<DeicticWordCom valueText={valueText} styleObj={styleObj} scroll={scroll}/>
				<OnDutyCom />
				<div className='title-div'>
					<input ref='titleInput' className='title-input' />
					<span onClick={this.handleClick} className='title-span'>确定</span>
				</div>
				<div className='style-div'>
					<span>字体:</span>
					<select onChange={this.handleChange.bind(this, 'fontFamily')} >
						<option>宋体</option>
						<option>黑体</option>
						<option>微软雅黑</option>
						<option>微软正黑体</option>
						<option>新宋体</option>
						<option>新细明体</option>
						<option>细明体</option>
						<option>标楷体</option>
						<option>仿宋</option>
						<option>楷体</option>
					</select>
					<span>字号:</span>
					<select onChange={this.handleChange.bind(this, 'fontSize')} >
						<option>22px</option>
						<option>24px</option>
						<option selected='true'>26px</option>
						<option>28px</option>
						<option>30px</option>
					</select>
					<span>颜色:</span>
					<select onChange={this.handleChange.bind(this, 'color')} >
						<option>红色</option>
						<option>橙色</option>
						<option>黄色</option>
						<option>绿色</option>
						<option>青色</option>
						<option>蓝色</option>
						<option>紫色</option>
					</select>
					<span onClick={this.handleSureClick}  className='title-span'>确定</span>
					<span>滚动:</span>
					<select onChange={this.changeName.bind(this)}>
						<option key='1'>滚动</option>
						<option key='0'>不滚动</option>
					</select>
				</div>
			</div>
		);
	}
}

export default TitleCon;