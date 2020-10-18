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
      data: [],
      // 每一个item的动画style存放数组
      animations: [{ animation: "enter 6s linear" }],
      //dom的集合
      domList: "",
      //每次触发的间隔
      interval: 2000,
      dataList: []
    };
    // 定时器
    // 动画相关配置
    this.animationConfig = {
      // 动画持续时间
      times: globalTimer.notificationTimes,
      // 每个item动画间隔
      delay: globalTimer.notificationDelays
    };
    this.hasAnimation = false
    // 缓存上一次请求数据
    this.data = []
    //动画主体
    this._animateDom = this._animateDom.bind(this);

    this.timer = null
    // 第一次无数据时，延迟30s再请求
    this.noDataTimer = null
    // 移除dom定时器
    this.rmTimer = null
  }

  componentDidMount() {
    this._getData();
  }

  componentWillUnmount() {
    clearInterval(this.timer)
    if(this.noDataTimer) clearTimeout(this.noDataTimer)
    if(this.rmTimer) clearTimeout(this.rmTimer)
  }  

  _getData() {
    let url = `${realAddressUrlOne}/screen/positionChange`
    // console.log('消息通知：', url)
    axiosToken({
      url: url,
      method: "get"
    }).then(result => {
      if (!result.data.code) {
        let data = []

        if(result.data.result.length === 0) {
          // 当前返回数据为0，则去上一次返回的数据继续东湖
          data = this.data
        } else {
          this.data = result.data.result
          data = result.data.result;
        }
        // 第一次访问无数据，进入无数据页面，30s重新请求数据
        if(this.data.length === 0 && data.length === 0) {
          this.noDataTimer = setTimeout(() => {
            this._getData()
          }, 30000)
        } else {
          this._frequency(data);
        }
      } else {
        console.log(result.data.msg);
        
      }
    });
  }

  //频率控制
  _frequency(data) {
    let i = 0;
    this.timer = setInterval(() => {
      this._animateDom(data[i]);
      if (i >= data.length - 1) {
        this._getData();
        clearInterval(this.timer);
        return;
      }
      i++;
    }, this.animationConfig.delay);
  }
  //动画主体
  _animateDom(item) {
    let dom = document.querySelector(".list");
    let domInner = this._createInnerHTML(item)
    domInner.setAttribute(
      `style`,
      `animation:enter ${this.animationConfig.times} linear`
    );
    dom.appendChild(domInner);
    this.rmTimer = setTimeout(() => {
      domInner.remove();
    }, 6000);
  }

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
    let { data, animations, domList } = this.state;
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
