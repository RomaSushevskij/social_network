import {
    addPost,
    InitialStateProfileType,
    likePost,
    PostType,
    profileReducer,
    ProfileType,
    removePost,
    setFollowers,
    setProfile,
    setStatus
} from "./profileReducer";

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
        profile: null as ProfileType | null,
        status: "",
        followers: 0,
    }
})

test('new post should be added to the start of postsData', () => {
    const newPostText = 'It is a new post'
    const endState = profileReducer(startState, addPost(newPostText))

    expect(endState.postsData.length).toBe(4)
    expect(endState.postsData[0].message).toBe(newPostText)
    expect(endState.postsData[0].id).toBe(4)
})

test('correct post should be deleted', () => {
    const endState = profileReducer(startState, removePost(2))

    expect(endState.postsData.length).toBe(2)
    expect(endState.postsData[0].id).toBe(1)
    expect(endState.postsData[1].id).toBe(3)
})
test('correct post should be liked', () => {
    const endState = profileReducer(startState, likePost(2))

    expect(endState.postsData[1].isLike).toBeTruthy()
    expect(endState.postsData[2].isLike).toBeTruthy()
    expect(endState.postsData[0].isLike).toBeFalsy()
    expect(endState.postsData[1].likes.likeCount).toBe(4)
    expect(endState.postsData[0].likes.likeCount).toBe(3)
    expect(endState.postsData[2].likes.likeCount).toBe(87)
})

test('selected profile should be set', () => {

    const profile2 = {
        "aboutMe": "я круто чувак 1001%",
        "contacts": {
            "facebook": "facebook.com",
            "website": null,
            "vk": "vk.com/dimych",
            "twitter": "https://twitter.com/@sdf",
            "instagram": "instagra.com/sds",
            "youtube": null,
            "github": "github.com",
            "mainLink": null
        },
        "lookingForAJob": true,
        "lookingForAJobDescription": "не ищу, а дурачусь",
        "fullName": "samurai dimych",
        "userId": 2,
        "photos": {
            "small": "https://social-network.samuraijs.com/activecontent/images/users/2/user-small.jpg?v=29",
            "large": "https://social-network.samuraijs.com/activecontent/images/users/2/user.jpg?v=29"
        }
    }

    const endState = profileReducer(startState, setProfile(profile2))

    expect(endState.profile).not.toBeNull()
    expect(endState.profile).toStrictEqual(profile2)
})
test('new status should be set to state', () => {
    const status = "My new status"
    const endState = profileReducer(startState, setStatus(status))

    expect(startState.status).toBe("")
    expect(endState.status).toBe(status)
})
test('new followers count should be set to state', () => {
    const followers = [{
        name: 'Roman',
        id: 131616,
        uniqueUrlName: 'Roman',
        photos: {large: 'asdfa', small: 'asdfas'},
        status: 'ok',
        followed: true
    },
        {
            name: 'Lena',
            id: 23456,
            uniqueUrlName: 'Roman',
            photos: {large: 'asdfa', small: 'asdfas'},
            status: 'ok',
            followed: false
        },
        {
            name: 'Ameliya',
            id: 49849,
            uniqueUrlName: 'Roman',
            photos: {large: 'asdfa', small: 'asdfas'},
            status: 'ok',
            followed: true
        }];
    const endState = profileReducer(startState, setFollowers(followers))

    expect(startState.followers).toBe(0)
    expect(endState.followers).toBe(2)
})