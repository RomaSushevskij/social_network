import React from "react";
import styleModule from './Profile.module.css';
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import {ProfilePageType} from "../../redux/redusers/profileReducer";
import {ActionsTypes} from "../../redux/redux-store";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";

type ProfilePropsType = {
    profilePage: ProfilePageType
    dispatch: (action: ActionsTypes) => void
}

export function Profile(props: ProfilePropsType) {
    return (
        <div className={styleModule.content}>
            <ProfileInfo/>
            <MyPostsContainer postsData={props.profilePage.postsData}
                              newPostText={props.profilePage.newPostText}
                              dispatch={props.dispatch}
            />
        </div>
    );
}


