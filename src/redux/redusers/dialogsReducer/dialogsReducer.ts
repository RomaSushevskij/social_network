import RuslanLogo from '../../../assets/users-logo/Ruslan.jpg'
import DmitryLogo from '../../../assets/users-logo/Dmitry.jpg'
import AlekseyLogo from '../../../assets/users-logo/Aleksey.jpg'
import IvanLogo from '../../../assets/users-logo/Ivan.jpg'

export enum DIALOGS_ACTIONS_TYPES {
    ADD_MESSAGE = 'social/dialogs/ADD-ADD_MESSAGE',
    ADD_DIALOG = 'social/dialogs/ADD-ADD_DIALOG',

}

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
    userId: number
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
            userId: 184,
            image: RuslanLogo,
            isOnline: true,
        },
        {
            id: 2,
            name: 'Dmitry',
            userId: 185,
            image: DmitryLogo,
            isOnline: true,
        },
        {
            id: 3,
            name: 'Aleksey',
            userId: 186,
            image: AlekseyLogo,
            isOnline: false,
        },
        {
            id: 4,
            name: 'Ivan',
            userId: 187,
            image: IvanLogo,
            isOnline: true,
        },
    ] as Array<DialogType>,
    messagesData: [
        {
            id: 1,
            userId: 184,
            name: 'Ruslan',
            message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. In, rem!',
            image: RuslanLogo,
            time: '12:03'
        },

        {id: 2, userId: 20392, name: 'Me', message: 'Lorem ipsum dolor !', image: null, time: '12:10'},
        {
            id: 3,
            name: 'Dmitry',
            userId: 185,
            message: 'Lorem ipsum dolor sit amet',
            image: DmitryLogo,
            time: '13:01'
        },
        {
            id: 4,
            name: 'Ivan',
            userId: 187,
            message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
            image: IvanLogo,
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
            userId: 187,
            message: 'Lorem ipsum dolor !',
            image: IvanLogo,
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
        case DIALOGS_ACTIONS_TYPES.ADD_MESSAGE:
            const newMessage: MessageType = {
                id: state.messagesData.length + 1,
                userId: 20392,
                name: 'Me',
                message: action.payload.newMessageText,
                image: null,
                time: new Date().toLocaleTimeString().slice(0, 5)
            };
            return {...state, messagesData: [...state.messagesData, newMessage]}
        case DIALOGS_ACTIONS_TYPES.ADD_DIALOG:
            const isDialog = state.dialogsData.find(d => d.userId === action.payload.userId)
            if (!isDialog) {
                const newDialog: DialogType = {
                    id: state.dialogsData.length + 1,
                    userId: action.payload.userId,
                    isOnline: true,
                    image: action.payload.image,
                    name: action.payload.name,
                }
                return {
                    ...state, dialogsData: [...state.dialogsData, newDialog]
                }
            } else return state
        default:
            return state
    }
};

export type DialogsActionType =
    ReturnType<typeof addMessage> |
    ReturnType<typeof addDialog>
export const addMessage = (newMessageText: string) => ({
    type: DIALOGS_ACTIONS_TYPES.ADD_MESSAGE,
    payload: {newMessageText}
} as const);
export const addDialog = (name: string, userId: number, image: string) => ({
    type: DIALOGS_ACTIONS_TYPES.ADD_DIALOG,
    payload: {name, userId, image}
} as const);