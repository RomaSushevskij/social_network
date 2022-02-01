const FOLLOW = 'social/users/FOLLOW';
const UNFOLLOW = 'social/users/UNFOLLOW';
const SET_USERS = 'social/users/SET_USERS';

export type UserPhotoType = {
    small: null | string
    large: null | string
}

export type UserType = {
    name: string
    id: number
    photos: UserPhotoType
    status: null | string,
    followed: boolean
}

export type InitialStateType = typeof initialState

const initialState = {
    users: [] as UserType[]
}


export const usersReducer = (state: InitialStateType = initialState, action: ActionType) => {
    switch (action.type) {
        case SET_USERS:
            return {
                ...state, users: action.payload.users
            }
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(user => user.id === action.payload.userID ? {...user, followed: true} : user)
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(user => user.id === action.payload.userID ? {...user, followed: false} : user)
            }
        default:
            return state
    }
}

export type ActionType =
    ReturnType<typeof followAC> |
    ReturnType<typeof unfollowAC> |
    ReturnType<typeof setUsersAC>


export const followAC = (userID: number) => ({type: FOLLOW, payload: {userID}} as const)
export const unfollowAC = (userID: number) => ({type: UNFOLLOW, payload: {userID}} as const)
export const setUsersAC = (users: UserType[]) => ({type: SET_USERS, payload: {users}} as const)