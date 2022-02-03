import React from "react";
import styleModule from './Message.module.css';
import messageAva from '../../../usersAvatars/user.png'
import styled from "styled-components";

export type MessagePropsType = {
    id: number,
    /**
     * Name of the interlocutor
     */
    name: string,
    /**
     * Text of message
     */
    message: string,
    /**
     * Image of the interlocutor
     */
    image: string | null,
    /**
     * Time of sending message
     */
    time: string
    background: string
    color: string
}

export const Message = React.memo(({
                            name,
                            message,
                            image,
                            time,
                            color,
                            background, ...props
                        }: MessagePropsType) => {
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
})

