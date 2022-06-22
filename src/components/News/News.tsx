import React, {ChangeEvent, memo, useEffect} from "react";
import styleModule from './News.module.scss';
import {useDispatch, useSelector} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import {NewsArticle} from './NewsItem/NewsArticle';
import {Preloader} from '../generic/Preloader/Preloader';
import {getNews, NEWS_CATEGORIES, setNews, setSearchingValue} from '../../redux/redusers/news/newsReducer';
import InputTextSecondary from '../generic/InputTextSecondary/InputTextSecondary';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';
import {DropDownMenuCategories} from './Categories/DropDownMenuCategories';
import {DropDownMenuSorting} from './Sorting/DropDownMenuSorting';
import {useDebounce} from '../../utils/hooks';


export const News = memo((props: any) => {
    const {newsData, newsIsLoading, categories, params} = useSelector((state: AppStateType) => state.news)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getNews())
        return () => {
            dispatch(setNews([]))
        }
    }, [params.categoriesArr, params.sort])

    const newsArticles = newsData.map((article, index) => {
        return (
            <NewsArticle key={index} article={article}/>
        )
    })
    const categoriesArr = Object.keys(categories) as NEWS_CATEGORIES[];
    const sortingArr = [
        'Published date ↓',
        'Published date ↑',
        'Popularity'
    ]
    const toggleButtonStyle = {
        backgroundColor: '#D1D5DB',
        color: '#666678',
        padding: '10px 15px',
        fontWeight: '600',
        borderRadius: '30px',
        fontSize: '15px'
    }

    //debounced live search
    const innerDebounceCallback = () => {
        dispatch(getNews())
    };
    const debouncedSearch = useDebounce(innerDebounceCallback, 800);
    const onSearchHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        dispatch(setSearchingValue(e.currentTarget.value))
        debouncedSearch(value)
    };

    return (
        <div className={styleModule.newsWrapper}>
            <h1>News</h1>
            <div className={styleModule.settingsBlock}>
                <div className={styleModule.searchingField}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} className={styleModule.searchingLogo}/>
                    <InputTextSecondary value={params.keywords}
                                        onChange={onSearchHandler}
                                        className={styleModule.searching}
                                        placeholder={'Search'}/>
                </div>
                <DropDownMenuCategories title={'Categories'}
                                        data={categoriesArr}
                                        styleToggleButton={toggleButtonStyle}
                                        checkboxState={categories}/>
                <DropDownMenuSorting title={'Sort by'}
                                     data={sortingArr}
                                     styleToggleButton={toggleButtonStyle}/>
            </div>
            <div className={styleModule.container}>
                {newsIsLoading ?
                    <div style={{height: 'calc(100vh - 110px)'}}>
                        <Preloader size={'30px'} color={'#5B48E3'}/>
                    </div> : newsArticles}
            </div>
        </div>
    );
})

