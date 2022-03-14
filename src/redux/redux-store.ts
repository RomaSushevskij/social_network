import {ProfileActionType, profileReducer} from "./redusers/profileReducer/profileReducer";
import {DialogsActionType, dialogsReducer} from "./redusers/dialogsReducer/dialogsReducer";
import {UsersActionType, usersReducer} from "./redusers/usersReducer/usersReducer";
import {AuthActionType, authReducer} from "./redusers/auth/authReducer";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from 'redux-thunk';
import {ThunkAction} from 'redux-thunk';

export const rootReducer = combineReducers({
        profilePage: profileReducer,
        dialogsPage: dialogsReducer,
        usersPage: usersReducer,
        auth: authReducer,
    }
);
export type AppStateType = ReturnType<typeof rootReducer>
export type AppActionsType =
    UsersActionType |
    ProfileActionType |
    DialogsActionType|
    AuthActionType

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
export type GetStateType = typeof store.getState
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppStateType,
    unknown,
    AppActionsType
    >

// @ts-ignore
window.store = store