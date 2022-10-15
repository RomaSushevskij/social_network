import {GetUsersDataType, usersAPI} from "../../../api/api";
import {AxiosError} from "axios";
import {setAppError} from "../../redusers/app/appReducer";
import {setFollowers} from "../../redusers/profileReducer/profileReducer";
import {call, put, takeEvery} from "redux-saga/effects";

enum profileActions {
    GET_FOLLOWERS = 'GET_FOLLOWERS'
}

export function* getFollowersWorkerSaga() {
    try {
        const followers: GetUsersDataType = yield call(usersAPI.getUsers, 100, 1, {friend: true, term: ""});
        yield put(setFollowers(followers.items));
    } catch (e) {
        const error = e as AxiosError;
        yield put(setAppError(error.message));
    }
}

export const getFollowers = () => ({
    type: profileActions.GET_FOLLOWERS
} as const);

export function* profileWatcherSaga() {
    yield takeEvery(profileActions.GET_FOLLOWERS, getFollowersWorkerSaga)
}


