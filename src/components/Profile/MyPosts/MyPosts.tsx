import React from "react";
import styleModule from './MyPosts.module.css'
import {Post} from "./Posts/Posts";
import {PostsDataType} from "../../../redux/state";

type MyPostsPropsType = {
    postsData: PostsDataType
}

export function MyPosts (props: MyPostsPropsType) {

    return (
        <div className={styleModule.myPosts}>
            <p>My posts</p>
            <form>
                <div className={styleModule.writePost}>
                    <textarea></textarea>
                </div>
                <div className={styleModule.addPostButton}>
                    <button>Add post</button>
                </div>
            </form>
            <div className={styleModule.posts}>
                {props.postsData.map(post=> <Post {...post}/>)}
            </div>
        </div>

    )
        ;
};
