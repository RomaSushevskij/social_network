import React from "react";
import styleModule from './Message.module.css';
import styled from "styled-components";
import {UserLogo} from '../../generic/Avatar/Avatar';

export type MessagePropsType = {
    id: number,
    /**
     * Name of the interlocutor
     */
    userId: number
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
    myUserId: null | number
    myAvatar: null | string
}

export const Message = React.memo(({
                                       id,
                                       userId,
                                       name,
                                       message,
                                       image,
                                       time,
                                       color,
                                       background,
                                       meBackground,
                                       meColor,
                                       myUserId,
                                       myAvatar,
                                       ...props
                                   }: MessagePropsType) => {
    const MessageBlock = styled.div`
    & {
    background: ${userId === myUserId ? meBackground : background};
    color: ${userId === myUserId ? meColor : color}
    }
    &:before {
    background-color:  ${userId === myUserId ? meBackground : background};
    }
    `;
    let resultAvatar = userId === myUserId && myAvatar ? <img src={myAvatar}/> :
        userId === myUserId && !myAvatar ? <UserLogo/> :
            image ? <img src={image}/> : <UserLogo/>


    // if the message is mine, then one style, if not, then another
    const messageWrapperStyle = userId === myUserId ?
        `${styleModule.messageWrapper} ${styleModule.meMessageWrapper}` :
        styleModule.messageWrapper
    const messageBlockStyle = userId === myUserId
        ?
        `${styleModule.messageBlock} ${styleModule.meMessageBlock}` :
        styleModule.messageBlock
    debugger
    return (
        <div className={messageWrapperStyle}>
            <div className={styleModule.avatar}>
                {resultAvatar}
            </div>
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
        </div>
    )
})

