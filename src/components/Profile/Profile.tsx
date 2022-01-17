import React from "react";
import styleModule from './Profile.module.css';
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import {MyPosts} from './MyPosts/MyPosts';
import {ActionsTypes, ProfilePageType} from "../../redux/store";

type ProfilePropsType = {
    profilePage: ProfilePageType
    dispatch: (action: ActionsTypes) => void
}

export function Profile(props: ProfilePropsType) {
    return (
        <div className={styleModule.content}>
            <ProfileInfo/>
            <MyPosts postsData={props.profilePage.postsData}
                     newPostText={props.profilePage.newPostText}
                     dispatch={props.dispatch}
            />
        </div>
    );
}


