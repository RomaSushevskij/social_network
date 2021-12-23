import React from "react";
import styleModule from './Profile.module.css';
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import {MyPosts} from './MyPosts/MyPosts';
import {ProfilePageType} from "../../redux/state";

type ProfilePropsType = {
    profilePage: ProfilePageType
    addNewPost: () => void
    updateNewPostText: (newPostText: string) => void
}

export function Profile(props: ProfilePropsType) {
    return (
        <div className={styleModule.content}>
            <ProfileInfo/>
            <MyPosts postsData={props.profilePage.postsData}
                     addNewPost={props.addNewPost}
                     newPostText={props.profilePage.newPostText}
                     updateNewPostText={props.updateNewPostText}
            />
        </div>
    );
}


