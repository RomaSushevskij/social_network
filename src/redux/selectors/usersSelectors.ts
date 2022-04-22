import {AppStateType} from "../redux-store";
import {UserType} from '../redusers/usersReducer/usersReducer';
import {createSelector} from 'reselect';

export const getUsersSelector = (state: AppStateType): UserType[] => {
    return state.usersPage.users
}
export const getUsersDiffSelector = createSelector(getUsersSelector, (users:UserType[])=>{
    return users.filter(user=> user.followed)
})
export const getUsersTotalCountSelector = (state: AppStateType): number => {
    return state.usersPage.usersTotalCount
}
export const getPageSizeSelector = (state: AppStateType): number => {
    return state.usersPage.pageSize
}
export const getCurrentPageSelector = (state: AppStateType): number => {
    return state.usersPage.currentPage
}
export const getIsFetchingSelector = (state: AppStateType): boolean => {
    return state.usersPage.isFetching
}
export const getFollowingInProcessUsersIdSelector = (state: AppStateType): number[] => {
    return state.usersPage.followingInProcessUsersId
}