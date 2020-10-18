/**
 * Created by xiaohe on 2018/8/3.
 */
import {REDUX_DATA_ASYNC, REDUX_DATA_SYNCH} from 'action/index';

const ReduxData = (state = '', action) => {
    console.log('reducer-ReduxData', state, action)
    switch (action.type) {
        case REDUX_DATA_ASYNC:
            return `我是一次异步调用${action.value}`;
        case REDUX_DATA_SYNCH:
            return `我是一次同步调用${action.value}`;
        default:
            return state;
    }
}
export default ReduxData

