import React, {ChangeEvent, KeyboardEvent} from "react";
import {Dialog} from "./Dialog/Dialog";
import {Message} from "./Mesage/Message";
import styleModule from './Dialogs.module.css';
import {DialogsPageType} from "../../redux/state";
import {Button} from "../generic/Button/Button";
import {BrowserRouter} from "react-router-dom";
import {Textarea} from "../generic/Textarea/Textarea";

export type DialogsPropsType = {
    dialogsPage: DialogsPageType
    addNewMessage: () => void
    updateNewMessageText: (newMessageText: string) => void
}

export function Dialogs(props: DialogsPropsType) {


    const onAddMessageButton = () => {
        props.dialogsPage.newMessageText.trim() && props.addNewMessage();
    };
    const onAddMessageWithEnter = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (!e.shiftKey && e.key === 'Enter') {
            e.preventDefault();
            onAddMessageButton()
        }
    };
    const onUpdateNewMessageText = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.updateNewMessageText(e.currentTarget.value);
    };

    return (
        <div className={styleModule.dialogs}>
            <div className={styleModule.heading}>
                DIALOGS
            </div>
            <div className={styleModule.dialogs_items}>
                {props.dialogsPage.dialogsData.map(dialog => <Dialog key={dialog.id} {...dialog}/>)}
            </div>
            <div className={styleModule.messagesBlock}>
                <div className={styleModule.messages}>
                    {props.dialogsPage.messagesData.map(message => <Message key={message.id} {...message}/>)}
                </div>
                <div className={styleModule.writeAndSendMessage}>
                    <div className={styleModule.writeMessage}>
                        <Textarea textareaValue={props.dialogsPage.newMessageText}
                                  setTextareaValue={onUpdateNewMessageText}
                                  onAddWithEnter={onAddMessageWithEnter}
                                  placeholder={'Enter your message'}/>

                    </div>
                    <Button name={'Send'} callback={onAddMessageButton}/>
                </div>
            </div>
        </div>
    );
}

