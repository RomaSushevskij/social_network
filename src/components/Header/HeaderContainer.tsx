import React from "react";
import {connect} from "react-redux";
import {Header} from "./Header";
import {AppStateType} from "../../redux/redux-store";
import {
    getAuthorizationInfo,
    InitialStateAuthType,
    setAuthUserData,
    setFullNameAndAvatar
} from "../../redux/redusers/auth/authReducer";
import {HEADER_STYLE} from "../../App";
import axios from "axios";
import {ProfileType} from "../../redux/redusers/profileReducer/profileReducer";
import {AUTH_ME_RESULT_CODES, authMeAPI, profileAPI} from "../../api/api";

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
    componentDidMount(): void {
        const {getAuthorizationInfo} = this.props
        getAuthorizationInfo()
    }

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
    getAuthorizationInfo: () => void
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        auth: state.auth,
        fullName: state.auth.fullName,
        avatar: state.auth.avatar,
    }
};

export const HeaderContainer = connect(mapStateToProps, {
    getAuthorizationInfo
} as MapDispatchToPropsType)(HeaderAPIContainer)



