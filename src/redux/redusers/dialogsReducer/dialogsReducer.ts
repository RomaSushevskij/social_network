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
    isOnline: boolean
    userId:number
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
            userId: 1,
            image: 'http://demo.foxthemes.net/instellohtml/assets/images/avatars/avatar-2.jpg',
            isOnline: true,
        },
        {
            id: 2,
            name: 'Dmitry',
            userId: 2,
            image: 'http://demo.foxthemes.net/instellohtml/assets/images/avatars/avatar-3.jpg',
            isOnline: true,
        },
        {
            id: 3,
            name: 'Aleksey',
            userId: 4,
            image: 'http://demo.foxthemes.net/instellohtml/assets/images/avatars/avatar-2.jpg',
            isOnline: false,
        },
        {
            id: 4,
            name: 'Ivan',
            userId: 3,
            image: 'http://demo.foxthemes.net/instellohtml/assets/images/avatars/avatar-7.jpg',
            isOnline: true,
        },
    ] as Array<DialogType>,
    messagesData: [
        {
            id: 1,
            userId: 1,
            name: 'Ruslan',
            message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. In, rem!',
            image: 'http://demo.foxthemes.net/instellohtml/assets/images/avatars/avatar-2.jpg',
            time: '12:03'
        },

        {id: 2, userId: 20392, name: 'Me', message: 'Lorem ipsum dolor !', image: null, time: '12:10'},
        {
            id: 3,
            name: 'Dmitry',
            userId: 2,
            message: 'Lorem ipsum dolor sit amet',
            image: 'http://demo.foxthemes.net/instellohtml/assets/images/avatars/avatar-3.jpg',
            time: '13:01'
        },
        {
            id: 4,
            name: 'Ivan',
            userId: 3,
            message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
            image: 'http://demo.foxthemes.net/instellohtml/assets/images/avatars/avatar-7.jpg',
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
        {
            id: 6,
            name: 'Ivan',
            userId: 3,
            message: 'Lorem ipsum dolor !',
            image: 'http://demo.foxthemes.net/instellohtml/assets/images/avatars/avatar-7.jpg',
            time: '14:05'
        },
        {id: 7, userId: 20392, name: 'Me', message: 'Lorem ipsum dolor', image: null, time: '14:08'},
        {
            id: 8,
            name: 'Me',
            userId: 20392,
            message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit dolor sit amet, consectetur.',
            image: null,
            time: '14:10'
        },

    ] as Array<MessageType>,
};

export const dialogsReducer = (state: InitialStateDialogsType = initialState, action: DialogsActionType): InitialStateDialogsType => {
    switch (action.type) {
        case "social/dialogs/ADD-MESSAGE":
            const newMessage: MessageType = {
                id: state.messagesData.length + 1,
                userId: 20392,
                name: 'Me',
                message: action.payload.newMessageText,
                image: null,
                time: new Date().toLocaleTimeString().slice(0, 5)
            };
            return {...state, messagesData: [...state.messagesData, newMessage]}
        default:
            return state
    }
};

export type DialogsActionType =
    ReturnType<typeof addMessage>

export const addMessage = (newMessageText: string) => ({
    type: 'social/dialogs/ADD-MESSAGE',
    payload: {newMessageText}
} as const);