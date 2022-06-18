import React, {memo, useEffect, useState} from "react";
import styleModule from './News.module.css';
import {UnderConstruction} from "../generic/UnderConstruction/UnderConstruction";
import {newsAPI} from '../../api/api';
import {useSelector} from 'react-redux';


export const News = memo((props: any) => {
    const [img, setImg] = useState('');
    debugger
    const [title, setTitle] = useState('');
    useEffect(() => {
        newsAPI.getNews()
            .then(data=> {
                debugger
                setImg(data.data[20].image)
                setTitle(data.data[20].title)
            })

    }, [])
    return (
        <div className={styleModule.newsWrapper}>
            <div>
                <h3>{title}</h3>
            </div>
            <div>
                <img src={img} alt="img"/>
            </div>
        </div>
    );
})

