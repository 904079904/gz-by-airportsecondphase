/**
 * Created by xiaohe on 2018/5/16.
 */
//redux需要的方法
import {combineReducers} from 'redux';

import ReduxData from './ReduxData/reducer.ReduxData';

const Reducer = combineReducers({
    ReduxData: ReduxData
});
export default Reducer