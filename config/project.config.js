const project = {
    /*开发模式中的访问地址*/
    "devUrl": "localhost",
    /*开发模式中的设置端口
     * 以数组的方式使用
     * 数组[0]，用来访问开发页面，端口号必填
     * 数组[1]，用来访问BundleAnalyzer,false为关闭当前功能，如若开启请输入端口后，例:8888
     * 数组[2]，用来访问Jarvis,false为关闭当前功能，如若开启请输入端口后，例:8889
     * */
    "devPort": [8081, 8082, 8083],
    /*工程的整体名称，对应影响浏览器中的title*/
    "webTitle": "白云机场生产可视化分析系统",
    /*
     *工程的整体图标，对应影响浏览器中的title的ico
     * 支持路径、url、base64
     * base64需要"'base64编码'"
     * */
    "webIcon": "https://webpack.docschina.org/assets/favicon.ico",
    /*开发模式中的访问地址*/
    "proUrl": "192.168.8.155",
    /*开发模式中的访问端口*/
    "proPort": "8080",
    /*真实的接口调用地址集合，可数组包含对象形式，编译多个接口
     * name是接口名称，需英文
     * protocal，请求方式http/https
     * url，真实接口的访问地址
     * port,真实接口的访问端口
     * path,特殊接口路径字段，默认为'/'，例如'192.168.1.150:8080/api/getClass'其中的'/api'
     * */
    "realUrl": [{
            "name": "urlOne",
            "protocol": "http",
            "url": "10.10.236.170",
            "port": "60000",
            "path":"/api",
            // "url": "172.20.10.15",
            // "port": "8086",
            // "path":"/api"
        },
        {
            "name": "urlTow",
            "protocol": "http",
            // "url": "172.20.10.15", //生产环境地址
            // "port": "8086",
            // "path":"/ivs-gis"

            "url": "10.135.23.56", //测试环境电脑IP
            "port": "8080",
            "path":"/ivs-gis"

            // "url": "192.168.1.118", //胡佳电脑IP
            // "port": "801",
            // "path":""
        },
        {
            "name": "urlThree",
            "protocol": "http",
            "url": "10.10.236.170",
            "port": "60000",
            "path":"/api"
        }
    ],
    /*需要处理转移的静态资源
     * 以数组形式储存
     * 处理路径public下定义的文件夹
     * 每个要处理的文件夹名以字符串的形式定义
     * '/文件夹名'
     * */
    "publicResources": ["js/timer.js",'js/vex.channel.min.js','js/vexWS.js'],
    "webCss": [{
        name: "css",
        value: ["vendors", "app"]
    }],
    "webScript": [{
        name: 'public',
        value: ['js/vex.channel.min','js/vexWS','js/timer']
    },{
        name: "js",
        value: ["vendors.bundle", "app.bundle"]
    }],
    /*工程应用中的服务名，影响接口访问路径*/
    // "publicPath": "/ivs-lsd/",
    "publicPath": "/",
    /*工程中需要全局声明的第三方库，对应影响webpack.ProvidePlugin*/
    "providePlugin": {
        "_": ["lodash"],
        "echarts": "echarts",
        "React": "react",
        "Component": [
            "react",
            "Component"
        ],
        "Fragment": [
            "react",
            "Fragment"
        ],
        "connect": [
            "react-redux",
            "connect"
        ],
        "PropTypes": "prop-types",
        "ReactDOM": "react-dom",
        "Mock": "mockjs",
        "axios": "axios",
        "d3": "d3",
        "moment": "moment",
        "zrender":"zrender"
    },
    dllList: "dllList",
    /*是否开启redux，true开启、false关闭、默认关闭*/
    "redux": true,
    /*是否开启antd，true开启、false关闭、默认开启*/
    "antd": true,
    "hot": false
}
module.exports = project