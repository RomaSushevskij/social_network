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
export type InitialStateType = typeof initialState

const initialState = {
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
    ] as Array<DialogType>,
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
    ] as Array<MessageType>,
    newMessageText: ''
};

export const dialogsReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "social/dialogs/ADD-MESSAGE":
            const newMessage: MessageType = {
                id: state.messagesData.length + 1,
                name: 'Someone',
                message: state.newMessageText,
                image: null,
                time: new Date().toJSON().slice(11, 16)
            };
            return {...state, messagesData: [...state.messagesData, newMessage], newMessageText: ''}
        case "social/dialogs/UPDATE-NEW-MESSAGE-TEXT":
            return {...state, newMessageText: action.payload.newMessageText}
        default:
            return state
    }
};

export type ActionType =
    ReturnType<typeof addMessageAC> |
    ReturnType<typeof updateNewMessageTextAC>

export const addMessageAC = () => ({type: 'social/dialogs/ADD-MESSAGE'} as const);
export const updateNewMessageTextAC = (newMessageText: string) => ({
    type: 'social/dialogs/UPDATE-NEW-MESSAGE-TEXT',
    payload: {newMessageText}
} as const);