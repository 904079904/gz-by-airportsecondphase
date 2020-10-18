/**
 Crate by jgmiu on 19/10/28.
*/
import React from 'react'
import './MiddleCon.scss'
import {Navigation} from 'com/index'
import centerBorder from 'img/center-border.png'
import title3 from 'img/big-title-3.png'
import tTile2 from 'img/t-title-2.png'
import cTile2 from 'img/c-title-2.png'
import mask from 'img/center-mask.png'
export default class MiddleCon extends Component{
  constructor(props) {
    super(props)
    this.state = {
      type: ''
    }
  }

  componentWillMount() {
    this.setState({
      type: this.props.match.params.type
    })
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      type: nextProps.match.params.type
    })
  }
  componentDidMount() {
    // this.transformDom();
    let that = this;
    byjc_cq.on(monitorType, function (msg) {
      //监听类型为1025的消息推送  消息类型 >1024
      if (msg.data.area && msg.data.area === "LS_FA") {
        that.props.history.push('/main/MiddleCon/fly');
      }
      if (msg.data.area && msg.data.area === "LS_PA") {
        that.props.history.push('/main/MiddleCon/common');
      }
      if (msg.data.area && msg.data.area === "LS_TA1") {
        that.props.history.push('/main/MiddleCon/terminal');
      }
      if (msg.data.area && msg.data.area === "LS_TA2") {
        that.props.history.push('/main/MiddleCon/terminal');
      }
    });                                 
  }

  render() {
    return(
      <div className={'MiddleCon'}>
        <img className={'centerBorder'} src={centerBorder} />
        {/* <img src={mask} className={'mask'} /> */}
        {
          (function(type){
            if(type === 'fly') {
              return <div className={'title'}><img src={title3} /></div>
            }
            if(type === 'terminal') {
              return <div className={'title'}><img src={tTile2} /></div>
            }
            if(type === 'common') {
              return <div className={'title'}><img src={cTile2} /></div>
            }
          })(this.type)
        }
        
        <div className={'model'}>
          <div className="topBg"></div>
          <div className="rightBg"></div>
          <div className="leftBg"></div>
          <div className="bottomBg"></div>
          {/* <div className="iframeCont">
              <div className={this.state.type === 'fly' || this.state.type === 'terminal' ? "iframeContItem active" : "iframeContItem"}>
                  <iframe width="3840" height="2160" src={realAddressUrlTwo+'/widget-1.html'}></iframe>
              </div>
              <div className={this.state.type === 'common' ? "iframeContItem active" : "iframeContItem"}>
                  <iframe width="3840" height="2160" src={realAddressUrlTwo+'/tingchechang.html'}></iframe>
              </div>
          </div> */}
          {
            (function(type){
              if(type === 'fly' || type === 'terminal') {
                return  <iframe width="3840" height="2160" src={realAddressUrlTwo+'/widget-1.html'}></iframe>
              }
              if(type === 'common') {
                return  <iframe width="3840" height="2160" src={realAddressUrlTwo+'/tingchechang.html'}></iframe>
              }
            })(this.state.type)
          }
        </div>
        <div className={'navigation'}><Navigation /></div> 
      </div>
    )
  }
}

MiddleCon.propTypes = {}
MiddleCon.defaultProps = {}