import React, {memo, useEffect} from "react";
import styleModule from './News.module.scss';
import {useDispatch, useSelector} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import {NewsArticle} from './NewsItem/NewsArticle';
import {Preloader} from '../generic/Preloader/Preloader';
import {getNews, setNews} from '../../redux/redusers/news/newsReducer';
import InputTextSecondary from '../generic/InputTextSecondary/InputTextSecondary';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';
import {DropDownMenu} from './NewsItem/Categories/DropDownMenu';


export const News = memo((props: any) => {
    const categoriesArr = ['general',
        'business',
        'entertainment',
        'health',
        'science',
        'sports',
        'technology']
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getNews())
        return () => {
            dispatch(setNews([]))
        }
    }, [])
    const {newsData, newsIsLoading} = useSelector((state: AppStateType) => state.news)
    const newsArticles = newsData.map((article, index) => {
        return (
            <NewsArticle key={index} article={article}/>
        )
    })
    const toggleButtonStyle = {
        backgroundColor:'#D1D5DB',
        color:'#666678',
        padding:'10px 15px',
        fontWeight: '600',
        borderRadius:'6px',
        fontSize:'15px'
    }
    return (
        <div className={styleModule.newsWrapper}>
            <h1>News</h1>
            <div className={styleModule.settingsBlock}>
                <div className={styleModule.searchingField}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} className={styleModule.searchingLogo}/>
                    <InputTextSecondary className={styleModule.searching}
                                        placeholder={'Search'}/>
                </div>
                <DropDownMenu title={'Categories'} data={categoriesArr} styleToggleButton={toggleButtonStyle}/>
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

