import React from "react";
import styleModule from './Dialog.module.css';
import {NavLink} from "react-router-dom";
import {DialogType} from "../../../redux/redusers/dialogsReducer/dialogsReducer";
import styled from "styled-components";
import {UserLogo} from '../../generic/Avatar/Avatar';

export type DialogPropsType = DialogType &
    {
        setActiveDialogId?: (dialogId: number) => void
        forDialogTitle?: boolean
    }

export const Dialog = React.memo(({
                                      id,
                                      name,
                                      image,
                                      background,
                                      color,
                                      userId,
                                      setActiveDialogId,
                                      forDialogTitle, ...props
                                  }: DialogPropsType) => {
    const DialogWrapper = styled.div`
    & {
    background: ${background ? background : '#FFFFFF'};
    }
    & a {
    color: ${color ? color : '#333333'};
    }
    
    `;
    const onActiveDialogHandler = (dialog: any) => {
        if (dialog.isActive) {
            setActiveDialogId && setActiveDialogId(userId)
            return styleModule.dialogActive
        } else {
            return ''
        }

    }
    const finalAvatarClass = props.isOnline ?
        `${styleModule.contactAvatar} ${styleModule.online}` :
        styleModule.contactAvatar
    const validName = name?.length > 12 && !forDialogTitle ? `${name.slice(0, 12)}...` : name;
    return (
        <NavLink className={onActiveDialogHandler}
                 to={`/dialogs/${id}`}>
            <DialogWrapper className={styleModule.dialog}>
                <div className={finalAvatarClass}>
                    {image ? <img src={image} alt={'message avatar'}/> :
                        <UserLogo/>}
                </div>
                <span>{validName}</span>
            </DialogWrapper>
        </NavLink>
    )
})

