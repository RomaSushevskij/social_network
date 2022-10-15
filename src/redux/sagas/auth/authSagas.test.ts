import {getAuthorizationInfoWorkerSaga} from "./authSagas";
import {authMeAPI, GetAuthUserDataType, GetProfileDataType, profileAPI, RESPONSE_RESULT_CODES} from "../../../api/api";
import {call, put, select} from "redux-saga/effects";
import {setAuthUserData, setFullNameAndAvatar} from "../../redusers/auth/authReducer";
import {setProfile} from "../../redusers/profileReducer/profileReducer";
import {getFollowersWorkerSaga} from "../profile/profileSagas";
import {setAppError} from "../../redusers/app/appReducer";


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
    expect(gen.next().value).toEqual(select());
    // @ts-ignore
    expect(gen.next(state).value).toEqual(call(profileAPI.getProfile, data.data.id));
    // @ts-ignore
    expect(gen.next(profileData).value).toEqual(put(setFullNameAndAvatar(fullName, photos.small)));
    expect(gen.next().value).toEqual(put(setProfile(profileData)));
    expect(gen.next().value).toEqual(getFollowersWorkerSaga().next().value)
})

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
})