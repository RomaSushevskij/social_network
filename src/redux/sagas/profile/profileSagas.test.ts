import {getProfile, getProfileWorkerSaga, profileActions, updatePhoto, updatePhotoWorkerSaga} from "./profileSagas";
import {GetProfileDataType, profileAPI, RESPONSE_RESULT_CODES, UpdatePhotoDataType} from "../../../api/api";
import {setProfile, updatePhotoSuccess} from "../../redusers/profileReducer/profileReducer";
import {call, put, select} from "redux-saga/effects";
import {setAppError, setAppMessage} from "../../redusers/app/appReducer";
import {getFullNameSelector} from "../../selectors/authSelectors";
import {setIsFetchingValue} from "../../redusers/usersReducer/usersReducer";
import {setFullNameAndAvatar} from "../../redusers/auth/authReducer";
import {MESSAGES_FOR_SUCCESS_BAR} from "../../../components/generic/SnackBar/SnackBar";

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

test('getProfileWorkerSaga error', () => {
    const action: ReturnType<typeof getProfile> = {type: profileActions.GET_PROFILE, payload: {userId: 12}}
    const error = {message: 'some error'};

    const gen = getProfileWorkerSaga(action);

    expect(gen.next().value).toEqual(call(profileAPI.getProfile, action.payload.userId));
    expect(gen.throw(error).value).toEqual(put(setAppError(error.message)));
});

test('updatePhotoWorkerSaga success', () => {
    const action: ReturnType<typeof updatePhoto> = {
        type: profileActions.UPDATE_PHOTO,
        payload: {photoFile: new File([new Blob()], 'file')}
    };
    const data: UpdatePhotoDataType = {
        data: {
            photos: {
                large: 'large',
                small: 'small',
            }
        },
        fieldsErrors: [],
        messages: [],
        resultCode: RESPONSE_RESULT_CODES.success
    };
    const newAvatar = data.data.photos.large;
    const fullName = 'fullName';

    const gen = updatePhotoWorkerSaga(action);

    expect(gen.next().value).toEqual(select(getFullNameSelector));
    // @ts-ignore
    expect(gen.next(fullName).value).toEqual(put(setIsFetchingValue(true)));
    expect(gen.next().value).toEqual(call(profileAPI.updatePhoto, action.payload.photoFile));
    // @ts-ignore
    expect(gen.next(data).value).toEqual(put(updatePhotoSuccess(newAvatar)));
    expect(gen.next().value).toEqual(put(setFullNameAndAvatar(fullName, newAvatar)));
    expect(gen.next().value).toEqual(put(setAppMessage(MESSAGES_FOR_SUCCESS_BAR.YOUR_PHOTO_UPDATED_SUCCESSFULLY)));
    expect(gen.next().value).toEqual(put(setIsFetchingValue(false)));
});

test('updatePhotoWorkerSaga with responseCode.error', () => {
    const action: ReturnType<typeof updatePhoto> = {
        type: profileActions.UPDATE_PHOTO,
        payload: {photoFile: new File([new Blob()], 'file')}
    };
    const data: UpdatePhotoDataType = {
        data: {
            photos: {
                large: 'large',
                small: 'small',
            }
        },
        fieldsErrors: [],
        messages: ['some error occurred'],
        resultCode: RESPONSE_RESULT_CODES.error
    };
    const fullName = 'fullName';

    const gen = updatePhotoWorkerSaga(action);

    expect(gen.next().value).toEqual(select(getFullNameSelector));
    // @ts-ignore
    expect(gen.next(fullName).value).toEqual(put(setIsFetchingValue(true)));
    expect(gen.next().value).toEqual(call(profileAPI.updatePhoto, action.payload.photoFile));
    // @ts-ignore
    expect(gen.next(data).value).toEqual(put(setAppError(data.messages[0])));
    expect(gen.next().value).toEqual(put(setIsFetchingValue(false)));
});

