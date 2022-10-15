import {initializeAppWorkerSage} from "./appSagas";
import {getAuthorizationInfoWorkerSaga} from "../auth/authSagas";
import {put} from "redux-saga/effects";
import {setAppInitializeValue} from "../../redusers/app/appReducer";

test('initialize app success', () => {
    const gen = initializeAppWorkerSage();

    expect(gen.next().value).toEqual(getAuthorizationInfoWorkerSaga());
    expect(gen.next().value).toEqual(put(setAppInitializeValue(true)))
});
