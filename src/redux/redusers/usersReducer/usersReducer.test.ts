import {
    followAC,
    InitialStateType,
    setCurrentPageAC,
    setUsersAC,
    setUsersTotalCountAC,
    unfollowAC,
    usersReducer
} from "./usersReducer";

let startState: InitialStateType

beforeEach(() => {
    startState = {
        users: [
            {
                name: 'Ruslan',
                id: 1,
                photos: {
                    small: 'https://sun9-15.userapi.com/impg/O_LNAi5kKsq4-ViNecim4rUQkihvDLuTnXfL2w/BSAIvsvBviM.jpg?size=863x1080&quality=96&sign=8c552a2a19907e2e040b0475efdb6b85&type=album',
                    large: null
                },
                status: null,
                followed: false,
                uniqueUrlName: null
            },
            {
                name: 'Mariya',
                id: 2,
                photos: {
                    small: null,
                    large: null
                },
                status: 'I like to live',
                followed: false,
                uniqueUrlName: null
            },
            {
                name: 'Ivan',
                id: 3,
                photos: {
                    small: 'https://sun9-53.userapi.com/impf/c623626/v623626744/19d9c/KBDd8fH-BOg.jpg?size=1280x960&quality=96&sign=03d1a85127b8411ce8b5b0b4118f78f6&type=album',
                    large: null
                },
                status: 'All is good',
                followed: true,
                uniqueUrlName: null
            }
        ],
        usersTotalCount: 0,
        pageSize: 12,
        currentPage: 1,
    }
})

test('correct user should become follower', () => {
    const endState = usersReducer(startState, followAC(2))

    expect(endState.users.length).toBe(3)
    expect(endState.users[0].followed).toBeFalsy()
    expect(endState.users[1].followed).toBeTruthy()
    expect(endState.users[2].followed).toBeTruthy()

})

test('correct user should stop being a follower', () => {
    const endState = usersReducer(startState, unfollowAC(3))

    expect(endState.users.length).toBe(3)
    expect(endState.users[0].followed).toBeFalsy()
    expect(endState.users[1].followed).toBeFalsy()
    expect(endState.users[2].followed).toBeFalsy()
})

test('new users should be set', () => {
    const newUsers = [{
        name: 'Mariya',
        id: 2,
        photos: {
            small: null,
            large: null
        },
        status: 'I like to live',
        followed: false,
        uniqueUrlName: null
    }]
    const endState = usersReducer(startState, setUsersAC(newUsers))

    expect(endState.users.length).toBe(1)
    expect(endState.users).toStrictEqual(newUsers)
})

test('correct page should be set as currentPage', () => {

    const endState = usersReducer(startState, setCurrentPageAC(6))

    expect(endState.currentPage).toBe(6)
    expect(endState.usersTotalCount).toBe(0)
    expect(endState.pageSize).toBe(12)
})

test('usersTotalCount should be set', () => {

    const endState = usersReducer(startState, setUsersTotalCountAC(13000))

    expect(endState.currentPage).toBe(1)
    expect(endState.usersTotalCount).toBe(13000)
    expect(endState.pageSize).toBe(12)
})



