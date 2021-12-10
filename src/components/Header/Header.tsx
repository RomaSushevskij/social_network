import React from "react";
import styleModule from './Header.module.css';
import logo from '../../main-logo.png';

export const Header = (props: any) => {

    return (
        <header className={styleModule.header}>
            <div className={styleModule.logoAndDescription}>
                <div className={styleModule.logo}>
                    <img src={logo} className={styleModule.main_logo}/>
                </div>
                <div className={styleModule.name_description}>
                    <p>Cloudpaper</p>
                    <p>Connecting Network</p>
                </div>
            </div>
            <div className={styleModule.loginStatus}>

            </div>
        </header>
    );
}

