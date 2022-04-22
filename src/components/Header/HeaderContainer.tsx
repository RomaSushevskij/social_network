import React from "react";
import {connect} from "react-redux";
import {Header} from "./Header";
import {AppStateType} from "../../redux/redux-store";
import {InitialStateAuthType, logout} from "../../redux/redusers/auth/authReducer";
import {HEADER_STYLE} from "../../App";

export type DataType = {
    id: number,
    email: string,
    login: string
}
export type GetAuthUserDataType = {
    data: DataType
    fieldsErrors: Array<any>
    messages: Array<string>
    resultCode: number
}


class HeaderAPIContainer extends React.Component<HeaderAPIContainerPropsType> {
    render = () => {
        return (
            <Header title={'Cloudpaper'}
                    description={'Connecting Network'}
                    background={HEADER_STYLE.background}
                    color={HEADER_STYLE.color}
                    logo={HEADER_STYLE.logo}
                    {...this.props}/>
        )
    }
}

export type HeaderAPIContainerPropsType = MapStateToPropsType & MapDispatchToPropsType

type MapStateToPropsType = {
    auth: InitialStateAuthType
    fullName: string | null
    avatar: string | null | undefined
}
type MapDispatchToPropsType = {
    logout: () => void
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        auth: state.auth,
        fullName: state.auth.fullName,
        avatar: state.auth.avatar,
    }
};

export const HeaderContainer = connect(mapStateToProps, {
    logout
} as MapDispatchToPropsType)(HeaderAPIContainer)



