import {AppThunk} from '../../redux-store';
import {getAuthorizationInfo} from '../auth/authReducer';
import {getFollowers} from '../profileReducer/profileReducer';

export enum APP_ACTIONS_TYPES {
    SET_APP_INITIALIZE_VALUE = 'social/app/SET_APP_INITIALIZE_VALUE'
}

export type InitialStateAppType = typeof initialState

export const initialState = {
    initialized: false
}


export const appReducer = (state: InitialStateAppType = initialState, action: AppActionType): InitialStateAppType => {
    switch (action.type) {
        case APP_ACTIONS_TYPES.SET_APP_INITIALIZE_VALUE:
            return {
                ...state, ...action.payload
            }
        default:
            return state
    }
}
export type AppActionType =
    | ReturnType<typeof setAppInitializeValue>

// A C T I O N S
export const setAppInitializeValue = (initialized: boolean) => ({
    type: APP_ACTIONS_TYPES.SET_APP_INITIALIZE_VALUE,
    payload: {initialized}
} as const)

//T H U N K S
export const initializeApp = (): AppThunk => dispatch => {
    const promise_1 = dispatch(getAuthorizationInfo())
    Promise.all([promise_1])
        .then(() => {
            dispatch(setAppInitializeValue(true))
        })
}