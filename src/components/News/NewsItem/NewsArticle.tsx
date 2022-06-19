import React, {memo, useState} from "react";
import styleModule from './NewsArticle.module.scss';
import {NewsArticleType} from '../../../api/api';
import defaultImage from '../../../assets/ArticleLogo.jpg'

type NewsArticlePropsType = { article: NewsArticleType }

export const NewsArticle = memo(({article}: NewsArticlePropsType) => {
    const {title, image, description, url, published_at} = article;
    const [resultImage, setResultImage] = useState(image);
    const date = published_at.slice(0, 10);
    return (
        <article className={styleModule.articleWrapper}>
            <div className={styleModule.imageBlock}>
                <a href={url} target={'_blank'}>
                    <img className={resultImage !== image ? styleModule.default : ''}
                         src={resultImage ? resultImage : defaultImage}
                         onError={() => {
                             setResultImage(defaultImage)
                         }}/>
                </a>
            </div>
            <h3>{title}</h3>
            <div className={styleModule.description}>
                <p>{description}</p>
            </div>
            <a className={styleModule.button}
               href={url}
               target={'_blank'}>
                More
            </a>
            <div className={styleModule.date}>
                {date}
            </div>
        </article>
    );
})

