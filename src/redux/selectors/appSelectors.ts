import {AppStateType} from '../redux-store';

export const getInitializedSelector = (state: AppStateType): boolean => {
    return state.app.initialized
}
export const getAppError= (state: AppStateType): string => {
    return state.app.appError
}
export const getAppMessage= (state: AppStateType): string => {
    return state.app.appMessage
}