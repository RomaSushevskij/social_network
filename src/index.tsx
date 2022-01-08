import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {addNewMessage, addNewPost, state, subscribe, updateNewMessageText, updateNewPostText} from "./redux/state";

const rerenderIntireTree = () => {
    ReactDOM.render(
        <App state={state}
             addNewPost={addNewPost}
             addNewMessage={addNewMessage}
             updateNewPostText={updateNewPostText}
             updateNewMessageText={updateNewMessageText}/>,
        document.getElementById('root')
    );
};
rerenderIntireTree();
subscribe(rerenderIntireTree);

