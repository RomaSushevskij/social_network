import {
    InitialStateNewsType,
    NEWS_CATEGORIES,
    newsReducer,
    setCategory,
    setCurrentPage,
    setIsNewsLoading,
    setLimitPage,
    setNews,
    setNewsTotal,
    setSearchingValue,
    setSortParams
} from "./newsReducer";
import {NewsArticleType} from '../../../api/api';

let startState: InitialStateNewsType

beforeEach(() => {
    startState = {
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
})

test('news data should be added to the state', () => {
    const news: NewsArticleType[] = [
        {
            media: '',
            published_date: '',
            link: '',
            summary: '',
            author: '',
            title: '',
            _id: '',
            _score: 1,
            clean_url: '',
            language: '',
            topic: '',
        }
    ];
    const endState = newsReducer(startState, setNews(news));
    expect(endState.newsData).toStrictEqual(news);
})
test('isLoading value should be changed', () => {
    const endState = newsReducer(startState, setIsNewsLoading(true));
    expect(startState.newsIsLoading).toBe(false);
    expect(endState.newsIsLoading).toBe(true);
})
test('correct category should be change checked value', () => {
    const endState = newsReducer(startState, setCategory(NEWS_CATEGORIES.finance, true));
    expect(startState.topic.finance).toBe(false);
    expect(endState.topic.finance).toBe(true);
    expect(endState.topic.news).toBe(false);
})
test('new searchingValue should be set to state', () => {
    const searchingValue = 'search';
    const endState = newsReducer(startState, setSearchingValue(searchingValue));
    expect(startState.params.q).toBe('');
    expect(endState.params.q).toBe(searchingValue);
})
test('new sort param should be set to state', () => {
    const sort = 'Published date ↑';
    const endState = newsReducer(startState, setSortParams(sort));
    expect(startState.params.sort).toBe('Published date ↓');
    expect(endState.params.sort).toBe(sort);
})
test('new total pages value should be set to state', () => {
    const total = 1000;
    const endState = newsReducer(startState, setNewsTotal(total));
    expect(startState.pagination.pages_total).toBe(0);
    expect(endState.pagination.pages_total).toBe(total);
})
test('new page count should be set to state', () => {
    const pageCount = 2;
    const endState = newsReducer(startState, setCurrentPage(pageCount));
    expect(startState.pagination.page).toBe(1);
    expect(endState.pagination.page).toBe(pageCount);
})
test('new page size should be set to state', () => {
    const pageSize = 10;
    const endState = newsReducer(startState, setLimitPage(pageSize));
    expect(startState.pagination.page_size).toBe(5);
    expect(endState.pagination.page_size).toBe(pageSize);
})
