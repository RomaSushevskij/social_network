import React from 'react';
import './App.css';
import {Header} from "./components/Header/Header";
import {Navbar} from "./components/Navbar/Navbar";
import {Navigate, Route, Routes} from "react-router-dom";
import {Music} from "./components/Music/Music";
import {News} from "./components/News/News";
import {Settings} from "./components/Settings/Settings";
import logo from './main-logo.png';
import {DialogsContainer} from "./components/Dialogs/DialogsContainer";
import {UsersContainer} from "./components/Users/UsersContainer";
import {ProfileContainer} from "./components/Profile/ProfileContainer";


export type PATHType = {
    PROFILE: string
    DIALOGS: string
    MUSIC: string
    NEWS: string
    USERS: string
    SETTINGS: string
}
const PATH: PATHType = {
    PROFILE: '/profile/*',
    DIALOGS: '/dialogs/*',
    MUSIC: '/music',
    NEWS: '/news',
    USERS: '/users',
    SETTINGS: '/settings'
};

export const HEADER_STYLE = {
    background: '#7D823F',
    color: '#ffffff',
    logo: logo
};

function App() {
    return (
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
                        <Route path={PATH.PROFILE} element={<ProfileContainer />}/>
                        <Route path={PATH.DIALOGS} element={<DialogsContainer/>}/>
                        <Route path={PATH.MUSIC} element={<Music/>}/>
                        <Route path={PATH.NEWS} element={<News/>}/>
                        <Route path={PATH.USERS} element={<UsersContainer/>}/>
                        <Route path={PATH.SETTINGS} element={<Settings/>}/>
                    </Routes>
                </div>
            </div>
    );
}

export default App;
