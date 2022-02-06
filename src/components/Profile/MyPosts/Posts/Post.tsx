import React from "react";
import styleModule from './Post.module.css'
import ava_post from '../../../../usersAvatars/user.png'
import {PostType} from "../../../../redux/redusers/profileReducer/profileReducer";
import styled from "styled-components";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


type PostPropsType = PostType & { removePost: (id: number) => void };

export const Post = React.memo(({
                         id,
                         name,
                         message,
                         likeCount,
                         image,
                         background,
                         color,
                         removePost,
                         ...props
                     }: PostPropsType) => {
    const PostWrapper = styled.div`
     & {
        background: ${background ? background : '#FF6347'};
        color:  ${color ? color : '#ffffff'};
    }
    `;

    const onCrossClick = (id: number) => {
        removePost(id);
    };

    return (
        <PostWrapper className={styleModule.postWrapper}>
            <div className={styleModule.avaBlock}>
                <img src={image ? image : ava_post} alt="ava_post"/>
                <span>{name}</span>
                <FontAwesomeIcon icon={faTimes} className={styleModule.removePost} onClick={() => onCrossClick(id)}/>
            </div>
            <div className={styleModule.messageBlock}>
                {message}
            </div>
            <div className={styleModule.likesBlock}>
                <span>❤</span> {likeCount}
            </div>
        </PostWrapper>

    );
});

