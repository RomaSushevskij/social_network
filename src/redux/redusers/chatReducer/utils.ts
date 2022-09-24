import {ChatMessageAPIType} from "../../../api/commonChatAPI/types";

export const getLastMessages = (message: ChatMessageAPIType, index: number, messages: ChatMessageAPIType []) => {
    return index >= messages.length - 100;
}