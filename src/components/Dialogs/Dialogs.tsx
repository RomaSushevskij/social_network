import React, {LegacyRef} from "react";
import {Dialog} from "./Dialog/Dialog";
import {Message} from "./Mesage/Message";
import styleModule from './Dialogs.module.css';
import {DialogsPageType} from "../../redux/state";

export type DialogsPropsType = {
    dialogsPage: DialogsPageType
    addNewMessage: () => void
    updateNewMessageText: (newMessageText: string) => void
}

export function Dialogs(props: DialogsPropsType) {

    const newMessageText: LegacyRef<HTMLTextAreaElement> = React.createRef();
    const onAddMessageButton = (event: React.MouseEvent<HTMLButtonElement>) => {
        props.addNewMessage();
    };
    const onUpdateNewMessageText =()=> {
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
                        <textarea onChange={onUpdateNewMessageText} value={props.dialogsPage.newMessageText} ref={newMessageText} placeholder='Enter your message'/>
                    </div>
                    <button onClick={onAddMessageButton} className={styleModule.sendMessage}>
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}

