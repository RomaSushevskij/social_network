import {newsAPI, NewsArticleType} from '../../../api/api';
import {AppThunk} from '../../redux-store';

export enum NEWS_ACTIONS_TYPES {
    GET_NEWS = 'social/news/GET_NEWS',
    SET_IS_NEWS_LOADING = 'social/news/SET_IS_NEWS_LOADING',
    SET_CATEGORY = 'social/news/SET_CATEGORY',
    SET_SEARCHING_VALUE = 'social/news/SET_SEARCHING_VALUE',
    SET_SORTING_PARAMS = 'social/news/SET_SORTING_PARAMS',

}


export type InitialStateNewsType = typeof initialState

export enum NEWS_CATEGORIES {
    general = 'general',
    business = 'business',
    entertainment = 'entertainment',
    health = 'health',
    science = 'science',
    sports = 'sports',
    technology = 'technology'
}

export enum NEWS_SORTING_PARAMS {
    published_desc = 'published_desc',
    published_asc = 'published_asc',
    popularity = 'popularity'
}

const initialState = {
    newsData: [] as NewsArticleType[],
    newsIsLoading: false,
    pagination: {
        limit: '',
        count: '',
        total: '',
    },
    categories: {
        general: false,
        business: false,
        entertainment: false,
        health: false,
        science: false,
        sports: false,
        technology: false,
    },

    params: {
        categoriesArr: [] as NEWS_CATEGORIES[],
        keywords: '',
        sort: 'Published date ↓',
    }
}
export type CategoriesType = typeof initialState.categories

export const newsReducer = (state: InitialStateNewsType = initialState, action: NewsActionType): InitialStateNewsType => {
    switch (action.type) {
        case NEWS_ACTIONS_TYPES.SET_IS_NEWS_LOADING:
        case NEWS_ACTIONS_TYPES.GET_NEWS:
            return {
                ...state, ...action.payload
            }
        case NEWS_ACTIONS_TYPES.SET_CATEGORY:
            const categoryName = action.payload.categoryName;
            const checked = action.payload.checked;
            return {
                ...state, categories: {...state.categories, [categoryName]: checked},
                params: checked ?
                    {
                        ...state.params, categoriesArr: [...state.params.categoriesArr, categoryName],
                    } : !checked ?
                        {
                            ...state.params, categoriesArr:
                                state.params.categoriesArr.filter(c => c !== categoryName),
                        } :
                        state.params
            }
        case NEWS_ACTIONS_TYPES.SET_SEARCHING_VALUE:
            return {
                ...state, params: {...state.params, keywords: action.payload.searchingValue}
            }
        case NEWS_ACTIONS_TYPES.SET_SORTING_PARAMS:
            return {
                ...state, params: {...state.params, sort: action.payload.sortParams}
            }
        default:
            return state
    }
};

// A C T I O N S
export type NewsActionType =
    | ReturnType<typeof setNews>
    | ReturnType<typeof setIsNewLoading>
    | ReturnType<typeof setCategory>
    | ReturnType<typeof setSearchingValue>
    | ReturnType<typeof setSortParams>
export const setNews = (newsData: NewsArticleType[]) => ({
    type: NEWS_ACTIONS_TYPES.GET_NEWS,
    payload: {newsData}
} as const);
export const setIsNewLoading = (newsIsLoading: boolean) => ({
    type: NEWS_ACTIONS_TYPES.SET_IS_NEWS_LOADING,
    payload: {newsIsLoading}
} as const)
export const setCategory = (categoryName: NEWS_CATEGORIES, checked: boolean) => ({
    type: NEWS_ACTIONS_TYPES.SET_CATEGORY, payload: {categoryName, checked}
} as const)
export const setSearchingValue = (searchingValue: string) => ({
    type: NEWS_ACTIONS_TYPES.SET_SEARCHING_VALUE, payload: {searchingValue}
} as const)
export const setSortParams = (sortParams: string) => ({
    type: NEWS_ACTIONS_TYPES.SET_SORTING_PARAMS, payload: {sortParams}
} as const)

// T H U N K S

export const getNews = (): AppThunk => (dispatch, getState) => {
    const categories = getState().news.params.categoriesArr.join(', ');
    const keywords = getState().news.params.keywords;
    let sort = getState().news.params.sort;
    switch (sort) {
        case 'Published date ↓':
            sort = NEWS_SORTING_PARAMS.published_desc
            break;
        case 'Published date ↑':
            sort = NEWS_SORTING_PARAMS.published_asc
            break
        case 'Popularity':
            sort = NEWS_SORTING_PARAMS.popularity
            break
        default:
            break
    }
    dispatch(setIsNewLoading(true))
    newsAPI.getNews({categories, keywords, sort})
        .then(data => {
            dispatch(setNews(data.data))
        })
        .catch()
        .finally(() => {
            dispatch(setIsNewLoading(false))
        })
}


