import {profileReducer} from "./redusers/profileReducer/profileReducer";
import {dialogsReducer} from "./redusers/dialogsReducer/dialogsReducer";
import {combineReducers, createStore} from "redux";
import {usersReducer} from "./redusers/usersReducer/usersReducer";
import {authReducer} from "./redusers/auth/authReducer";

export const rootReducer = combineReducers({
        profilePage: profileReducer,
        dialogsPage: dialogsReducer,
        usersPage: usersReducer,
        auth: authReducer,
    }
);
type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>

export const store = createStore(rootReducer);

// @ts-ignore
window.store = store