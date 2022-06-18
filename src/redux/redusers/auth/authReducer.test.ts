import {authReducer, InitialStateAuthType, setAuthUserData, setCaptchaURL, setFullNameAndAvatar} from "./authReducer";
import {AuthUserDataType} from "../../../api/api";

let startState: InitialStateAuthType
beforeEach(() => {
    startState = {
        id: null as null | number,
        email: null as null | string,
        login: null as null | string,
        isAuth: false,
        fullName: null as null | string,
        avatar: null as null | string,
        captchaURL: '',
    }
})

test('correct data should be set', () => {
    const data: AuthUserDataType = {id: 13, email: 'roma.sushevskij@yandex.ru', login: 'react&redux'}
    const endState = authReducer(startState, setAuthUserData(data, true))

    expect(endState.isAuth).toBeTruthy()
    expect(endState.id).toBe(data.id)
    expect(endState.email).toBe(data.email)
    expect(endState.login).toBe(data.login)
    expect(endState.isAuth).toBeTruthy()
})

test('fullName and avatar should be set', () => {
    const endState = authReducer(startState, setFullNameAndAvatar('Roman', '1235555asdfasd'))

    expect(endState.fullName).toBe('Roman')
    expect(endState.avatar).toBe('1235555asdfasd')
})
test('captchaURL should be set', () => {
    const captchaURL = 'https://social-network.samuraijs.com/HelpApp/HelpApp/Captcha?w=200&h=100&c=idhDy2cF1XGCx6ud1pGDUg%3D%3D'
    const endState = authReducer(startState, setCaptchaURL(captchaURL));
    expect(endState.fullName).toBe(null)
    expect(endState.captchaURL).toBe(captchaURL)
})