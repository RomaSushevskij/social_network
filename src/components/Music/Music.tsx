import React, {memo} from "react";
import styleModule from './Music.module.css';
import {UnderConstruction} from "../generic/UnderConstruction/UnderConstruction";


export const Music = memo((props: any) => {
    return (
        <div className={styleModule.musicWrapper}>
            <UnderConstruction/>
        </div>
    );
})



