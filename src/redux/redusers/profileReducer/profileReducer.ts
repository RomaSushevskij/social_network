import {profileAPI, RESPONSE_RESULT_CODES, usersAPI} from "../../../api/api";
import {AppThunk} from "../../redux-store";
import {UserType} from '../usersReducer/usersReducer';

export enum PROFILE_ACTIONS_TYPES {
    ADD_POST = 'social/profile/ADD-POST',
    REMOVE_POST = "social/profile/REMOVE_POST",
    LIKE_POST = 'social/profile/LIKE_POST',
    SET_PROFILE = 'social/profile/SET_PROFILE',
    SET_STATUS = 'social/profile/SET_STATUS',
    SET_FOLLOWERS = 'social/profile/SET_FOLLOWERS',
    DELETE_FOLLOWER = 'social/profile/DELETE_FOLLOWER',
}

export type PostType = {
    id: number
    name: string | null
    message: string
    likes: {
        icon: string
        likeCount: number
    }
    isLike: boolean
    image: string | null
    background?: string
    color?: string
}

export type ContactsType = {
    facebook: string | null,
    website: string | null,
    vk: string | null,
    twitter: string | null,
    instagram: string | null,
    youtube: string | null,
    github: string | null,
    mainLink: string | null,
}
export type PhotosType = {
    small: string | null,
    large: string | null,
}

export type ProfileType = {
    aboutMe: string | null,
    contacts: ContactsType
    lookingForAJob: boolean,
    lookingForAJobDescription: string | null,
    fullName: string,
    userId: number,
    photos: PhotosType
}
export type InitialStateProfileType = typeof initialState


const initialState = {
    postsData: [
        {
            id: 1,
            name: 'Ruslan',
            message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti, eum.',
            likes: {
                icon: '❤',
                likeCount: 3,
            },
            isLike: false,
            image: 'https://sun9-15.userapi.com/impg/O_LNAi5kKsq4-ViNecim4rUQkihvDLuTnXfL2w/BSAIvsvBviM.jpg?size=863x1080&quality=96&sign=8c552a2a19907e2e040b0475efdb6b85&type=album'
        },
        {
            id: 2,
            name: 'Mariya',
            message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur cumque harum illo inventore maiores minus mollitia, quaerat quis rem voluptatibus.',
            likes: {
                icon: '❤',
                likeCount: 3,
            },
            isLike: false,
            image: null
        },
        {
            id: 3,
            name: 'Ivan',
            message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis est, et labore laborum nemo nisi.',
            likes: {
                icon: '❤',
                likeCount: 87,
            },
            isLike: true,
            image: 'https://sun9-53.userapi.com/impf/c623626/v623626744/19d9c/KBDd8fH-BOg.jpg?size=1280x960&quality=96&sign=03d1a85127b8411ce8b5b0b4118f78f6&type=album'
        }
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: "",
    followers: [] as UserType[]
};

export const profileReducer = (state: InitialStateProfileType = initialState, action: ProfileActionType): InitialStateProfileType => {
    switch (action.type) {
        case PROFILE_ACTIONS_TYPES.ADD_POST:
            const newPost = {
                id: state.postsData.length + 1,
                name: action.payload.fullName,
                message: action.payload.newPostText,
                likes: {
                    icon: '❤',
                    likeCount: 0,
                },
                isLike: false,
                image: action.payload.avatar
            };
            return {...state, postsData: [newPost, ...state.postsData]}
        case PROFILE_ACTIONS_TYPES.SET_PROFILE:
        case PROFILE_ACTIONS_TYPES.SET_STATUS:
            return {...state, ...action.payload}
        case PROFILE_ACTIONS_TYPES.REMOVE_POST:
            return (
                {...state, postsData: state.postsData.filter(p => p.id !== action.payload.id)}
            );
        case PROFILE_ACTIONS_TYPES.LIKE_POST:
            return (
                {
                    ...state, postsData: state.postsData.map(p => p.id === action.payload.id ?
                        {
                            ...p, isLike: !p.isLike, likes:
                                {...p.likes, likeCount: p.isLike ? p.likes.likeCount - 1 : p.likes.likeCount + 1}
                        } : p)
                }
            )
        case PROFILE_ACTIONS_TYPES.SET_FOLLOWERS:
            const followers = action.payload.followers.filter(user => user.followed)
            return {
                ...state, followers: followers
            }
        case PROFILE_ACTIONS_TYPES.DELETE_FOLLOWER:
            return {
                ...state, followers: state.followers.filter(f => f.id !== action.payload.followerId)
            }
        default:
            return state
    }
};

export type ProfileActionType =
    ReturnType<typeof addPost> |
    ReturnType<typeof removePost> |
    ReturnType<typeof likePost> |
    ReturnType<typeof setProfile> |
    ReturnType<typeof setStatus> |
    ReturnType<typeof setFollowers> |
    ReturnType<typeof deleteFollower>

//A C T I O N S   C R E A T O R S
export const addPost = (newPostText: string, fullName: string | null, avatar: string | null) => ({
    type: PROFILE_ACTIONS_TYPES.ADD_POST,
    payload: {newPostText, fullName, avatar}
} as const);
export const removePost = (id: number) => ({type: PROFILE_ACTIONS_TYPES.REMOVE_POST, payload: {id}} as const);
export const likePost = (id: number) => ({type: PROFILE_ACTIONS_TYPES.LIKE_POST, payload: {id}} as const);
export const setProfile = (profile: ProfileType) => ({
    type: PROFILE_ACTIONS_TYPES.SET_PROFILE,
    payload: {profile}
} as const);
export const setStatus = (status: string) => ({
    type: PROFILE_ACTIONS_TYPES.SET_STATUS,
    payload: {status}
} as const);
export const setFollowers = (followers: UserType[]) => ({
    type: PROFILE_ACTIONS_TYPES.SET_FOLLOWERS, payload: {followers}
} as const);
export const deleteFollower = (followerId: number) => ({
    type: PROFILE_ACTIONS_TYPES.DELETE_FOLLOWER, payload: {followerId}
} as const);

//T H U N K S
export const getProfile = (userId: number): AppThunk => (dispatch, getState) => {
    profileAPI.getProfile(userId)
        .then(data => {
            dispatch(setProfile(data))
        })
}
export const getStatus = (userId: number): AppThunk => dispatch => {
    profileAPI.getStatus(userId)
        .then(data => {
            dispatch(setStatus(data))
        })
}
export const updateStatus = (status: string): AppThunk => dispatch => {
    profileAPI.updateStatus(status)
        .then(response => {
            if (response.data.resultCode === RESPONSE_RESULT_CODES.success) {
                dispatch(setStatus(status))
            }
        })
}
export const getFollowers = (): AppThunk => (dispatch, getState) => {
    usersAPI.getUsers(100, 1)
        .then(data => {
            const currentPage = Math.ceil(data.totalCount / 100)
            return usersAPI.getUsers(100, currentPage)
        })
        .then(data => {
            dispatch(setFollowers(data.items))
        })
}


