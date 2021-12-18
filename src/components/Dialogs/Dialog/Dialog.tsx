import React from "react";
import styleModule from './Dialog.module.css';
import {NavLink} from "react-router-dom";
import userLogo from '../../../usersAvatars/user.png'
import {DialogType} from "../../../redux/state";

export type DialogPropsType = DialogType

export function Dialog({id, name, image, ...props}: DialogPropsType) {
    return (
        <div className={styleModule.dialog}>
            <div className={styleModule.contactAvatar}>
                <img src={image ? image : userLogo}/>
            </div>
            <NavLink to={`/dialogs/ ${id}`}>{name}</NavLink>
        </div>
    )
}

