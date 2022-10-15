import {
    addMessage,
    addDialog,
    dialogsReducer,
    DialogType,
    InitialStateDialogsType,
    MessageType
} from "./dialogsReducer";
import imageLogo from '../../../assets/user-solid.svg'

let startState: InitialStateDialogsType

beforeEach(() => {
    startState = {
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
                isOnline: true,
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
                userName: 'Ruslan',
                message: 'Hi',
                image: 'https://sun9-15.userapi.com/impg/O_LNAi5kKsq4-ViNecim4rUQkihvDLuTnXfL2w/BSAIvsvBviM.jpg?size=863x1080&quality=96&sign=8c552a2a19907e2e040b0475efdb6b85&type=album',
                time: '12:03'
            },
            {id: 2, userName: 'Dmitry', message: 'Hi, how are you?', photo: null, time: '13:01'},
            {
                id: 3,
                userName: 'Ivan',
                message: 'Yo',
                photo: 'https://sun9-53.userapi.com/impf/c623626/v623626744/19d9c/KBDd8fH-BOg.jpg?size=1280x960&quality=96&sign=03d1a85127b8411ce8b5b0b4118f78f6&type=album',
                time: '13:08'
            },
            {id: 4, userName: 'Mother', message: 'Why yo?', photo: null, time: '14:05'}
        ] as Array<MessageType>
    }
})

test('new message should be added to the end of messaagesData', () => {
    const newMessageText = 'It is your latest message'
    const endState = dialogsReducer(startState, addMessage(newMessageText))

    expect(endState.dialogsData.length).toBe(4)
    expect(endState.messagesData.length).toBe(5)
    expect(endState.messagesData[4].message).toBe(newMessageText)
})
test('new dialog should be added to the end of dialogsData', () => {
    const name = 'Roman';
    const userId = 12345;
    const image = imageLogo
    const endState = dialogsReducer(startState, addDialog(name, userId, image))

    expect(endState.dialogsData.length).toBe(5)
    expect(endState.messagesData.length).toBe(4)
    expect(endState.dialogsData[4].name).toBe(name)
})