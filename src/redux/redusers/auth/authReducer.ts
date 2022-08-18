import {authMeAPI, AuthUserDataType, profileAPI, RESPONSE_RESULT_CODES, securityAPI} from "../../../api/api";
import {AppThunk, GetStateType} from "../../redux-store";
import {getFollowers, setProfile} from '../profileReducer/profileReducer';
import {setIsFetchingValue} from '../usersReducer/usersReducer';
import {setAppError, setAppMessage} from '../app/appReducer';
import {MESSAGES_FOR_SUCCESS_BAR} from '../../../components/generic/SnackBar/SnackBar';
import {AxiosError} from "axios";


export enum AUTH_ACTIONS_TYPES {
    SET_AUTH_USER_DATA = 'social/auth/SET_AUTH_USER_DATA',
    SET_FULL_NAME_AND_AVATAR = 'social/auth/SET_FULL_NAME_AND_AVATAR',
    SET_CAPTCHA_URL = 'social/auth/SET_CAPTCHA_URL',
}

export type InitialStateAuthType = typeof initialState

const initialState = {
    id: null as null | number,
    email: null as null | string,
    login: null as null | string,
    isAuth: false,
    fullName: null as null | string,
    avatar: null as null | string,
    captchaURL: '',
}

export const authReducer = (state: InitialStateAuthType = initialState, action: AuthActionType) => {
    switch (action.type) {
        case AUTH_ACTIONS_TYPES.SET_AUTH_USER_DATA:
        case AUTH_ACTIONS_TYPES.SET_FULL_NAME_AND_AVATAR:
        case AUTH_ACTIONS_TYPES.SET_CAPTCHA_URL:
            return {
                ...state, ...action.payload
            }
        default:
            return state
    }
}

export type AuthActionType =
    ReturnType<typeof setAuthUserData> |
    ReturnType<typeof setFullNameAndAvatar> |
    ReturnType<typeof setCaptchaURL>

// A C T I O N S

export const setAuthUserData = ({id, email, login}: AuthUserDataType, isAuth: boolean) => ({
    type: AUTH_ACTIONS_TYPES.SET_AUTH_USER_DATA,
    payload: {id, email, login, isAuth}
})
export const setFullNameAndAvatar = (fullName: string, avatar: string | null) => ({
    type: AUTH_ACTIONS_TYPES.SET_FULL_NAME_AND_AVATAR,
    payload: {fullName, avatar}
})
export const setCaptchaURL = (captchaURL: string) => ({
    type: AUTH_ACTIONS_TYPES.SET_CAPTCHA_URL,
    payload: {captchaURL}
})

// T H U N K S

export const getAuthorizationInfo = (): AppThunk => async (dispatch, getState: GetStateType) => {
    try {
        const data = await authMeAPI.getAuthorizationInfo();
        if (data.resultCode === RESPONSE_RESULT_CODES.success) {
            dispatch(setAuthUserData(data.data, true))
        } else {
            data.messages.length && dispatch(setAppError(data.messages[0]));
        }
        const id = getState().auth.id
        if (id) {
            const profileData = await profileAPI.getProfile(id);
            const fullName = profileData?.fullName
            const avatar = profileData?.photos.small
            dispatch(setFullNameAndAvatar(fullName, avatar))
            dispatch(setProfile(profileData))
        }
        dispatch(getFollowers());
    } catch (e) {
        const error = e as AxiosError;
        dispatch(setAppError(error.message));
    }
};

export const login = (email: string, password: string, rememberMe: boolean, captcha?: string): AppThunk => async dispatch => {
    try {
        dispatch(setIsFetchingValue(true))
        const data = await authMeAPI.login(email, password, rememberMe, captcha);
        if (data.resultCode === RESPONSE_RESULT_CODES.success) {
            dispatch(getAuthorizationInfo())
            dispatch(setAppMessage(MESSAGES_FOR_SUCCESS_BAR.LOGGED_IN_SUCCESSFULLY))
        } else {
            if (data.resultCode === RESPONSE_RESULT_CODES.needCaptcha) {
                dispatch(getCaptcha())
            }
            const message = data.messages.length > 0 ? data.messages[0] : 'Some error'
            dispatch(setAppError(message))
        }
    } catch (e) {
        const error = e as AxiosError;
        dispatch(setAppError(error.message))
    } finally {
        dispatch(setIsFetchingValue(false))
    }
}

export const logout = (): AppThunk => async dispatch => {
    try {
        const data = await authMeAPI.logout();
        if (data.resultCode === RESPONSE_RESULT_CODES.success) {
            dispatch(setAuthUserData({id: null, email: null, login: null}, false))
        }
    } catch (e) {
        const error = e as AxiosError;
        dispatch(setAppError(error.message))
    }
};

export const getCaptcha = (): AppThunk => async dispatch => {
    try {
        const data = await securityAPI.getCaptchaURL()
        dispatch(setCaptchaURL(data.url))
    } catch (e) {
        const error = e as AxiosError;
        dispatch(setAppError(error.message))
    } finally {
        dispatch(setIsFetchingValue(false));
    }
}