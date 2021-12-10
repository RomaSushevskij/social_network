import React from "react";
import styleModule from './MyPosts.module.css'
import Post from "./Posts/Posts";

export const MyPosts = (props: any) => {

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
                <Post id={1} message="Hi, how are you?" likeCount={9}/>
                <Post id={2} message="Hi, it's my first post" likeCount={3}/>
                <Post id={3} message="hello" likeCount={87}/>
            </div>
        </div>

    )
        ;
};
