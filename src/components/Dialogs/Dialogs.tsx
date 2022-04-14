import React from "react";
import {Dialog} from "./Dialog/Dialog";
import {Message} from "./Mesage/Message";
import styleModule from './Dialogs.module.css';
import {DialogsPropsType} from "./DialogsContainer";
import {AddMessageForm} from '../forms/AddMessageForm/AddMessageForm';


const MESSAGE_STYLE = {
    background: '#e8e8e8',
    color: '#757575',
    meBackground: '#FFE1A9',
    meColor: '#757575',
};
const DIALOG_STYLE = {
    background: 'inherit',
    color: '#ffffff'
};

export const Dialogs = React.memo((props: DialogsPropsType) => {
    return (
        <div className={styleModule.dialogs}>
            <div className={styleModule.heading}>
                DIALOGS
            </div>
            <div className={styleModule.dialogs_items}>
                {props.dialogsPage.dialogsData.map(dialog => <Dialog key={dialog.id}
                                                                     background={DIALOG_STYLE.background}
                                                                     color={DIALOG_STYLE.color}
                                                                     {...dialog}/>)}
            </div>
            <div className={styleModule.messagesBlock}>
                <div className={styleModule.messages}>
                    {props.dialogsPage.messagesData.map(message => <Message key={message.id}
                                                                            background={MESSAGE_STYLE.background}
                                                                            color={MESSAGE_STYLE.color}
                                                                            meBackground={MESSAGE_STYLE.meBackground}
                                                                            meColor={MESSAGE_STYLE.meColor}
                                                                            {...message}/>)}
                </div>
                <AddMessageForm addMessage={props.addMessage}/>
            </div>
        </div>
    );
})

