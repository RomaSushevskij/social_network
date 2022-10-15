import {
    authMeAPI,
    GetAuthUserDataType,
    GetProfileDataType,
    LoginResponseType,
    LogoutResponseType,
    profileAPI,
    RESPONSE_RESULT_CODES,
    securityAPI
} from "../../../api/api";
import {setAppError, setAppMessage} from "../../redusers/app/appReducer";
import {setProfile} from "../../redusers/profileReducer/profileReducer";
import {AxiosError} from "axios";
import {setAuthUserData, setCaptchaURL, setFullNameAndAvatar} from "../../redusers/auth/authReducer";
import {call, put, select, takeEvery} from "redux-saga/effects";
import {AppStateType} from "../../redux-store";
import {getAuthUserIDSelector} from "../../selectors/authSelectors";
import {getFollowersWorkerSaga} from "../profile/profileSagas";
import {setIsFetchingValue} from "../../redusers/usersReducer/usersReducer";
import {MESSAGES_FOR_SUCCESS_BAR} from "../../../components/generic/SnackBar/SnackBar";

enum authActions {
    GET_AUTHORIZATION_INFO = 'auth/GET_AUTHORIZATION_INFO',
    LOGIN = 'auth/LOGIN',
    LOGOUT = 'auth/LOGOUT',
    GET_CAPTCHA = 'auth/GET_CAPTCHA'
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
}

export function* loginWorkerSaga(action: ReturnType<typeof login>) {
    const {password, rememberMe, captcha, email} = action.payload;
    try {
        yield put(setIsFetchingValue(true))
        const data: LoginResponseType = yield call(authMeAPI.login, email, password, rememberMe, captcha);
        if (data.resultCode === RESPONSE_RESULT_CODES.success) {
            yield* getAuthorizationInfoWorkerSaga()
            yield put(setAppMessage(MESSAGES_FOR_SUCCESS_BAR.LOGGED_IN_SUCCESSFULLY))
        } else {
            if (data.resultCode === RESPONSE_RESULT_CODES.needCaptcha) {
                yield* getCaptchaWorkerSaga()
            }
            const message = data.messages.length > 0 ? data.messages[0] : 'Some error'
            yield put(setAppError(message))
        }
    } catch (e) {
        const error = e as AxiosError;
        yield put(setAppError(error.message))
    } finally {
        yield put(setIsFetchingValue(false))
    }
}

export function* getCaptchaWorkerSaga() {
    try {
        const data: { url: string } = yield call(securityAPI.getCaptchaURL)
        yield put(setCaptchaURL(data.url))
    } catch (e) {
        const error = e as AxiosError;
        yield put(setAppError(error.message))
    } finally {
        yield put(setIsFetchingValue(false));
    }
}

export function* logoutWorkerSaga() {
    try {
        const data: LogoutResponseType = yield call(authMeAPI.logout);
        if (data.resultCode === RESPONSE_RESULT_CODES.success) {
            yield put(setAuthUserData({id: null, email: null, login: null}, false))
        }
    } catch (e) {
        const error = e as AxiosError;
        yield put(setAppError(error.message))
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha?: string) => ({
    type: authActions.LOGIN,
    payload: {email, password, rememberMe, captcha}
} as const);
export const logout = () => ({type: authActions.LOGOUT} as const)

export function* authWatcherSaga() {
    yield takeEvery(authActions.GET_AUTHORIZATION_INFO, getAuthorizationInfoWorkerSaga)
    yield takeEvery(authActions.LOGIN, loginWorkerSaga)
    yield takeEvery(authActions.GET_CAPTCHA, getCaptchaWorkerSaga)
    yield takeEvery(authActions.LOGOUT, logoutWorkerSaga)
}