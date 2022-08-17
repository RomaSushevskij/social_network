import {
    profileAPI,
    RESPONSE_RESULT_CODES,
    UploadContactsModelType,
    UploadProfileModelType,
    usersAPI
} from "../../../api/api";
import {AppThunk} from "../../redux-store";
import {setIsFetchingValue, UserType} from '../usersReducer/usersReducer';
import {getAuthorizationInfo, setFullNameAndAvatar} from '../auth/authReducer';
import {PATH} from '../../../App';
import {setAppError, setAppMessage} from '../app/appReducer';
import {MESSAGES_FOR_SUCCESS_BAR} from '../../../components/generic/SnackBar/SnackBar';
import {AxiosError} from "axios";

export enum PROFILE_ACTIONS_TYPES {
    ADD_POST = 'social/profile/ADD-POST',
    REMOVE_POST = "social/profile/REMOVE_POST",
    LIKE_POST = 'social/profile/LIKE_POST',
    SET_PROFILE = 'social/profile/SET_PROFILE',
    SET_STATUS = 'social/profile/SET_STATUS',
    SET_FOLLOWERS = 'social/profile/SET_FOLLOWERS',
    DELETE_FOLLOWER = 'social/profile/DELETE_FOLLOWER',
    UPDATE_PHOTO_SUCCESS = 'social/profile/UPDATE_PHOTO_SUCCESS',
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
    contacts: ContactsType,
    lookingForAJob: boolean,
    lookingForAJobDescription: string | null,
    fullName: string,
    userId: number,
    photos: PhotosType,
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
    profile: {} as ProfileType,
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
        case PROFILE_ACTIONS_TYPES.UPDATE_PHOTO_SUCCESS:
            return {
                ...state, profile: {
                    ...state.profile, photos: {
                        ...state.profile.photos, large: action.payload.newPhoto
                    }
                }
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
    ReturnType<typeof deleteFollower> |
    ReturnType<typeof updatePhotoSuccess>

// A C T I O N S   C R E A T O R S
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
export const updatePhotoSuccess = (newPhoto: string | null) => ({
    type: PROFILE_ACTIONS_TYPES.UPDATE_PHOTO_SUCCESS, payload: {newPhoto}
} as const);

// T H U N K S
export const getProfile = (userId: number): AppThunk => async dispatch => {
    try {
        const data = await profileAPI.getProfile(userId);
        dispatch(setProfile(data));
    } catch (e) {
        const error = e as AxiosError;
        dispatch(setAppError(error.message));
    }
};

export const getStatus = (userId: number): AppThunk => async dispatch => {
    try {
        const data = await profileAPI.getStatus(userId);
        dispatch(setStatus(data))
    } catch (e) {
        const error = e as AxiosError;
        dispatch(setAppError(error.message));
    }
};

export const updateStatus = (status: string): AppThunk => async dispatch => {
    try {
        const data = await profileAPI.updateStatus(status);
        if (data.resultCode === RESPONSE_RESULT_CODES.success) {
            dispatch(setStatus(status))
            dispatch(setAppMessage(MESSAGES_FOR_SUCCESS_BAR.STATUS_CHANGED_SUCCESSFULLY))
        } else {
            data.messages.length && dispatch(setAppError(data.messages[0]))
        }
    } catch (e) {
        const error = e as AxiosError;
        dispatch(setAppError(error.message));
    }
};

export const getFollowers = (): AppThunk => async dispatch => {
    try {
        const data = await usersAPI.getUsers(100, 1);
        const currentPage = Math.ceil(data.totalCount / 100);
        const followers = await usersAPI.getUsers(100, currentPage);
        dispatch(setFollowers(followers.items));
    } catch (e) {
        const error = e as AxiosError;
        dispatch(setAppError(error.message));
    }
};

export const updatePhoto = (photoFile: any): AppThunk => async (dispatch, getState) => {
    try {
        const fullName = getState().profilePage.profile.fullName;
        dispatch(setIsFetchingValue(true));
        const data = await profileAPI.updatePhoto(photoFile);
        if (data.resultCode === RESPONSE_RESULT_CODES.success) {
            const newAvatar = data.data.photos.large;
            dispatch(updatePhotoSuccess(data.data.photos.large))
            dispatch(setFullNameAndAvatar(fullName, newAvatar))
            dispatch(setAppMessage(MESSAGES_FOR_SUCCESS_BAR.YOUR_PHOTO_UPDATED_SUCCESSFULLY))
        } else {
            data.messages.length && dispatch(setAppError(data.messages[0]))
        }
    } catch (e) {
        const error = e as AxiosError;
        dispatch(setAppError(error.message));
    } finally {
        dispatch(setIsFetchingValue(false));
    }
};

export const updateProfile = (profileModel: UploadProfileModelType, navigate: Function): AppThunk => async (dispatch, getState) => {
    try {
        const userId = getState().profilePage.profile.userId;
        const contacts = getState().profilePage.profile.contacts;
        const profileCommonModelType = {...profileModel, contacts: contacts}
        dispatch(setIsFetchingValue(true));
        const data = await profileAPI.uploadProfile(profileCommonModelType);
        if (data.resultCode === RESPONSE_RESULT_CODES.success) {
            dispatch(getProfile(userId))
        } else {
            data.messages.length && dispatch(setAppError(data.messages[0]))
        }
        navigate(PATH.PROFILE);
        dispatch(getAuthorizationInfo());
        dispatch(setAppMessage(MESSAGES_FOR_SUCCESS_BAR.PROFILE_UPDATED_SUCCESSFULLY));
    } catch (e) {
        const error = e as AxiosError;
        dispatch(setAppError(error.message));
    } finally {
        dispatch(setIsFetchingValue(false));
    }

    // const userId = getState().profilePage.profile.userId;
    // const contacts = getState().profilePage.profile.contacts;
    // const profileCommonModelType = {...profileModel, contacts: contacts}
    // dispatch(setIsFetchingValue(true));
    // profileAPI.uploadProfile(profileCommonModelType)
    //     .then(data => {
    //         if (data.resultCode === RESPONSE_RESULT_CODES.success) {
    //             dispatch(getProfile(userId))
    //
    //         } else {
    //             data.messages.length && dispatch(setAppError(data.messages[0]))
    //         }
    //     })
    //     .then(() => {
    //         navigate(PATH.PROFILE)
    //         dispatch(getAuthorizationInfo())
    //         dispatch(setAppMessage(MESSAGES_FOR_SUCCESS_BAR.PROFILE_UPDATED_SUCCESSFULLY))
    //     })
    //     .catch(error => {
    //         dispatch(setAppError(error.message))
    //     })
    //     .finally(() => {
    //         dispatch(setIsFetchingValue(false));
    //     })
};

export const updateContacts = (contactsModel: UploadContactsModelType, navigate: Function): AppThunk => (dispatch, getState) => {
    const {fullName, userId, aboutMe, lookingForAJob, lookingForAJobDescription} = getState().profilePage.profile;
    const profileCommonModelType = {
        fullName,
        userId,
        aboutMe,
        lookingForAJob,
        lookingForAJobDescription,
        contacts: contactsModel
    }
    dispatch(setIsFetchingValue(true));
    profileAPI.uploadProfile(profileCommonModelType)
        .then(data => {
            if (data.resultCode === RESPONSE_RESULT_CODES.success) {
                dispatch(getProfile(userId))
            } else {
                data.messages.length && dispatch(setAppError(data.messages[0]))
            }
        })
        .then(() => {
            navigate(PATH.PROFILE)
            dispatch(setAppMessage(MESSAGES_FOR_SUCCESS_BAR.CONTACTS_UPDATED_SUCCESSFULLY))
        })
        .catch(error => {
            dispatch(setAppError(error.message))
        })
        .finally(() => {
            dispatch(setIsFetchingValue(false));
        })
};



