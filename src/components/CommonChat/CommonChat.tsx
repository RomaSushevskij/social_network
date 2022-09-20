import React, {FC, memo, useEffect, useRef, useState} from "react";
import styleModule from "./CommonChat.module.scss";
import {AddMessageForm} from "../forms/AddMessageForm/AddMessageForm";
import {Message} from "../Dialogs/Mesage/Message";
import {MessageType} from "../../redux/redusers/dialogsReducer/dialogsReducer";
import {MESSAGE_STYLE} from "../Dialogs/Dialogs";
import {useAppSelector} from "../../redux/hooks";
import {getAuthUserIDSelector, getAvatarSelector} from "../../redux/selectors/authSelectors";
import {WsChannelStatusType} from "./types";


const CommonChat: FC = memo(() => {
    const messageBottom = useRef<HTMLDivElement>(null);

    const userId = useAppSelector(getAuthUserIDSelector);
    const avatar = useAppSelector(getAvatarSelector);

    const [messages, setMessages] = useState<MessageType[]>([]);
    const [wsChannel, setWsChannel] = useState<WebSocket | null>(null);
    const [wsChannelStatus, setWsChannelStatus] = useState<WsChannelStatusType>('pending');

    useEffect(() => {
        let ws: WebSocket;
        const onWsClose = () => {
            console.log('wsChannel closed');
            createWsChannel();
        }

        function createWsChannel() {
            if (ws) {
                ws.removeEventListener('close', onWsClose);
                ws.close();
            }
            ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
            setWsChannel(ws);
            ws.addEventListener('close', onWsClose)
        }

        createWsChannel();
        return () => {
            ws.removeEventListener('close', onWsClose);
            ws.close();
        }
    }, [])

    useEffect(() => {
        const onWsMessage = (e: MessageEvent<any>) => {
            const newMessages = JSON.parse(e.data);
            setMessages(messages => ([...messages, ...newMessages]));
        };
        wsChannel?.addEventListener('message', onWsMessage);
        return () => {
            wsChannel?.removeEventListener('message', onWsMessage);
        }
    }, [wsChannel]);

    useEffect(() => {
        const onWsOpen = () => {
            console.log('wsChannel opened')
            setWsChannelStatus('ready')
        };
        wsChannel?.addEventListener('open', onWsOpen)
    }, [wsChannel]);

    useEffect(() => {
        messageBottom.current?.scrollIntoView({behavior: 'smooth'})
    }, [messages])

    const onSendMessageButtonClick = (message: string) => {
        wsChannel?.send(message);
    };

    return (
        <div className={styleModule.commonChatWrapper}>
            <div className={styleModule.messages}>
                {messages.map((message, index) => <Message key={message.userId + index}
                                                           color={MESSAGE_STYLE.color}
                                                           background={MESSAGE_STYLE.background}
                                                           meColor={MESSAGE_STYLE.meColor}
                                                           meBackground={MESSAGE_STYLE.meBackground}
                                                           myUserId={userId}
                                                           myAvatar={avatar}
                                                           {...message}/>)}
                <div ref={messageBottom}/>
            </div>
            <AddMessageForm addMessage={onSendMessageButtonClick}
                            isSubmitDisabled={wsChannel === null || wsChannelStatus !== 'ready'}/>
            <button onClick={() => wsChannel?.close()}>close ws</button>

        </div>
    )
});

export default CommonChat;