import React, {LegacyRef} from "react";
import styleModule from './MyPosts.module.css'
import {Post} from "./Posts/Posts";
import {PostsDataType} from "../../../redux/state";

type MyPostsPropsType = {
    postsData: PostsDataType
}

export function MyPosts (props: MyPostsPropsType) {
  const newPostText:LegacyRef<HTMLTextAreaElement>  = React.createRef();
  const onAddPostButton = (event:React.MouseEvent<HTMLButtonElement>) => {
      if (newPostText.current) {
          const text = newPostText.current.value;
          alert(text)
      }

  }



    return (
        <div className={styleModule.myPosts}>
            <p>My posts</p>
            <div>
                <div className={styleModule.writePost}>
                    <textarea ref={newPostText}></textarea>
                </div>
                <div className={styleModule.addPostButton}>
                    <button onClick={onAddPostButton}>Add post</button>
                </div>
            </div>
            <div className={styleModule.posts}>
                {props.postsData.map(post=> <Post key={post.id} {...post}/>)}
            </div>
        </div>

    )
        ;
};
