import {AppStateType} from "../redux-store";
import {ChatMessageType, ChatStatusType} from "../redusers/chatReducer/types";

export const selectMessages = (state: AppStateType): ChatMessageType [] => {
    return state.commonChat.messages;
};
export const selectChatStatus = (state: AppStateType): ChatStatusType => {
    return state.commonChat.chatStatus;
};