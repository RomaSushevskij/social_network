import React from "react";
import styleModule from './MyPosts.module.css'
import {Post} from "./Posts/Post";
import {MyPostsPropsType} from "./MyPostsContainer";
import {AddPostForm} from '../../forms/AddPostForm/AddPostForm';
import {useParams} from 'react-router-dom';


export const BUTTON_STYLE = {
    BACKGROUND_HOVER: '#ffbf47',
    BACKGROUND: '#ffe1a9',
    COLOR_HOVER: '#ffffff'
};
export const POST_STYLE = {
    background: '#ffffff',
    color: '#666666'
};


export const MyPosts = React.memo((props: MyPostsPropsType) => {
    const params = useParams();
    const isMyProfile = params['*'] === props.myUserId?.toString() || params['*'] === '*' || !params['*'];

    return (
        <div className={styleModule.myPosts}>
            <p>My posts</p>
            <AddPostForm addPost={props.addPost}
                         fullName={props.fullName}
                         avatar={props.avatar}
                         myUserId={props.myUserId}
            />
            {isMyProfile && <div className={styleModule.posts}>
                {props.postsData.map(post =>
                    <Post
                        key={post.id}
                        background={POST_STYLE.background}
                        color={POST_STYLE.color}
                        removePost={props.removePost}
                        likePost={props.likePost}
                        {...post}/>
                )}
            </div>
            }
        </div>
    );
})
