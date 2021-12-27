import React, {LegacyRef} from "react";
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

    const newMessageText: LegacyRef<HTMLTextAreaElement> = React.createRef();
    const onAddMessageButton = () => {
        props.dialogsPage.newMessageText && props.addNewMessage();
    };
    const onUpdateNewMessageText = () => {
        if (newMessageText.current) {
            const text: string = newMessageText.current.value;
            props.updateNewMessageText(text);
        }
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
                                  setTextareaValue={onUpdateNewMessageText} reference={newMessageText}
                                  placeholder={'Enter your message'}/>

                    </div>
                    <Button name={'Send'} callback={onAddMessageButton}/>
                </div>
            </div>
        </div>
    );
}

