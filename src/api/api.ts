import axios, {AxiosResponse} from 'axios'
import {UserType} from "../redux/redusers/usersReducer/usersReducer";
import {ContactsType, ProfileType} from "../redux/redusers/profileReducer/profileReducer";
import {NullableType} from '../redux/redux-store';

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
    fieldsErrors: any[]
    messages: string[]
    resultCode: RESPONSE_RESULT_CODES
}
type UpdatePhotoDataType = {
    data: {
        photos: {
            large: string
            small: string
        }
    }
    fieldsErrors: any[]
    messages: string[]
    resultCode: RESPONSE_RESULT_CODES
}
export type UploadProfileCommonModelType = {
    userId: number | null
    lookingForAJob: boolean | null
    lookingForAJobDescription: string | null
    fullName: string | null
    aboutMe: string | null
    contacts: ContactsType
}
export type UploadProfileModelType = Omit<UploadProfileCommonModelType, 'contacts'>
export type UploadContactsModelType = ContactsType
type UpdateProfileDataType = UpdateStatusDataType

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
    fieldsErrors: any[],
    resultCode: RESPONSE_RESULT_CODES
}
export type LogoutResponseType = {
    "data": {},
    "messages": string[],
    "fieldsErrors": any[],
    "resultCode": RESPONSE_RESULT_CODES
}

export enum RESPONSE_RESULT_CODES {
    success = 0,
    error = 1,
    needCaptcha = 10

}

// NEWS
export type NewsArticleType = {
    author: NullableType<string>
    category: string
    country: string
    description: string
    image: NullableType<string>
    language: string
    published_at: string
    source: string
    title: string
    url: string
}
export type GetNewsDataType = {
    data: NewsArticleType[]
    pagination: {
        count: number
        limit: number
        offset: number
        total: number
    }
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
const newsInstance = axios.create({
    baseURL: "http://api.mediastack.com/v1/",
})


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
    },
    updatePhoto(photoFile: any) {
        const formData = new FormData()
        formData.append('image', photoFile)

        return instance_1.put<UpdatePhotoDataType>('profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                return response.data
            })
    },
    uploadProfile(profileModel: UploadProfileCommonModelType) {
        return instance_1.put<UpdateProfileDataType>('/profile', profileModel)
            .then(response => {
                return response.data
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
    login(email: string, password: string, rememberMe: boolean, captcha?: string) {
        return instance_1.post<any, AxiosResponse<LoginResponseType>, { email: string, password: string, rememberMe: boolean, captcha?: string }>(`auth/login`, {
            email,
            password,
            rememberMe,
            captcha
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
export let securityAPI = {
    getCaptchaURL() {
        return instance_1.get<{ url: string }>('security/get-captcha-url')
            .then(response => {
                return response.data
            })
    }
}

export const newsAPI = {
    getNews(params: { categories: string, keywords: string, sort: string }) {
        return newsInstance.get<GetNewsDataType>('news', {
            params: {
                "access_key": "220e463fea4cb21ca2430f7b466755d2",
                "languages": "en, ru",
                "limit": '6',
                "offset": '21',
                ...params
            }
        })
            .then(response => {
                return response.data
            })
    }
}
