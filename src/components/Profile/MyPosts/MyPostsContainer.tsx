import React, {KeyboardEvent} from "react";
import {ActionsTypes} from "../../../redux/redux-store";
import {PostsDataType, addPostAC, removePostAC, updateNewPostTextAC} from "../../../redux/redusers/profileReducer";
import {MyPosts} from "./MyPosts";

type MyPostsContainerPropsType = {
    postsData: PostsDataType
    newPostText: string
    dispatch: (action: ActionsTypes) => void
}

export function MyPostsContainer(props: MyPostsContainerPropsType) {

    const addPost = () => {
        props.newPostText.trim() && props.dispatch(addPostAC());
    };
    const addPostWithEnter = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (!e.shiftKey && e.key === 'Enter') {
            e.preventDefault();
            addPost()
        }
    };
    const updatePostText = (newPostText: string) => {
        props.dispatch(updateNewPostTextAC(newPostText));
    };
    const removePost = (id: number) => {
        props.dispatch(removePostAC(id))
    };

    return (
        <MyPosts postsData={props.postsData}
                 newPostText={props.newPostText}
                 addPost={addPost}
                 addPostWithEnter={addPostWithEnter}
                 updatePostText={updatePostText}
                 removePost={removePost}/>

    )
        ;
};
