import React from "react";
import {AppStateType} from "../../../redux/redux-store";
import {
    addPost,
    likePost,
    PostType,
    removePost,
    updateNewPostText
} from "../../../redux/redusers/profileReducer/profileReducer";
import {MyPosts} from "./MyPosts";
import {connect} from "react-redux";


export type MapStateToPropsType = {
    postsData: PostType[]
    newPostText: string
}

export type MapDispatchToPropsType = {
    addPost: (newPostText: string) => void
    updateNewPostText: (newPostText: string) => void
    removePost: (id: number) => void
    likePost: (id: number) => void
}

export type MyPostsPropsType =
    MapStateToPropsType &
    MapDispatchToPropsType &
    {params: {['*']:string}}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        postsData: state.profilePage.postsData,
        newPostText: state.profilePage.newPostText,

    }
}
export const MyPostsContainer = connect(mapStateToProps, {
    addPost,
    updateNewPostText,
    removePost,
    likePost,
} as MapDispatchToPropsType)(MyPosts);
