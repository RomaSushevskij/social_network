import {ProfileActionType, profileReducer} from "./redusers/profileReducer/profileReducer";
import {DialogsActionType, dialogsReducer} from "./redusers/dialogsReducer/dialogsReducer";
import {UsersActionType, usersReducer} from "./redusers/usersReducer/usersReducer";
import {AuthActionType, authReducer} from "./redusers/auth/authReducer";
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunkMiddleware, {ThunkAction} from 'redux-thunk';
import {AppActionType, appReducer} from './redusers/app/appReducer';

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

export const rootReducer = combineReducers({
        profilePage: profileReducer,
        dialogsPage: dialogsReducer,
        usersPage: usersReducer,
        auth: authReducer,
        app: appReducer
    }
);
export type AppStateType = ReturnType<typeof rootReducer>
export type AppActionsType =
    UsersActionType |
    ProfileActionType |
    DialogsActionType |
    AuthActionType |
    AppActionType

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));

export type GetStateType = typeof store.getState
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    AppStateType,
    unknown,
    AppActionsType>

// @ts-ignore
window.store = store