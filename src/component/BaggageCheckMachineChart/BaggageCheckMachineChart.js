/**
 Crate by xiaohe on 19/12/02.
*/

import * as data from "./BaggageCheckMachineData.js";

import {
  createInit,
  createImage,
  createText,
  createGroup
} from "./BaggageCheckMachineCreate.js";

export default class BaggageCheckMachineChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conveyorOpt: data.conveyorOpt,
      conveyorSkinOpt: data.conveyorSkinOpt,
      safetyCheckOpt: data.safetyCheckOpt,
      conveyorUpOpt: data.conveyorUpOpt,
      conveyorDownOpt: data.conveyorDownOpt,
      baleOpt: data.baleOpt,
      luggageOpt: data.luggageOpt,
      wordOpt: data.wordOpt,
      artificialPlaceOpt: data.artificialPlaceOpt,
      //值机岛-上
      islandUpOpt: data.islandUpOpt,
      //值机岛-下
      islandDownOpt: data.islandDownOpt,
      //值机岛集合-上
      islandUpDomS: [],
      //值机岛集合-下
      islandDownDomS: [],
      //主传送带时间
      conveyorTimer: "",
      //上传送带时间
      conveyorTimerUp: new Array(6),
      //下传送带时间
      conveyorTimerDown: new Array(6)
    };
    this.zr = null;
    //绘画安检机基本图层
    this.drawInit = this.drawInit.bind(this);
    //数据更新后的绘画
    this.drawUpdate = this.drawUpdate.bind(this);
    //生成值机岛-上
    this.createIslandUp = this.createIslandUp.bind(this);
    //生成小传送带-上
    this.createConveyorUp = this.createConveyorUp.bind(this);
    //生成小传送带-下
    this.createIslandDown = this.createIslandDown.bind(this);
    //生成小传送带-下
    this.createConveyorDown = this.createConveyorDown.bind(this);
    this.conveyorAnimation = this.conveyorAnimation.bind(this);
  }

  //生成值机岛-上
  createIslandUp(num) {
    let { islandUpOpt } = this.state;
    for (let i = 0; i < num; i++) {
      //令人厌烦的对象赋值
      let opt = Object.assign({}, islandUpOpt.style);
      opt.x = islandUpOpt.style.x + i * 300;
      let islandUpDom = createImage({
        style: opt
      });
      this.state.islandUpDomS.push(islandUpDom);
      this.zr.add(this.state.islandUpDomS[i]);
    }
  }
  //生成值机岛-下
  createIslandDown(mod, num) {
    let { islandDownOpt, islandDownDomS } = this.state;
    for (let i = 0; i < num; i++) {
      //令人厌烦的对象赋值
      let opt = Object.assign({}, islandDownOpt.style);
      opt.x = islandDownOpt.style.x + i * 300;
      let islandDownDom = createImage({
        style: opt
      });
      this.state.islandDownDomS.push(islandDownDom);
      this.zr.add(this.state.islandDownDomS[i]);
    }
  }
  //生成小传送带-上
  createConveyorUp(mod, num) {
    let { conveyorUpOpt, wordOpt } = this.state;
    for (let i = 0; i < num; i++) {
      let opt = Object.assign({}, conveyorUpOpt.style);
      //建立小传送带-上
      opt.x = conveyorUpOpt.style.x + i * (mod == "T1" ? 300 : 300);
      let conveyorUpDom = createImage({
        style: opt
      });
      //加入传送带
      this.zr.add(conveyorUpDom);
    }
    for (let i = 0; i < (mod == "T1" ? num : num + 1); i++) {
      let opt = Object.assign({}, wordOpt[mod]["up"][i].style);
      //建立小传送带-上
      opt.x = wordOpt[mod]["up"][i].style.x + (mod == "T1" ? 300 : 300) * i;
      let text = createText({
        style: opt
      });
      this.zr.add(text);
    }
  }
  //生成小传送带-下
  createConveyorDown(mod, num) {
    let { conveyorDownOpt, wordOpt } = this.state;
    for (let i = 0; i < num; i++) {
      let opt = Object.assign({}, conveyorDownOpt.style);
      //建立小传送带-上
      opt.x = conveyorDownOpt.style.x + i * (mod == "T1" ? 300 : 300);
      let conveyorDownDom = createImage({
        style: opt
      });
      //加入传送带
      this.zr.add(conveyorDownDom);
    }
    for (let i = 0; i < (mod == "T1" ? num : num + 1); i++) {
      let opt = Object.assign({}, wordOpt[mod]["down"][i].style);
      //建立小传送带-下
      opt.x = wordOpt[mod]["down"][i].style.x + (mod == "T1" ? 300 : 300) * i;
      let text = createText({
        style: opt
      });
      this.zr.add(text);
    }
  }
  //主传送带动画
  conveyorAnimation(trigger) {
    switch (trigger) {
      case "on":
        let index = 0;
        //延迟，等待dom渲染完成
        // setTimeout(() => {
        //定时生成大行李动画并结束清空释放
        let zr = this.zr;
        clearInterval(this.state.conveyorTimer);
        this.state.conveyorTimer = setInterval(() => {
          let opt = this.state.baleOpt[index];
          let baleDom = createImage(opt);
          zr.add(baleDom);
          //循环行李箱
          if (index >= this.state.baleOpt.length - 1) {
            index = 0;
          } else {
            index++;
          }
          baleDom.animateTo(
            {
              style: {
                x: 2100
              }
            },
            12000,
            function() {
              zr.remove(baleDom);
            }
          );
        }, 900);
        // }, 1000);
        break;
      default:
        clearInterval(this.state.conveyorTimer);
        break;
    }
  }
  //子主传送带动画
  /**
   * index第几个传送带
   * local上下两条
   * trigger是否开启
   */
  conveyorAnimationSub(index, local, trigger) {
    let { luggageOpt } = this.state;
    let zr = this.zr;
    if (trigger == "on" && local == "up") {
      let i = 0;
      clearInterval(this.state.conveyorTimerUp[index]);
      this.state.conveyorTimerUp[index] = setInterval(() => {
        let opt = {
          style: {
            x: 292 + 300 * index,
            y: 199,
            image: luggageOpt[i]
          }
        };
        let luggageDom = createImage(opt);
        zr.add(luggageDom);
        //行李箱循环
        if (i >= luggageOpt.length - 1) {
          i = 0;
        } else {
          i++;
        }
        luggageDom.animateTo(
          {
            style: {
              x: 432 + 300 * index,
              y: 450
            }
          },
          10000,
          function() {
            zr.remove(luggageDom);
          }
        );
      }, 2000);
    } else if (trigger == "on" && local == "down") {
      let i = 0;
      clearInterval(this.state.conveyorTimerDown[index]);
      this.state.conveyorTimerDown[index] = setInterval(() => {
        let opt = {
          style: {
            x: 580 + 300 * index,
            y: 810,
            image: luggageOpt[i]
          }
        };
        let luggageDom = createImage(opt);
        zr.add(luggageDom);
        //行李箱循环
        if (i >= luggageOpt.length - 1) {
          i = 0;
        } else {
          i++;
        }
        luggageDom.animateTo(
          {
            style: {
              x: 489 + 300 * index,
              y: 604
            }
          },
          10000,
          function() {
            zr.remove(luggageDom);
          }
        );
      }, 2000);
    }
  }
  //判断传送带包含子传送带，是否工作
  conveyorJude(e) {
    let { artificialPlaceOpt } = this.state;
    let total = [];
    //遍历出工作的值机岛
    e.data.forEach((item, index) => {
      if (item.status == "0") {
        total.push(item.id);
      }
    });
    //所有子传送带合并
    let conveyorTimerUpDown = this.state.conveyorTimerUp.concat(
      this.state.conveyorTimerDown
    );
    //所有子传送带大清除
    conveyorTimerUpDown.forEach((item, index) => {
      clearInterval(item);
    });
    //工作的值机岛编号，启动对应传送带
    total.forEach((item, index) => {
      artificialPlaceOpt[e.mod].up.forEach((i, j) => {
        if (item == i.id) {
          this.conveyorAnimationSub(i.index, "up", "on");
        }
      });
      artificialPlaceOpt[e.mod].down.forEach((i, j) => {
        if (item == i.id) {
          this.conveyorAnimationSub(i.index, "down", "on");
        }
      });
    });
    //判断全部开启状态
    if (total.length >= 1) {
      //传送带动画
      this.conveyorAnimation("on");
    } else {
      //传送带动画
      this.conveyorAnimation("off");
    }
  }
  //绘画安检机基本图层
  drawInit(nextProps) {
    let { conveyorOpt, conveyorSkinOpt, safetyCheckOpt } = this.state;
    if (!this.zr) {
      this.zr = createInit("BaggageCheckMachineChartCon");
    }
    this.zr.clear();
    this.state.islandUpDomS = [];
    this.state.islandDownDomS = [];
    //生成值机岛-上
    this.createIslandUp(nextProps.upNum);
    //建立小传送带-上
    this.createConveyorUp(nextProps.mod, nextProps.upNum);
    // this.createConveyorUp("T1", 6);
    //建立传送带
    let conveyorDom = createImage(conveyorOpt);
    //加入传送带
    this.zr.add(conveyorDom);
    //建立传送带装饰
    let conveyorSkinDom = createImage(conveyorSkinOpt);
    //加入传送带装饰
    this.zr.add(conveyorSkinDom);
    //建立安检门
    let safetyCheckDom = createImage(safetyCheckOpt);
    //加入安检门
    this.zr.add(safetyCheckDom);
    //生成值机岛-下
    this.createIslandDown(nextProps.mod, nextProps.downNum);
    //建立小传送带-下
    this.createConveyorDown(nextProps.mod, nextProps.downNum);
    this.drawUpdate(nextProps);
  }
  //数据更新后的绘画,更新值机岛状态
  drawUpdate(nextProps) {
    let { islandUpDomS, islandDownDomS, artificialPlaceOpt } = this.state;
    this.conveyorJude(nextProps);
    //这一段来更新值机岛
    nextProps.data.map((item, index) => {
      artificialPlaceOpt[nextProps.mod].up.forEach((i, j) => {
        if (i.id == item.id) {
          islandUpDomS[i.index].attr({
            style: {
              image: data.artificialStatus[item.status]
            }
          });
        }
      });
      artificialPlaceOpt[nextProps.mod].down.forEach((i, j) => {
        if (i.id == item.id) {
          islandDownDomS[i.index].attr({
            style: {
              image: data.artificialStatus[item.status]
            }
          });
        }
      });
    });
  }
  componentWillReceiveProps(nextProps) {
    this.drawInit(nextProps);
  }
  componentDidMount() {
    this.drawInit(this.props);
    document.addEventListener("visibilitychange", () => {
      var isHidden = document.hidden;
      if (isHidden) {
        //所有子传送带合并
        let conveyorTimerUpDown = this.state.conveyorTimerUp.concat(
          this.state.conveyorTimerDown
        );
        //所有子传送带大清除
        conveyorTimerUpDown.forEach((item, index) => {
          clearInterval(item);
        });
        this.conveyorAnimation("off");
      } else {
        this.conveyorAnimation("on");
      }
    });
  }
  componentWillUnmount() {
    // this.zr.clear();
    //所有子传送带合并
    let conveyorTimerUpDown = this.state.conveyorTimerUp.concat(
      this.state.conveyorTimerDown
    );
    //所有子传送带大清除
    conveyorTimerUpDown.forEach((item, index) => {
      clearInterval(item);
    });
    this.conveyorAnimation("off");
  }
  render() {
    return <div id="BaggageCheckMachineChartCon"></div>;
  }
}

BaggageCheckMachineChart.propTypes = {};
BaggageCheckMachineChart.defaultProps = {};
