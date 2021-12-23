import {rerenderIntireTree} from "../render";

export type DialogType = {
    id: number
    name: string
    image: string | null
};
export type MessageType = {
    id: number
    name: string
    message: string
    image: string | null
    time: string
};

export type PostType = {
    id: number
    message: string
    likeCount: number
    image: string | null
}

export type DialogsDataType = Array<DialogType>
export type MessagesDataType = Array<MessageType>
export type PostsDataType = Array<PostType>

export type DialogsPageType = {
    dialogsData: DialogsDataType
    messagesData: MessagesDataType
}
export type ProfilePageType = {
    postsData: PostsDataType
}

export type StateType = {
    dialogsPage: DialogsPageType
    profilePage: ProfilePageType
}


export const state: StateType = {
    dialogsPage: {
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
            {id: 4, name: 'Mira', image: null},
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
                name: 'Mira',
                message: 'Yo',
                image: 'https://sun9-53.userapi.com/impf/c623626/v623626744/19d9c/KBDd8fH-BOg.jpg?size=1280x960&quality=96&sign=03d1a85127b8411ce8b5b0b4118f78f6&type=album',
                time: '13:08'
            },
            {id: 4, name: 'Mother', message: 'Why yo?', image: null, time: '14:05'}
        ]
    },
    profilePage: {
        postsData: [
            {
                id: 1,
                message: "Hi, how are you?",
                likeCount: 9,
                image: 'https://sun9-15.userapi.com/impg/O_LNAi5kKsq4-ViNecim4rUQkihvDLuTnXfL2w/BSAIvsvBviM.jpg?size=863x1080&quality=96&sign=8c552a2a19907e2e040b0475efdb6b85&type=album'
            },
            {id: 2, message: "Hi, it's my first post", likeCount: 3, image: null},
            {
                id: 3,
                message: "hello",
                likeCount: 87,
                image: 'https://sun9-53.userapi.com/impf/c623626/v623626744/19d9c/KBDd8fH-BOg.jpg?size=1280x960&quality=96&sign=03d1a85127b8411ce8b5b0b4118f78f6&type=album'
            }
        ]
    }
};

export const addNewPost = (postText: string) => {
    const newPost: PostType = {
        id: state.profilePage.postsData.length + 1,
        message: postText,
        likeCount: 0,
        image: null
    };
    state.profilePage.postsData.push(newPost);
    rerenderIntireTree(state);
};

export const addNewMessage = (messageText: string) => {
    const newMessage: MessageType = {
        id: state.dialogsPage.messagesData.length + 1,
        name: 'Someone',
        message: messageText,
        image: null,
        time: '13:00'
    };
    state.dialogsPage.messagesData.push(newMessage);

    rerenderIntireTree(state);
};

