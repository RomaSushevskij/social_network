import React from "react";
import {Dialog} from "./Dialog/Dialog";
import {Message} from "./Mesage/Message";
import styleModule from './Dialogs.module.css';


export function Dialogs(props: any) {

    return (
        <div className={styleModule.dialogs}>
            <div className={styleModule.heading}>
                DIALOGS
            </div>
            <div className={styleModule.dialogs_items}>

            </div>
            <div className={styleModule.messagesBlock}>
                <div className={styleModule.messages}>

                </div>

            </div>

        </div>
    );
}

