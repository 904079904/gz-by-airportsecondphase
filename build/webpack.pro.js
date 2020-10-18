/**
 * Created by xiaohe on 2018/5/7.
 */

//引入path模块，为了路径需要
const path = require('path')
//引入webpack
const webpack = require('webpack');
const _ = require('lodash')
//webpack的合并方法
const merge = require('webpack-merge');
//webpack基本配置文件
const common = require('./webpack.common.js');
//项目基本配置
const project = require('../config/project.config.js');
//清理旧的dist文件，打包后的
const CleanWebpackPlugin = require('clean-webpack-plugin');
//自动生成html，替换
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
//分离打包css
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 引入 DllReferencePlugin
const DllReferencePlugin = require('webpack/lib/DllReferencePlugin');


let original=JSON.parse(process.env.npm_config_argv).original;

let mock=original.includes('--mock');

let pro ={
    mode: 'production',
    module: {
        rules: [
            /*css等*/
            {
                test: /\.(css|sass|scss)$/,
                use: [{
                    //如果为生产模式，就进行css分离
                    loader: MiniCssExtractPlugin.loader
                }, {
                    loader: "css-loader", // 将 CSS 转化成 CommonJS 模块
                    options: {
                        camelCase: true
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
                }],
            },
        ]
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    chunks: "all"
                }
            }
        }
    },
    plugins: [
        /*删除dist文件*/
        new CleanWebpackPlugin(),
        //html文件移动
        new HtmlWebpackPlugin({
            webTitle: project.webTitle,
            webIcon: project.webIcon,
            template: path.join(process.cwd(), 'src') + '/entrance/template.html',
            inject: false,
            minify: true,
            webScript: creatScript(project.webScript),
            webCss: creatCss(project.webCss)
        }),
        new CopyWebpackPlugin(creatPublic(project.publicResources)),
        //css分割打包
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "css/[name].css",
            chunkFilename: "css/[name].css"
        }),
        /*设置全局参数*/
        new webpack.DefinePlugin({
            /*全局真实接口路径*/
            "NODE_ENV":JSON.stringify("pro"),
            "mock":JSON.stringify(mock)
        }),
    ]
}
module.exports = merge(common,pro);
//根据字符串或是数组进行打包
function creatPublic(e) {
    this.e = e;
    if (typeof (this.e) == "string") {
        return [{
            from: path.join(process.cwd(), 'src/public/') + this.e,
            to: 'public/' + this.e
        }]
    }
    if (this.e instanceof Array == true) {
        let resourcesArray = this.e.map((i, j) => {
            return {
                from: path.join(process.cwd(), 'src/public/') + i,
                to: 'public/' + i
            }
        })
        return resourcesArray;
    }
}

//根据数组进行script生成
function creatScript(e) {
    this.e = e;
    let result = this.e.map((i, j) => {
        return i.value.map((a, b) => {
            return `<script type="text/javascript" language="JavaScript" src="./${i.name}/${a}.js"></script>`
        })
    })
    return _.replace(_.toString(result), /,/g, "")
}

//根据数组进行Css生成
function creatCss(e) {
    this.e = e;
    let result = this.e.map((i, j) => {
        return i.value.map((a, b) => {

            return `<link href="./${i.name}/${a}.css" rel="stylesheet">`
        })
    })
    _.toString(result).replace()
    return _.replace(_.toString(result), /,/g, "")

}
