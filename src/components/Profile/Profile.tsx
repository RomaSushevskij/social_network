import React from "react";
import styleModule from './Profile.module.css';
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {ProfileAPIContainerPropsType} from "./ProfileContainer";

type ProfilePropsType = ProfileAPIContainerPropsType

export const Profile = React.memo((props:ProfilePropsType) => {
    return (
        <div className={styleModule.content}>
            <ProfileInfo {...props}/>
            <MyPostsContainer/>
        </div>
    );
})


