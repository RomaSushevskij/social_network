import {AUTH_ME_RESULT_CODES, authMeAPI, AuthUserDataType, profileAPI} from "../../../api/api";
import {AppActionsType, AppThunk, GetStateType} from "../../redux-store";
import {Dispatch} from "redux";


export enum AUTH_ACTIONS_TYPES {
    SET_AUTH_USER_DATA = 'social/auth/SET_AUTH_USER_DATA',
    SET_FULL_NAME_AND_AVATAR = 'social/auth/SET_FULL_NAME_AND_AVATAR',
}

export type InitialStateAuthType = typeof initialState

const initialState = {
    id: null as null | number,
    email: null as null | string,
    login: null as null | string,
    isAuth: false,
    fullName: null as null | string,
    avatar: null as null | string
}

export const authReducer = (state: InitialStateAuthType = initialState, action: AuthActionType) => {
    switch (action.type) {
        case AUTH_ACTIONS_TYPES.SET_AUTH_USER_DATA:
        case AUTH_ACTIONS_TYPES.SET_FULL_NAME_AND_AVATAR:
            return {
                ...state, isAuth: true, ...action.payload
            }
        default:
            return state
    }
}

export type AuthActionType =
    ReturnType<typeof setAuthUserData> |
    ReturnType<typeof setFullNameAndAvatar>


export const setAuthUserData = ({id, email, login}: AuthUserDataType) => ({
    type: AUTH_ACTIONS_TYPES.SET_AUTH_USER_DATA,
    payload: {id, email, login}
})
export const setFullNameAndAvatar = (fullName: string, avatar: string | null) => ({
    type: AUTH_ACTIONS_TYPES.SET_FULL_NAME_AND_AVATAR,
    payload: {fullName, avatar}
})
export const getAuthorizationInfo = (): AppThunk => (dispatch, getState: GetStateType) => {
    authMeAPI.getAuthorizationInfo()
        .then(data => {
            if (data.resultCode === AUTH_ME_RESULT_CODES.success) {
                dispatch(setAuthUserData(data.data))
            }
        }).then(() => {
            const id = getState().auth.id
            id && profileAPI.getProfile(id)
                .then(data => {
                    const fullName = data.fullName
                    const avatar = data.photos.small
                    dispatch(setFullNameAndAvatar(fullName, avatar))
                })
        }
    )
}