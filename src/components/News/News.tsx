import React, {memo} from "react";
import styleModule from './News.module.css';
import {UnderConstruction} from "../generic/UnderConstruction/UnderConstruction";


export const News = memo((props: any) => {
    return (
        <div className={styleModule.newsWrapper}>
            <UnderConstruction/>
        </div>
    );
})

