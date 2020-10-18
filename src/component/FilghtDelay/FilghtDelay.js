/**
 Crate by jgmiu on 19/11/01.
 大面积航延实时分析
*/
import axiosToken from "js/axiosToken";

import {TitleCom} from 'com/index'
import './FilghtDelay.scss'
import delayCicle1 from 'img/delay-cicle1.png'
import delayCicle2 from 'img/delay-cicle2.png'
import delayLight1 from 'img/delay-light1.png'
import delayLight2 from 'img/delay-light2.png'
import delayLight3 from 'img/delay-light3.png'
import delayLight4 from 'img/delay-light4.png'
import delayLight5 from 'img/delay-light5.png'
export default class FilghtDelay extends Component{
  constructor(props) {
    super(props)
    this.state = {
      // 中间的预警灯
      light: delayLight1,
      // 是否闪烁
      isLight: true
    }
    // 配置 目前min与max没有用了
    this.config = [
      {name: '<55(无预警)',realName: '<55', color: '#0aeeb4', light: delayLight1, min: 0, max: 54},
      {name: '≥55', realName: '>=55', color: '#00c3f6', light: delayLight2, min: 55, max: 79},
      {name: '≥80', realName: '>=80', color: '#f8ff44', light: delayLight3, min: 80, max: 104},
      {name: '≥105', realName: '>=105', color: '#f8b80b', light: delayLight4, min: 105, max: 139},
      {name: '≥140', realName: '>=140', color: '#f82a28', light: delayLight5, min: 140, max: Infinity},
    ]
    this.timer = null
  }

  componentDidMount() {
    // 获取数据
    this._getDate()
    // 启动定时器
    this.timer = setInterval(()=>{
      this._getDate()
    },globalTimer.filghtDelay)
  }

  componentWillUnmount() {
    // 组件卸载清除定时器
    clearInterval(this.timer)
  }

  _getDate() {
    let url = `${realAddressUrlOne}/screen/fltLargeDelay`
    // console.log('大面积航延', url)
    axiosToken({
      method: 'get',
      url: url
    }).then(result => {
      if(!result.data.code) {
        let {light, isLight} = this._getLight(result.data.result)
        this.setState({
          light: light,
          isLight: isLight
        })
      } else {
        console.log(result.data.msg);
      }
    },err => {

    })
  }

  /**
   * 获取当前报警图片，以及图片是否闪烁
   * @param {*} level 
   */
  _getLight(level) {
    let light = delayLight1,
      value = '',
      isLight = true,
      lightItem = {}
    level.levelList.forEach((item) => {
      if(item.color === level.crurrentLevel) value = item.value
    })
    this.config.forEach(item => {
      if(item.realName.indexOf(value) !== -1) lightItem = item
    })
    light = lightItem.light
    isLight = lightItem.realName !== '<55' 
    return {light, isLight}
  }

  render() {
    let {light, isLight} = this.state
    return(
      <div className={'FilghtDelay'}>
        <div className={'titleBox'}>
          <TitleCom title={'大面积航延实时分析'} />
        </div>
        <div className={'chartWrapper FilghtDelayCont'}>
          <div className={'cicleWrapper'}>
            <img className={'cicle'} src={delayCicle1} />
            <img className={'rotateCicle'} src={delayCicle2} />
            <img className={isLight ? 'light' : 'light stop'} src={light} />
          </div>
          <div className={'legendList'}>
            {
              this.config.map((item,index) => (
                <div key={index} className={'legendItem'}>
                  <i style={{background: `${item.color}`}} className={'icon'}></i>
                  <span className={'text'}>{item.name}</span>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    )
  }
}

FilghtDelay.propTypes = {}
FilghtDelay.defaultProps = {}