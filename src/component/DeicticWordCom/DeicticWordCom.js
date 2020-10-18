/*
* @Author: lvjn
* @Date:   2018-03-26 15:53:35
* @Last Modified by:   yunin
* @Last Modified time: 2018-05-10 23:51:40
* @Email: lvjiannan@hiynn.com
* @FilePath: D:\hy_JiannanLv\hy_Program\airport-by-screen\src\component\DeicticWordCom\index.js
* @FileName: index.js
* @Descript: {Descript}
*/
import React ,{ Component } from 'react';
import { render } from 'react-dom';

// css
import './DeicticWordCom.scss';

class DeicticWordCom extends Component {

	constructor(props) {
		super(props);
		this.styleLeft = 0;
		this.midWidth = 2100;
		this.state = {
			'liWidth': '',
			'ulWidth': '',
			'animateTime': ''
		};
		this.updateNum = 0;
	}

	componentWillReceiveProps(nextProps) {
		const { valueText } = nextProps;
		const deicticWordLi = this.refs['deicticWordLi'];
		const liWidth = deicticWordLi.clientWidth;
		let ulWidth = null;
		if(valueText.length < 15) {
			this.midWidth = 2100;
			this.setState({
				'liWidth': '1055',
				'ulWidth': '2100',
				'animateTime': '25s'
			});
		}
		if(valueText.length > 15) {
			this.setState({
				'animateTime': '100s',
				'liWidth': '',
				'ulWidth': ''
			});
		}else {
			this.setState({
				'animateTime': ''
			});
		}
	}

	shouldComponentUpdate(nextProps,nextState){
		if(this.updateNum > 2) {
			this.updateNum = 0;
		  	return false;
		}else {
			return true;
		}
	}

	componentDidUpdate() {
		// this.addTimer();
		const { valueText } = this.props;
		const deicticWordLi = this.refs['deicticWordLi'];
		const deicticWordUl = this.refs['deicticWordUl'];
		const liWidth = deicticWordLi.clientWidth;
		let ulWidth = null;
		if(liWidth > 1055) {
			ulWidth = liWidth * 2;
			this.updateNum += 1;
			this.setState({'liWidth': liWidth,'ulWidth': ulWidth});
		}
		if(valueText.length < 15) {
			this.updateNum += 1;
			this.setState({
				'liWidth': '1055',
				'ulWidth': '2100'
			});
		}
	}

	// move 
	move = () => {
		const deicticWordUl = this.refs['deicticWordUl'];
		console.log(deicticWordLi.clientWidth);
		if(this.styleLeft === -this.midWidth) {
			deicticWordUl.style.left = 0;
			this.styleLeft = 0;
		}else {
			this.styleLeft -= 1;
			console.log(this.styleLeft);
			deicticWordUl.style.left = this.styleLeft + 'px';
		}
	}

	removeTimer = () => {
		this.timer && clearInterval(this.timer);
	}

	addTimer = () => {
		this.timer = setInterval(() => {
			this.move();
			if(this.styleLeft % 1055 === 0){
				this.removeTimer();
				setTimeout(() => {
					this.addTimer();
				}, 2000);
			}
		}, 10);
	}

	render() {

		const { valueText, styleObj, scroll } = this.props;
		const { liWidth , ulWidth, animateTime } = this.state;
		let style = Object.assign({}, styleObj);
		style.width = liWidth ? (liWidth + 'px') : ''; 
		console.log('scroll----->', scroll)

		return(
			<div className='deictic-word-com'>
				<ul ref='deicticWordUl' style={{'left': 0,'width': ulWidth && ulWidth + 'px','animation': scroll ? '' : (animateTime ? ('headerbar ' + animateTime + ' linear infinite') : ''), '-webkit-animation': scroll ? '' : (animateTime ? ('headerbar ' + animateTime + ' linear infinite') : '')}} className={ scroll ? '' : 'deicticWordUl'}>
					<li ref='deicticWordLi' className='word-li' style={ style }>{valueText ? valueText : '热烈欢迎领导莅临指导工作'}</li>
					<li className='word-li' style={ style }>{valueText ? valueText : '热烈欢迎领导莅临指导工作'}</li>
				</ul>
				{/*<p className='deictic-word-p'></p>*/}
			</div>
		);
	}
}

export default DeicticWordCom;