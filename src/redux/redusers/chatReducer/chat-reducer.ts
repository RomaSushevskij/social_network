import {ChatActionType, ChatInitialStateType} from "./types";
import {AppThunk} from "../../redux-store";
import {Dispatch} from "redux";
import {ChatMessageType, SubscriberType} from "../../../api/commonChatAPI/types";
import {chatAPI} from "../../../api/commonChatAPI/commonChatAPI";
import {actions} from "@storybook/addon-actions";


enum ChatTypes {
    MESSAGES_RECEIVED = 'socialNetwork/chat/MESSAGES_RECEIVED',
    MESSAGES_RESETED = 'socialNetwork/chat/MESSAGES_RESETED'
}

export const initialState = {
    messages: [] as ChatMessageType [],
};


export const chatReducer = (state: ChatInitialStateType = initialState, action: ChatActionType): ChatInitialStateType => {
    switch (action.type) {
        case ChatTypes.MESSAGES_RECEIVED:
            return {...state, messages: [...state.messages, ...action.payload.messages]}
        case ChatTypes.MESSAGES_RESETED:
            return {...state, messages: []}
        default:
            return state
    }
};

export const chatActions = {
    messagesReceived(messages: ChatMessageType[]) {
        return {
            type: ChatTypes.MESSAGES_RECEIVED,
            payload: {messages}
        } as const;
    },
    messagesReseted() {
        return {
            type: ChatTypes.MESSAGES_RESETED
        } as const
    }
};

let _innerMessageSubscriber: SubscriberType | null = null;

const messageSubscriber = (dispatch: Dispatch) => {
    if (_innerMessageSubscriber === null) {
        _innerMessageSubscriber = (messages: ChatMessageType []) => {
            dispatch(chatActions.messagesReceived(messages));
        }
    }
    return _innerMessageSubscriber
}

export const startMessagesListening = (): AppThunk => async (dispatch) => {
    chatAPI.openChannel();
    chatAPI.subscribe(messageSubscriber(dispatch))
};

export const stopMessagesListening = (): AppThunk => async (dispatch) => {
    chatAPI.unsubscribe(messageSubscriber(dispatch));
    chatAPI.closeChannel();
    dispatch(chatActions.messagesReseted());
};

export const sendMessage = (message: string): AppThunk => async (dispatch) => {
    chatAPI.sendMessage(message);
}