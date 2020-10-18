/**
 * Revised by wangliling on 2018/8/23
 * */
import {
    //异步使用
    REDUX_DATA_ASYNC,
    //同步使用
    REDUX_DATA_SYNCH,
    //Saga使用
    REDUX_DATA_SAGA
} from './ReduxData/action.ReduxData';
import {actionCreate} from './action.create'

export {
    //action生成器,必须
    actionCreate,
    //异步使用
    REDUX_DATA_ASYNC,
    //同步使用
    REDUX_DATA_SYNCH,
    //Saga使用
    REDUX_DATA_SAGA
}