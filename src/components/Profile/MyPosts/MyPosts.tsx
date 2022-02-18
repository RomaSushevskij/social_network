import React, {ChangeEvent, KeyboardEvent} from "react";
import styleModule from './MyPosts.module.css'
import {Post} from "./Posts/Post";
import {Button} from "../../generic/Button/Button";
import {Textarea} from "../../generic/Textarea/Textarea";
import {MyPostsPropsType} from "./MyPostsContainer";


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

    const onAddPostButton = () => {
        props.addPost(props.newPostText);
    };
    const onAddPostWithEnter = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (!e.shiftKey && e.key === 'Enter') {
            e.preventDefault();
            props.newPostText.trim() && props.addPost(props.newPostText)
        }
    };
    const onUpdatePostText = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.updateNewPostText(e.currentTarget.value);
    };


    return (
        <div className={styleModule.myPosts}>
            <p>My posts</p>
            <div>
                <div className={styleModule.writePost}>
                    <Textarea setTextareaValue={onUpdatePostText}
                              textareaValue={props.newPostText}
                              onAddWithEnter={onAddPostWithEnter}
                              placeholder={'Here you can leave your post'}
                              background={'#ffffff'}
                              color={'#60575A'}/>
                </div>
                <div className={styleModule.addPostButton}>
                    <Button name={'Add post'}
                            onClick={onAddPostButton}
                            backgroundHover={BUTTON_STYLE.BACKGROUND_HOVER}
                            background={BUTTON_STYLE.BACKGROUND}
                            colorHover={BUTTON_STYLE.COLOR_HOVER}/>
                </div>
            </div>
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
