import React from "react";
import styleModule from './Profile.module.css';
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import {InitialStateType} from "../../redux/redusers/profileReducer";
import {ActionsTypes} from "../../redux/redux-store";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";

type ProfilePropsType = {
    profilePage: InitialStateType
    dispatch: (action: ActionsTypes) => void
}

export function Profile(props: ProfilePropsType) {
    return (
        <div className={styleModule.content}>
            <ProfileInfo/>
            <MyPostsContainer/>
        </div>
    );
}


