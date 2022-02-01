import {profileReducer} from "./redusers/profileReducer";
import {dialogsReducer} from "./redusers/dialogsReducer";
import {combineReducers, createStore} from "redux";
import {usersReducer} from "./redusers/usersReducer";

export const rootReducer = combineReducers({
        profilePage: profileReducer,
        dialogsPage: dialogsReducer,
        usersPage: usersReducer
    }
);
type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>

export const store = createStore(rootReducer);

