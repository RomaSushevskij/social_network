import React from "react";
import styleModule from './Message.module.css';


export function Message(props:any) {
    return (
        <div id={props.id} className={styleModule.message}>{props.message}</div>
    )
}

