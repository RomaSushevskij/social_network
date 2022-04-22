import {AppStateType} from "../redux-store";
import {PostType, ProfileType} from '../redusers/profileReducer/profileReducer';

export const getProfileSelector = (state: AppStateType): ProfileType | null => {
    return state.profilePage.profile
}
export const getPostsDataSelector = (state: AppStateType): Array<PostType> => {
    return state.profilePage.postsData
}
export const getStatusSelector = (state: AppStateType): string => {
    return state.profilePage.status
}
