import React from "react";
import styleModule from './Posts.module.css'
import ava_post from '../../../../usersAvatars/user.png'
import {PostType} from "../../../../redux/state";

type PostPropsType = PostType;

export function Post({message, likeCount, image, ...props} : PostPropsType) {
    return (
        <div className={styleModule.item}>
            <img src={image ? image : ava_post} alt="ava_post"/>
            {message}
            <div>
                <span>❤</span> {likeCount}
            </div>
        </div>

    );
};

