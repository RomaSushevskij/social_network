import {authActions, getAuthorizationInfoWorkerSaga, login, loginWorkerSaga} from "./authSagas";
import {
    authMeAPI,
    GetAuthUserDataType,
    GetProfileDataType,
    LoginResponseType,
    profileAPI,
    RESPONSE_RESULT_CODES
} from "../../../api/api";
import {call, put, select} from "redux-saga/effects";
import {setAuthUserData, setFullNameAndAvatar} from "../../redusers/auth/authReducer";
import {setProfile} from "../../redusers/profileReducer/profileReducer";
import {getFollowersWorkerSaga} from "../profile/profileSagas";
import {setAppError, setAppMessage} from "../../redusers/app/appReducer";
import {setIsFetchingValue} from "../../redusers/usersReducer/usersReducer";
import {MESSAGES_FOR_SUCCESS_BAR} from "../../../components/generic/SnackBar/SnackBar";
import {getAuthUserIDSelector} from "../../selectors/authSelectors";


test('getAuthorizationInfoWorkerSaga success response code', () => {
    const gen = getAuthorizationInfoWorkerSaga();
    const data: GetAuthUserDataType = {
        data: {id: 12, email: '', login: ''},
        fieldsErrors: [],
        messages: [],
        resultCode: RESPONSE_RESULT_CODES.success
    };
    const profileData: GetProfileDataType = {
        aboutMe: 'aboutMe',
        contacts: {
            facebook: 'facebook',
            website: 'website',
            vk: 'vk',
            twitter: 'twitter',
            instagram: 'instagram',
            youtube: 'youtube',
            github: 'github',
            mainLink: 'mainLink',
        },
        lookingForAJob: true,
        lookingForAJobDescription: 'lookingForAJobDescription',
        fullName: 'fullName',
        userId: 12,
        photos: {
            small: 'small',
            large: 'large',
        },
    }
    const state = {auth: {id: data.data.id}, profilePage: {profile: {fullName: 'fullName', photos: {small: 'small'}},}};
    const {fullName, photos} = state.profilePage.profile;
    expect(gen.next().value).toEqual(call(authMeAPI.getAuthorizationInfo));
    // @ts-ignore
    expect(gen.next(data).value).toEqual(put(setAuthUserData(data.data, true)));
    expect(gen.next().value).toEqual(select(getAuthUserIDSelector));
    // @ts-ignore
    expect(gen.next(data.data.id).value).toEqual(call(profileAPI.getProfile, data.data.id));
    // @ts-ignore
    expect(gen.next(profileData).value).toEqual(put(setFullNameAndAvatar(fullName, photos.small)));
    expect(gen.next().value).toEqual(put(setProfile(profileData)));
    expect(gen.next().value).toEqual(getFollowersWorkerSaga().next().value)
});

test('getAuthorizationInfoWorkerSaga error response code', () => {
    const gen = getAuthorizationInfoWorkerSaga();
    const data: GetAuthUserDataType = {
        data: {id: 12, email: '', login: ''},
        fieldsErrors: [],
        messages: ['some error'],
        resultCode: RESPONSE_RESULT_CODES.error
    };
    expect(gen.next().value).toEqual(call(authMeAPI.getAuthorizationInfo));
    // @ts-ignore
    expect(gen.next(data).value).toEqual(put(setAppError(data.messages[0])))
});

test('getAuthorizationInfoWorkerSaga error', () => {
    const gen = getAuthorizationInfoWorkerSaga();
    const error = {message: 'some error'}

    expect(gen.next().value).toEqual(call(authMeAPI.getAuthorizationInfo));
    expect(gen.throw(error).value).toEqual(put(setAppError(error.message)))
});

test('loginWorkerSaga success', () => {
    const action: ReturnType<typeof login> = {
        type: authActions.LOGIN,
        payload: {email: '', captcha: '', rememberMe: true, password: ''}
    };
    const loginData: LoginResponseType = {
        data: {
            userId: 12
        },
        messages: [],
        fieldsErrors: [],
        resultCode: RESPONSE_RESULT_CODES.success
    };
    const {password, rememberMe, captcha, email} = action.payload;
    const loginGen = loginWorkerSaga(action);

    expect(loginGen.next().value).toEqual(put(setIsFetchingValue(true)));
    expect(loginGen.next().value).toEqual(call(authMeAPI.login, email, password, rememberMe, captcha));
    // @ts-ignore
    expect(loginGen.next(loginData).value).toEqual(getAuthorizationInfoWorkerSaga());
    expect(loginGen.next().value).toEqual(put(setAppMessage(MESSAGES_FOR_SUCCESS_BAR.LOGGED_IN_SUCCESSFULLY)));


})