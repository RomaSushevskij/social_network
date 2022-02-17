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
export type InitialStateType = typeof initialState


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
    newPostText: ''
};

export const profileReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "social/profile/ADD-POST":
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
        case "social/profile/UPDATE-NEW-POST-TEXT":
            return {...state, newPostText: action.payload.newPostText}
        case "social/profile/REMOVE-POST":
            return (
                {...state, postsData: state.postsData.filter(p => p.id !== action.payload.id)}
            );
        case "social/profile/LIKE_POST":
            return (
                {...state, postsData: state.postsData.
                    map(p => p.id === action.payload.id ?
                        {...p, isLike: !p.isLike, likes:
                                {...p.likes, likeCount: p.isLike ? p.likes.likeCount - 1 : p.likes.likeCount + 1}} : p) }
            )
        default:
            return state
    }
};

export type ActionType =
    ReturnType<typeof addPostAC> |
    ReturnType<typeof updateNewPostTextAC> |
    ReturnType<typeof removePostAC> |
    ReturnType<typeof likePostAC>

export const addPostAC = () => ({type: 'social/profile/ADD-POST'} as const);
export const updateNewPostTextAC = (newPostText: string) => ({
    type: 'social/profile/UPDATE-NEW-POST-TEXT',
    payload: {newPostText}
} as const);
export const removePostAC = (id: number) => ({type: 'social/profile/REMOVE-POST', payload: {id}} as const);
export const likePostAC = (id: number) => ({type: 'social/profile/LIKE_POST', payload: {id}} as const);