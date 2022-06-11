import {AppStateType} from "../redux-store";
export const getAuthUserIDSelector = (state: AppStateType):null | number => {
    return state.auth.id
}
export const getIsAuthSelector = (state: AppStateType):boolean => {
    return state.auth.isAuth
}
export const getEmailSelector = (state: AppStateType):null | string => {
    return state.auth.email
}
export const getLoginSelector = (state: AppStateType):null | string => {
    return state.auth.login
}
export const getAvatarSelector = (state: AppStateType):null | string => {
    return state.auth.avatar
}
export const getFullNameSelector = (state: AppStateType):null | string => {
    return state.auth.fullName
}
export const getErrorMessage = (state: AppStateType):string => {
    return state.auth.errorMessage
}
export const getCaptchaURL = (state: AppStateType):string => {
    return state.auth.captchaURL
}