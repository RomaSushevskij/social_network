import {chatActions, initialState} from "./chat-reducer";

export type ChatInitialStateType = typeof initialState;

export type  ChatActionType =
    | ReturnType<typeof chatActions.messagesReceived>
    | ReturnType<typeof chatActions.messagesReseted>