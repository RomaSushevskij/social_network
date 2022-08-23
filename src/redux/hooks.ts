import {AppStateType} from "./redux-store";
import {TypedUseSelectorHook, useSelector} from "react-redux";

export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector;