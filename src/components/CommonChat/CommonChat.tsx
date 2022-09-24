import React, {FC, memo, useCallback, useEffect, useRef, useState} from "react";
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
import {selectChatStatus, selectMessages} from "../../redux/selectors/chatSelectors";
import {SNACK_BAR_TYPES, SnackBar} from "../generic/SnackBar/SnackBar";


const CommonChat: FC = memo(() => {
    const dispatch = useDispatch();
    const messageBottom = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const myUserId = useAppSelector(getAuthUserIDSelector);
    const avatar = useAppSelector(getAvatarSelector);
    const messages = useAppSelector(selectMessages);
    const chatStatus = useAppSelector(selectChatStatus);

    const [isAutoScroll, setIsAutoScroll] = useState(true);
    const [scrollBehaviorType, setScrollBehaviorType] = useState<ScrollBehavior>('auto');

    useEffect(() => {
        dispatch(startMessagesListening());

        return () => {
            dispatch(stopMessagesListening())
        }
    }, []);

    useEffect(() => {
        if (isAutoScroll) {
            messageBottom.current?.scrollIntoView({behavior: scrollBehaviorType})
        }
    }, [messages])

    const onSendMessageButtonClick = useCallback((message: string) => {
        dispatch(sendMessage(message));
    }, [dispatch]);

    const onUserAvatarClick = useCallback((userId: number) => {
        const path = `/profile/${userId}`
        navigate(path);
    }, [navigate]);

    const onMessagesScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const {scrollHeight, scrollTop, clientHeight} = e.currentTarget;
        if (Math.abs((scrollHeight - scrollTop) - clientHeight) <= clientHeight / 2) {
            !isAutoScroll && setIsAutoScroll(true);
            setScrollBehaviorType('smooth');
            return
        }
        isAutoScroll && setIsAutoScroll(false)
    };

    return (
        <div className={styleModule.commonChatWrapper}>
            <div className={styleModule.messages} onScroll={onMessagesScroll}>
                {messages.map((message, index) => <Message key={message.id}
                                                           color={MESSAGE_STYLE.color}
                                                           background={MESSAGE_STYLE.background}
                                                           meColor={MESSAGE_STYLE.meColor}
                                                           meBackground={MESSAGE_STYLE.meBackground}
                                                           myUserId={myUserId}
                                                           myAvatar={avatar}
                                                           onUserClick={onUserAvatarClick}
                                                           {...message}/>)}
                <div ref={messageBottom}/>
            </div>
            <AddMessageForm addMessage={onSendMessageButtonClick}
                            isSubmitDisabled={chatStatus !== 'ready'}/>
            {chatStatus === 'error' &&
                <SnackBar message={'Some error occurred. Please refresh page.'} type={SNACK_BAR_TYPES.ERROR}/>}
        </div>
    )
});

export default CommonChat;