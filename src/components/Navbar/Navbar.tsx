import React from "react";
import './Navbar.module.css';
import styleModule from './Navbar.module.css';
import {NavLink} from "react-router-dom";

export function Navbar(props: any) {
    let nav = <>
        <nav className={styleModule.nav}>
            <div className={styleModule.item}>
                <NavLink to={'/profile'} className={profile => profile.isActive ? styleModule.active : ''}>Profile</NavLink>
            </div>
            <div className={styleModule.item}>
                <NavLink to={'/dialogs'} className={dialogs => dialogs.isActive ? styleModule.active : ''}>Messages</NavLink>
            </div>
            <div className={styleModule.item}>
                <NavLink to={'/news'} className={news => news.isActive ? styleModule.active : ''}>News</NavLink>
            </div>
            <div className={styleModule.item}>
                <NavLink to={'/music'} className={music => music.isActive ? styleModule.active : ''}>Music</NavLink>
            </div>
            <div className={`${styleModule.item} ${styleModule.users}`}>
                <NavLink to={'/users'} className={users => users.isActive ? styleModule.active : ''}>Users</NavLink>
            </div>
            <div className={`${styleModule.item} ${styleModule.settings}`}>
                <NavLink to={'/settings'} className={settings => settings.isActive ? styleModule.active : ''}>Settings</NavLink>
            </div>

        </nav>
    </>;
    return nav;
};
