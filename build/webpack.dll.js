const colors = require('colors');
const path = require('path');
//引入webpack
const webpack = require('webpack');
//webpack的合并方法
const merge = require('webpack-merge');
//webpack基本配置文件
const common = require('./webpack.common.js');
const HappyPack = require('happypack');
//清理旧的dist文件，打包后的
const CleanWebpackPlugin = require('clean-webpack-plugin');
//项目基本配置
const project = require('../config/project.config.js');
const dependencies = require('../package.json').dependencies;


const DllPlugin = require('webpack/lib/DllPlugin');
let dll = {
    mode: 'development',
    context:__dirname,
    entry: createsDllList(dependencies),
    resolve: {
        extensions: ['.js', '.jsx', '.scss', '.json', 'css']
    },
    output: {
        filename: "[name].dll.js",
        path: path.join(process.cwd(), 'src/dll'),
        /*
        *存放相关的dll文件的全局变量名称，比如对于jquery来说的话就是 _dll_jquery,
        * 在前面加 _dll是为了防止全局变量冲突。
        * */
        library: "_dll_[name]"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: ['happypack/loader?id=babel'],
                exclude: path.join(process.cwd(), 'node_modules'),
                include: path.join(process.cwd(), 'src')
            },
            /*css等*/
            {
                test: /\.(css|sass|scss)$/,
                use: ['happypack/loader?id=css-dev'],
            }
        ]
    },
    plugins: [
        /*删除dist文件*/
        new CleanWebpackPlugin(),
        new DllPlugin({
            name: "_dll_[name]",
            /* 生成manifest文件输出的位置和文件名称 */
            path: path.join(process.cwd(), './src/dll/', '[name].manifest.json')
        }),
        // 当模块热替换（HMR）时在浏览器控制台输出对用户更友好的模块名字信息
        /*使用HappyPack实例化*/
        new HappyPack({
            // 用唯一的标识符id来代表当前的HappyPack 处理一类特定的文件
            id: 'babel',
            // 如何处理.js文件，用法和Loader配置是一样的
            loaders: [{
                loader: "babel-loader",
                options: {
                    cacheDirectory: true
                }
            }, 'react-hot-loader/webpack']
        }),
        new HappyPack({
            id: "css-dev",
            loaders: [{
                //如果为生产模式，就进行css分离
                loader: "style-loader"
            }, {
                loader: "css-loader", // 将 CSS 转化成 CommonJS 模块
                options: {
                    camelCase: true,
                    minimize: false
                }
            }, {
                loader: 'postcss-loader',
                options: {
                    "cssnano": {
                        "reduceIdents": false
                    }
                }
            }, {
                loader: 'sass-loader'
            }]
        }),
    ]
}
module.exports = dll

//对package.json中的第三方依赖进行生成
function createsDllList(e) {
    this.e = e;
    let dllList = {};
    let list =[]
    for (let x in this.e) {
        // let name = x.replace(/-/g, "");
        console.log(`已生成的依赖dllList:${(x).red}`);
        list.push(x);
    }
    dllList[project.dllList]=list
    console.log(dllList)
    return dllList
}
