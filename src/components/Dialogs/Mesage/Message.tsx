import React, {useEffect} from "react";
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
    meBackground: string
    meColor: string
}

export const Message = React.memo(({
                                       id,
                                       name,
                                       message,
                                       image,
                                       time,
                                       color,
                                       background,
                                       meBackground,
                                       meColor,
                                       ...props
                                   }: MessagePropsType) => {
    const MessageBlock = styled.div`
    & {
    background: ${id === 20392 ? meBackground : background};
    color: ${id === 20392 ? meColor : color}
    }
    &:before {
    background: radial-gradient(circle at top left, transparent 50%, ${id === 20392 ? meBackground : background} 50%);
    }
    `;
    const Avatar = styled.div`
    & {
    border-color: ${background}
    }
    `;

    // if the message is mine, then one style, if not, then another
    const messageWrapperStyle = id === 20392 ?
        `${styleModule.messageWrapper} ${styleModule.meMessageWrapper}` :
        styleModule.messageWrapper
    const messageBlockStyle = id === 20392
        ?
        `${styleModule.messageBlock} ${styleModule.meMessageBlock}` :
        styleModule.messageBlock
    return (
        <div className={messageWrapperStyle}>
            <MessageBlock className={messageBlockStyle}>
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
            <Avatar className={styleModule.avatar}>
                <img src={image ? image : messageAva}/>
            </Avatar>

        </div>
    )
})

