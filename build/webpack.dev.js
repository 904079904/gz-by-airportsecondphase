/**
 * Created by xiaohe on 2018/5/7.
 */
const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const project = require('../config/project.config.js');
const webpack = require('webpack');
const HappyPack = require('happypack');
const _ = require('lodash')
//自动生成html，替换
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 引入 DllReferencePlugin
const DllReferencePlugin = require('webpack/lib/DllReferencePlugin');
//分析模块占比
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const Jarvis = require("webpack-jarvis");
//读取模块dll
let dev = {
    mode: 'development',
    devServer: {
        contentBase: path.join(process.cwd(), './src'),
        historyApiFallback: true,
        compress: true,
        inline: true,
        host: project.devUrl,
        hot: project.hot,
        port: project.devPort[0],
        stats: {
            builtAt: true,
            colors: true,
            timings: true,
            usedExports: true,
            entrypoints: true,
            cached: true
        }
    },
    module: {
        rules: [
            /*css等*/
            {
                test: /\.(css|sass|scss)$/,
                use: ['happypack/loader?id=css-dev'],
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
        new webpack.HotModuleReplacementPlugin(),
        // 开启全局的模块热替换（HMR）
        // new webpack.NamedModulesPlugin(),
        // 当模块热替换（HMR）时在浏览器控制台输出对用户更友好的模块名字信息
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
        //html文件移动
        new HtmlWebpackPlugin({
            webTitle: project.webTitle,
            webIcon: project.webIcon,
            template: path.join(process.cwd(), 'src') + '/index.html',
            inject: false,
            minify: true,
            webScript: creatScript(project.dllList),
        }),
        new DllReferencePlugin({
            context: __dirname,
            manifest: require(path.join(process.cwd(), 'src/dll/', `${project.dllList}.manifest.json`))
        }),
        /*设置全局参数*/
        new webpack.DefinePlugin({
            /*全局真实接口路径*/
            "NODE_ENV":JSON.stringify("dev")
        }),
    ]
};
//动态添加BundleAnalyzer，Jarvis
addDevPlugin(project.devPort)
module.exports = merge(common, dev);

//根据数组进行script生成
function creatScript(e) {
    this.e = e;
    let result = project.webScript.map((i, j) => {
        return i.value.map((a, b) => {
            return `<script type="text/javascript" language="JavaScript" src="./${i.name}/${a}.js"></script>`
        })
    })
    result.unshift(`<script type="text/javascript" language="JavaScript" src="./dll/${this.e}.dll.js"></script>`)
    return _.replace(_.toString(result), /,/g, "")
}

function addDevPlugin(e) {
    //分析模块占比
    e[1] ? dev.plugins.push(new BundleAnalyzerPlugin({
        analyzerMode: 'server',
        analyzerHost: project.devUrl,
        openAnalyzer: false,
        //  将在“服务器”模式下使用的端口启动HTTP服务器。
        analyzerPort: project.devPort[1]
    })) : null
    e[2] ? dev.plugins.push(new Jarvis({
        host: project.devUrl,
        port: project.devPort[2] // optional: set a port
    })) : null
}