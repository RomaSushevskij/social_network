export enum PROFILE_ACTIONS_TYPES {
    ADD_POST = 'social/profile/ADD-POST',
    UPDATE_NEW_POST_TEXT = 'social/profile/UPDATE_NEW_POST_TEXT',
    REMOVE_POST = "social/profile/REMOVE_POST",
    LIKE_POST = 'social/profile/LIKE_POST',
    SET_PROFILE = 'social/users/SET_PROFILE',
}

export type PostType = {
    id: number
    name: string
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
    newPostText: '',
    profile: null as ProfileType | null,
};

export const profileReducer = (state: InitialStateProfileType = initialState, action: ActionType): InitialStateProfileType => {
    switch (action.type) {
        case PROFILE_ACTIONS_TYPES.ADD_POST:
            const newPost: PostType = {
                id: state.postsData.length + 1,
                name: 'Someone',
                message: state.newPostText,
                likes: {
                    icon: '❤',
                    likeCount: 0,
                },
                isLike: false,
                image: null
            };
            return {...state, postsData: [newPost, ...state.postsData], newPostText: ''}
        case PROFILE_ACTIONS_TYPES.UPDATE_NEW_POST_TEXT:
        case PROFILE_ACTIONS_TYPES.SET_PROFILE:
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
        default:
            return state
    }
};

export type ActionType =
    ReturnType<typeof addPost> |
    ReturnType<typeof updateNewPostText> |
    ReturnType<typeof removePost> |
    ReturnType<typeof likePost> |
    ReturnType<typeof setProfile>



export const addPost = () => ({type: PROFILE_ACTIONS_TYPES.ADD_POST} as const);
export const updateNewPostText = (newPostText: string) => ({
    type: PROFILE_ACTIONS_TYPES.UPDATE_NEW_POST_TEXT,
    payload: {newPostText}
} as const);
export const removePost = (id: number) => ({type: PROFILE_ACTIONS_TYPES.REMOVE_POST, payload: {id}} as const);
export const likePost = (id: number) => ({type: PROFILE_ACTIONS_TYPES.LIKE_POST, payload: {id}} as const);
export const setProfile = (profile:ProfileType) => ({type: PROFILE_ACTIONS_TYPES.SET_PROFILE, payload: {profile}} as const);