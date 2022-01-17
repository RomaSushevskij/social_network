import React, {ChangeEvent, KeyboardEvent} from "react";
import styleModule from './MyPosts.module.css'
import {Post} from "./Posts/Posts";
import {ActionsTypes, PostsDataType} from "../../../redux/store";
import {Button} from "../../generic/Button/Button";
import {Textarea} from "../../generic/Textarea/Textarea";

export const BUTTON_STYLE = {
    BACKGROUND_HOVER: '#ffbf47',
    BACKGROUND: '#ffe1a9',
    COLOR_HOVER: '#ffffff'
};


type MyPostsPropsType = {
    postsData: PostsDataType
    newPostText: string
    dispatch: (action: ActionsTypes) => void
}

export function MyPosts(props: MyPostsPropsType) {

    const onAddPostButton = () => {
        props.newPostText.trim() && props.dispatch({type:"ADD-POST"});
    };
    const onAddPostWithEnter = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (!e.shiftKey && e.key === 'Enter') {
            e.preventDefault();
            onAddPostButton()
        }
    };
    const onUpdatePostText = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.dispatch({type:"UPDATE-NEW-POST-TEXT", newPostText:(e.currentTarget.value)});

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
                {props.postsData.map(post => <Post key={post.id} {...post}/>)}
            </div>
        </div>

    )
        ;
};
