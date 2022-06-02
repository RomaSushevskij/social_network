import React from "react";
import styleModule from './Profile.module.css';
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {ProfileAPIContainerPropsType} from "./ProfileContainer";
import {SideBar} from '../Sidebar/Sidebar';
import {useSelector} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';

type ProfilePropsType = ProfileAPIContainerPropsType

export const Profile = React.memo((props: ProfilePropsType) => {
    const followers = useSelector((state: AppStateType) => state.profilePage.followers);
    return (
        <div className={styleModule.content}>
            <ProfileInfo {...props}/>
            <div className={styleModule.postsAndSidebar}>
                <MyPostsContainer params={props.params}/>
                {!!followers.length && <SideBar/>}
            </div>
        </div>
    );
})


