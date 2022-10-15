import {initializeAppWorkerSage} from "./appSagas";
import {getAuthorizationInfoWorkerSaga} from "../auth/authSagas";
import {put} from "redux-saga/effects";
import {setAppError, setAppInitializeValue} from "../../redusers/app/appReducer";

test('initialize app success', () => {
    const gen = initializeAppWorkerSage();

    expect(gen.next().value).toEqual(getAuthorizationInfoWorkerSaga());
    expect(gen.next().value).toEqual(put(setAppInitializeValue(true)))
});

test('initialize app with error', () => {
    const gen = initializeAppWorkerSage();
    const error = {message: 'some error'}
    expect(gen.next().value).toEqual(getAuthorizationInfoWorkerSaga());
    expect(gen.throw(error).value).toEqual(put(setAppError(error.message)))
})
