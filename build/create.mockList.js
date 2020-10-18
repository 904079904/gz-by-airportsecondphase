const path = require("path");
const fs = require("fs");
const colors = require("colors");
const listFile = path.join(process.cwd(), "./src/mock/index.js");
const Interface = path.join(process.cwd(), "./config/Interface.config.js");
const _ = require("lodash");

// 检查当前目录中是否存在该文件。
fs.access(listFile, fs.constants.F_OK, err => {
  switch (!err) {
    case false:
      console.info(`****${listFile}文件不存在****`.red);
      break;
    default:
      console.info(`****开始执行读取${listFile}文件**** `.green);
      mockListOpen(listFile);
      break;
  }
});

function mockListOpen(file) {
  fs.readFile(file, (err, data) => {
    /*   if (err) {
      console.error(`文件读取出了一点问题`)
      return
    } */
    let string = _.split(data.toString(), "export");
    string = string[string.length - 1].replace(/[{}]/g, "").trim();

    string = _.split(string, ",");
    console.log(string);
    let text = "";
    for (let i = 0; i <= string.length - 1; i++) {
      switch (i == string.length - 1) {
        case true:
          text += `${string[i]}`;
          break;
        default:
          text += `${string[i]}:true,`;
          break;
      }
    }
    // console.log(text)
    let InterfaceText = `
/*
 * 这个文档为了设置接口，真实接口和mock接口
 * true开启mock接口 false关闭mock接口
 * InterfaceSwitch全局启用mock
 * InterfaceList，当全局mock开启时，每个接口是否使用mock或是真实
 * */

export let InterfaceSwitch;
if (NODE_ENV === "pro") {
  InterfaceSwitch = mock;
} else {
  InterfaceSwitch = true;
}
export const InterfaceList = {
  ${text}
};
`;
    interfaceOpen(InterfaceText);
  });
}

function interfaceOpen(text) {
  fs.writeFile(Interface, text, err => {
    if (err) {
      return console.error(err);
    }
    console.log("数据写入内容".green);
    console.log(text);
    console.log("数据写入成功！".green);
  });
}
