/**
 Crate by jgmiu on 19/11/28.
*/
import axiosToken from "js/axiosToken";

import './EachLugUsed.scss'
import lineBar from 'img/texture_bg.png'
import echarts from 'echarts'
import { TitleCom } from 'com/index'

const bg = new Image()
    bg.src = lineBar

export default class EachLugUsed extends Component{
  constructor(props) {
    super(props)
    this.state = {
      xData: [],
      yData: []
    }
    this.chartDom = null
    this.chart = null
    this.timer = null
  }

  componentDidMount() {
    this.chart = echarts.init(this.chartDom)
    this._getData(this.props)
    this.timer = setInterval(() => {
      this._getData(this.props)
    }, globalTimer.eachlugused)
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.terminal !== nextProps.terminal) {
      clearInterval(this.timer);  
      this._getData(nextProps)
      this.timer = setInterval(() => {
        this._getData(nextProps)
      }, globalTimer.eachlugused)
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
 }

  _getData(props) {
    const {terminal} = props
    let url = `${realAddressUrlOne}/screen/eachLugUsedFlightNum/${terminal}`
    // console.log('各行李转盘使用:', url)
    axiosToken({
      method: 'get',
      url: url
    }).then(result => {
      if(!result.data.code) {
        let {xData, yData} = this._formatData(result.data.result)
        this.setState({xData, yData}, ()=>{this._draw()})
      } else {
        console.error(result.data.msg)
      }
    }, error => {
      console.error(error)
    })
  }

  _formatData(datas) {
    let xData = [],
      yData = []
    datas.forEach(item => {
      xData.push(item.name)
      yData.push(item.fltNum)
    })
    return {xData, yData}
  } 

  _draw() {
    this.chart.clear()
    let {xData, yData} = this.state
    this.chart.setOption({
      xAxis: {
        type: 'category',
        data: xData,
        axisLabel: {
          textStyle: {
            color: '#6f9cbc',
            fontFamily: 'lcd',
            fontSize: 20
          }
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          lineStyle: {
            color: '#565e78'
          }
        },
      },
      yAxis: {
        type: 'value',
        axisLine: {
          lineStyle: {
              color: '#777a91'
          }
        },
        axisTick: {
            show: false
        },
        axisLabel: {
          textStyle: {
            color: '#6f9cbc',
            fontFamily: 'lcd',
            fontSize: 20
          }
        },
        splitLine: {
          lineStyle: {
            color: '#565e78'
          }
        }
      },
      series: [
        {
          type: 'bar',
          itemStyle: {
            barBorderRadius: [5,5,0,0],
            color: {
              image: bg,
              repeat: 'repeat',
            },
          },
          barGap:'-100%',
          barWidth: 10,
          data: yData
        },
        {
          type: 'bar',
          itemStyle: {
            barBorderRadius: [5,5,0,0],
            color: new echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              [
                { offset: 0, color: 'rgba(0, 194, 245, 1)'},
                { offset: 1, color: 'rgba(0, 194, 245, 0.2)'}
              ]
            )
          },
          barWidth: 10,
          data: yData
        }
      ]
    })
  }

  render() {
    return(
      <div className={'EachLugUsed'}>
        <TitleCom title={'各行李转盘使用航班数量实时分析'}></TitleCom>
        <div className={'chartDom EachLugUsedChart'} ref={ref => this.chartDom = ref} >

        </div>
      </div>
    )
  }
}

EachLugUsed.propTypes = {
  terminal: PropTypes.string
}
EachLugUsed.defaultProps = {
  terminal: 'T1'
}