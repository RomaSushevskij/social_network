import {getNews, getNewsWorkerSaga, newsActions} from "./newsSagas";
import {call, put, select} from "redux-saga/effects";
import {selectNewsSearchValue} from "../../selectors/newSelectors";
import {setCurrentPage, setIsNewsLoading, setLimitPage, setNews, setNewsTotal} from "../../redusers/news/newsReducer";
import {GetNewsDataType, NEWS_RESULT_CODES, newsAPI} from "../../../api/api";
import {setAppError} from "../../redusers/app/appReducer";

test('getNewsWorkerSaga should be success', () => {
    const action: ReturnType<typeof getNews> = {
        type: newsActions.GET_NEWS,
        payload: {page_size: 10, page: 1}
    };
    const searchString = 'searchString';
    const newsData: GetNewsDataType = {
        articles: [{
            author: 'author',
            clean_url: 'clean_url',
            language: 'language',
            link: 'link',
            media: 'media',
            published_date: 'published_date',
            summary: 'summary',
            title: 'title',
            topic: 'topic',
            _id: '_id',
            _score: 10,
        }],
        page: 1,
        page_size: 10,
        status: NEWS_RESULT_CODES.success,
        error_code: 'error_code',
        message: 'message',
        total_hits: 100,
        total_pages: 10,
        user_input: {
            from: 'from',
            page: 1,
            q: searchString,
            size: 10,
            sort_by: "relevancy",
        }
    }
    const newsGen = getNewsWorkerSaga(action);

    expect(newsGen.next().value).toEqual(select(selectNewsSearchValue));
    // @ts-ignore
    expect(newsGen.next(searchString).value).toEqual(put(setIsNewsLoading(true)));
    expect(newsGen.next().value).toEqual(call(newsAPI.getNews, {
        q: searchString,
        page_size: action.payload.page_size,
        page: action.payload.page
    }));
    // @ts-ignore
    expect(newsGen.next(newsData).value).toEqual(put(setNews(newsData.articles)));
    expect(newsGen.next().value).toEqual(put(setNewsTotal(newsData.total_hits)));
    expect(newsGen.next().value).toEqual(put(setCurrentPage(newsData.page)));
    expect(newsGen.next().value).toEqual(put(setLimitPage(newsData.page_size)));
    expect(newsGen.next().value).toEqual(put(setIsNewsLoading(false)));
});

test('getNewsWorkerSaga should be with searching error (error)', () => {
    const action: ReturnType<typeof getNews> = {
        type: newsActions.GET_NEWS,
        payload: {page_size: 10, page: 1}
    };
    const searchString = 'searchString';
    const newsData: GetNewsDataType = {
        articles: [{
            author: 'author',
            clean_url: 'clean_url',
            language: 'language',
            link: 'link',
            media: 'media',
            published_date: 'published_date',
            summary: 'summary',
            title: 'title',
            topic: 'topic',
            _id: '_id',
            _score: 10,
        }],
        page: 1,
        page_size: 10,
        status: NEWS_RESULT_CODES.error,
        error_code: 'error_code',
        message: 'message',
        total_hits: 100,
        total_pages: 10,
        user_input: {
            from: 'from',
            page: 1,
            q: searchString,
            size: 10,
            sort_by: "relevancy",
        }
    }
    const newsGen = getNewsWorkerSaga(action);

    expect(newsGen.next().value).toEqual(select(selectNewsSearchValue));
    // @ts-ignore
    expect(newsGen.next(searchString).value).toEqual(put(setIsNewsLoading(true)));
    expect(newsGen.next().value).toEqual(call(newsAPI.getNews, {
        q: searchString,
        page_size: action.payload.page_size,
        page: action.payload.page
    }));
    // @ts-ignore
    expect(newsGen.next(newsData).value).toEqual(put(setAppError(newsData.error_code + ', ' + newsData.message)));
    expect(newsGen.next().value).toEqual(put(setNews([])));
    expect(newsGen.next().value).toEqual(put(setNewsTotal(0)));
    expect(newsGen.next().value).toEqual(put(setIsNewsLoading(false)));
})

test('getNewsWorkerSaga should be with searching error (no-matches)', () => {
    const action: ReturnType<typeof getNews> = {
        type: newsActions.GET_NEWS,
        payload: {page_size: 10, page: 1}
    };
    const searchString = 'searchString';
    const newsData: GetNewsDataType = {
        articles: [{
            author: 'author',
            clean_url: 'clean_url',
            language: 'language',
            link: 'link',
            media: 'media',
            published_date: 'published_date',
            summary: 'summary',
            title: 'title',
            topic: 'topic',
            _id: '_id',
            _score: 10,
        }],
        page: 1,
        page_size: 10,
        status: NEWS_RESULT_CODES.no_matches,
        error_code: 'error_code',
        message: 'message',
        total_hits: 100,
        total_pages: 10,
        user_input: {
            from: 'from',
            page: 1,
            q: searchString,
            size: 10,
            sort_by: "relevancy",
        }
    }
    const newsGen = getNewsWorkerSaga(action);

    expect(newsGen.next().value).toEqual(select(selectNewsSearchValue));
    // @ts-ignore
    expect(newsGen.next(searchString).value).toEqual(put(setIsNewsLoading(true)));
    expect(newsGen.next().value).toEqual(call(newsAPI.getNews, {
        q: searchString,
        page_size: action.payload.page_size,
        page: action.payload.page
    }));
    // @ts-ignore
    expect(newsGen.next(newsData).value).toEqual(put(setAppError(newsData.status)));
    expect(newsGen.next().value).toEqual(put(setNews([])));
    expect(newsGen.next().value).toEqual(put(setNewsTotal(0)));
    expect(newsGen.next().value).toEqual(put(setIsNewsLoading(false)));
})