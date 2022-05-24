import React from "react";
import styleModule from './Post.module.css'
import ava_post from '../../../../usersAvatars/user.png'
import {PostType} from "../../../../redux/redusers/profileReducer/profileReducer";
import styled from "styled-components";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Avatar} from '../../../generic/Avatar/Avatar';


type PostPropsType = PostType &
    {
        removePost: (id: number) => void
        likePost: (id: number) => void
    };

export const Post = React.memo(({
                                    id,
                                    name,
                                    message,
                                    likes,
                                    isLike,
                                    image,
                                    background,
                                    color,
                                    removePost,
                                    likePost,
                                    ...props
                                }: PostPropsType) => {
    const PostWrapper = styled.div`
     & {
        background: ${background ? background : '#ffffff'};
        color:  ${color ? color : '#0F0F0F'};
    }
    `;
    const LikesDiv = styled.div`
    color: ${isLike ? '#BE185D' : '#666666'};
    fontWeight:${isLike ? 'bold' : 'normal'};
    `

    const onCrossClick = (id: number) => {
        removePost(id);
    };
    const onLikeClick = (id: number) => {
        likePost(id)
    }

    return (
        <PostWrapper className={styleModule.postWrapper}>
            <div className={styleModule.avaBlock}>
                <Avatar style={{width:'50px', height:'50px'}} photo={image}/>

                <span>{name}</span>
                <FontAwesomeIcon icon={faTimes} className={styleModule.removePost} onClick={() => onCrossClick(id)}/>
            </div>
            <div className={styleModule.messageBlock}>
                {message}
            </div>
            <LikesDiv>
                <span onClick={() => onLikeClick(id)}
                      className={styleModule.likesBlock}>
                    {`${likes.icon} ${likes.likeCount}`}
                </span>
            </LikesDiv>
        </PostWrapper>

    );
});

