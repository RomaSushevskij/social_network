import {AppStateType} from '../redux-store';

export const getInitializedSelector = (state: AppStateType): boolean => {
    return state.app.initialized
}