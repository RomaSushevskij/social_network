import React, {FC, memo, useEffect, useRef} from "react";
import styleModule from "./CommonChat.module.scss";
import {AddMessageForm} from "../forms/AddMessageForm/AddMessageForm";
import {Message} from "../Dialogs/Mesage/Message";
import {MESSAGE_STYLE} from "../Dialogs/Dialogs";
import {useAppSelector} from "../../redux/hooks";
import {getAuthUserIDSelector, getAvatarSelector} from "../../redux/selectors/authSelectors";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {
    sendMessage,
    startMessagesListening,
    stopMessagesListening
} from "../../redux/redusers/chatReducer/chat-reducer";
import {selectMessages} from "../../redux/selectors/chatSelectors";


const CommonChat: FC = memo(() => {
    const dispatch = useDispatch();
    const messageBottom = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const myUserId = useAppSelector(getAuthUserIDSelector);
    const avatar = useAppSelector(getAvatarSelector);
    const messages = useAppSelector(selectMessages);

    useEffect(() => {
        dispatch(startMessagesListening());

        return () => {
            dispatch(stopMessagesListening())
        }
    }, []);

    useEffect(() => {
        messageBottom.current?.scrollIntoView({behavior: 'auto'})
    }, [messages])

    const onSendMessageButtonClick = (message: string) => {
        dispatch(sendMessage(message));
    };
    const onUserAvatarClick = (userId: number) => {
        const path = `/profile/${userId}`
        navigate(path);
    }
    return (
        <div className={styleModule.commonChatWrapper}>
            <div className={styleModule.messages}>
                {messages.map((message, index) => <Message key={message.userId + index}
                                                           color={MESSAGE_STYLE.color}
                                                           background={MESSAGE_STYLE.background}
                                                           meColor={MESSAGE_STYLE.meColor}
                                                           meBackground={MESSAGE_STYLE.meBackground}
                                                           myUserId={myUserId}
                                                           myAvatar={avatar}
                                                           onUserClick={() => onUserAvatarClick(message.userId)}
                                                           {...message}/>)}
                <div ref={messageBottom}/>
            </div>
            <AddMessageForm addMessage={onSendMessageButtonClick}
                            isSubmitDisabled={false}/>
        </div>
    )
});

export default CommonChat;