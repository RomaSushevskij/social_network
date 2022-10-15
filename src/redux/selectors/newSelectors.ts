import {AppStateType} from "../redux-store";

export const selectNewsSearchValue = (state: AppStateType) => state.news.params.q;