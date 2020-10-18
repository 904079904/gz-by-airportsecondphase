/**
 * Created by xiaohe on 2018/5/7.
 */
const path = require('path');
const webpack = require('webpack');
require("react-hot-loader");
const project = require('../config/project.config.js');
const realAddress = require('../config/realAddress.config.js');
const HappyPack = require('happypack');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');



module.exports = {
    cache: true,
    context: path.join(process.cwd(), './'),
    entry: {
        app: ['babel-polyfill', 'react-hot-loader/patch', './src/entrance/app.js']
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
    output: {
        /*根据node运行的环境查找目录*/
        path: path.join(process.cwd(), 'dist'),
        filename: 'js/[name].bundle.js',
        publicPath: project.publicPath,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: ['happypack/loader?id=babel'],
                exclude: path.join(process.cwd(), 'node_modules'),
                include: path.join(process.cwd(), 'src')
            },

            //图片压缩
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024,
                            name: "img/[name].[hash].[ext]",
                            publicpath: './'
                        }
                    }
                ]
            },
            //处理字体
            {
                test: /\.(eot|otf|woff|ttf)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: "font/[name].[hash].[ext]",
                            publicpath: './'
                        }
                    }
                ]
            },
            //音视频处理
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'media/[name].[ext]',
                }
            },{
                test: /\.csv$/,
                loader: 'csv-loader',
                options: {
                    dynamicTyping: true,
                    header: true,
                    skipEmptyLines: true
                }
            }
        ]
    },
    resolve: {
        /*设置默认读取的后缀*/
        extensions: ['.js', '.jsx', '.scss', '.json', 'css'],
        /*设置优先读取的模块*/
        modules: [path.join(process.cwd(), 'src'), 'node_modules'],
        /*设置整体别名*/
        alias: {
            //图片别名
            'img': path.join(process.cwd(), 'src/public/images'),
            //多媒体别名
            'media': path.join(process.cwd(), 'src/public/media'),
            //字体别名
            'font': path.join(process.cwd(), 'src/public/font'),
            //data别名
            'data': path.join(process.cwd(), 'src/public/data'),
            //mock别名
            'mock': path.join(process.cwd(), 'src/mock'),
            //action别名
            'action': path.join(process.cwd(), 'src/redux/Action'),
            //reducer别名
            'reducer': path.join(process.cwd(), 'src/redux/Reducer'),
            //saga别名
            'saga': path.join(process.cwd(), 'src/redux/Saga'),
            //store别名
            'store': path.join(process.cwd(), 'src/redux/Store'),
            //容器别名
            'con': path.join(process.cwd(), 'src/containers'),
            //组件别名
            'com': path.join(process.cwd(), 'src/component'),
            //公用方法
            'method': path.join(process.cwd(), 'src/public/method'),
            //第三方的一些js
            'js': path.join(process.cwd(), 'src/public/js'),
            //config基本设置
            'config': path.join(process.cwd(), 'config')
        }
    },
    plugins: [

        /*设置全局公用声明第三方库*/
        new webpack.ProvidePlugin(project.providePlugin),
        /*设置全局参数*/
        new webpack.DefinePlugin({
            /*全局真实接口路径*/
            realAddress: JSON.stringify(realAddress)
        }),
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
        })
        /*,
        new ParallelUglifyPlugin({})*/
    ]
};
