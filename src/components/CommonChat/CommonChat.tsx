import React, {FC, memo, useEffect, useRef, useState} from "react";
import styleModule from "./CommonChat.module.scss";
import {AddMessageForm} from "../forms/AddMessageForm/AddMessageForm";
import {Message} from "../Dialogs/Mesage/Message";
import {MessageType} from "../../redux/redusers/dialogsReducer/dialogsReducer";
import {MESSAGE_STYLE} from "../Dialogs/Dialogs";
import {useAppSelector} from "../../redux/hooks";
import {getAuthUserIDSelector, getAvatarSelector} from "../../redux/selectors/authSelectors";

const wsChannel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');

const CommonChat: FC = memo(() => {
    const userId = useAppSelector(getAuthUserIDSelector);
    const avatar = useAppSelector(getAvatarSelector);
    const [messages, setMessages] = useState<MessageType[]>([]);

    useEffect(() => {
        wsChannel.addEventListener('message', e => {
            const newMessages = JSON.parse(e.data);
            setMessages(messages => ([...messages, ...newMessages]));
        })
    }, []);

    const onSendMessageButtonClick = (message: string) => {
        wsChannel.send(message);
    };
    const messageBottom = useRef<HTMLDivElement>(null);
    useEffect(() => {
        messageBottom.current?.scrollIntoView({behavior: 'smooth'})
    }, [messages])
    return (
        <div className={styleModule.commonChatWrapper}>
            <div className={styleModule.messages}>
                {messages.map(message => <Message key={message.userId}
                                                  color={MESSAGE_STYLE.color}
                                                  background={MESSAGE_STYLE.background}
                                                  meColor={MESSAGE_STYLE.meColor}
                                                  meBackground={MESSAGE_STYLE.meBackground}
                                                  myUserId={userId}
                                                  myAvatar={avatar}
                                                  {...message}/>)}
                <div ref={messageBottom}/>
            </div>
            <AddMessageForm addMessage={onSendMessageButtonClick}/>

        </div>
    )
});

export default CommonChat;