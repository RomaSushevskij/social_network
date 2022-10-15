import {
    GetProfileDataType,
    GetUsersDataType,
    profileAPI,
    RESPONSE_RESULT_CODES,
    UpdateStatusDataType,
    usersAPI
} from "../../../api/api";
import {AxiosError} from "axios";
import {setAppError, setAppMessage} from "../../redusers/app/appReducer";
import {setFollowers, setProfile, setStatus} from "../../redusers/profileReducer/profileReducer";
import {call, put, takeEvery} from "redux-saga/effects";
import {MESSAGES_FOR_SUCCESS_BAR} from "../../../components/generic/SnackBar/SnackBar";

enum profileActions {
    GET_PROFILE = 'profile/GET_PROFILE',
    GET_STATUS = 'profile/GET_STATUS',
    UPDATE_STATUS = 'profile/UPDATE_STATUS',
    GET_FOLLOWERS = 'profile/GET_FOLLOWERS',
}

export function* getProfileWorkerSaga(action: ReturnType<typeof getProfile>) {
    try {
        const data: GetProfileDataType = yield call(profileAPI.getProfile, action.payload.userId);
        yield put(setProfile(data));
    } catch (e) {
        const error = e as AxiosError;
        yield put(setAppError(error.message));
    }
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

export function* getStatusWorkerSaga(action: ReturnType<typeof getStatus>) {
    try {
        const data: string = yield call(profileAPI.getStatus, action.payload.userId);
        yield put(setStatus(data))
    } catch (e) {
        const error = e as AxiosError;
        yield put(setAppError(error.message));
    }
}

export function* updateStatusWorkerSaga(action: ReturnType<typeof updateStatus>) {
    try {
        const data: UpdateStatusDataType = yield call(profileAPI.updateStatus, action.payload.status);
        if (data.resultCode === RESPONSE_RESULT_CODES.success) {
            yield put(setStatus(action.payload.status))
            yield put(setAppMessage(MESSAGES_FOR_SUCCESS_BAR.STATUS_CHANGED_SUCCESSFULLY))
        } else {
            if (data.messages.length) yield put(setAppError(data.messages[0]))
        }
    } catch (e) {
        const error = e as AxiosError;
        yield put(setAppError(error.message));
    }
}

export const getFollowers = () => ({
    type: profileActions.GET_FOLLOWERS
} as const);
export const getProfile = (userId: number) => ({type: profileActions.GET_PROFILE, payload: {userId}} as const);
export const getStatus = (userId: number) => ({type: profileActions.GET_STATUS, payload: {userId}} as const);
export const updateStatus = (status: string) => ({type: profileActions.UPDATE_STATUS, payload: {status}} as const);

export function* profileWatcherSaga() {
    yield takeEvery(profileActions.GET_FOLLOWERS, getFollowersWorkerSaga)
    yield takeEvery(profileActions.GET_PROFILE, getProfileWorkerSaga)
    yield takeEvery(profileActions.GET_STATUS, getStatusWorkerSaga)
    yield takeEvery(profileActions.UPDATE_STATUS, updateStatusWorkerSaga)
}


