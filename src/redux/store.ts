
import {profileReducer, addPost} from "./redusers/profileReducer/profileReducer";
import {dialogsReducer, } from "./redusers/dialogsReducer/dialogsReducer";
/*
type DialogType = {
    id: number
    /!**
     * Name of contact/friend
     *!/
    name: string
    /!**
     * Image of contact/friend
     *!/
    image: string | null
    /!**
     * Optional background color of component
     *!/
    background?: string
    /!**
     * Optional color text of component
     *!/
    color?: string
};
type MessageType = {
    id: number,
    name: string,
    message: string,
    image: string | null,
    time: string
};


type PostType = {
    id: number
    name: string
    message: string
    likeCount: number
    image: string | null
    background?: string
    color?: string
}

type DialogsDataType = Array<DialogType>
type MessagesDataType = Array<MessageType>
type PostsDataType = Array<PostType>

type DialogsPageType = {
    dialogsData: DialogsDataType
    messagesData: MessagesDataType
    newMessageText: string
}
type ProfilePageType = {
    postsData: PostsDataType,
    newPostText: string
}

type StateType = {
    dialogsPage: DialogsPageType
    profilePage: ProfilePageType
}

type ActionsTypes =
    ReturnType<typeof addPostAC> |
    ReturnType<typeof updateNewPostTextAC> |
    ReturnType<typeof addMessageAC> |
    ReturnType<typeof updateNewMessageTextAC>


type StoreType = {
    _state: StateType
    getState: () => StateType
    _callSubscriber: () => void
    subscribe: (observer: () => void) => void
    dispatch: (action: ActionsTypes) => void
}


const store: StoreType = {
    _state: {
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
        },
        profilePage: {
            postsData: [
                {
                    id: 1,
                    name: 'Ruslan',
                    message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti, eum.',
                    likeCount: 9,
                    image: 'https://sun9-15.userapi.com/impg/O_LNAi5kKsq4-ViNecim4rUQkihvDLuTnXfL2w/BSAIvsvBviM.jpg?size=863x1080&quality=96&sign=8c552a2a19907e2e040b0475efdb6b85&type=album'
                },
                {
                    id: 2,
                    name: 'Mariya',
                    message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur cumque harum illo inventore maiores minus mollitia, quaerat quis rem voluptatibus.',
                    likeCount: 3,
                    image: null
                },
                {
                    id: 3,
                    name: 'Ivan',
                    message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis est, et labore laborum nemo nisi.',
                    likeCount: 87,
                    image: 'https://sun9-53.userapi.com/impf/c623626/v623626744/19d9c/KBDd8fH-BOg.jpg?size=1280x960&quality=96&sign=03d1a85127b8411ce8b5b0b4118f78f6&type=album'
                }
            ],
            newPostText: ''
        }
    },
    _callSubscriber() {
        console.log('state changed')
    },
    getState() {
        return this._state
    },
    subscribe(observer) {
        this._callSubscriber = observer
    },
    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._callSubscriber();
    }
};

*/
