import React, {LegacyRef} from "react";
import styleModule from './MyPosts.module.css'
import {Post} from "./Posts/Posts";
import {PostsDataType} from "../../../redux/state";
import {Button} from "../../generic/Button/Button";
import {BrowserRouter} from "react-router-dom";
import {Textarea} from "../../generic/Textarea/Textarea";

type MyPostsPropsType = {
    postsData: PostsDataType
    addNewPost: () => void
    newPostText: string
    updateNewPostText: (newPostText: string) => void
}

export function MyPosts(props: MyPostsPropsType) {

    const newPostText: LegacyRef<HTMLTextAreaElement> = React.createRef();
    const onAddPostButton = () => {
        props.newPostText && props.addNewPost();
    };
    const onUpdatePostText = () => {
        if (newPostText.current) {
            const text: string = newPostText.current.value;
            props.updateNewPostText(text);
        }
    };

    return (
        <div className={styleModule.myPosts}>
            <p>My posts</p>
            <div>
                <div className={styleModule.writePost}>
                    <Textarea setTextareaValue={onUpdatePostText} textareaValue={props.newPostText} reference={newPostText} placeholder={'Here you can leave your post'}/>
                </div>
                <div className={styleModule.addPostButton}>
                    <Button name={'Add post'} callback={onAddPostButton}/>
                </div>
            </div>
            <div className={styleModule.posts}>
                {props.postsData.map(post => <Post key={post.id} {...post}/>)}
            </div>
        </div>

    )
        ;
};
