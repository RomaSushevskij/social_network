import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {addNewMessage, addNewPost, StateType, updateNewMessageText, updateNewPostText} from "./redux/state";

export const rerenderIntireTree = (state: StateType) => {
    ReactDOM.render(
        <App state={state}
             addNewPost={addNewPost}
             addNewMessage={addNewMessage}
             updateNewPostText={updateNewPostText}
             updateNewMessageText={updateNewMessageText}/>,
        document.getElementById('root')
    );
};

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
