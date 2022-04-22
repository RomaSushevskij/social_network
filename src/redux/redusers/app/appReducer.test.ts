import {appReducer, InitialStateAppType, setAppInitializeValue} from './appReducer';

let startState: InitialStateAppType
beforeEach(() => {
    startState = {
        initialized: false
    }
})

test('correct initialize value should be set to state', () => {
    const endState_1 = appReducer(startState, setAppInitializeValue(true))
    const endState_2 = appReducer(endState_1, setAppInitializeValue(false))
    expect(startState.initialized).toBeFalsy()
    expect(endState_1.initialized).toBeTruthy()
    expect(endState_2.initialized).toBeFalsy()
})
