import {
    getProfile,
    getStatus,
    InitialStateProfileType,
    ProfileType,
    setProfile,
    setStatus,
    updatePhoto,
    updatePhotoSuccess,
    updateProfile,
    updateStatus
} from "./profileReducer";
import {
    profileAPI,
    RESPONSE_RESULT_CODES,
    UpdatePhotoDataType,
    UpdateProfileDataType,
    UpdateStatusDataType,
    UploadProfileModelType
} from "../../../api/api";
import {setAppError, setAppMessage} from "../app/appReducer";
import {MESSAGES_FOR_SUCCESS_BAR} from "../../../components/generic/SnackBar/SnackBar";
import {setIsFetchingValue} from "../usersReducer/usersReducer";
import {getAuthorizationInfo, setFullNameAndAvatar} from "../auth/authReducer";

jest.mock("../../../api/api");
const profileAPIMock = profileAPI as jest.Mocked<typeof profileAPI>;

const profilePage: InitialStateProfileType = {
    profile: {
        fullName: "fullName",
        userId: 1,
        photos: {
            large: "large",
            small: "small",
        },
        lookingForAJobDescription: "lookingForAJobDescription",
        lookingForAJob: true,
        contacts: {
            facebook: "facebook",
            github: "github",
            instagram: "instagram",
            mainLink: "mainLink",
            vk: "vk",
            twitter: "twitter",
            website: "website",
            youtube: "youtube",
        },
        aboutMe: "aboutMe"
    },
    status: "",
    followers: [],
    postsData: []
}
const dispatchMock = jest.fn();
let getStateMock = jest.fn();


beforeEach(() => {
    getStateMock = jest.fn().mockReturnValue({profilePage});
    dispatchMock.mockClear();
    getStateMock.mockClear();
    profileAPIMock.getProfile.mockClear();
    profileAPIMock.getStatus.mockClear();
    profileAPIMock.updateStatus.mockClear();
    profileAPIMock.updatePhoto.mockClear();
    profileAPIMock.uploadProfile.mockClear();

})

describe("getProfile thunk tests", () => {
    const data: ProfileType = profilePage.profile;
    const userId = 1;

    test("call of getProfile thunk should be success", async () => {
        profileAPIMock.getProfile.mockReturnValue(Promise.resolve(data));

        const thunk = getProfile(userId);
        await thunk(dispatchMock, getStateMock, {});

        expect(dispatchMock).toBeCalledTimes(1);
        expect(dispatchMock).toHaveBeenNthCalledWith(1, setProfile(data));
    });

    test("call of getProfile thunk should be with network error", async () => {
        const error = new Error("network error");
        profileAPIMock.getProfile.mockRejectedValue(error);

        const thunk = getProfile(userId);
        await thunk(dispatchMock, getStateMock, {});

        expect(dispatchMock).toBeCalledTimes(1);
        expect(dispatchMock).toHaveBeenNthCalledWith(1, setAppError(error.message));
    });


});

describe("getStatus thunk tests", () => {
    const data = "status";
    const userId = 1;

    test("call of getStatus thunk should be success", async () => {
        profileAPIMock.getStatus.mockReturnValue(Promise.resolve(data));

        const thunk = getStatus(userId);
        await thunk(dispatchMock, getStateMock, {});

        expect(dispatchMock).toBeCalledTimes(1);
        expect(dispatchMock).toHaveBeenNthCalledWith(1, setStatus(data));
    });

    test("call of getStatus thunk should be with network error", async () => {
        const error = new Error("network error");
        profileAPIMock.getStatus.mockRejectedValue(error);

        const thunk = getStatus(userId);
        await thunk(dispatchMock, getStateMock, {});

        expect(dispatchMock).toBeCalledTimes(1);
        expect(dispatchMock).toHaveBeenNthCalledWith(1, setAppError(error.message));
    });
});


describe("updateStatus thunk tests", () => {
    const getData = (type: "success" | "error"): UpdateStatusDataType => {
        const responseData: UpdateStatusDataType = {
            data: {},
            messages: [],
            resultCode: RESPONSE_RESULT_CODES.success,
            fieldsErrors: []
        };
        if (type === "error") {
            responseData.resultCode = RESPONSE_RESULT_CODES.error
            responseData.messages[0] = "some error occurred";
        }
        return responseData;
    };
    const status = "new status";

    test("call of updateStatus thunk should be success", async () => {
        const data: UpdateStatusDataType = getData("success");
        profileAPIMock.updateStatus.mockReturnValue(Promise.resolve(data));
        const thunk = updateStatus(status);
        await thunk(dispatchMock, getStateMock, {});

        expect(dispatchMock).toBeCalledTimes(2);
        expect(dispatchMock).toHaveBeenNthCalledWith(1, setStatus(status));
        expect(dispatchMock).toHaveBeenNthCalledWith(2, setAppMessage(MESSAGES_FOR_SUCCESS_BAR.STATUS_CHANGED_SUCCESSFULLY));
    });

    test("call of updateStatus thunk should be with error of server", async () => {
        const data: UpdateStatusDataType = getData("error");
        profileAPIMock.updateStatus.mockReturnValue(Promise.resolve(data));

        const thunk = updateStatus(status);
        await thunk(dispatchMock, getStateMock, {});

        expect(dispatchMock).toBeCalledTimes(1);
        expect(dispatchMock).toHaveBeenNthCalledWith(1, setAppError(data.messages[0]));
    });

    test("call of updateStatus thunk should be with error of network", async () => {
        const status = "new status";
        const error = new Error("network error")
        profileAPIMock.updateStatus.mockRejectedValue(error);

        const thunk = updateStatus(status);
        await thunk(dispatchMock, getStateMock, {});

        expect(dispatchMock).toBeCalledTimes(1);
        expect(dispatchMock).toHaveBeenNthCalledWith(1, setAppError(error.message));
    });
});


describe("updatePhoto thunks tests", () => {
    const getData = (type: "success" | "error"): UpdatePhotoDataType => {
        const responseData: UpdatePhotoDataType = {
            data: {
                photos: {
                    large: "large",
                    small: "small",
                },
            },
            fieldsErrors: [],
            messages: [],
            resultCode: RESPONSE_RESULT_CODES.success
        };
        if (type === "error") {
            responseData.resultCode = RESPONSE_RESULT_CODES.error
            responseData.messages[0] = "some error occurred";
        }
        return responseData
    };
    const file = new File([""], "fileName");

    test("call of updatePhoto thunk should be success", async () => {
        const data = getData("success")
        profileAPIMock.updatePhoto.mockReturnValue(Promise.resolve(data));
        const newAvatar = data.data.photos.large;
        const fullName = profilePage.profile.fullName;

        const thunk = updatePhoto(file);
        await thunk(dispatchMock, getStateMock, {});

        expect(getStateMock).toBeCalledTimes(1);
        expect(dispatchMock).toBeCalledTimes(5);
        expect(dispatchMock).toHaveBeenNthCalledWith(1, setIsFetchingValue(true));
        expect(dispatchMock).toHaveBeenNthCalledWith(2, updatePhotoSuccess(newAvatar));
        expect(dispatchMock).toHaveBeenNthCalledWith(3, setFullNameAndAvatar(fullName, newAvatar));
        expect(dispatchMock).toHaveBeenNthCalledWith(4, setAppMessage(MESSAGES_FOR_SUCCESS_BAR.YOUR_PHOTO_UPDATED_SUCCESSFULLY));
        expect(dispatchMock).toHaveBeenNthCalledWith(5, setIsFetchingValue(false));
    });

    test("call of updatePhoto thunk should be with error of server", async () => {
        const data = getData("error");
        profileAPIMock.updatePhoto.mockReturnValue(Promise.resolve(data));

        const thunk = updatePhoto(file);
        await thunk(dispatchMock, getStateMock, {});

        expect(getStateMock).toBeCalledTimes(1);
        expect(dispatchMock).toBeCalledTimes(3);
        expect(dispatchMock).toHaveBeenNthCalledWith(1, setIsFetchingValue(true));
        expect(dispatchMock).toHaveBeenNthCalledWith(2, setAppError(data.messages[0]));
        expect(dispatchMock).toHaveBeenNthCalledWith(3, setIsFetchingValue(false));
    });

    test("call of updatePhoto thunk should be with error of network", async () => {
        const error = new Error("network error");
        profileAPIMock.updatePhoto.mockRejectedValue(error);

        const thunk = updatePhoto(file);
        await thunk(dispatchMock, getStateMock, {});

        expect(getStateMock).toBeCalledTimes(1);
        expect(dispatchMock).toBeCalledTimes(3);
        expect(dispatchMock).toHaveBeenNthCalledWith(1, setIsFetchingValue(true));
        expect(dispatchMock).toHaveBeenNthCalledWith(2, setAppError(error.message));
        expect(dispatchMock).toHaveBeenNthCalledWith(3, setIsFetchingValue(false));
    });
});

describe("updateProfile thunk tests", () => {
    const getData = (type: "success" | "error"): UpdateStatusDataType => {
        const responseData: UpdateStatusDataType = {
            data: {},
            messages: [],
            resultCode: RESPONSE_RESULT_CODES.success,
            fieldsErrors: []
        };
        if (type === "error") {
            responseData.resultCode = RESPONSE_RESULT_CODES.error
            responseData.messages[0] = "some error occurred";
        }
        return responseData;
    };
    const profileModel: UploadProfileModelType = {
        userId: 1,
        lookingForAJob: true,
        lookingForAJobDescription: "lookingForAJobDescription",
        fullName: "fullName",
        aboutMe: "aboutMe",
    }
    const userId = profilePage.profile.userId;
    const navigate = jest.fn();

    test("call of updateProfile should be success", async () => {
        const data: UpdateProfileDataType = getData("success");
        profileAPIMock.uploadProfile.mockReturnValue(Promise.resolve(data));

        const thunk = updateProfile(profileModel, navigate);
        await thunk(dispatchMock, getStateMock, {});

        expect(dispatchMock).toBeCalledTimes(5);
        expect(getStateMock).toBeCalledTimes(1);
        expect(dispatchMock).toHaveBeenNthCalledWith(1, setIsFetchingValue(true));
        expect(dispatchMock).toHaveBeenNthCalledWith(4, setAppMessage(MESSAGES_FOR_SUCCESS_BAR.PROFILE_UPDATED_SUCCESSFULLY));
        expect(dispatchMock).toHaveBeenNthCalledWith(5, setIsFetchingValue(false));


    });
});
