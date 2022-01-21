import {ActionsTypes, PostType, ProfilePageType} from "../store";

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

export const profileReducer = (state: ProfilePageType, action: ActionsTypes):ProfilePageType => {
    switch (action.type) {
        case ADD_POST:
            const newPost: PostType = {
                id: state.postsData.length + 1,
                name: 'Someone',
                message: state.newPostText,
                likeCount: 0,
                image: null
            };
            state.postsData.push(newPost);
            state.newPostText = '';
            return state;
        case UPDATE_NEW_POST_TEXT:
            state.newPostText = action.newPostText;
            return state;
        default:
            return state
    }
};

export const addPostAC = () => ({type: ADD_POST} as const);
export const updateNewPostTextAC = (newPostText: string) => ({
    type: UPDATE_NEW_POST_TEXT,
    newPostText
} as const);