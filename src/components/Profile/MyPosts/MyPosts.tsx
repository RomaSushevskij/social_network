import React, {LegacyRef} from "react";
import styleModule from './MyPosts.module.css'
import {Post} from "./Posts/Posts";
import {PostsDataType} from "../../../redux/state";

type MyPostsPropsType = {
    postsData: PostsDataType
    addNewPost: () => void
    newPostText: string
    updateNewPostText: (newPostText: string) => void
}

export function MyPosts(props: MyPostsPropsType) {

    const newPostText: LegacyRef<HTMLTextAreaElement> = React.createRef();
    const onAddPostButton = (event: React.MouseEvent<HTMLButtonElement>) => {
        props.addNewPost();
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
                    <textarea onChange={onUpdatePostText} value={props.newPostText} ref={newPostText}/>
                </div>
                <div className={styleModule.addPostButton}>
                    <button onClick={onAddPostButton}>Add post</button>
                </div>
            </div>
            <div className={styleModule.posts}>
                {props.postsData.map(post => <Post key={post.id} {...post}/>)}
            </div>
        </div>

    )
        ;
};
