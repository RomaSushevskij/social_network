import axios from 'axios'
import {UserType} from "../redux/redusers/usersReducer/usersReducer";
import {ProfileType} from "../redux/redusers/profileReducer/profileReducer";

//types------------------------------------------types
//↓
//USERS---
type GetUsersDataType = {
    error: string | null
    items: Array<UserType>
    totalCount: number
}
export type PostFollowDataType = {
    resultCode: number
    messages: Array<string>
    data: object
    fieldsErrors: Array<any>
}
export type DeleteFollowDataType = PostFollowDataType
export enum FOLLOW_UNFOLLOW_RESULT_CODES {
    success = 0,
    error = 1,
}

//PROFILE---
type GetProfileDataType = ProfileType

//AUTH---
export type AuthUserDataType = {
    id: number,
    email: string,
    login: string
}
export type GetAuthUserDataType = {
    data: AuthUserDataType
    fieldsErrors: Array<any>
    messages: Array<string>
    resultCode: number
}
export enum AUTH_ME_RESULT_CODES {
    success = 0,
    error = 1,
}

//↑
//types------------------------------------------types

const instance_1 = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    withCredentials: true,
    headers: {
        "API-KEY": "10732160-f45a-4879-8e6f-b2819bc13c24"
    }
});

export const usersAPI = {
    getUsers(pageSize: number, currentPage: number) {
        return instance_1.get<GetUsersDataType>(`users?count=${pageSize}&page=${currentPage}`)
            .then(response => {
                return response.data
            })
    },
    becomeFollower(userId: number) {
        return instance_1.post<PostFollowDataType>(`follow/${userId}`)
            .then(response => {
                return response.data
            })
    },
    stopBeingFollower(userId: number) {
        return instance_1.delete<DeleteFollowDataType>(`follow/${userId}`)
            .then(response => {
                return response.data
            })
    },

}

export const profileAPI = {
    getProfile(userId: string) {
        return instance_1.get<GetProfileDataType>(`profile/${userId}`)
            .then(response => {
                return response.data
            })
    },
}

export let authMeAPI = {
    getAuthorizationInfo() {
        return instance_1.get<GetAuthUserDataType>(`auth/me`)
            .then(response => {
                return response.data
            })
    },
}
