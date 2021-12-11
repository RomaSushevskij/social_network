import React from "react";
import styleModule from './Dialog.module.css';
import {NavLink} from "react-router-dom";
import userLogo from '../../../usersAvatars/user.png'

export function Dialog(props:any) {
    return (
        <div className={styleModule.dialog}>
            <div className={styleModule.contactAvatar}>
                <img src={props.srcAvatar ? props.srcAvatar : userLogo} alt=""/>
            </div>
            <NavLink to={`/dialogs/ ${props.id}`}>{props.name}</NavLink>
        </div>
    )
}

