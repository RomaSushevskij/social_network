import {getAuthorizationInfo} from "../../redusers/auth/authReducer";
import {AxiosError} from "axios";
import {setAppError, setAppInitializeValue} from "../../redusers/app/appReducer";
import {call, put, takeEvery} from 'redux-saga/effects'
import {getAuthorizationInfoWorkerSaga} from "../auth/authSagas";

enum appActions {
    INITIALIZE_APP = 'INITIALIZE_APP'
}

export function* initializeAppWorkerSage() {
    debugger
    try {
        yield* getAuthorizationInfoWorkerSaga();
        yield put(setAppInitializeValue(true));
    } catch (e) {
        const error = e as AxiosError;
        yield put(setAppError(error.message));
    }
}

export const initializeApp = () => ({type: appActions.INITIALIZE_APP});

export function* appWatcherSaga() {
    yield takeEvery(appActions.INITIALIZE_APP, initializeAppWorkerSage)
}