import {authMeAPI, GetAuthUserDataType, GetProfileDataType, profileAPI, RESPONSE_RESULT_CODES} from "../../../api/api";
import {setAppError} from "../../redusers/app/appReducer";
import {setProfile} from "../../redusers/profileReducer/profileReducer";
import {AxiosError} from "axios";
import {setAuthUserData, setFullNameAndAvatar} from "../../redusers/auth/authReducer";
import {call, put, select, takeEvery} from "redux-saga/effects";
import {AppStateType} from "../../redux-store";
import {getAuthUserIDSelector} from "../../selectors/authSelectors";
import {getFollowersWorkerSaga} from "../profile/profileSagas";

enum authActions {
    GET_AUTHORIZATION_INFO = 'GET_AUTHORIZATION_INFO'
}

export function* getAuthorizationInfoWorkerSaga() {
    try {
        const data: GetAuthUserDataType = yield call(authMeAPI.getAuthorizationInfo);
        if (data.resultCode === RESPONSE_RESULT_CODES.success) {
            yield put(setAuthUserData(data.data, true))
            const state: AppStateType = yield select();
            const id = getAuthUserIDSelector(state);
            if (id) {
                const profileData: GetProfileDataType = yield call(profileAPI.getProfile, id);
                const fullName = profileData?.fullName
                const avatar = profileData?.photos.small
                yield put(setFullNameAndAvatar(fullName, avatar))
                yield put(setProfile(profileData))
            }
            yield* getFollowersWorkerSaga();
        } else {
            if (data.messages.length) {
                yield put(setAppError(data.messages[0]));
            }
        }
    } catch (e) {
        const error = e as AxiosError;
        yield put(setAppError(error.message));
    }
};

export const getAuthorizationInfo = () => ({type: authActions.GET_AUTHORIZATION_INFO});

export function* authWatcherSaga() {
    yield takeEvery(authActions.GET_AUTHORIZATION_INFO, getAuthorizationInfoWorkerSaga)
}