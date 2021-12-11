import React from "react";
import styleModule from './ProfileInfo.module.css';
import top_wallpaper from "../../../top-wallpaper.jpg";
import logo_avatar from '../../../usersAvatars/user.png';

export function ProfileInfo (props: any) {


    return (
        <div className={styleModule.profileInfo}>
            <div className={styleModule.top_wallpaper}>
                <img src={top_wallpaper} alt="top_wallpaper"/>
            </div>
            <div className={styleModule.avatar}>
                <div className={styleModule.image}>
                    <img src={logo_avatar}/>
                </div>

            </div>
            <div className={styleModule.description}>

            </div>
        </div>
    )
};

