import React, {ComponentType} from "react";
import {AppStateType} from "../../redux/redux-store";
import {addMessage, InitialStateDialogsType,} from "../../redux/redusers/dialogsReducer/dialogsReducer";
import {Dialogs} from "./Dialogs";
import {compose} from "redux";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {getAuthUserIDSelector, getAvatarSelector, getIsAuthSelector} from '../../redux/selectors/authSelectors';

export type MapStateToPropsType = {
    dialogsPage: InitialStateDialogsType
    isAuth: boolean
    myUserId: number | null
    avatar: string | null
}

export type MapDispatchToPropsType = {
    addMessage: (newMessageText: string) => void
}

export type DialogsPropsType = MapStateToPropsType & MapDispatchToPropsType

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        dialogsPage: state.dialogsPage,
        isAuth: getIsAuthSelector(state),
        myUserId: getAuthUserIDSelector(state),
        avatar: getAvatarSelector(state),
    }
}

export const DialogsContainer = compose<ComponentType>(
    withAuthRedirect,
    connect(mapStateToProps, {addMessage} as MapDispatchToPropsType),
)(Dialogs)


