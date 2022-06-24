import React, {memo, useState} from "react";
import styleModule from './NewsArticle.module.scss';
import {NewsArticleType} from '../../../api/api';
import defaultImage from '../../../assets/ArticleLogo.jpg'

type NewsArticlePropsType = { article: NewsArticleType }

export const NewsArticle = memo(({article}: NewsArticlePropsType) => {
    const {title, media, summary, link, published_date} = article;
    const [resultImage, setResultImage] = useState(media);
    const date = published_date.slice(0, 10);
    return (
        <article className={styleModule.articleWrapper}>
            <div className={styleModule.imageBlock}>
                <a href={link} target={'_blank'}>
                    <img className={resultImage !== media ? styleModule.default : ''}
                         src={resultImage ? resultImage : defaultImage}
                         onError={() => {
                             setResultImage(defaultImage)
                         }}/>
                </a>
            </div>
            <h3>{title}</h3>
            <div className={styleModule.description}>
                <p>{summary}</p>
            </div>
            <a className={styleModule.button}
               href={link}
               target={'_blank'}>
                More
            </a>
            <div className={styleModule.date}>
                {date}
            </div>
        </article>
    );
})

