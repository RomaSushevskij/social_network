import React from "react";
import {connect} from "react-redux";
import {Header} from "./Header";
import {AppStateType} from "../../redux/redux-store";
import {InitialStateAuthType, setAuthUserData, setFullNameAndAvatar} from "../../redux/redusers/auth/authReducer";
import {HEADER_STYLE} from "../../App";
import axios from "axios";
import {ProfileType} from "../../redux/redusers/profileReducer/profileReducer";

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
        const {setAuthUserData, setFullNameAndAvatar} = this.props
        axios.get<GetAuthUserDataType>(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
            withCredentials: true,
            headers: {
                "API-KEY": "10732160-f45a-4879-8e6f-b2819bc13c24"
            }
        }).then(response => {
            if (response.data.resultCode === 0) {
                setAuthUserData(response.data.data)
            }
        }).then(() => {
                axios.get<ProfileType>(`https://social-network.samuraijs.com/api/1.0/profile/${this.props.auth.id}`, {
                    withCredentials: true,
                    headers: {
                        "API-KEY": "10732160-f45a-4879-8e6f-b2819bc13c24"
                    }
                }).then(response => {
                    const fullName = response.data.fullName
                    const avatar = response.data.photos?.small
                    setFullNameAndAvatar(fullName, avatar)
                })
            }
        )
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
    setAuthUserData: ({id, email, login}: { id: number, email: string, login: string }) => void
    setFullNameAndAvatar: (fullName: string, avatar: string | null) => void
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        auth: state.auth,
        fullName: state.auth.fullName,
        avatar: state.auth.avatar,
    }
};

export const HeaderContainer = connect(mapStateToProps, {
    setAuthUserData,
    setFullNameAndAvatar
} as MapDispatchToPropsType)(HeaderAPIContainer)



