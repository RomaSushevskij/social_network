import React from "react";
import styleModule from './Posts.module.css'
import ava_post from '../../../../usersAvatars/user.png'

type PostPropsType = {
    id: number
    message: string
    likeCount: number
}

const Post = (props: PostPropsType) => {
    return (
        <div className={styleModule.item}>
            <img src={ava_post} alt="ava_post"/>
            {props.message}
            <div>
                <span>❤</span> {props.likeCount}
            </div>
        </div>

    );
};


export default Post;
