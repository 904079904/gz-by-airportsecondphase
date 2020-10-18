import {put, call, takeEvery, all} from 'redux-saga/effects';
import {
    REDUX_DATA_ASYNC,
    REDUX_DATA_SAGA,
} from 'action/index';

function* ReduxDataAsync() {
    const result = yield call(axios.get, "/ReduxData")
    yield delay(1000);
    yield put({type: REDUX_DATA_SAGA, result: result.data.result})
}

function* ReduxDataWatchSaga() {
    yield takeEvery(REDUX_DATA_ASYNC, ReduxDataAsync);
}

export default ReduxDataWatchSaga;