import {chatActions, initialState} from "./chat-reducer";
import {ChatMessageAPIType} from "../../../api/commonChatAPI/types";

export type ChatInitialStateType = typeof initialState;

export type ChatMessageType = ChatMessageAPIType & { id: string };

export type  ChatActionType =
    | ReturnType<typeof chatActions.messagesReceived>
    | ReturnType<typeof chatActions.messagesReseted>
    | ReturnType<typeof chatActions.statusChanged>

export type ChatStatusType = 'pending' | 'ready' | 'error';


