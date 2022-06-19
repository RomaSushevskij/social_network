import {newsAPI, NewsArticleType} from '../../../api/api';
import {AppThunk} from '../../redux-store';

export enum NEWS_ACTIONS_TYPES {
    GET_NEWS = 'social/news/GET_NEWS',
    SET_IS_NEWS_LOADING = 'social/news/SET_IS_NEWS_LOADING',

}


export type InitialStateNewsType = typeof initialState

const initialState = {
    newsData: [] as NewsArticleType[],
    newsIsLoading:false,
    total:0,
    count:10

}

export const newsReducer = (state: InitialStateNewsType = initialState, action: NewsActionType): InitialStateNewsType => {
    switch (action.type) {
        case NEWS_ACTIONS_TYPES.SET_IS_NEWS_LOADING:
        case NEWS_ACTIONS_TYPES.GET_NEWS:
            return {
                ...state, ...action.payload
            }
        default:
            return state
    }
};

// A C T I O N S
export type NewsActionType =
    |ReturnType<typeof setNews>
    |ReturnType<typeof setIsNewLoading>
export const setNews = (newsData: NewsArticleType[]) => ({
    type: NEWS_ACTIONS_TYPES.GET_NEWS,
    payload: {newsData}
} as const);
export const setIsNewLoading = (newsIsLoading:boolean) =>({
    type: NEWS_ACTIONS_TYPES.SET_IS_NEWS_LOADING,
    payload:{newsIsLoading}
})

// T H U N K S

export const getNews = ():AppThunk => (dispatch) => {
    dispatch(setIsNewLoading(true))
    newsAPI.getNews()
        .then(data=>{
            dispatch(setNews(data.data))
        })
        .catch()
        .finally(()=>{
            dispatch(setIsNewLoading(false))
        })
}


