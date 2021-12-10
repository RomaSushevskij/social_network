import React from "react";
import './Navbar.module.css';
import styleModule from './Navbar.module.css';

export const Navbar = (props: any) => {
    return (
        <nav className={styleModule.nav}>
            <div className={styleModule.item}>
                <a>Profile</a>
            </div>
            <div className={styleModule.item}>
                <a>Messages</a>
            </div>
            <div className={styleModule.item}>
                <a>News</a>
            </div>
            <div className={styleModule.item}>
                <a>Music</a>
            </div>
            <div className={`${styleModule.item} ${styleModule.users}`}>
                <a>Users</a>
            </div>
            <div className={`${styleModule.item} ${styleModule.settings}`}>
                <a>Settings</a>
            </div>

        </nav>
    );
};
