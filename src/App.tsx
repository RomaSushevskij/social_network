import React from 'react';
import './App.css';
import {Header} from "./components/Header/Header";
import {Navbar} from "./components/Navbar/Navbar";
import {Profile} from "./components/Profile/Profile";
import {Dialogs} from "./components/Dialogs/Dialogs";
import {HashRouter, Navigate, Route, Routes} from "react-router-dom";
import {Music} from "./components/Music/Music";
import {News} from "./components/News/News";
import {Settings} from "./components/Settings/Settings";
import {StoreType} from "./redux/store";
import logo from './main-logo.png';


export type AppPropsType = {
    store: StoreType
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
};

export const HEADER_STYLE = {
    background: '#7D823F',
    color: '#ffffff',
    logo: logo
};

function App({store, ...restProps}: AppPropsType) {
    return (
        <HashRouter>
            <div className="app_wrapper">
                <Header title={'Cloudpaper'}
                        description={'Connecting Network'}
                        background={HEADER_STYLE.background}
                        color={HEADER_STYLE.color}
                        logo={HEADER_STYLE.logo}/>
                <Navbar/>
                <div className="app_wrapper_content">
                    <Routes>
                        <Route path='/' element={<Navigate to={PATH.PROFILE}/>}/>
                        <Route path={PATH.PROFILE} element={<Profile profilePage={store.getState().profilePage}
                                                                     addNewPost={store.addNewPost.bind(store)}
                                                                     updateNewPostText={store.updateNewPostText.bind(store)}/>}/>
                        <Route path={PATH.DIALOGS} element={<Dialogs dialogsPage={store.getState().dialogsPage}
                                                                     addNewMessage={store.addNewMessage.bind(store)}
                                                                     updateNewMessageText={store.updateNewMessageText.bind(store)}/>}/>
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
