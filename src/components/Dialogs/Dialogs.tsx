import React, {useState} from "react";
import {Dialog} from "./Dialog/Dialog";
import {Message} from "./Mesage/Message";
import styleModule from './Dialogs.module.css';
import {DialogsPropsType} from "./DialogsContainer";
import {AddMessageForm} from '../forms/AddMessageForm/AddMessageForm';
import {useParams} from 'react-router-dom';


export const MESSAGE_STYLE = {
    background: '#F3F4F6',
    color: '#374151',
    meBackground: '#2563EB',
    meColor: '#FFF5FA',
};
const DIALOG_STYLE = {
    background: 'inherit',
    color: '#000000'
};

export const Dialogs = React.memo((props: DialogsPropsType) => {
    const [activeDialogId, setActiveDialogId] = useState(0);
    const activeDialog = props.dialogsPage.dialogsData.filter(d => d.userId === activeDialogId)[0]
    const messagesByUser = props.dialogsPage.messagesData.filter(m => {
        return m.userId === activeDialogId ||  m.userId === props.myUserId
    });
    const params = useParams<'*'>()
    return (
        <div className={styleModule.dialogs}>
            <div className={styleModule.dialogsContainer}>
                <div className={params['*'] ?
                    styleModule.dialogs_items :
                    `${styleModule.dialogs_items} ${styleModule.full}`}>
                    {props.dialogsPage.dialogsData.map(dialog => <Dialog key={dialog.id}
                                                                         background={DIALOG_STYLE.background}
                                                                         color={DIALOG_STYLE.color}
                                                                         setActiveDialogId={setActiveDialogId}

                                                                         {...dialog}/>)}
                </div>
                {params['*'] &&
                <>
                    <div className={styleModule.messagesBlock}>
                        <div className={styleModule.messagesHeader}>
                            <Dialog forDialogTitle={true} {...activeDialog}/>
                        </div>
                        <div className={styleModule.messages}>
                            {messagesByUser.map(message => <Message key={message.id}
                                                                    background={MESSAGE_STYLE.background}
                                                                    color={MESSAGE_STYLE.color}
                                                                    meBackground={MESSAGE_STYLE.meBackground}
                                                                    meColor={MESSAGE_STYLE.meColor}
                                                                    myUserId={props.myUserId}
                                                                    myAvatar={props.avatar}
                                                                    {...message}/>)}
                        </div>
                        <AddMessageForm addMessage={props.addMessage}/>
                    </div>
                </>
                }
            </div>
        </div>
    );
})

