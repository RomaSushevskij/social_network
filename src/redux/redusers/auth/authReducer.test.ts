import {authReducer, InitialStateAuthType, setAuthUserData, setFullNameAndAvatar} from "./authReducer";
import {AuthUserDataType} from "../../../api/api";

let startState: InitialStateAuthType
beforeEach(()=>{
    startState = {
        id: null as null | number,
        email: null as null | string,
        login: null as null | string,
        isAuth: false,
        fullName: null as null | string,
        avatar: null as null | string
    }
})

test('correct data should be set', () => {
    const data: AuthUserDataType = {id:13, email: 'roma.sushevskij@yandex.ru', login:'react&redux'}
    const endState = authReducer(startState, setAuthUserData(data))

    expect(endState.isAuth).toBeTruthy()
    expect(endState.id).toBe(data.id)
    expect(endState.email).toBe(data.email)
    expect(endState.login).toBe(data.login)
})

test('fullName and avatar should be set', () => {
    const endState = authReducer(startState, setFullNameAndAvatar('Roman', '1235555asdfasd'))

    expect(endState.fullName).toBe('Roman')
    expect(endState.avatar).toBe('1235555asdfasd')
})