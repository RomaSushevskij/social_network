import {ProfileActionType, profileReducer} from "./redusers/profileReducer/profileReducer";
import {DialogsActionType, dialogsReducer} from "./redusers/dialogsReducer/dialogsReducer";
import {UsersActionType, usersReducer} from "./redusers/usersReducer/usersReducer";
import {AuthActionType, authReducer} from "./redusers/auth/authReducer";
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunkMiddleware, {ThunkAction} from 'redux-thunk';
import {AppActionType, appReducer} from './redusers/app/appReducer';
import {NewsActionType, newsReducer} from './redusers/news/newsReducer';
import {chatReducer} from "./redusers/chatReducer/chat-reducer";
import {ChatActionType} from "./redusers/chatReducer/types";
import createSagaMiddleware from 'redux-saga';
import {authWatcherSaga} from "./sagas/auth/authSagas";
import {all} from "redux-saga/effects";
import {profileWatcherSaga} from "./sagas/profile/profileSagas";
import {appWatcherSaga} from "./sagas/app/appSagas";
import {newsWatcherSaga} from "./sagas/news/newsSagas";
import {usersWatcherSaga} from "./sagas/users/usersSagas";


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
        app: appReducer,
        news: newsReducer,
        commonChat: chatReducer,
    }
);
export type AppStateType = ReturnType<typeof rootReducer>
export type AppActionsType =
    UsersActionType |
    ProfileActionType |
    DialogsActionType |
    AuthActionType |
    AppActionType |
    NewsActionType |
    ChatActionType

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware, sagaMiddleware)));

export function* rootWatcherSaga() {
    yield  all([authWatcherSaga(), profileWatcherSaga(), appWatcherSaga(), newsWatcherSaga(), usersWatcherSaga()])
}

sagaMiddleware.run(rootWatcherSaga);

export type GetStateType = typeof store.getState
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    AppStateType,
    unknown,
    AppActionsType>
export type NullableType<T> = null | T;


// @ts-ignore
window.store = store