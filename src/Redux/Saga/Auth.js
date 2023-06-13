import { takeEvery, put, call, all } from 'redux-saga/effects';
import * as ACTIONS from '../Action';
import { NetworkManager } from '../../network-service';
import { apis } from "../../config";

function getApiCall(url, data) {
    return NetworkManager.networkManagerInstance.fetchRequest(url, "GET", data);
}

function* callApi() {
    try {
        const res = yield call(getApiCall, apis.url, {});
        if (res) {
            let data = res;
            yield put({ type: ACTIONS.GET_USER_DETAIL, data });
        }
    } catch (error) {
        yield put({ type: ACTIONS.GET_USER_DETAIL_FAIL, error });
    }
}

export function* authSaga() {
    yield takeEvery(ACTIONS.AUTH_SIGN_IN, callApi);
    yield all([callApi()]);
}
