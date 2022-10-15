import {GetNewsDataType, NEWS_RESULT_CODES, newsAPI} from "../../../api/api";
import {setAppError} from "../../redusers/app/appReducer";
import {setCurrentPage, setIsNewsLoading, setLimitPage, setNews, setNewsTotal} from "../../redusers/news/newsReducer";
import {selectNewsSearchValue} from "../../selectors/newSelectors";
import {call, put, select, takeEvery} from "redux-saga/effects";

export enum newsActions {
    GET_NEWS = 'news/GET_NEWS'
}

export function* getNewsWorkerSaga(action: ReturnType<typeof getNews>) {
    const {page_size, page} = action.payload;
    try {
        const q: string = yield select(selectNewsSearchValue);
        const searchingValue = q.length ? q : 'news';
        yield put(setIsNewsLoading(true));
        const data: GetNewsDataType = yield call(newsAPI.getNews, {q: searchingValue, page_size, page});
        if (data.status === NEWS_RESULT_CODES.success) {
            yield put(setNews(data.articles))
            yield put(setNewsTotal(data.total_hits))
            yield put(setCurrentPage(data.page))
            yield put(setLimitPage(data.page_size))
        } else {
            if (data.status === NEWS_RESULT_CODES.no_matches) {
                yield put(setAppError(data.status))
            } else {
                yield put(setAppError(data.error_code + ', ' + data.message))
            }
            yield put(setNews([]))
            yield put(setNewsTotal(0))
        }
    } catch (error: any) {
        const errorMessage = error.response?.data.error.message;
        yield put(setAppError(errorMessage))
    } finally {
        yield put(setIsNewsLoading(false))
    }
}

export const getNews = (page_size: number = 5, page: number = 1) => ({
    type: newsActions.GET_NEWS,
    payload: {page_size, page}
} as const);

export function* newsWatcherSaga() {
    yield takeEvery(newsActions.GET_NEWS, getNewsWorkerSaga)
}