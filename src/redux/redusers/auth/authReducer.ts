import {AuthUserDataType} from "../../../api/api";


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

export const authReducer = (state: InitialStateAuthType = initialState, action: ActionType) => {
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

type ActionType =
    ReturnType<typeof setAuthUserData>|
    ReturnType<typeof setFullNameAndAvatar>


export const setAuthUserData = ({id, email, login}: AuthUserDataType) => ({
    type: AUTH_ACTIONS_TYPES.SET_AUTH_USER_DATA,
    payload: {id, email, login}
})
export const setFullNameAndAvatar = (fullName: string, avatar: string | null) => ({
    type: AUTH_ACTIONS_TYPES.SET_FULL_NAME_AND_AVATAR,
    payload: {fullName, avatar}
})