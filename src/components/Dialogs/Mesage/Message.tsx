import React from "react";
import styleModule from './Message.module.css';
import messageAva from '../../../usersAvatars/user.png'
import styled from "styled-components";

export type MessagePropsType = {
    id: number,
    name: string,
    message: string,
    image: string | null,
    time: string
    background:string
    color:string
}

export function Message({
                            name,
                            message,
                            image,
                            time,
                            color,
                            background, ...props
                        }: MessagePropsType) {
    const MessageBlock = styled.div`
    & {
    background: ${background};
    color: ${color}
    }
    &:before {
    background: radial-gradient(circle at top left, transparent 50%, ${background} 50%);
    }
    `;
    const Avatar = styled.div`
    & {
    border-color: ${background}
    }
    `;
    return (
        <div className={styleModule.messageWrapper}>
            <Avatar className={styleModule.avatar}>
                <img src={image ? image : messageAva}/>
            </Avatar>
            <MessageBlock className={styleModule.messageBlock}>
                <div className={styleModule.name}>
                    {name}
                </div>
                <div className={styleModule.message}>
                    {message}
                </div>
                <div className={styleModule.time}>
                    {time}
                </div>
            </MessageBlock>
        </div>
    )
}
