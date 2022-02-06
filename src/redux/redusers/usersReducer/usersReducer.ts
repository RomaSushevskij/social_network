const FOLLOW = 'social/users/FOLLOW';
const UNFOLLOW = 'social/users/UNFOLLOW';
const SET_USERS = 'social/users/SET_USERS';

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

export type InitialStateType = typeof initialState

const initialState = {
    users: [] as UserType[]
}


export const usersReducer = (state: InitialStateType = initialState, action: ActionType):InitialStateType => {
    switch (action.type) {
        case "social/users/SET_USERS":
            return {
                ...state, users: action.payload.users
            }
        case "social/users/FOLLOW":
            return {
                ...state,
                users: state.users.map(user => user.id === action.payload.userID ? {...user, followed: true} : user)
            }
        case "social/users/UNFOLLOW":
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


export const followAC = (userID: number) => ({type: 'social/users/FOLLOW', payload: {userID}} as const)
export const unfollowAC = (userID: number) => ({type: 'social/users/UNFOLLOW', payload: {userID}} as const)
export const setUsersAC = (users: UserType[]) => ({type: 'social/users/SET_USERS', payload: {users}} as const)