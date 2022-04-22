import {AppStateType} from "../redux-store";
import {DialogType, MessageType} from '../redusers/dialogsReducer/dialogsReducer';

export const getMessagesDataSelector = (state: AppStateType): MessageType[] => {
    return state.dialogsPage.messagesData
}
export const getDialogsDataSelector = (state: AppStateType): DialogType[] => {
    return state.dialogsPage.dialogsData
}
