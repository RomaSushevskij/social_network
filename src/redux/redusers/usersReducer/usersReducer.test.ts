import {
    becomeFollower,
    InitialStateUsersType,
    setCurrentPage, setIsFetchingValue,
    setUsers,
    setUsersTotalCount,
    stopBeingFollower, toggleFollowingInProcess,
    usersReducer
} from "./usersReducer";

let startState: InitialStateUsersType

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
        isFetching: false,
        followingInProcessUsersId: [] as Array<number>
    }
})

test('correct user should become follower', () => {
    const endState = usersReducer(startState, becomeFollower(2))

    expect(endState.users.length).toBe(3)
    expect(endState.users[0].followed).toBeFalsy()
    expect(endState.users[1].followed).toBeTruthy()
    expect(endState.users[2].followed).toBeTruthy()

})

test('correct user should stop being a follower', () => {
    const endState = usersReducer(startState, stopBeingFollower(3))

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
    const endState = usersReducer(startState, setUsers(newUsers))

    expect(endState.users.length).toBe(1)
    expect(endState.users).toStrictEqual(newUsers)
})

test('correct page should be set as currentPage', () => {

    const endState = usersReducer(startState, setCurrentPage(6))

    expect(endState.currentPage).toBe(6)
    expect(endState.usersTotalCount).toBe(0)
    expect(endState.pageSize).toBe(12)
})

test('usersTotalCount should be set', () => {

    const endState = usersReducer(startState, setUsersTotalCount(13000))

    expect(endState.currentPage).toBe(1)
    expect(endState.usersTotalCount).toBe(13000)
    expect(endState.pageSize).toBe(12)
})
test('value of isFetching should be correct', () => {

    const endState1 = usersReducer(startState, setIsFetchingValue(true))
    const endState2 = usersReducer(endState1, setIsFetchingValue(false))

    expect(endState1.isFetching).toBeTruthy()
    expect(endState1.usersTotalCount).toBe(0)
    expect(endState1.pageSize).toBe(12)
    expect(endState1.currentPage).toBe(1)

    expect(endState2.isFetching).toBeFalsy()
    expect(endState2.usersTotalCount).toBe(0)
    expect(endState2.pageSize).toBe(12)
    expect(endState2.currentPage).toBe(1)
})

test('followings button of user with selected id should be disabled at the time of request', () => {

    let endState1 = usersReducer(startState, toggleFollowingInProcess(2, true))
    expect(endState1.followingInProcessUsersId[0]).toBe(2)
    setInterval(()=>{
        endState1 = usersReducer(endState1, toggleFollowingInProcess(2, false))
    }, 3000)
    setInterval(()=>{
        expect(endState1.followingInProcessUsersId.length).toBe(0)
    }, )


})






