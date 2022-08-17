import axios, {AxiosResponse} from 'axios'
import {UserType} from "../redux/redusers/usersReducer/usersReducer";
import {ContactsType, ProfileType} from "../redux/redusers/profileReducer/profileReducer";

//types------------------------------------------types
//↓
//USERS---
export type GetUsersDataType = {
    error: string | null
    items: UserType[]
    totalCount: number
}
export type PostFollowDataType = {
    resultCode: RESPONSE_RESULT_CODES
    messages: string[]
    data: {}
    fieldsErrors: string[]
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
    fieldsErrors: Array<string>
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
    data: {},
    messages: string[],
    fieldsErrors: any[],
    resultCode: RESPONSE_RESULT_CODES
}

export enum RESPONSE_RESULT_CODES {
    success = 0,
    error = 1,
    needCaptcha = 10

}

// NEWS
export type NewsArticleType = {
    author: string
    clean_url: string
    language: string
    link: string
    media: string
    published_date: string
    summary: string
    title: string
    topic: string
    _id: string
    _score: number
}

export enum NEWS_RESULT_CODES {
    success = 'ok',
    no_matches = 'No matches for your search.',
    error = 'error'
}

export type GetNewsDataType = {
    articles: NewsArticleType[]
    page: number
    page_size: number
    status: NEWS_RESULT_CODES
    error_code?: string
    message?: string
    total_hits: number
    total_pages: number
    user_input: {
        from: string
        page: number
        q: string
        size: number
        sort_by: "relevancy"
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
    baseURL: 'https://free-news.p.rapidapi.com/v1/',
    headers: {
        'x-rapidapi-key': '89ac259f4fmshe32981346f4f801p1e4723jsnebb1b54e949b',
        'x-rapidapi-host': 'free-news.p.rapidapi.com'
    }
})


export const usersAPI = {
    async getUsers(pageSize: number, currentPage: number) {
        const {data} = await instance_1.get<GetUsersDataType>(`users?count=${pageSize}&page=${currentPage}`)
        return data
    },
    async becomeFollower(userId: number) {
        const {data} = await instance_1.post<PostFollowDataType>(`follow/${userId}`)
        return data
    },
    async stopBeingFollower(userId: number) {
        const {data} = await instance_1.delete<DeleteFollowDataType>(`follow/${userId}`)
        return data
    },
};

export const profileAPI = {
    async getProfile(userId: string | number) {
        const {data} = await instance_1.get<GetProfileDataType>(`profile/${userId}`)
        return data
    },
    async getStatus(userId: number) {
        const {data} = await instance_1.get<string>(`profile/status/${userId}`)
        return data
    },
    async updateStatus(status: string) {
        const {data} = await instance_1.put<UpdateStatusDataType>(`/profile/status`, {status})
        return data
    },
    async updatePhoto(photoFile: any) {
        const formData = new FormData();
        formData.append('image', photoFile);
        const {data} = await instance_1.put<UpdatePhotoDataType>('profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return data;
    },
    async uploadProfile(profileModel: UploadProfileCommonModelType) {
        const {data} = await instance_1.put<UpdateProfileDataType>('/profile', profileModel)
        return data
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
    getNews(params: { q: string, page_size: number, page: number }) {
        return newsInstance.get<GetNewsDataType>('search', {
            params: {
                'lang': 'ru',
                ...params
            }
        })
            .then(response => {
                return response.data
            })
    }
}
