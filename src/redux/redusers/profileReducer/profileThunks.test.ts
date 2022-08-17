import {getProfile, getStatus, ProfileType, setProfile, setStatus} from "./profileReducer";
import {profileAPI} from "../../../api/api";
import {setAppError} from "../app/appReducer";

jest.mock("../../../api/api");
const profileAPIMock = profileAPI as jest.Mocked<typeof profileAPI>;

const dispatchMock = jest.fn();
const getStateMock = jest.fn();

beforeEach(() => {
    dispatchMock.mockClear();
    getStateMock.mockClear();
    profileAPIMock.getProfile.mockClear();
})
test("call of getProfile thunk should be success", async () => {
    const data: ProfileType = {
        aboutMe: "aboutMe",
        fullName: "fullName",
        photos: {
            small: "small",
            large: "large",
        },
        contacts: {
            facebook: "facebook",
            website: "website",
            vk: "vk",
            twitter: "twitter",
            instagram: "instagram",
            youtube: "youtube",
            github: "github",
            mainLink: "mainLink",
        },
        userId: 1,
        lookingForAJob: true,
        lookingForAJobDescription: "lookingForAJobDescription",

    }
    profileAPIMock.getProfile.mockReturnValue(Promise.resolve(data));
    const userId = 1;
    const thunk = getProfile(userId);
    await thunk(dispatchMock, getStateMock, {});

    expect(dispatchMock).toBeCalledTimes(1);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, setProfile(data));
});

test("call of getProfile thunk should be with network error", async () => {
    const error = new Error("network error");
    profileAPIMock.getProfile.mockRejectedValue(error);
    const userId = 1;
    const thunk = getProfile(userId);
    await thunk(dispatchMock, getStateMock, {});

    expect(dispatchMock).toBeCalledTimes(1);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, setAppError(error.message));
});

test("call of getStatus thunk should be success", async () => {
    const data = "status";
    profileAPIMock.getStatus.mockReturnValue(Promise.resolve(data));
    const userId = 1;
    const thunk = getStatus(userId);
    await thunk(dispatchMock, getStateMock, {});

    expect(dispatchMock).toBeCalledTimes(1);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, setStatus(data));
});

test("call of getStatus thunk should be with network error", async () => {
    const error = new Error("network error");
    profileAPIMock.getStatus.mockRejectedValue(error);
    const userId = 1;
    const thunk = getStatus(userId);
    await thunk(dispatchMock, getStateMock, {});

    expect(dispatchMock).toBeCalledTimes(1);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, setAppError(error.message));
});