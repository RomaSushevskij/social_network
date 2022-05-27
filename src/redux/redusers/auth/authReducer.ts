import {authMeAPI, AuthUserDataType, profileAPI, RESPONSE_RESULT_CODES} from "../../../api/api";
import {AppThunk, GetStateType} from "../../redux-store";


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
                ...state, ...action.payload
            }
        default:
            return state
    }
}

export type AuthActionType =
    ReturnType<typeof setAuthUserData> |
    ReturnType<typeof setFullNameAndAvatar>

// A C T I O N S

export const setAuthUserData = ({id, email, login}: AuthUserDataType, isAuth: boolean) => ({
    type: AUTH_ACTIONS_TYPES.SET_AUTH_USER_DATA,
    payload: {id, email, login, isAuth}
})
export const setFullNameAndAvatar = (fullName: string, avatar: string | null) => ({
    type: AUTH_ACTIONS_TYPES.SET_FULL_NAME_AND_AVATAR,
    payload: {fullName, avatar}
})

// T H U N K S

export const getAuthorizationInfo = (): AppThunk => (dispatch, getState: GetStateType) => {
    return authMeAPI.getAuthorizationInfo()
        .then(data => {
            if (data.resultCode === RESPONSE_RESULT_CODES.success) {
                dispatch(setAuthUserData(data.data, true))
            }
        })
        .then(() => {
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

export const login = (email: string, password: string, rememberMe: boolean, setStatus: (status?: any) => void): AppThunk => dispatch => {
    authMeAPI.login(email, password, rememberMe)
        .then(data => {
            if (data.resultCode === RESPONSE_RESULT_CODES.success) {
                dispatch(getAuthorizationInfo())
            } else {
                const message = data.messages.length > 0 ? data.messages[0] : 'Some error'
                setStatus(message)
            }

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