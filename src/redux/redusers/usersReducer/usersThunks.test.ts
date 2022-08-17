import {
    becomeFollower,
    follow,
    getUsers, repeatGetUsers, setCurrentPage,
    setIsFetchingValue,
    setUsers,
    setUsersTotalCount,
    stopBeingFollower,
    toggleFollowingInProcess,
    unfollow
} from "./usersReducer";
import {
    DeleteFollowDataType,
    GetUsersDataType,
    PostFollowDataType,
    RESPONSE_RESULT_CODES,
    usersAPI
} from "../../../api/api";
import {setAppError} from "../app/appReducer";
import {deleteFollower} from "../profileReducer/profileReducer";

jest.mock("../../../api/api");
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>;

const dispatchMock = jest.fn();
const getStateMock = jest.fn();

beforeEach(() => {
    dispatchMock.mockClear();
    getStateMock.mockClear();
    usersAPIMock.becomeFollower.mockClear();
    usersAPIMock.stopBeingFollower.mockClear();
    usersAPIMock.getUsers.mockClear();
});

test("call of becomeFollower thunk should be success", async () => {
    const data: PostFollowDataType = {
        data: {},
        messages: [],
        resultCode: RESPONSE_RESULT_CODES.success,
        fieldsErrors: []
    };
    usersAPIMock.becomeFollower.mockReturnValue(Promise.resolve(data));

    const userId = 1;
    const thunk = becomeFollower(userId);
    await thunk(dispatchMock, getStateMock, {});

    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, toggleFollowingInProcess(userId, true));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, follow(userId));
    expect(dispatchMock).toHaveBeenNthCalledWith(3, toggleFollowingInProcess(userId, false));
});

test("call of becomeFollower thunk should be with error of server", async () => {
    const data: PostFollowDataType = {
        data: {},
        messages: ["some error occurred"],
        resultCode: RESPONSE_RESULT_CODES.error,
        fieldsErrors: []
    };
    const userId = 1;
    usersAPIMock.becomeFollower.mockReturnValue(Promise.resolve(data));

    const thunk = becomeFollower(userId);
    await thunk(dispatchMock, getStateMock, {});

    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, toggleFollowingInProcess(userId, true));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, setAppError(data.messages[0]));
    expect(dispatchMock).toHaveBeenNthCalledWith(3, toggleFollowingInProcess(userId, false))
});

test("call of becomeFollower thunk should be with error of network", async () => {
    const userId = 1;
    const error = new Error("network error");
    usersAPIMock.becomeFollower.mockRejectedValueOnce(error);

    const thunk = becomeFollower(userId);
    await thunk(dispatchMock, getStateMock, {});

    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, toggleFollowingInProcess(userId, true));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, setAppError(error.message));
    expect(dispatchMock).toHaveBeenNthCalledWith(3, toggleFollowingInProcess(userId, false));
});

test("call of stopBeingFollower thunk should be success", async () => {
    const userId = 1;
    const data: DeleteFollowDataType = {
        data: {},
        messages: [],
        resultCode: RESPONSE_RESULT_CODES.success,
        fieldsErrors: []
    };
    usersAPIMock.stopBeingFollower.mockReturnValue(Promise.resolve(data));
    const thunk = stopBeingFollower(userId);
    await thunk(dispatchMock, getStateMock, {});

    expect(dispatchMock).toBeCalledTimes(4);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, toggleFollowingInProcess(userId, true));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, unfollow(userId));
    expect(dispatchMock).toHaveBeenNthCalledWith(3, deleteFollower(userId));
    expect(dispatchMock).toHaveBeenNthCalledWith(4, toggleFollowingInProcess(userId, false));
});

test("call of stopBeingFollower thunk should be with error of server", async () => {
    const userId = 1;
    const data: DeleteFollowDataType = {
        data: {},
        messages: ["some error occurred"],
        resultCode: RESPONSE_RESULT_CODES.error,
        fieldsErrors: []
    };
    usersAPIMock.stopBeingFollower.mockReturnValue(Promise.resolve(data));
    const thunk = stopBeingFollower(userId);
    await thunk(dispatchMock, getStateMock, {});

    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, toggleFollowingInProcess(userId, true));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, setAppError(data.messages[0]));
    expect(dispatchMock).toHaveBeenNthCalledWith(3, toggleFollowingInProcess(userId, false));
});

test("call of stopBeingFollower thunk should be with error of network", async () => {
    const userId = 1;
    const error = new Error("network error");
    usersAPIMock.stopBeingFollower.mockRejectedValue(error);

    const thunk = stopBeingFollower(userId);
    await thunk(dispatchMock, getStateMock, {});

    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, toggleFollowingInProcess(userId, true));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, setAppError(error.message));
    expect(dispatchMock).toHaveBeenNthCalledWith(3, toggleFollowingInProcess(userId, false));
});

test("call of getUsers thunk should be success", async () => {
    const pageSize = 10;
    const currentPage = 1;
    const data: GetUsersDataType = {
        error: null,
        items: [{
            name: 'Ruslan',
            id: 1,
            photos: {
                small: 'https://sun9-15.userapi.com/impg/O_LNAi5kKsq4-ViNecim4rUQkihvDLuTnXfL2w/BSAIvsvBviM.jpg?size=863x1080&quality=96&sign=8c552a2a19907e2e040b0475efdb6b85&type=album',
                large: null
            },
            status: null,
            followed: false,
            uniqueUrlName: null
        }],
        totalCount: 1
    };
    usersAPIMock.getUsers.mockReturnValue(Promise.resolve(data));

    const thunk = getUsers(pageSize, currentPage);
    await thunk(dispatchMock, getStateMock, {});

    expect(dispatchMock).toBeCalledTimes(4);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, setIsFetchingValue(true));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, setUsers(data.items));
    expect(dispatchMock).toHaveBeenNthCalledWith(3, setUsersTotalCount(data.totalCount));
    expect(dispatchMock).toHaveBeenNthCalledWith(4, setIsFetchingValue(false));
});

test("call of getUsers thunk should be with error of network", async () => {
    const pageSize = 10;
    const currentPage = 1;
    const error = new Error("network error");
    usersAPIMock.getUsers.mockRejectedValue(error);

    const thunk = getUsers(pageSize, currentPage);
    await thunk(dispatchMock, getStateMock, {});

    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, setIsFetchingValue(true));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, setAppError(error.message));
    expect(dispatchMock).toHaveBeenNthCalledWith(3, setIsFetchingValue(false));
});

test("call of repeatGetUsers thunk should be success", async ()=>{
    const pageSize = 10;
    const currentPage = 1;
    const data: GetUsersDataType = {
        error: null,
        items: [{
            name: 'Ruslan',
            id: 1,
            photos: {
                small: 'https://sun9-15.userapi.com/impg/O_LNAi5kKsq4-ViNecim4rUQkihvDLuTnXfL2w/BSAIvsvBviM.jpg?size=863x1080&quality=96&sign=8c552a2a19907e2e040b0475efdb6b85&type=album',
                large: null
            },
            status: null,
            followed: false,
            uniqueUrlName: null
        }],
        totalCount: 1
    };
    usersAPIMock.getUsers.mockReturnValue(Promise.resolve(data));

    const thunk = repeatGetUsers(pageSize, currentPage);
    await thunk(dispatchMock, getStateMock, {});

    expect(dispatchMock).toBeCalledTimes(4);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, setCurrentPage(currentPage));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, setIsFetchingValue(true));
    expect(dispatchMock).toHaveBeenNthCalledWith(3, setUsers(data.items));
    expect(dispatchMock).toHaveBeenNthCalledWith(4, setIsFetchingValue(false));
});

test("call of repeatGetUsers thunk should with error of network", async ()=>{
    const pageSize = 10;
    const currentPage = 1;
    const error = new Error("network error");
    usersAPIMock.getUsers.mockRejectedValue(error);

    const thunk = repeatGetUsers(pageSize, currentPage);
    await thunk(dispatchMock, getStateMock, {});

    expect(dispatchMock).toBeCalledTimes(4);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, setCurrentPage(currentPage));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, setIsFetchingValue(true));
    expect(dispatchMock).toHaveBeenNthCalledWith(3, setAppError(error.message));
    expect(dispatchMock).toHaveBeenNthCalledWith(4, setIsFetchingValue(false));
});
