import React, {ChangeEvent, KeyboardEvent} from "react";
import {Dialog} from "./Dialog/Dialog";
import {Message} from "./Mesage/Message";
import styleModule from './Dialogs.module.css';
import {Button} from "../generic/Button/Button";
import {Textarea} from "../generic/Textarea/Textarea";
import {BUTTON_STYLE} from "../Profile/MyPosts/MyPosts";
import {DialogsPropsType} from "./DialogsContainer";


const MESSAGE_STYLE = {
    background: '#ffffff',
    color: '#757575'
};
const DIALOG_STYLE = {
    background: 'inherit',
    color: '#ffffff'
};

export const Dialogs = React.memo((props: DialogsPropsType) => {


    const onAddMessageButton = () => {
        props.addMessage(props.dialogsPage.newMessageText);
    };
    const onAddMessageWithEnter = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        props.addMessageWithEnter(e, props.dialogsPage.newMessageText)
    };
    const onUpdateNewMessageText = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.updateNewMessageText(e.currentTarget.value)
    };

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
                                                                            {...message}/>)}
                </div>
                <div className={styleModule.writeAndSendMessage}>
                    <div className={styleModule.writeMessage}>
                        <Textarea textareaValue={props.dialogsPage.newMessageText}
                                  setTextareaValue={onUpdateNewMessageText}
                                  onAddWithEnter={onAddMessageWithEnter}
                                  placeholder={'Enter your message'}
                                  background={'#ffffff'}
                                  color={'#60575A'}/>

                    </div>
                    <Button name={'Send'}
                            onClick={onAddMessageButton}
                            backgroundHover={BUTTON_STYLE.BACKGROUND_HOVER}
                            background={BUTTON_STYLE.BACKGROUND}
                            colorHover={BUTTON_STYLE.COLOR_HOVER}/>
                </div>
            </div>
        </div>
    );
})

