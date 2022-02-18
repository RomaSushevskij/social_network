import React, {KeyboardEvent} from "react";
import {AppStateType} from "../../redux/redux-store";
import {addMessageAC, InitialStateDialogsType, updateNewMessageTextAC} from "../../redux/redusers/dialogsReducer/dialogsReducer";
import {Dialogs} from "./Dialogs";
import {Dispatch} from "redux";
import {connect} from "react-redux";

export type MapStateToPropsType = {
    dialogsPage: InitialStateDialogsType
}

export type MapDispatchToPropsType = {
    addMessage: (newMessageText: string) => void
    addMessageWithEnter: (e: KeyboardEvent<HTMLTextAreaElement>, newMessageText: string) => void
    updateNewMessageText: (newMessageText: string) => void
}

export type DialogsPropsType = MapStateToPropsType & MapDispatchToPropsType

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        dialogsPage: state.dialogsPage
    }
}
const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        addMessage: (newMessageText: string) => {
            newMessageText.trim() && dispatch(addMessageAC())
        },
        addMessageWithEnter: (e: KeyboardEvent<HTMLTextAreaElement>, newMessageText: string) => {
            if (!e.shiftKey && e.key === 'Enter') {
                e.preventDefault()
                newMessageText.trim() && dispatch(addMessageAC())
            }
        },
        updateNewMessageText: (newMessageText: string) => {
            dispatch(updateNewMessageTextAC(newMessageText));
        }
    }
}

export const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)

