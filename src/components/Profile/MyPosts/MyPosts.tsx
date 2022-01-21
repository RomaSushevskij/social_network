import React, {ChangeEvent, KeyboardEvent} from "react";
import styleModule from './MyPosts.module.css'
import {Post} from "./Posts/Post";
import {PostsDataType} from "../../../redux/store";
import {Button} from "../../generic/Button/Button";
import {Textarea} from "../../generic/Textarea/Textarea";

export const BUTTON_STYLE = {
    BACKGROUND_HOVER: '#ffbf47',
    BACKGROUND: '#ffe1a9',
    COLOR_HOVER: '#ffffff'
};
export const POST_STYLE = {
    background: 'inherit',
    color: '#ffffff'
};


type MyPostsPropsType = {
    postsData: PostsDataType
    newPostText: string
    addPost: () => void
    addPostWithEnter: (e: KeyboardEvent<HTMLTextAreaElement>) => any
    updatePostText: (newPostText:string) => any
}

export function MyPosts(props: MyPostsPropsType) {

    const onAddPostButton = () => {
        props.addPost();
    };
    const onAddPostWithEnter = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        props.addPostWithEnter(e);
    };
    const onUpdatePostText = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.updatePostText(e.currentTarget.value);
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
                            callback={onAddPostButton}
                            backgroundHover={BUTTON_STYLE.BACKGROUND_HOVER}
                            background={BUTTON_STYLE.BACKGROUND}
                            colorHover={BUTTON_STYLE.COLOR_HOVER}/>
                </div>
            </div>
            <div className={styleModule.posts}>
                {props.postsData.map(post => <Post key={post.id}
                                                   background={POST_STYLE.background}
                                                   color={POST_STYLE.color}
                                                   {...post}/>)}
            </div>
        </div>

    )
        ;
};
