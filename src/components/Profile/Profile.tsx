import React from "react";
import styleModule from './Profile.module.css';
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {ProfileAPIContainerPropsType} from "./ProfileContainer";
import {SideBar} from '../Sidebar/Sidebar';

type ProfilePropsType = ProfileAPIContainerPropsType

export const Profile = React.memo((props: ProfilePropsType) => {
    return (
        <div className={styleModule.content}>
            <ProfileInfo {...props}/>
            <div className={styleModule.postsAndSidebar}>
                <MyPostsContainer params={props.params}/>
                <SideBar/>
            </div>
        </div>
    );
})


