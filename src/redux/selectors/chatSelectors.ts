import {AppStateType} from "../redux-store";
import {ChatMessageType} from "../../api/commonChatAPI/types";

export const selectMessages = (state: AppStateType): ChatMessageType [] => {
    return state.commonChat.messages;
}