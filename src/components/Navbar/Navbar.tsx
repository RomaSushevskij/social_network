import React from "react";
import './Navbar.module.css';
import styleModule from './Navbar.module.css';
import {NavLink} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCommentDots,
    faHeadphonesAlt,
    faNewspaper,
    faSlidersH,
    faUserAlt,
    faUsers
} from "@fortawesome/free-solid-svg-icons";

export function Navbar(props: any) {
    return (
        <>
            <nav className={styleModule.nav}>
                <div className={styleModule.item}>
                    <NavLink to={'/profile'}
                             className={profile => profile.isActive ? styleModule.active : ''}>
                        <FontAwesomeIcon icon={faUserAlt} className={styleModule.icon}/> Profile
                    </NavLink>
                </div>
                <div className={styleModule.item}>
                    <NavLink to={'/dialogs'}
                             className={dialogs => dialogs.isActive ? styleModule.active : ''}>
                        <FontAwesomeIcon icon={faCommentDots} className={styleModule.icon}/> Messages
                    </NavLink>
                </div>
                <div className={styleModule.item}>
                    <NavLink to={'/news'} className={news => news.isActive ? styleModule.active : ''}>
                        <FontAwesomeIcon icon={faNewspaper} className={styleModule.icon}/> News
                    </NavLink>
                </div>
                <div className={styleModule.item}>
                    <NavLink to={'/music'} className={music => music.isActive ? styleModule.active : ''}>
                        <FontAwesomeIcon icon={faHeadphonesAlt} className={styleModule.icon}/> Music
                    </NavLink>
                </div>
                <div className={`${styleModule.item} ${styleModule.users}`}>
                    <NavLink to={'/users'} className={users => users.isActive ? styleModule.active : ''}>
                        <FontAwesomeIcon icon={faUsers} className={styleModule.icon}/> Users
                    </NavLink>
                </div>
                <div className={`${styleModule.item} ${styleModule.settings}`}>
                    <NavLink to={'/settings'}
                             className={settings => settings.isActive ? styleModule.active : ''}>
                        <FontAwesomeIcon icon={faSlidersH} className={styleModule.icon}/> Settings
                    </NavLink>
                </div>

            </nav>
        </>
    )
};
