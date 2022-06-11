import {authMeAPI, AuthUserDataType, profileAPI, RESPONSE_RESULT_CODES, securityAPI} from "../../../api/api";
import {AppThunk, GetStateType} from "../../redux-store";
import {getFollowers, ProfileType, setProfile} from '../profileReducer/profileReducer';
import {setIsFetchingValue} from '../usersReducer/usersReducer';
import App from '../../../App';


export enum AUTH_ACTIONS_TYPES {
    SET_AUTH_USER_DATA = 'social/auth/SET_AUTH_USER_DATA',
    SET_FULL_NAME_AND_AVATAR = 'social/auth/SET_FULL_NAME_AND_AVATAR',
    SET_CAPTCHA_URL = 'social/auth/SET_CAPTCHA_URL',
    SET_ERROR_MESSAGE = 'social/auth/SET_ERROR_MESSAGE',
}

export type InitialStateAuthType = typeof initialState

const initialState = {
    id: null as null | number,
    email: null as null | string,
    login: null as null | string,
    isAuth: false,
    fullName: null as null | string,
    avatar: null as null | string,
    captchaURL:'',
    errorMessage:''
}

export const authReducer = (state: InitialStateAuthType = initialState, action: AuthActionType) => {
    switch (action.type) {
        case AUTH_ACTIONS_TYPES.SET_AUTH_USER_DATA:
        case AUTH_ACTIONS_TYPES.SET_FULL_NAME_AND_AVATAR:
        case AUTH_ACTIONS_TYPES.SET_CAPTCHA_URL:
        case AUTH_ACTIONS_TYPES.SET_ERROR_MESSAGE:
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
    ReturnType<typeof setCaptchaURL> |
    ReturnType<typeof setErrorMessage>

// A C T I O N S

export const setAuthUserData = ({id, email, login}: AuthUserDataType, isAuth: boolean) => ({
    type: AUTH_ACTIONS_TYPES.SET_AUTH_USER_DATA,
    payload: {id, email, login, isAuth}
})
export const setFullNameAndAvatar = (fullName: string, avatar: string | null) => ({
    type: AUTH_ACTIONS_TYPES.SET_FULL_NAME_AND_AVATAR,
    payload: {fullName, avatar}
})
export const setCaptchaURL = (captchaURL:string) => ({
    type: AUTH_ACTIONS_TYPES.SET_CAPTCHA_URL,
    payload: {captchaURL}
})
export const setErrorMessage = (errorMessage:string) => ({
    type: AUTH_ACTIONS_TYPES.SET_ERROR_MESSAGE,
    payload: {errorMessage}
})

// T H U N K S

export const getAuthorizationInfo = (): AppThunk => (dispatch, getState: GetStateType) => {
    let id;
    return authMeAPI.getAuthorizationInfo()
        .then(data => {
            if (data.resultCode === RESPONSE_RESULT_CODES.success) {
                dispatch(setAuthUserData(data.data, true))
            }
        })
        .then(() => {
            id = getState().auth.id
            if (id) {
                return profileAPI.getProfile(id)
            }
        })
        .then(data => {
            const fullName = data?.fullName
            const avatar = data?.photos.small
            dispatch(setFullNameAndAvatar(fullName as string, avatar as string))
            dispatch(setProfile(data as ProfileType))
        })
        .then(() => {
            dispatch(getFollowers())
        })
}

export const login = (email: string, password: string, rememberMe: boolean, captcha?: string): AppThunk => dispatch => {
    dispatch(setIsFetchingValue(true))
    authMeAPI.login(email, password, rememberMe, captcha)
        .then(data => {
            if (data.resultCode === RESPONSE_RESULT_CODES.success) {
                dispatch(getAuthorizationInfo())
            } else {
                if (data.resultCode === RESPONSE_RESULT_CODES.needCaptcha) {
                    dispatch(getCaptcha())
                }
                const message = data.messages.length > 0 ? data.messages[0] : 'Some error'
                dispatch(setErrorMessage(message))
            }
        })
        .finally(() => {
            dispatch(setIsFetchingValue(false))
        })
}

export const logout = (): AppThunk => dispatch => {
    authMeAPI.logout()
        .then(data => {
            if (data.resultCode === RESPONSE_RESULT_CODES.success) {
                dispatch(setAuthUserData({id: null, email: null, login: null}, false))
            }
        })
}
export const getCaptcha = ():AppThunk => dispatch=> {
    dispatch(setIsFetchingValue(true));
    securityAPI.getCaptchaURL()
        .then(data=>{
            dispatch(setCaptchaURL(data.url))
        })
        .catch()
        .finally(()=>{
            dispatch(setIsFetchingValue(false));
        })
}