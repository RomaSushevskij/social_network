import {NEWS_RESULT_CODES, newsAPI, NewsArticleType} from '../../../api/api';
import {AppThunk} from '../../redux-store';
import {setAppError} from '../app/appReducer';

export enum NEWS_ACTIONS_TYPES {
    GET_NEWS = 'social/news/GET_NEWS',
    SET_IS_NEWS_LOADING = 'social/news/SET_IS_NEWS_LOADING',
    SET_CATEGORY = 'social/news/SET_CATEGORY',
    SET_SEARCHING_VALUE = 'social/news/SET_SEARCHING_VALUE',
    SET_SORTING_PARAMS = 'social/news/SET_SORTING_PARAMS',
    SET_NEWS_TOTAL = 'social/news/SET_NEWS_TOTAL',
    SET_CURRENT_PAGE = 'social/news/SET_CURRENT_PAGE',
    SET_LIMIT_PAGE = 'social/news/SET_LIMIT_PAGE',

}


export type InitialStateNewsType = typeof initialState

export enum NEWS_CATEGORIES {
    news = 'news',
    sport = 'sport',
    tech = 'tech',
    world = 'world',
    finance = 'finance',
    politics = 'politics',
    business = 'business',
    economics = 'economics',
    entertainment = 'entertainment',
    beauty = 'beauty',
    gaming = 'gaming',
}

export enum NEWS_SORTING_PARAMS {
    published_desc = 'published_desc',
    published_asc = 'published_asc',
    popularity = 'popularity'
}

const initialState = {
    newsData: [] as NewsArticleType[],
    newsIsLoading: false,
    topic: {
        news: false,
        sport: false,
        tech: false,
        world: false,
        finance: false,
        politics: false,
        business: false,
        economics: false,
        entertainment: false,
        beauty: false,
        gaming: false,
    },
    params: {
        topicsArr: [] as NEWS_CATEGORIES[],
        q: '',
        sort: 'Published date ↓',
    },
    pagination: {
        page_size: 5,
        page: 1,
        pages_total: 0,
    },
}
export type CategoriesType = typeof initialState.topic

export const newsReducer = (state: InitialStateNewsType = initialState, action: NewsActionType): InitialStateNewsType => {
    switch (action.type) {
        case NEWS_ACTIONS_TYPES.SET_IS_NEWS_LOADING:
        case NEWS_ACTIONS_TYPES.GET_NEWS:
            return {
                ...state, ...action.payload
            }
        case NEWS_ACTIONS_TYPES.SET_CATEGORY:
            const topicName = action.payload.topicName;
            const checked = action.payload.checked;
            return {
                ...state, topic: {...state.topic, [topicName]: checked},
                params: checked ?
                    {
                        ...state.params, topicsArr: [...state.params.topicsArr, topicName],
                    } : !checked ?
                        {
                            ...state.params, topicsArr:
                                state.params.topicsArr.filter(c => c !== topicName),
                        } :
                        state.params
            }
        case NEWS_ACTIONS_TYPES.SET_SEARCHING_VALUE:
            return {
                ...state, params: {...state.params, q: action.payload.searchingValue}
            }
        case NEWS_ACTIONS_TYPES.SET_SORTING_PARAMS:
            return {
                ...state, params: {...state.params, sort: action.payload.sortParams}
            }
        case NEWS_ACTIONS_TYPES.SET_NEWS_TOTAL:
        case NEWS_ACTIONS_TYPES.SET_CURRENT_PAGE:
        case NEWS_ACTIONS_TYPES.SET_LIMIT_PAGE:
            return {
                ...state, pagination: {...state.pagination, ...action.payload}
            }
        default:
            return state
    }
};

// A C T I O N S
export type NewsActionType =
    | ReturnType<typeof setNews>
    | ReturnType<typeof setIsNewsLoading>
    | ReturnType<typeof setCategory>
    | ReturnType<typeof setSearchingValue>
    | ReturnType<typeof setSortParams>
    | ReturnType<typeof setNewsTotal>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setLimitPage>

export const setNews = (newsData: NewsArticleType[]) => ({
    type: NEWS_ACTIONS_TYPES.GET_NEWS,
    payload: {newsData}
} as const);
export const setIsNewsLoading = (newsIsLoading: boolean) => ({
    type: NEWS_ACTIONS_TYPES.SET_IS_NEWS_LOADING,
    payload: {newsIsLoading}
} as const)
export const setCategory = (topicName: NEWS_CATEGORIES, checked: boolean) => ({
    type: NEWS_ACTIONS_TYPES.SET_CATEGORY, payload: {topicName, checked}
} as const)
export const setSearchingValue = (searchingValue: string) => ({
    type: NEWS_ACTIONS_TYPES.SET_SEARCHING_VALUE, payload: {searchingValue}
} as const)
export const setSortParams = (sortParams: string) => ({
    type: NEWS_ACTIONS_TYPES.SET_SORTING_PARAMS, payload: {sortParams}
} as const)
export const setNewsTotal = (pages_total: number) => ({
    type: NEWS_ACTIONS_TYPES.SET_NEWS_TOTAL, payload: {pages_total}
} as const)
export const setCurrentPage = (page: number) => ({
    type: NEWS_ACTIONS_TYPES.SET_CURRENT_PAGE, payload: {page}
} as const)
export const setLimitPage = (page_size: number) => ({
    type: NEWS_ACTIONS_TYPES.SET_LIMIT_PAGE, payload: {page_size}
} as const)

// T H U N K S

export const getNews = (page_size: number = 5, page: number = 1): AppThunk => async (dispatch, getState) => {
    try {
        const {q} = getState().news.params;
        const searchingValue = q.length ? q : 'news';
        dispatch(setIsNewsLoading(true));
        const data = await newsAPI.getNews({q: searchingValue, page_size, page});
        if (data.status === NEWS_RESULT_CODES.success) {
            dispatch(setNews(data.articles))
            dispatch(setNewsTotal(data.total_hits))
            dispatch(setCurrentPage(data.page))
            dispatch(setLimitPage(data.page_size))
        } else {
            if (data.status === NEWS_RESULT_CODES.no_matches) {
                dispatch(setAppError(data.status))
            } else {
                dispatch(setAppError(data.error_code + ', ' + data.message))
            }
            dispatch(setNews([]))
            dispatch(setNewsTotal(0))
        }
    } catch (error: any) {
        const errorMessage = error.response?.data.error.message;
        dispatch(setAppError(errorMessage))
    } finally {
        dispatch(setIsNewsLoading(false))
    }
}


