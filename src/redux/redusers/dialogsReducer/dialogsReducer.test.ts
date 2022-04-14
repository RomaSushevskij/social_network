import {addMessage, dialogsReducer, DialogType, InitialStateDialogsType, MessageType} from "./dialogsReducer";

let startState: InitialStateDialogsType

beforeEach(() => {
    startState = {
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
        ] as Array<MessageType>
    }
})

test('new message should be added to the end of messaagesData', () => {
    const newMessageText = 'It is your latest message'
    const endState = dialogsReducer(startState, addMessage(newMessageText))

    expect(endState.dialogsData.length).toBe(5)
    expect(endState.messagesData.length).toBe(5)
    expect(endState.messagesData[4].message).toBe(newMessageText)
})