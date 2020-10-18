/**
 Crate by jgmiu on 19/10/30.
*/
import axiosToken from "js/axiosToken";

import "./Notification.scss";
import { TitleCom } from "com/index";


import infoArrive from "img/info-arrive.png";
import infoLeave from "img/info-leave.png";
import infoCicle1 from "img/info-cicle1.png";
import infoCicle2 from "img/info-cicle2.png";

export default class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msgId:'',
    }
    // 动画相关配置
    this.animationConfig = {
      // 动画持续时间
      times: globalTimer.infoTime,
      // 每一阶段相隔时间
      interval: globalTimer.infoInterval,
      // 本次请求无数据，延迟一段时间再请求
      nodataInterval: globalTimer.infoNodataInterval
    }
    // 定时器
    this.noDataTime = null
    this.moveNextTime = null
    this.createTime = null

    this._getData = this._getData.bind(this)
    this._start = this._start.bind(this)
    this._createAndMove = this._createAndMove.bind(this)
    this._moveNext = this._moveNext.bind(this)
    
    // 对应scss文件，表示动画的几个阶段
    this.animations = ['enter1', 'enter2', 'enter3', 'enter4']
  }

  componentDidMount() {
    this._getData();
  }

  componentWillUnmount() {
    clearTimeout(this.noDataTime)
    clearTimeout(this.moveNextTime)
    clearTimeout(this.createTime)
  }  

  _getData() {
    let parma = 1;
    let url = `${realAddressUrlOne}/screen/positionChange/${parma}`
    // console.log('消息通知：', url)
    axiosToken({
      url: url,
      method: "get"
    }).then(result => {
      if (!result.data.code) {
        // 开始动画
        this._start(result.data.result)
      } else {
        console.log(result.data.msg);
      }
    });
  }

  // 开始动画
  _start(items) {
    let {msgId} = this.state;
    let doms = document.getElementsByClassName('notiItem')
    // 判断此次请求是否为空
    if(items.length > 0 && items[0].msgId !== msgId) {
      this.state.msgId = items[0].msgId;
      if(doms.length !== 0) {
        // 页面上的所有dom移动到下一个阶段
        this._moveNext(this._createAndMove.bind(this, items[0], this._getData))
      } else {
        // 第一次请求数据，页面上没有任何dom节点
        this._createAndMove(items[0], this._getData)
      }
    } else {
      // 当没有数据的时候，隔一会再请求
      this.noDataTime = setTimeout(()=>{
        this._getData();
      },this.animationConfig.nodataInterval)
    }
  }

  // 创建dom并运行第一阶段动画
  _createAndMove(item, callback) {
    let listDom = document.querySelector(".list"),
      domInner = this._createInnerHTML(item),
      items = document.getElementsByClassName('notiItem')
    // 保证新插入的dom位于第一个
    if(items.length === 0) {
      listDom.appendChild(domInner)
    } else {
      listDom.insertBefore(domInner, items[0])
    }
    domInner.setAttribute(
      `style`,
      `animation:enter1 ${this.animationConfig.times} linear; animation-fill-mode: forwards;`
    )
    // 新建dom节点并移动到第一阶段，重新请求数据
    this.createTime = setTimeout(()=>{callback()}, this.animationConfig.interval)
  }

  // 页面上现有的dom移动到下一个阶段
  _moveNext(callback) {
    let items = document.getElementsByClassName('notiItem')
    for(let i = 0; i < items.length; i++) {
      let style = items[i].getAttribute('style')
      for(let j = 0; j < this.animations.length; j++) {
        if(style.indexOf(this.animations[j]) !== -1) {
          if(this.animations[j] === 'enter4') {
            items[i].remove()
          } else {
            items[i].setAttribute(
              `style`,
              `animation:${this.animations[j+1]} ${this.animationConfig.times} linear; animation-fill-mode: forwards;`
            )
            break
          }
        }
      }
    }
    // 页面上所有dom移动到下一阶段，页面新建dom结构并移动到第一阶段
    this.moveNextTime = setTimeout(()=>{callback()},this.animationConfig.interval)
  }

  // 创建dom
  _createInnerHTML(item) {
    let domInner = document.createElement("div");
    domInner.setAttribute("class", "notiItem");
    domInner.innerHTML = `
      <div class="notiLeft">
        <span class="time">${item.time}</span>
        <span class="number">${item.changeAir}</span>
        <span class="detail">由原<span class="airNum">${item.before}</span>号机位更换至<span class="airNum">${item.after}</span>号机位</span>
      </div>
      <div class="notiRight">
        <div class="arriveWrapper">
          <div class="imgBox">
            <div class="imgWrapper">
              <img src=${infoArrive} />
              <img src=${infoCicle1} />
              <img src=${infoCicle2} />
            </div>
            <span class="imgText">到达</span>
          </div>
          <div class="textWrapper">
            <span class="port">${item.arrivePort}</span>
            <span class="text">进港</span>
            <span class="date">${item.realArrive}</span>
          </div>
        </div>
        <div class="leaveWrapper">
          <div class="imgBox">
            <div class="imgWrapper">
              <img src=${infoLeave} />
              <img src=${infoCicle1} />
              <img src=${infoCicle2} />
            </div>
            <span class="imgText">起飞</span>
          </div>
          <div class="textWrapper">
            <span class="port">${item.leavePort}</span>
            <span class="text">出港</span>
            <span class="date">${item.willFly}</span>
          </div>
        </div>
      </div>`;
    return domInner
  }

  render() {
    return (
      <div className={"Notification"}>
        <span className={"titleWrapper"}>
          <TitleCom title={"消息通告"} />
        </span>
        <div className={"list"}></div>
      </div>
    );
  }
}

Notification.propTypes = {};
Notification.defaultProps = {};
