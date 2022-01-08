import React from 'react';
import './App.css';
import {Header} from "./components/Header/Header";
import {Navbar} from "./components/Navbar/Navbar";
import {Profile} from "./components/Profile/Profile";
import {Dialogs} from "./components/Dialogs/Dialogs";
import {BrowserRouter, Route, Routes, Navigate, HashRouter} from "react-router-dom";
import {Music} from "./components/Music/Music";
import {News} from "./components/News/News";
import {Settings} from "./components/Settings/Settings";
import {StateType} from "./redux/state";


export type AppPropsType = {
    state: StateType
    addNewPost: () => void
    addNewMessage: () => void
    updateNewPostText: (newPostText: string) => void
    updateNewMessageText: (newMessageText: string) => void
}

export type PATHType = {
    PROFILE: string
    DIALOGS: string
    MUSIC: string
    NEWS: string
    SETTINGS: string
}
const PATH = {
    PROFILE: '/profile',
    DIALOGS: '/dialogs/*',
    MUSIC: '/music',
    NEWS: '/news',
    SETTINGS: '/settings'
}

function App(props: AppPropsType) {
    return (
        <HashRouter>
            <div className="app_wrapper">
                <Header/>
                <Navbar/>
                <div className="app_wrapper_content">
                    <Routes>
                        <Route path='/' element={<Navigate to={PATH.PROFILE}/>}/>
                        <Route path={PATH.PROFILE}element={<Profile profilePage={props.state.profilePage}
                                                                 addNewPost={props.addNewPost}
                                                                 updateNewPostText={props.updateNewPostText}/>}/>
                        <Route path={PATH.DIALOGS} element={<Dialogs dialogsPage={props.state.dialogsPage}
                                                                   addNewMessage={props.addNewMessage}
                                                                   updateNewMessageText={props.updateNewMessageText}/>}/>
                        <Route path={PATH.MUSIC} element={<Music/>}/>
                        <Route path={PATH.NEWS} element={<News/>}/>
                        <Route path={PATH.SETTINGS} element={<Settings/>}/>
                    </Routes>
                </div>
            </div>
        </HashRouter>
    );
}

export default App;
