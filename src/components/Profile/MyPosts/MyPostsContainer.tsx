import React from "react";
import {AppStateType} from "../../../redux/redux-store";
import {addPost, likePost, PostType, removePost} from "../../../redux/redusers/profileReducer/profileReducer";
import {MyPosts} from "./MyPosts";
import {connect} from "react-redux";
import {getPostsDataSelector} from '../../../redux/selectors/profileSelectors';


export type MapStateToPropsType = {
    postsData: PostType[]
}

export type MapDispatchToPropsType = {
    addPost: (newPostText: string) => void
    removePost: (id: number) => void
    likePost: (id: number) => void
}

export type MyPostsPropsType =
    MapStateToPropsType &
    MapDispatchToPropsType &
    { params: { ['*']: string } }

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        postsData: getPostsDataSelector(state)
    }
}
export const MyPostsContainer = connect(mapStateToProps, {
    addPost,
    removePost,
    likePost,
} as MapDispatchToPropsType)(MyPosts);
