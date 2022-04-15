import axios, {AxiosResponse} from 'axios'
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

//PROFILE---
type GetProfileDataType = ProfileType
type UpdateStatusDataType = {
    data: {}
    fieldsErrors: string[]
    messages: string[]
    resultCode: RESPONSE_RESULT_CODES
}

//AUTH---
export type AuthUserDataType = {
    id: number | null
    email: string | null
    login: string | null
}
export type GetAuthUserDataType = {
    data: AuthUserDataType
    fieldsErrors: Array<any>
    messages: Array<string>
    resultCode: RESPONSE_RESULT_CODES
}
export type LoginResponseType = {
    data: {
        userId: number
    },
    messages: string[],
    fieldsErrors: string[],
    resultCode: RESPONSE_RESULT_CODES
}
export type LogoutResponseType = {
    "data": {},
    "messages": string[],
    "fieldsErrors": string[],
    "resultCode": RESPONSE_RESULT_CODES
}

export enum RESPONSE_RESULT_CODES {
    success = 0,
    error = 1,
    needCaptcha = 10

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
    getProfile(userId: string | number) {
        return instance_1.get<GetProfileDataType>(`profile/${userId}`)
            .then(response => {
                return response.data
            })
    },
    getStatus(userId: number) {
        return instance_1.get<string>(`profile/status/${userId}`)
            .then(response => {
                return response.data
            })
    },
    updateStatus(status: string) {
        return instance_1.put<UpdateStatusDataType>(`/profile/status`, {status})
            .then(response => {
                return response
            })
    }
}

export let authMeAPI = {
    getAuthorizationInfo() {
        return instance_1.get<GetAuthUserDataType>(`auth/me`)
            .then(response => {
                return response.data
            })
    },
    login(email: string, password: string, rememberMe: boolean) {
        return instance_1.post<any, AxiosResponse<LoginResponseType>, { email: string, password: string, rememberMe: boolean }>(`auth/login`, {
            email,
            password,
            rememberMe
        })
            .then(response => {
                return response.data
            })
    },
    logout() {
        return instance_1.delete<any, AxiosResponse<LogoutResponseType>>(`auth/login`)
            .then(response => {
                return response.data
            })
    }
}
