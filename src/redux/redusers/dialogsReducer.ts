import {ActionsTypes, DialogsPageType, MessageType} from "../store";

const ADD_MESSAGE = 'ADD-MESSAGE';
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';

export const dialogsReducer = (state: DialogsPageType, action: ActionsTypes): DialogsPageType => {
    switch (action.type) {
        case ADD_MESSAGE:
            const newMessage: MessageType = {
                id: state.messagesData.length + 1,
                name: 'Someone',
                message: state.newMessageText,
                image: null,
                time: new Date().toJSON().slice(11, 16)

            };
            state.messagesData.push(newMessage);
            state.newMessageText = '';
            return state;
        case UPDATE_NEW_MESSAGE_TEXT:
            state.newMessageText = action.newMessageText;
            return state;
        default:
            return state
    }
};

export const addMessageAC = () => ({type: ADD_MESSAGE} as const);
export const updateNewMessageTextAC = (newMessageText: string) => ({
    type: UPDATE_NEW_MESSAGE_TEXT,
    newMessageText
} as const);