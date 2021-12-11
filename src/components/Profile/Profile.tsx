import React from "react";
import styleModule from './Profile.module.css';
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import {MyPosts} from './MyPosts/MyPosts';


export function Profile(props: any) {
    return (
        <div className={styleModule.content}>
            <ProfileInfo/>
            <MyPosts/>
        </div>
    );
}


