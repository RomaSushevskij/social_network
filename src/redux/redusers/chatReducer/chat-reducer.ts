import {ChatActionType, ChatInitialStateType, ChatMessageType, ChatStatusType} from "./types";
import {AppThunk} from "../../redux-store";
import {Dispatch} from "redux";
import {
    ChatMessageAPIType,
    MessagesReceivedSubscriberType,
    StatusChangedSubscriberType
} from "../../../api/commonChatAPI/types";
import {chatAPI} from "../../../api/commonChatAPI/commonChatAPI";
import {getLastMessages} from "./utils";
import {v1} from 'uuid';


enum ChatTypes {
    MESSAGES_RECEIVED = 'socialNetwork/chat/MESSAGES_RECEIVED',
    MESSAGES_RESETED = 'socialNetwork/chat/MESSAGES_RESETED',
    STATUS_CHANGED = 'socialNetwork/chat/STATUS_CHANGED',
}

export const initialState = {
    messages: [] as ChatMessageType [],
    chatStatus: 'pending' as ChatStatusType
};


export const chatReducer = (state: ChatInitialStateType = initialState, action: ChatActionType): ChatInitialStateType => {
    switch (action.type) {
        case ChatTypes.MESSAGES_RECEIVED:
            const newMessages = action.payload.messages.map(message => ({...message, id: v1()}))
            return {
                ...state, messages: [...state.messages, ...newMessages]
                    .filter(getLastMessages)
            }
        case ChatTypes.MESSAGES_RESETED:
            return {...state, messages: []}
        case ChatTypes.STATUS_CHANGED:
            return {...state, ...action.payload}
        default:
            return state
    }
};

export const chatActions = {
    messagesReceived(messages: ChatMessageAPIType[]) {
        return {
            type: ChatTypes.MESSAGES_RECEIVED,
            payload: {messages}
        } as const;
    },
    messagesReseted() {
        return {
            type: ChatTypes.MESSAGES_RESETED
        } as const
    },
    statusChanged(chatStatus: ChatStatusType) {
        return {
            type: ChatTypes.STATUS_CHANGED,
            payload: {chatStatus}
        } as const
    }
};

let _innerMessageSubscriber: MessagesReceivedSubscriberType | null = null;
const messageSubscriber = (dispatch: Dispatch) => {
    if (_innerMessageSubscriber === null) {
        _innerMessageSubscriber = (messages: ChatMessageAPIType []) => {
            dispatch(chatActions.messagesReceived(messages));
        }
    }
    return _innerMessageSubscriber
}

let _innerStatusSubscriber: StatusChangedSubscriberType | null = null;
const chatStatusSubscriber = (dispatch: Dispatch) => {
    if (_innerStatusSubscriber === null) {
        _innerStatusSubscriber = (chatStatus: ChatStatusType) => {
            dispatch(chatActions.statusChanged(chatStatus));
        }
    }
    return _innerStatusSubscriber
}

export const startMessagesListening = (): AppThunk => async (dispatch) => {
    chatAPI.openChannel();
    chatAPI.subscribe("messages-received", messageSubscriber(dispatch));
    chatAPI.subscribe("status-changed", chatStatusSubscriber(dispatch));
};

export const stopMessagesListening = (): AppThunk => async (dispatch) => {
    chatAPI.unsubscribe("messages-received", messageSubscriber(dispatch));
    chatAPI.unsubscribe("status-changed", chatStatusSubscriber(dispatch));
    chatAPI.closeChannel();
    dispatch(chatActions.messagesReseted());
};

export const sendMessage = (message: string): AppThunk => async (dispatch) => {
    chatAPI.sendMessage(message);
}