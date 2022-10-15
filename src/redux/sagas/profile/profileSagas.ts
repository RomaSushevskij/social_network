import {
    GetProfileDataType,
    GetUsersDataType,
    profileAPI,
    RESPONSE_RESULT_CODES,
    UpdatePhotoDataType,
    UpdateProfileDataType,
    UpdateStatusDataType,
    UploadContactsModelType,
    UploadProfileModelType,
    usersAPI
} from "../../../api/api";
import {AxiosError} from "axios";
import {setAppError, setAppMessage} from "../../redusers/app/appReducer";
import {setFollowers, setProfile, setStatus, updatePhotoSuccess} from "../../redusers/profileReducer/profileReducer";
import {call, put, select, takeEvery} from "redux-saga/effects";
import {MESSAGES_FOR_SUCCESS_BAR} from "../../../components/generic/SnackBar/SnackBar";
import {setIsFetchingValue} from "../../redusers/usersReducer/usersReducer";
import {getAuthorizationInfo, setFullNameAndAvatar} from "../../redusers/auth/authReducer";
import {getFullNameSelector} from "../../selectors/authSelectors";
import {PATH} from "../../../App";
import {getProfileSelector} from "../../selectors/profileSelectors";

enum profileActions {
    GET_PROFILE = 'profile/GET_PROFILE',
    GET_STATUS = 'profile/GET_STATUS',
    UPDATE_STATUS = 'profile/UPDATE_STATUS',
    UPDATE_PROFILE = 'profile/UPDATE_PROFILE',
    UPDATE_CONTACTS = 'profile/UPDATE_CONTACTS',
    UPDATE_PHOTO = 'profile/UPDATE_PHOTO',
    GET_FOLLOWERS = 'profile/GET_FOLLOWERS',
}

export function* getProfileWorkerSaga(action: ReturnType<typeof getProfile>) {
    try {
        const data: GetProfileDataType = yield call(profileAPI.getProfile, action.payload.userId);
        yield put(setProfile(data));
    } catch (e) {
        const error = e as AxiosError;
        yield put(setAppError(error.message));
    }
}

export function* getStatusWorkerSaga(action: ReturnType<typeof getStatus>) {
    try {
        const data: string = yield call(profileAPI.getStatus, action.payload.userId);
        yield put(setStatus(data))
    } catch (e) {
        const error = e as AxiosError;
        yield put(setAppError(error.message));
    }
}

export function* updateStatusWorkerSaga(action: ReturnType<typeof updateStatus>) {
    try {
        const data: UpdateStatusDataType = yield call(profileAPI.updateStatus, action.payload.status);
        if (data.resultCode === RESPONSE_RESULT_CODES.success) {
            yield put(setStatus(action.payload.status))
            yield put(setAppMessage(MESSAGES_FOR_SUCCESS_BAR.STATUS_CHANGED_SUCCESSFULLY))
        } else {
            if (data.messages.length) yield put(setAppError(data.messages[0]))
        }
    } catch (e) {
        const error = e as AxiosError;
        yield put(setAppError(error.message));
    }
}

export function* getFollowersWorkerSaga() {
    try {
        const followers: GetUsersDataType = yield call(usersAPI.getUsers, 100, 1, {friend: true, term: ""});
        yield put(setFollowers(followers.items));
    } catch (e) {
        const error = e as AxiosError;
        yield put(setAppError(error.message));
    }
}

export function* updatePhotoWorkerSaga(action: ReturnType<typeof updatePhoto>) {
    try {
        const fullName: string = yield select(getFullNameSelector)
        yield put(setIsFetchingValue(true));
        const data: UpdatePhotoDataType = yield call(profileAPI.updatePhoto, action.payload.photoFile);
        if (data.resultCode === RESPONSE_RESULT_CODES.success) {
            const newAvatar = data.data.photos.large;
            yield put(updatePhotoSuccess(newAvatar))
            yield put(setFullNameAndAvatar(fullName, newAvatar))
            yield put(setAppMessage(MESSAGES_FOR_SUCCESS_BAR.YOUR_PHOTO_UPDATED_SUCCESSFULLY))
        } else {
            if (data.messages.length) yield put(setAppError(data.messages[0]))
        }
    } catch (e) {
        const error = e as AxiosError;
        yield put(setAppError(error.message));
    } finally {
        yield put(setIsFetchingValue(false));
    }
}

export function* updateProfileWorkerSaga(action: ReturnType<typeof updateProfile>) {
    const {profileModel, navigate} = action.payload
    try {
        const {userId, contacts} = yield select(getProfileSelector);
        const profileCommonModelType = {...profileModel, contacts: contacts}
        yield put(setIsFetchingValue(true));
        const data: UpdateProfileDataType = yield call(profileAPI.uploadProfile, profileCommonModelType);
        if (data.resultCode === RESPONSE_RESULT_CODES.success) {
            yield put(getProfile(userId))
            navigate(PATH.PROFILE);
            yield getAuthorizationInfo();
            yield put(setAppMessage(MESSAGES_FOR_SUCCESS_BAR.PROFILE_UPDATED_SUCCESSFULLY));
        } else {
            if (data.messages.length) yield put(setAppError(data.messages[0]))
        }
    } catch (e) {
        const error = e as AxiosError;
        yield put(setAppError(error.message));
    } finally {
        yield put(setIsFetchingValue(false));
    }
}

export function* updateContactsWorkerSaga(action: ReturnType<typeof updateContacts>) {
    debugger
    const {contactsModel, navigate} = action.payload;
    try {
        const {fullName, userId, aboutMe, lookingForAJob, lookingForAJobDescription} = yield select(getProfileSelector);
        const profileCommonModelType = {
            fullName,
            userId,
            aboutMe,
            lookingForAJob,
            lookingForAJobDescription,
            contacts: contactsModel
        }
        yield put(setIsFetchingValue(true));
        const data: UpdateProfileDataType = yield call(profileAPI.uploadProfile, profileCommonModelType);
        if (data.resultCode === RESPONSE_RESULT_CODES.success) {
            yield getProfile(userId)
        } else {
            if (data.messages.length) yield put(setAppError(data.messages[0]))
        }
        navigate(PATH.PROFILE)
        yield put(setAppMessage(MESSAGES_FOR_SUCCESS_BAR.CONTACTS_UPDATED_SUCCESSFULLY))
    } catch (e) {
        const error = e as AxiosError;
        yield put(setAppError(error.message));
    } finally {
        yield put(setIsFetchingValue(false));
    }
}

export const getFollowers = () => ({
    type: profileActions.GET_FOLLOWERS
} as const);
export const getProfile = (userId: number) => ({type: profileActions.GET_PROFILE, payload: {userId}} as const);
export const getStatus = (userId: number) => ({type: profileActions.GET_STATUS, payload: {userId}} as const);
export const updateStatus = (status: string) => ({type: profileActions.UPDATE_STATUS, payload: {status}} as const);
export const updatePhoto = (photoFile: any) => ({type: profileActions.UPDATE_PHOTO, payload: {photoFile}} as const);
export const updateProfile = (profileModel: UploadProfileModelType, navigate: Function) => ({
    type: profileActions.UPDATE_PROFILE,
    payload: {profileModel, navigate}
} as const);
export const updateContacts = (contactsModel: UploadContactsModelType, navigate: Function) => ({
    type: profileActions.UPDATE_CONTACTS,
    payload: {contactsModel, navigate}
} as const);

export function* profileWatcherSaga() {
    yield takeEvery(profileActions.GET_FOLLOWERS, getFollowersWorkerSaga)
    yield takeEvery(profileActions.GET_PROFILE, getProfileWorkerSaga)
    yield takeEvery(profileActions.GET_STATUS, getStatusWorkerSaga)
    yield takeEvery(profileActions.UPDATE_STATUS, updateStatusWorkerSaga)
    yield takeEvery(profileActions.UPDATE_PHOTO, updatePhotoWorkerSaga)
    yield takeEvery(profileActions.UPDATE_PROFILE, updateProfileWorkerSaga)
    yield takeEvery(profileActions.UPDATE_CONTACTS, updateContactsWorkerSaga)
}


