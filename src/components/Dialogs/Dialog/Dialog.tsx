import React from "react";
import styleModule from './Dialog.module.css';
import {NavLink} from "react-router-dom";
import userLogo from '../../../usersAvatars/user.png'
import {DialogType} from "../../../redux/store";
import styled from "styled-components";

export type DialogPropsType = DialogType

export function Dialog({
                           id,
                           name,
                           image,
                           background,
                           color, ...props
                       }: DialogPropsType) {
    const DialogWrapper = styled.div`
    & {
    background: ${background ? background : '#FF6347'};
    }
    & a {
    color: ${color ? color : '#ffffff'};
    }
    
    `;
    const ContactAvatar = styled.div`
    & img {
    border: 1px solid ${color ? color : '#ffffff'};
    }
    `

    return (
        <DialogWrapper className={styleModule.dialog}>
            <ContactAvatar className={styleModule.contactAvatar}>
                <img src={image ? image : userLogo}/>
            </ContactAvatar>
            <NavLink to={`/dialogs/ ${id}`}>{name}</NavLink>
        </DialogWrapper>
    )
}

