var colors=require('colors');
var express = require('express');
var path = require('path');
var app = express();
var dist=path.join(process.cwd(), 'dist');
var staticPath = express.static(dist);

//项目基本设置
const project = require('../config/project.config.js');
app.use(staticPath);
app.get('/', function (req, res) {
    res.sendFile(dist+'/index.html');
    res.end();
});

app.listen(project.proPort,project.proUrl, function (error) {
    if (error) {
        console.error(error)
    } else {
        console.info(('****node服务启动成功**** ').yellow+(project.proUrl+':'+project.proPort).red)
    }
})