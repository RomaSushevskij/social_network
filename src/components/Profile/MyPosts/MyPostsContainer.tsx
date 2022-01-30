import React, {KeyboardEvent} from "react";
import {AppStateType} from "../../../redux/redux-store";
import {addPostAC, PostType, removePostAC, updateNewPostTextAC} from "../../../redux/redusers/profileReducer";
import {MyPosts} from "./MyPosts";
import {connect} from "react-redux";
import {Dispatch} from "redux";


export type MapStateToPropsType = {
    postsData: PostType[]
    newPostText: string
}

export type MapDispatchToPropsType = {
    addPost: (newPostText: string) => void
    addPostWithEnter: (e: KeyboardEvent<HTMLTextAreaElement>, newPostText: string) => void
    updateNewPostText: (newPostText: string) => void
    removePost: (id: number) => void
}

export type MyPostsPropsType = MapStateToPropsType & MapDispatchToPropsType

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        postsData: state.profilePage.postsData,
        newPostText: state.profilePage.newPostText
    }
}

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        addPost: (newPostText: string) => {
            newPostText.trim() && dispatch(addPostAC())
        },
        addPostWithEnter: (e: KeyboardEvent<HTMLTextAreaElement>, newPostText: string) => {
            if (!e.shiftKey && e.key === 'Enter') {
                e.preventDefault();
                newPostText.trim() && dispatch(addPostAC())
            }
        },
        updateNewPostText: (newPostText: string) => {
            dispatch(updateNewPostTextAC(newPostText));
        },
        removePost: (id: number) => {
            dispatch(removePostAC(id))
        }
    }
}

export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);
