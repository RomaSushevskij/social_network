import React, {KeyboardEvent} from "react";
import {ActionsTypes, DialogsPageType,} from "../../redux/store";
import {addMessageAC, updateNewMessageTextAC} from "../../redux/redusers/dialogsReducer";
import {Dialogs} from "./Dialogs";

export type DialogsContainerPropsType = {
    dialogsPage: DialogsPageType
    dispatch: (action: ActionsTypes) => void
}


export function DialogsContainer(props: DialogsContainerPropsType) {


    const addMessage = () => {
        props.dispatch(addMessageAC());
    };
    const addMessageWithEnter = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (!e.shiftKey && e.key === 'Enter') {
            e.preventDefault();
            addMessage()
        }
    };
    const updateNewMessageText = (newMessageText: string) => {
        props.dispatch(updateNewMessageTextAC(newMessageText));
    };

    return (
        <Dialogs dialogsPage={props.dialogsPage}
                 addMessage={addMessage}
                 addMessageWithEnter={addMessageWithEnter}
                 updateNewMessageText={updateNewMessageText}/>
    );
}

