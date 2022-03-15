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
    id: number
    userId: number
    name: string
    message: string
    image: string | null
    time: string
};
export type InitialStateDialogsType = typeof initialState

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
            userId: 1,
            name: 'Ruslan',
            message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. In, rem!',
            image: 'https://sun9-15.userapi.com/impg/O_LNAi5kKsq4-ViNecim4rUQkihvDLuTnXfL2w/BSAIvsvBviM.jpg?size=863x1080&quality=96&sign=8c552a2a19907e2e040b0475efdb6b85&type=album',
            time: '12:03'
        },

        {id: 2, userId: 20392, name: 'Me', message: 'Lorem ipsum dolor !', image: null, time: '12:10'},
        {id: 3, name: 'Dmitry', userId: 2, message: 'Lorem ipsum dolor sit amet', image: null, time: '13:01'},
        {
            id: 4,
            name: 'Ivan',
            userId: 3,
            message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
            image: 'https://sun9-53.userapi.com/impf/c623626/v623626744/19d9c/KBDd8fH-BOg.jpg?size=1280x960&quality=96&sign=03d1a85127b8411ce8b5b0b4118f78f6&type=album',
            time: '13:08'
        },
        {
            id: 5,
            userId: 20392,
            name: 'Me',
            message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
            image: null,
            time: '13:49'
        },
        {id: 6, name: 'Mother', userId: 4, message: 'Lorem ipsum dolor !', image: null, time: '14:05'},
        {id: 7, name: 'Me', message: 'Lorem ipsum dolor', image: null, time: '14:08'},
        {
            id: 8,
            name: 'Me',
            userId: 20392,
            message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit dolor sit amet, consectetur.',
            image: null,
            time: '14:10'
        },
        {id: 9, name: 'Mother', userId: 5, message: 'Lorem  consectetur adipisicin ipsum dolor !', image: null, time: '14:23'},
    ] as Array<MessageType>,
    newMessageText: ''
};

export const dialogsReducer = (state: InitialStateDialogsType = initialState, action: DialogsActionType): InitialStateDialogsType => {
    switch (action.type) {
        case "social/dialogs/ADD-MESSAGE":
            const newMessage: MessageType = {
                id: state.messagesData.length + 1,
                userId: 20392,
                name: 'Me',
                message: state.newMessageText,
                image: null,
                time: new Date().toLocaleTimeString().slice(0, 5)
            };
            return {...state, messagesData: [...state.messagesData, newMessage], newMessageText: ''}
        case "social/dialogs/UPDATE-NEW-MESSAGE-TEXT":
            return {...state, newMessageText: action.payload.newMessageText}
        default:
            return state
    }
};

export type DialogsActionType =
    ReturnType<typeof addMessageAC> |
    ReturnType<typeof updateNewMessageTextAC>

export const addMessageAC = () => ({type: 'social/dialogs/ADD-MESSAGE'} as const);
export const updateNewMessageTextAC = (newMessageText: string) => ({
    type: 'social/dialogs/UPDATE-NEW-MESSAGE-TEXT',
    payload: {newMessageText}
} as const);