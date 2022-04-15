import React from 'react';
import './App.css';
import {Navbar} from "./components/Navbar/Navbar";
import {Navigate, Route, Routes} from "react-router-dom";
import {Music} from "./components/Music/Music";
import {News} from "./components/News/News";
import {SettingsContainer} from "./components/Settings/Settings";
import logo from './main-logo.png';
import {DialogsContainer} from "./components/Dialogs/DialogsContainer";
import {UsersContainer} from "./components/Users/UsersContainer";
import {ProfileContainer} from "./components/Profile/ProfileContainer";
import {HeaderContainer} from "./components/Header/HeaderContainer";
import {Login} from "./components/Login/Login";


export type PATHType = {
    PROFILE: string
    DIALOGS: string
    MUSIC: string
    NEWS: string
    USERS: string
    SETTINGS: string
    LOGIN:string
}
export const PATH: PATHType = {
    PROFILE: '/profile/*',
    DIALOGS: '/dialogs/*',
    MUSIC: '/music',
    NEWS: '/news',
    USERS: '/users',
    SETTINGS: '/settings',
    LOGIN: '/login',
};

export const HEADER_STYLE = {
    background: '#87BBD0',
    color: '#ffffff',
    logo: logo
};

function App() {

    return (
            <div className="app_wrapper">
                <HeaderContainer/>
                <Navbar/>
                <div className="app_wrapper_content">
                    <Routes>
                        <Route path='/' element={<Navigate to={PATH.PROFILE}/>}/>
                        <Route path={PATH.PROFILE} element={<ProfileContainer />}/>
                        <Route path={PATH.DIALOGS} element={<DialogsContainer/>}/>
                        <Route path={PATH.MUSIC} element={<Music/>}/>
                        <Route path={PATH.NEWS} element={<News/>}/>
                        <Route path={PATH.USERS} element={<UsersContainer/>}/>
                        <Route path={PATH.SETTINGS} element={<SettingsContainer/>}/>
                        <Route path={PATH.LOGIN} element={<Login/>}/>
                    </Routes>
                </div>
            </div>
    );
}

export default App;
