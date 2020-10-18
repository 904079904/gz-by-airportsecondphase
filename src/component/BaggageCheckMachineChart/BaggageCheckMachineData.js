//传送带
import conveyor from "img/check/conveyor.png";
import conveyorUp from "img/check/conveyorUp.png";
import conveyorDown from "img/check/conveyorDown.png";
import conveyorSkin from "img/check/conveyorSkin.png";
//安检门
import safetyCheck from "img/check/Safety-check.png";
//大行李
import bale1 from "img/check/bale-1.png";
import bale2 from "img/check/bale-2.png";
import bale3 from "img/check/bale-3.png";
import bale4 from "img/check/bale-4.png";
import bale5 from "img/check/bale-5.png";
import bale6 from "img/check/bale-6.png";
//小行李
import luggage1 from "img/check/luggage-1.png";
import luggage2 from "img/check/luggage-2.png";
import luggage3 from "img/check/luggage-3.png";
import luggage4 from "img/check/luggage-4.png";
import luggage5 from "img/check/luggage-5.png";
import luggage6 from "img/check/luggage-6.png";
//值机岛-人工
import artificialNormal from "img/check/artificialNormal.png";
import artificialStandby from "img/check/artificialStandby.png";
import artificialMalfunction from "img/check/artificialMalfunction.png";
import artificialMaintenance from "img/check/artificialMaintenance.png";
import artificialClose from "img/check/artificialClose.png";
//值机岛-机器

//全局整体挪动Y
const pulicY = 50;

//主传送带配置
let conveyorOpt = {
  style: {
    image: conveyor,
    width: 2222,
    height: 142,
    y: 465 + pulicY,
    x: 30
  }
};
//主传送带装饰
let conveyorSkinOpt = {
  style: {
    image: conveyorSkin,
    width: 2034,
    height: 90,
    y: 455 + pulicY,
    x: 130
  }
};
//安检门
let safetyCheckOpt = {
  style: {
    image: safetyCheck,
    width: 319,
    height: 482,
    y: 190 + pulicY,
    x: 2080
  }
};
//小传送带-上
let conveyorUpOpt = {
  style: {
    image: conveyorUp,
    width: 349,
    height: 396,
    y: 145 + pulicY,
    x:175
  }
};
//小传送带-下
let conveyorDownOpt = {
  style: {
    image: conveyorDown,
    width: 320,
    height: 386,
    y: 535 + pulicY,
    x:395
  }
};
//大行李配置
let baleOpt = [
  {
    style: {
      image: bale1,
      width: 84,
      height: 50,
      y: 460 + pulicY,
      x: 100
    }
  },
  {
    style: {
      image: bale2,
      width: 94,
      height: 90,
      y: 470 - 90 / 2 + pulicY,
      x: 100
    }
  },
  {
    style: {
      image: bale3,
      width: 86,
      height: 137,
      y: 380 + pulicY,
      x: 100
    }
  },
  {
    style: {
      image: bale4,
      width: 84,
      height: 85,
      y: 470 - 85 / 2 + pulicY,
      x: 100
    }
  },
  {
    style: {
      image: bale5,
      width: 74,
      height: 69,
      y: 470 - 69 / 2 + pulicY,
      x: 100
    }
  },
  {
    style: {
      image: bale6,
      width: 96,
      height: 89,
      y: 470 - 89 / 2 + pulicY,
      x: 100
    }
  }
];
//小行李配置
let luggageOpt = [luggage1, luggage2, luggage3, luggage4, luggage5, luggage6];
//文字整体的配置
let wordOptT1UpY = 160;
let wordOptT1DownY = 1010;
//文字配置
let wordOpt = {
  T1: {
    up: [
      {
        id: "HB2-9",
        index: 0,
        style: {
          text: "C",
          textFill: "white",
          fontSize: 40,
          x: 282,
          y: wordOptT1UpY
        }
      },
      {
        id: "HB2-7",
        index: 1,
        style: {
          text: "D",
          textFill: "white",
          fontSize: 40,
          x: 282,
          y: wordOptT1UpY
        }
      },
      {
        id: "HB2-5",
        index: 2,
        style: {
          text: "E",
          textFill: "white",
          fontSize: 40,
          x: 282,
          y: wordOptT1UpY
        }
      },
      {
        id: "HB2-12",
        index: 3,
        style: {
          text: "N",
          textFill: "white",
          fontSize: 40,
          x: 282,
          y: wordOptT1UpY
        }
      },
      {
        id: "HB2-10",
        index: 4,
        style: {
          text: "M",
          textFill: "white",
          fontSize: 40,
          x: 282,
          y: wordOptT1UpY
        }
      },
      {
        id: "HB2-8",
        index: 5,
        style: {
          text: "L",
          textFill: "white",
          fontSize: 40,
          x: 282,
          y: wordOptT1UpY
        }
      }
    ],
    down: [
      {
        id: "HB2-3",
        index: 0,
        style: {
          text: "F",
          textFill: "white",
          fontSize: 40,
          x: 642,
          y: wordOptT1DownY
        }
      },
      {
        id: "HB2-1",
        index: 1,
        style: {
          text: "G",
          textFill: "white",
          fontSize: 40,
          x: 642,
          y: wordOptT1DownY
        }
      },
      {
        id: "HB2-6",
        index: 2,
        style: {
          text: "K",
          textFill: "white",
          fontSize: 40,
          x: 642,
          y: wordOptT1DownY
        }
      },
      {
        id: "HB2-4",
        index: 3,
        style: {
          text: "J",
          textFill: "white",
          fontSize: 40,
          x: 642,
          y: wordOptT1DownY
        }
      },
      {
        id: "HB2-2",
        index: 4,
        style: {
          text: "H",
          textFill: "white",
          fontSize: 40,
          x: 642,
          y: wordOptT1DownY
        }
      },
      {
        id: "HB2-11",
        index: 5,
        style: {
          text: "Q",
          textFill: "white",
          fontSize: 40,
          x: 642,
          y: wordOptT1DownY
        }
      }
    ]
  },
  T2: {
    up: [
      {
        style: {
          text: "C",
          textFill: "white",
          fontSize: 40,
          x: 155,
          y: 296
        }
      },
      {
        style: {
          text: "D",
          textFill: "white",
          fontSize: 40,
          x: 155,
          y: 296
        }
      },
      {
        style: {
          text: "E",
          textFill: "white",
          fontSize: 40,
          x: 155,
          y: 296
        }
      },
      {
        style: {
          text: "F",
          textFill: "white",
          fontSize: 40,
          x: 155,
          y: 296
        }
      },
      {
        style: {
          text: "G",
          textFill: "white",
          fontSize: 40,
          x: 155,
          y: 296
        }
      },
      {
        style: {
          text: "H",
          textFill: "white",
          fontSize: 40,
          x: 155,
          y: 296
        }
      },
      {
        style: {
          text: "J",
          textFill: "white",
          fontSize: 40,
          x: 155,
          y: 296
        }
      }
    ],
    down: [
      {
        style: {
          text: "K",
          textFill: "white",
          fontSize: 40,
          x: 397,
          y: 767
        }
      },
      {
        style: {
          text: "L",
          textFill: "white",
          fontSize: 40,
          x: 397,
          y: 767
        }
      },
      {
        style: {
          text: "M",
          textFill: "white",
          fontSize: 40,
          x: 397,
          y: 767
        }
      },
      {
        style: {
          text: "N",
          textFill: "white",
          fontSize: 40,
          x: 397,
          y: 767
        }
      },
      {
        style: {
          text: "P",
          textFill: "white",
          fontSize: 40,
          x: 397,
          y: 767
        }
      },
      {
        style: {
          text: "Q",
          textFill: "white",
          fontSize: 40,
          x: 397,
          y: 767
        }
      }
    ]
  }
};
//人工值机岛位置编号
let artificialPlaceOpt = {
  T1: {
    up: [
      {
        id: "HB2-9",
        index: 0
      },
      {
        id: "HB2-7",
        index: 1
      },
      {
        id: "HB2-5",
        index: 2
      },
      {
        id: "HB2-12",
        index: 3
      },
      {
        id: "HB2-10",
        index: 4
      },
      {
        id: "HB2-8",
        index: 5
      }
    ],
    down: [
      {
        id: "HB2-3",
        index: 0
      },
      {
        id: "HB2-1",
        index: 1
      },
      {
        id: "HB2-6",
        index: 2
      },
      {
        id: "HB2-4",
        index: 3
      },
      {
        id: "HB2-2",
        index: 4
      },
      {
        id: "HB2-11",
        index: 5
      }
    ]
  },
  T2: {
    up: [
      {
        id: "CM201",
        index: 0
      },
      {
        id: "CM202",
        index: 1
      },
      {
        id: "CM203",
        index: 2
      },
      {
        id: "CM204",
        index: 3
      },
      {
        id: "CM205",
        index: 4
      },
      {
        id: "CM206",
        index: 5
      }
    ],
    down: [
      {
        id: "CM251",
        index: 0
      },
      {
        id: "CM252",
        index: 1
      },
      {
        id: "CM253",
        index: 2
      },
      {
        id: "CM254",
        index: 3
      },
      {
        id: "CM255",
        index: 4
      }
    ]
  }
};
//人工值机岛状态
let artificialStatus = {
  //值机岛运行
  0: artificialNormal,
  //值机岛待机
  1: artificialStandby,
  //值机岛故障
  2: artificialMalfunction,
  //值机岛维保
  3: artificialMaintenance,
  //值机岛关机
  4: artificialClose,
  //值机岛急停
  5: artificialStandby,
  //值机岛启动中
  6: artificialStandby,
  //不知道什么状态
  7: artificialStandby
};
//值机岛-上
let islandUpOpt = {
  style: {
    image: artificialNormal,
    width: 202,
    height: 191,
    y: 5,
    x: 178
  }
};
//值机岛-下
let islandDownOpt = {
  style: {
    image: artificialNormal,
    width: 202,
    height: 191,
    y: 850,
    x: 548
  }
};
export {
  //主传送带配置
  conveyorOpt,
  //主传送带装饰
  conveyorSkinOpt,
  //安检门
  safetyCheckOpt,
  //小传送带-上
  conveyorUpOpt,
  //小传送带-下
  conveyorDownOpt,
  //大行李配置
  baleOpt,
  //文字配置
  wordOpt,
  //值机岛-上
  islandUpOpt,
  //值机岛-下
  islandDownOpt,
  //人工值机岛状态
  artificialStatus,
  //小行李箱,
  luggageOpt,
  //人工值机岛位置编号
  artificialPlaceOpt
};
