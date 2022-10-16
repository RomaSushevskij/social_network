import {getProfile, getProfileWorkerSaga, profileActions} from "./profileSagas";
import {GetProfileDataType, profileAPI} from "../../../api/api";
import {setProfile} from "../../redusers/profileReducer/profileReducer";
import {call, put} from "redux-saga/effects";

test('getProfileWorkerSaga success', () => {
    const action: ReturnType<typeof getProfile> = {type: profileActions.GET_PROFILE, payload: {userId: 12}}
    const data: GetProfileDataType = {
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

    const gen = getProfileWorkerSaga(action);

    expect(gen.next().value).toEqual(call(profileAPI.getProfile, action.payload.userId));
    expect(gen.next(data).value).toEqual(put(setProfile(data)));

});

