import React from "react";
import styleModule from './Post.module.css'
import ava_post from '../../../../usersAvatars/user.png'
import {PostType} from "../../../../redux/store";
import styled from "styled-components";

type PostPropsType = PostType;

export function Post({
                         name,
                         message,
                         likeCount,
                         image,
                         background,
                         color,
                         ...props
                     }: PostPropsType) {
    const PostWrapper = styled.div`
     & {
        background: ${background ? background : '#FF6347'};
        color:  ${color ? color : '#ffffff'};
    }
    `;

    return (
        <PostWrapper className={styleModule.postWrapper}>
            <div className={styleModule.avaBlock}>
                <img src={image ? image : ava_post} alt="ava_post"/>
                <span>{name}</span>
            </div>
            <div className={styleModule.messageBlock}>
                {message}
            </div>
            <div className={styleModule.likesBlock}>
                <span>❤</span> {likeCount}
            </div>
        </PostWrapper>

    );
};

