import React, {ComponentType} from "react";
import {AppStateType} from "../../redux/redux-store";
import {addMessage, InitialStateDialogsType,} from "../../redux/redusers/dialogsReducer/dialogsReducer";
import {Dialogs} from "./Dialogs";
import {compose} from "redux";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {getIsAuthSelector} from '../../redux/selectors/authSelectors';

export type MapStateToPropsType = {
    dialogsPage: InitialStateDialogsType
    isAuth: boolean
}

export type MapDispatchToPropsType = {
    addMessage: (newMessageText: string) => void
}

export type DialogsPropsType = MapStateToPropsType & MapDispatchToPropsType

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        dialogsPage: state.dialogsPage,
        isAuth: getIsAuthSelector(state)
    }
}

export const DialogsContainer = compose<ComponentType>(
    withAuthRedirect,
    connect(mapStateToProps, {addMessage} as MapDispatchToPropsType),
)(Dialogs)


