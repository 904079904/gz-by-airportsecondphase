/*
 * @Description: 协同保障板块
 * @Author: tanjun
 * @Data: Do not edit
 * @LastEditors: tanjun
 * @LastEditTime: 2019-11-19 16:38:05
 */
import axiosToken from "js/axiosToken";

import './CoordinationSecurityCom.scss';
import {TitleCom} from 'com/index';
import CountUp from 'countup';
import zrender from 'zrender';
import airControl from 'img/csc_airControl.png';
import airPort from 'img/csc_airPort.png';
import airCompany from 'img/csc_airCompany.png';
import line from 'img/csc_line.png';
import plane from 'img/csc_plane.png';
import trangle from 'img/csc_trangle.png';

export default class CoordinationSecurityCom extends Component {
  constructor(props) {
    super(props);
    // 随机ID
    this.id = `csc${ new Date().getTime() }`;
    this.unMount = false; // 是否清除组件标志
  }
  componentDidMount() {
    this.init();
    this.getData.call(this);
    this.timeRepeat = setInterval(this.getData.bind(this), 3000);
  }
  componentWillUnmount() {
    this.unMount = true;
    clearInterval(this.timeRepeat);
  }
  getData() {
    axiosToken({
      url: realAddressUrlOne + '/screen/coordinateSafeguard',
      method: 'get'
    }).then((res) => {
      if (!this.unMount) {
        this.setData(res.data.result);
      } 
    }, (err) => {
      console.log(err);
    })
  }
  setData(data) {
    let value0 = new CountUp(`${this.id}tobt0`, document.querySelector(`#${this.id}tobt0`).innerHTML, data.TOBT);
    value0.start();
    
    let value1 = new CountUp(`${this.id}tobt1`, document.querySelector(`#${this.id}tobt1`).innerHTML, data.CTOT);
    value1.start();

    let value2 = new CountUp(`${this.id}tobt2`, document.querySelector(`#${this.id}tobt2`).innerHTML, data.COBT);
    value2.start();

    let value3 = new CountUp(`${this.id}tobt3`, document.querySelector(`#${this.id}tobt3`).innerHTML, data.TOBT);
    value3.start();

    let value4 = new CountUp(`${this.id}tobt4`, document.querySelector(`#${this.id}tobt4`).innerHTML, data.TOBT);
    value4.start();
  }
  init() {
    this.chart = zrender.init(document.querySelector(`#${this.id} .csc_chart`));
    this.renderImg();
    this.renderAnimation();
  }
  /**
   * @description: 渲染图片
   * @param {type} 
   * @return: 
   */
  renderImg() {
    // 空管
    let imgAirContorl = new zrender.Image({
      style: {
        image: airControl,
        width: 569,
        height: 228,
        x: 10,
      }
    });
    let airConG = new zrender.Group();
    airConG.add(imgAirContorl);
    // 连线
    for (let i = 0; i < 2; i++){
      let imgLine = new zrender.Image({
        style: {
          image: line,
          width: 42,
          height: 71,
          x: 138 + i * 230,
          y: 200,
        }
      })
      airConG.add(imgLine);
    }
    // 名称
    let controlName = new zrender.Rect({
      shape: {
        x: 159,
        y: 168,
      },
      style: {
        text: '空管',
        textFill: '#fff',
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bolder',
      }
    })
    airConG.add(controlName);
    // 数据类型
    let controlDataName = new zrender.Rect({
      shape: {
        x: 386,
        y: 130,
      },
      style: {
        text: 'CDM',
        textFill: '#fff',
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bolder',
      }
    })
    airConG.add(controlDataName);

    // 机场
    let imgAirPort = new zrender.Image({
      style: {
        image: airPort,
        width: 569,
        height: 228,
        y: 240,
        x: 10
      }
    });
    let airPortG = new zrender.Group();
    airPortG.add(imgAirPort);
    for (let i = 0; i < 2; i++){
      let imgLine = new zrender.Image({
        style: {
          image: line,
          width: 42,
          height: 71,
          x: 138 + i * 230,
          y: 438,
        }
      })
      airPortG.add(imgLine);
    }
    // 名称
    let portName = new zrender.Rect({
      shape: {
        x: 159,
        y: 392,
      },
      style: {
        text: '机场',
        textFill: '#fff',
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bolder',
      }
    })
    airPortG.add(portName);
    let portName2 = new zrender.Rect({
      shape: {
        x: 159,
        y: 412,
      },
      style: {
        text: 'AOC',
        textFill: '#fff',
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bolder',
      }
    })
    airPortG.add(portName2);
    // 数据类型
    let portDataName = new zrender.Rect({
      shape: {
        x: 386,
        y: 370,
      },
      style: {
        text: 'A-CDM',
        textFill: '#fff',
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bolder',
      }
    })
    airPortG.add(portDataName);
    
    // 航司
    let imgAirCompany = new zrender.Image({
      style: {
        image: airCompany,
        width: 569,
        height: 228,
        y: 480,
        x: 10
      }
    });
    let airCompanyG = new zrender.Group();
    airCompanyG.add(imgAirCompany);
    let name1 = new zrender.Rect({
      shape: {
        x: 159,
        y: 638,
      },
      style: {
        text: '航司',
        textFill: '#fff',
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bolder',
      }
    })
    airCompanyG.add(name1);
    let name2 = new zrender.Rect({
      shape: {
        x: 378,
        y: 630,
      },
      style: {
        text: '机场',
        textFill: '#fff',
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bolder',
      }
    })
    airCompanyG.add(name2);
    let name3 = new zrender.Rect({
      shape: {
        x: 378,
        y: 648,
      },
      style: {
        text: '(航服/地勤)',
        textFill: '#fff',
        fontSize: 14,
        textAlign: 'center',
        fontWeight: 'bolder',
      }
    })
    airCompanyG.add(name3);
    ['保', '障', '单', '位'].map((d, i) => {
      let text = new zrender.Rect({
        shape: {
          x: 20,
          y: 580 + 22 * i,
        },
        style: {
          text: d,
          textFill: '#f7f9ff',
          fontSize: 20,
          textAlign: 'right',
        }
      })
      airCompanyG.add(text);
    })

    this.chart.add(airConG);
    this.chart.add(airPortG);
    this.chart.add(airCompanyG);
  }
  renderAnimation() {
    let planeImg = new zrender.Image({
      style: {
        image: plane,
        width: 76,
        height: 48,
        x: 120,
        y: 315,
      }
    })
    this.chart.add(planeImg);
    planeImg.animate('style', true)
      .when(0, {
        y: 315,
      }).when(2500, {
        y: 302,
      }).when(3500, {
        y: 300,
      }).when(6500, {
        y: 315,
      }).start('cubicInOut');
    // 箭头效果
    [{
      type: 1,
      value: [138, 260]
    },{
      type: 1,
      value: [158, 260]
    },{
      type: 1,
      value: [178, 260]
    },{
      type: 0,
      value: [368, 212]
    },{
      type: 0,
      value: [388, 212]
    },{
      type: 0,
      value: [408, 212]
    },{
      type: 1,
      value: [138, 496]
    },{
      type: 1,
      value: [158, 496]
    },{
      type: 1,
      value: [178, 496]
    },{
      type: 0,
      value: [368, 452]
    },{
      type: 0,
      value: [388, 452]
    },{
      type: 0,
      value: [408, 452]
    }].map(d => {
      for (let i = 0; i < 3; i++){
        let delay = i * 200; // 时间延时
        let cen = [d.value[0], d.value[1]]; // 三角形中心点
        let cenLast = d.type ? [cen[0], cen[1] - 48] : [cen[0], cen[1] + 48]; // 三角小图
        let arrowG = new zrender.Group({
          position: cen,
          rotation: d.type ? 0 : Math.PI
        })
        let arrow = new zrender.Image({
          style: {
            image: trangle,
            width: 8,
            height: 4,
            x: -4,
            y: 0,
            opacity: 0,
          }
        })
        arrowG.add(arrow);
        this.chart.add(arrowG);
        arrow.animate('style', true)
          .when(0, {
            width: 8,
            height: 4,
            x: -4,
            y: 0,
            opacity: 0,
          }).when(100, {
            width: 8,
            height: 4,
            x: -4,
            y: 0,
            opacity: 1,
          }).when(1500, {
            width: 16,
            height: 8,
            x: -8,
            y: 0,
            opacity: 1
          }).when(1600, {
            width: 16,
            height: 8,
            x: -8,
            y: 0,
            opacity: 0
          }).delay(delay)
          .start();
        arrowG.animate('position', true)
          .when(1600, cenLast)
          .delay(delay)
          .start()
      }
    })
  }
  render() {
    return (
      <div id={this.id} className={'csc_container'}>
        <TitleCom title="协同保障监督"></TitleCom>
        <div className="protectionCont">
            <div className={'csc_chart cscChart'}></div>
            <div className={'csc_area0'}>
              <span>TOBT:</span>
              <span id={`${this.id}tobt0`} className={'value'}>0</span>
            </div>
            <div className={'csc_area1'}>
              <div>
                <span>CTOT:</span>
                <span id={`${this.id}tobt1`} className={'value'}>0</span>
              </div>
              <div>
                <span>COBT:</span>
                <span id={`${this.id}tobt2`} className={'value'}>0</span>
              </div>
            </div>
            <div className={'csc_area2'}>
              <span>TOBT:</span>
              <span id={`${this.id}tobt3`} className={'value'}>0</span>
            </div>
            <div className={'csc_area3'}>
              <div>
                <span>目标保障</span>
              </div>
              <div>
                <span>完成时刻:</span>
                <span id={`${this.id}tobt4`} className={'value'}>0</span>
              </div>
            </div>
        </div>
      </div>
    )
  }
}