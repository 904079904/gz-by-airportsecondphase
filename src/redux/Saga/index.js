
import {all} from 'redux-saga/effects'
import ReduxDataWatchSaga from "./ReduxData/saga.ReduxData";
function * Saga() {
    yield all([
        ReduxDataWatchSaga
    ])
}
export default Saga;