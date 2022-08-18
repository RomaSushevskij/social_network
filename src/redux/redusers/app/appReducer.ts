import {AppThunk} from '../../redux-store';
import {getAuthorizationInfo} from '../auth/authReducer';
import {AxiosError} from "axios";

export enum APP_ACTIONS_TYPES {
    SET_APP_INITIALIZE_VALUE = 'social/app/SET_APP_INITIALIZE_VALUE',
    SET_APP_ERROR = 'social/app/SET_APP_ERROR',
    SET_APP_MESSAGE = 'social/app/SET_APP_MESSAGE',
}

export type InitialStateAppType = typeof initialState

export const initialState = {
    initialized: false,
    appError: '',
    appMessage: ''
}


export const appReducer = (state: InitialStateAppType = initialState, action: AppActionType): InitialStateAppType => {
    switch (action.type) {
        case APP_ACTIONS_TYPES.SET_APP_INITIALIZE_VALUE:
        case APP_ACTIONS_TYPES.SET_APP_ERROR:
        case APP_ACTIONS_TYPES.SET_APP_MESSAGE:
            return {
                ...state, ...action.payload
            }
        default:
            return state
    }
}
export type AppActionType =
    ReturnType<typeof setAppInitializeValue> |
    ReturnType<typeof setAppError> |
    ReturnType<typeof setAppMessage>

// A C T I O N S
export const setAppInitializeValue = (initialized: boolean) => ({
    type: APP_ACTIONS_TYPES.SET_APP_INITIALIZE_VALUE,
    payload: {initialized}
} as const)
export const setAppError = (appError: string,) => ({
    type: APP_ACTIONS_TYPES.SET_APP_ERROR,
    payload: {appError}
} as const)
export const setAppMessage = (appMessage: string,) => ({
    type: APP_ACTIONS_TYPES.SET_APP_MESSAGE,
    payload: {appMessage}
} as const)

// T H U N K S
export const initializeApp = (): AppThunk => async dispatch => {
    try {
        debugger
        const promise_1 = dispatch(getAuthorizationInfo());
        await Promise.all([promise_1]);
        dispatch(setAppInitializeValue(true));
    } catch (e) {
        const error = e as AxiosError;
        dispatch(setAppError(error.message));
    }
}