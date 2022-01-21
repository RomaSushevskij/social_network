import {addPostAC, profileReducer, removePostAC, updateNewPostTextAC} from "./redusers/profileReducer";
import {addMessageAC, dialogsReducer, updateNewMessageTextAC} from "./redusers/dialogsReducer";
import {combineReducers, createStore} from "redux";


export type ActionsTypes =
    ReturnType<typeof addPostAC> |
    ReturnType<typeof updateNewPostTextAC> |
    ReturnType<typeof addMessageAC> |
    ReturnType<typeof updateNewMessageTextAC> |
    ReturnType<typeof removePostAC>


export const rootReducer = combineReducers({
        profilePage: profileReducer,
        dialogsPage: dialogsReducer
    }
);
type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>

export const store = createStore(rootReducer);
export type StoreType = typeof store;

