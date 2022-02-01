import React from "react";
import styleModule from './Profile.module.css';
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";

export function Profile() {
    return (
        <div className={styleModule.content}>
            <ProfileInfo/>
            <MyPostsContainer/>
        </div>
    );
}


