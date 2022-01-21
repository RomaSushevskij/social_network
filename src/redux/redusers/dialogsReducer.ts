import {ActionsTypes} from "../redux-store";


const ADD_MESSAGE = 'ADD-MESSAGE';
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';

export type DialogType = {
    id: number
    /**
     * Name of contact/friend
     */
    name: string
    /**
     * Image of contact/friend
     */
    image: string | null
    /**
     * Optional background color of component
     */
    background?: string
    /**
     * Optional color text of component
     */
    color?: string
};
export type MessageType = {
    id: number,
    name: string,
    message: string,
    image: string | null,
    time: string
};

export type DialogsDataType = Array<DialogType>
export type MessagesDataType = Array<MessageType>

export type DialogsPageActionsTypes = ActionsTypes

export type InitialStateType = {
    dialogsData: DialogsDataType
    messagesData: MessagesDataType
    newMessageText: string
}

const initialState: InitialStateType = {
    dialogsData: [
        {
            id: 1,
            name: 'Ruslan',
            image: 'https://sun9-15.userapi.com/impg/O_LNAi5kKsq4-ViNecim4rUQkihvDLuTnXfL2w/BSAIvsvBviM.jpg?size=863x1080&quality=96&sign=8c552a2a19907e2e040b0475efdb6b85&type=album'
        },
        {id: 2, name: 'Dmitry', image: null},
        {
            id: 3,
            name: 'Aleksey',
            image: 'https://sun9-53.userapi.com/impf/c623626/v623626744/19d9c/KBDd8fH-BOg.jpg?size=1280x960&quality=96&sign=03d1a85127b8411ce8b5b0b4118f78f6&type=album'
        },
        {id: 4, name: 'Ivan', image: null},
        {id: 5, name: 'Mother', image: null}
    ],
    messagesData: [
        {
            id: 1,
            name: 'Ruslan',
            message: 'Hi',
            image: 'https://sun9-15.userapi.com/impg/O_LNAi5kKsq4-ViNecim4rUQkihvDLuTnXfL2w/BSAIvsvBviM.jpg?size=863x1080&quality=96&sign=8c552a2a19907e2e040b0475efdb6b85&type=album',
            time: '12:03'
        },
        {id: 2, name: 'Dmitry', message: 'Hi, how are you?', image: null, time: '13:01'},
        {
            id: 3,
            name: 'Ivan',
            message: 'Yo',
            image: 'https://sun9-53.userapi.com/impf/c623626/v623626744/19d9c/KBDd8fH-BOg.jpg?size=1280x960&quality=96&sign=03d1a85127b8411ce8b5b0b4118f78f6&type=album',
            time: '13:08'
        },
        {id: 4, name: 'Mother', message: 'Why yo?', image: null, time: '14:05'}
    ],
    newMessageText: ''
};

export const dialogsReducer = (state = initialState, action: DialogsPageActionsTypes): InitialStateType => {
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