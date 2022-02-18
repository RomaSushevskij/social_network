export enum USERS_ACTIONS_TYPES {
    FOLLOW = 'social/users/FOLLOW',
    UNFOLLOW = 'social/users/UNFOLLOW',
    SET_USERS = 'social/users/SET_USERS',
    SET_CURRENT_PAGE = 'social/users/SET_CURRENT_PAGE',
    SET_USERS_TOTAL_COUNT = 'social/users/SET_USERS_TOTAL_COUNT',
    SET_IS_FETCHING_VALUE = 'social/users/SET_IS_FETCHING_VALUE',

}


export type UserPhotoType = {
    small: null | string
    large: null | string
}

export type UserType = {
    /**
     * User name
     */
    name: string
    id: number
    uniqueUrlName: string | null
    /**
     * User photos
     */
    photos: UserPhotoType
    /**
     * User status
     */
    status: null | string,
    /**
     * Value that indicates if you are following this user
     */
    followed: boolean
}

export type InitialStateUsersType = typeof initialState

const initialState = {
    users: [] as UserType[],
    usersTotalCount: 0,
    pageSize: 12,
    currentPage: 1,
    isFetching: false
}


export const usersReducer = (state: InitialStateUsersType = initialState, action: ActionType): InitialStateUsersType => {
    switch (action.type) {
        case USERS_ACTIONS_TYPES.SET_USERS:
            return {
                ...state, users: action.payload.users
            }
        case USERS_ACTIONS_TYPES.FOLLOW:
            return {
                ...state,
                users: state.users.map(user => user.id === action.payload.userID ? {...user, followed: true} : user)
            }
        case USERS_ACTIONS_TYPES.UNFOLLOW:
            return {
                ...state,
                users: state.users.map(user => user.id === action.payload.userID ? {...user, followed: false} : user)
            }
        case USERS_ACTIONS_TYPES.SET_CURRENT_PAGE:
        case USERS_ACTIONS_TYPES.SET_USERS_TOTAL_COUNT:
        case USERS_ACTIONS_TYPES.SET_IS_FETCHING_VALUE:
            return {
                ...state, ...action.payload
            }
        default:
            return state
    }
}

export type ActionType =
    ReturnType<typeof becomeFollower> |
    ReturnType<typeof stopBeingFollower> |
    ReturnType<typeof setUsers> |
    ReturnType<typeof setCurrentPage> |
    ReturnType<typeof setUsersTotalCount> |
    ReturnType<typeof setIsFetchingValue>


export const becomeFollower = (userID: number) => ({type: USERS_ACTIONS_TYPES.FOLLOW, payload: {userID}} as const)
export const stopBeingFollower = (userID: number) => ({type: USERS_ACTIONS_TYPES.UNFOLLOW, payload: {userID}} as const)
export const setUsers = (users: UserType[]) => ({type: USERS_ACTIONS_TYPES.SET_USERS, payload: {users}} as const)
export const setCurrentPage = (currentPage: number) => ({
    type: USERS_ACTIONS_TYPES.SET_CURRENT_PAGE,
    payload: {currentPage}
} as const)
export const setUsersTotalCount = (usersTotalCount: number) => ({
    type: USERS_ACTIONS_TYPES.SET_USERS_TOTAL_COUNT,
    payload: {usersTotalCount}
} as const)
export const setIsFetchingValue = (isFetching: boolean) => ({
    type: USERS_ACTIONS_TYPES.SET_IS_FETCHING_VALUE, payload: {isFetching}
} as const)