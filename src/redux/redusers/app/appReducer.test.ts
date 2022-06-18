import {appReducer, InitialStateAppType, setAppError, setAppInitializeValue, setAppMessage} from './appReducer';

let startState: InitialStateAppType
beforeEach(() => {
    startState = {
        initialized: false,
        appError: '',
        appMessage: ''
    }
})

test('correct initialize value should be set to state', () => {
    const endState_1 = appReducer(startState, setAppInitializeValue(true))
    const endState_2 = appReducer(endState_1, setAppInitializeValue(false))
    expect(startState.initialized).toBeFalsy()
    expect(endState_1.initialized).toBeTruthy()
    expect(endState_2.initialized).toBeFalsy()
})
test('correct appError value should be set to state', () => {
    const appError = 'Some error';
    const endState = appReducer(startState, setAppError(appError))
    expect(startState.appError).toBe('');
    expect(endState.appError).toBe(appError);
})
test('correct appMessage value should be set to state', () => {
    const appMessage = 'Some message';
    const endState = appReducer(startState, setAppMessage(appMessage))
    expect(startState.appMessage).toBe('');
    expect(endState.appMessage).toBe(appMessage);
})
