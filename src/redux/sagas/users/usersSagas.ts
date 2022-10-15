import {
    SearchUsersFilterType,
    setCurrentPage,
    setIsFetchingValue,
    setSearchFilter,
    setUsers,
    setUsersTotalCount
} from "../../redusers/usersReducer/usersReducer";
import {call, put, takeEvery} from "redux-saga/effects";
import {GetUsersDataType, usersAPI} from "../../../api/api";
import {AxiosError} from "axios";
import {setAppError} from "../../redusers/app/appReducer";

export enum usersActions {
    GET_USERS = 'users/GET_USERS',
    REPEAT_GET_USERS = 'users/REPEAT_GET_USERS',
    BECOME_FOLLOWER = 'users/BECOME_FOLLOWER',
    STOP_BEING_FOLLOWER = 'users/STOP_BEING_FOLLOWER',
}

export function* getUsersWorkerSaga(action: ReturnType<typeof getUsers>) {
    const {pageSize, currentPage, searchFilter} = action.payload;
    try {
        yield put(setIsFetchingValue(true));
        const data: GetUsersDataType = yield call(usersAPI.getUsers, pageSize, currentPage, searchFilter);
        if (searchFilter) yield put(setSearchFilter(searchFilter));
        yield put(setCurrentPage(currentPage));
        yield put(setUsers(data.items));
        yield put(setUsersTotalCount(data.totalCount));
    } catch (e) {
        const error = e as AxiosError;
        yield put(setAppError(error.message))
    } finally {
        yield put(setIsFetchingValue(false))
    }
}

export function* repeatGetUsersWorkerSaga(action: ReturnType<typeof repeatGetUsers>) {

}

export function* becomeFollowerWorkerSaga(action: ReturnType<typeof becomeFollower>) {

}

export function* stopBeingFollowerWorkerSaga(action: ReturnType<typeof stopBeingFollower>) {

}

export const getUsers = (pageSize: number, currentPage: number, searchFilter?: SearchUsersFilterType) => ({
    type: usersActions.GET_USERS,
    payload: {pageSize, currentPage, searchFilter}
} as const);
export const repeatGetUsers = (pageSize: number, currentPage: number, searchFilter?: SearchUsersFilterType) => ({
    type: usersActions.REPEAT_GET_USERS,
    payload: {pageSize, currentPage, searchFilter}
} as const);
export const becomeFollower = (id: number) => ({
    type: usersActions.BECOME_FOLLOWER,
    payload: {id}
} as const);
export const stopBeingFollower = (id: number) => ({
    type: usersActions.STOP_BEING_FOLLOWER,
    payload: {id}
} as const);

export function* usersWatcherSaga() {
    yield takeEvery(usersActions.GET_USERS, getUsersWorkerSaga)
    yield takeEvery(usersActions.REPEAT_GET_USERS, repeatGetUsersWorkerSaga)
    yield takeEvery(usersActions.BECOME_FOLLOWER, becomeFollowerWorkerSaga)
    yield takeEvery(usersActions.STOP_BEING_FOLLOWER, stopBeingFollowerWorkerSaga)
}