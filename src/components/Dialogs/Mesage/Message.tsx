import React from "react";
import styleModule from './Message.module.css';
import {MessageType} from "../../../redux/state";
import messageAva from '../../../usersAvatars/user.png'

export type MessagePropsType = MessageType

export function Message({name, message, image, time, ...props}: MessagePropsType) {
    return (
        <div className={styleModule.messageWrapper}>
            <div className={styleModule.avatar}>
                <img src={image ? image : messageAva}/>
            </div>
            <div className={styleModule.messageBlock}>
                <div className={styleModule.name}>
                    {name}
                </div>
                <div className={styleModule.message}>
                    {message}
                </div>
                <div className={styleModule.time}>
                    {time}
                </div>
            </div>
        </div>
    )
}

