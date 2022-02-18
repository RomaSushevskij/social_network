import {addPostAC, InitialStateProfileType, likePostAC, PostType, profileReducer, removePostAC} from "./profileReducer";

let startState: InitialStateProfileType
beforeEach(() => {
    startState = {
        postsData: [
            {
                id: 1,
                name: 'Ruslan',
                message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti, eum.',
                likes: {
                    icon: '❤',
                    likeCount: 3,
                },
                isLike: false,
                image: 'https://sun9-15.userapi.com/impg/O_LNAi5kKsq4-ViNecim4rUQkihvDLuTnXfL2w/BSAIvsvBviM.jpg?size=863x1080&quality=96&sign=8c552a2a19907e2e040b0475efdb6b85&type=album'
            },
            {
                id: 2,
                name: 'Mariya',
                message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur cumque harum illo inventore maiores minus mollitia, quaerat quis rem voluptatibus.',
                likes: {
                    icon: '❤',
                    likeCount: 3,
                },
                isLike: false,
                image: null
            },
            {
                id: 3,
                name: 'Ivan',
                message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis est, et labore laborum nemo nisi.',
                likes: {
                    icon: '❤',
                    likeCount: 87,
                },
                isLike: true,
                image: 'https://sun9-53.userapi.com/impf/c623626/v623626744/19d9c/KBDd8fH-BOg.jpg?size=1280x960&quality=96&sign=03d1a85127b8411ce8b5b0b4118f78f6&type=album'
            }
        ] as Array<PostType>,
        newPostText: ''
    }
})

test('new post should be added to the start of postsData', () => {
    const endState = profileReducer(startState, addPostAC())

    expect(endState.postsData.length).toBe(4)
    expect(endState.postsData[0].message).toBe(endState.newPostText)
    expect(endState.postsData[0].id).toBe(4)
})

test('newPostText should be has correct value after update', () => {
    const endState = profileReducer(startState, addPostAC())

    expect(endState.postsData.length).toBe(4)
    expect(endState.postsData[0].message).toBe(endState.newPostText)
    expect(endState.postsData[0].id).toBe(4)
})

test('correct post should be deleted', () => {
    const endState = profileReducer(startState, removePostAC(2))

    expect(endState.postsData.length).toBe(2)
    expect(endState.postsData[0].id).toBe(1)
    expect(endState.postsData[1].id).toBe(3)
})
test('correct post should be liked', () => {
    const endState = profileReducer(startState, likePostAC(2))

    expect(endState.postsData[1].isLike).toBeTruthy()
    expect(endState.postsData[2].isLike).toBeTruthy()
    expect(endState.postsData[0].isLike).toBeFalsy()
    expect(endState.postsData[1].likes.likeCount).toBe(4)
    expect(endState.postsData[0].likes.likeCount).toBe(3)
    expect(endState.postsData[2].likes.likeCount).toBe(87)
})