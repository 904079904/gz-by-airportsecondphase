/**
 * Created by xiaohe on 2018/5/7.
 */
//antd react根目录组件
import {LocaleProvider} from 'antd';
//antd 中文国际化
import zhCN from 'antd/lib/locale-provider/zh_CN';

import 'config/initialize.config.js';
//路由，根组件
import Router from 'con/Router/Router.js';
//项目的所有使用设置
import * as project from 'config/project.config';

//mock加载
import 'mock/mock.create';
//进行判断，是否开启redux功能
if (project.redux === true) {
    //react-redux的组件
    const Provider = require('react-redux').Provider;
    //redux中的数据存储store
    const store = require('store/index')
    ReactDOM.render(
        <Provider store={store}>
            <LocaleProvider locale={zhCN}>
                <Router/>
            </LocaleProvider>
        </Provider>
        , document.getElementById('main')
    )
} else {
    ReactDOM.render(
        <LocaleProvider locale={zhCN}>
            <Router/>
        </LocaleProvider>
        , document.getElementById('main')
    )
}
// Webpack Hot Module Replacement API
if (module.hot) {
    module.hot.accept('con/Router/Router.js', () => {
        render(Router)
    })
}
