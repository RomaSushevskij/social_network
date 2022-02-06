import {profileReducer} from "./redusers/profileReducer/profileReducer";
import {dialogsReducer} from "./redusers/dialogsReducer/dialogsReducer";
import {combineReducers, createStore} from "redux";
import {usersReducer} from "./redusers/usersReducer/usersReducer";

export const rootReducer = combineReducers({
        profilePage: profileReducer,
        dialogsPage: dialogsReducer,
        usersPage: usersReducer
    }
);
type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>

export const store = createStore(rootReducer);

