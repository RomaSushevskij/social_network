import React from "react";
import styleModule from './MyPosts.module.css'
import {Post} from "./Posts/Post";
import {MyPostsPropsType} from "./MyPostsContainer";
import {AddPostForm} from '../../forms/AddPostForm/AddPostForm';


export const BUTTON_STYLE = {
    BACKGROUND_HOVER: '#ffbf47',
    BACKGROUND: '#ffe1a9',
    COLOR_HOVER: '#ffffff'
};
export const POST_STYLE = {
    background: 'inherit',
    color: '#ffffff'
};

export const MyPosts = React.memo((props: MyPostsPropsType) => {

    return (
        <div className={styleModule.myPosts}>
            <p>My posts</p>
            <AddPostForm addPost={props.addPost}/>
            <div className={styleModule.posts}>
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
        </div>
    );
})
