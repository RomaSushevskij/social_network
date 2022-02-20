import React from "react";
import {connect} from "react-redux";
import {Header} from "./Header";
import {AppStateType} from "../../redux/redux-store";
import {InitialStateAuthType, setAuthUserData, setFullNameAndAvatar} from "../../redux/redusers/auth/authReducer";
import {HEADER_STYLE} from "../../App";
import {AUTH_ME_RESULT_CODES, authMeAPI, profileAPI} from "../../api/api";

class HeaderAPIContainer extends React.Component<HeaderAPIContainerPropsType> {
    componentDidMount(): void {
        const {setAuthUserData, setFullNameAndAvatar} = this.props
        authMeAPI.getAuthorizationInfo().then(data => {
            if (data.resultCode === AUTH_ME_RESULT_CODES.success) {
                setAuthUserData(data.data)
            }
        }).then(() => {
                if (this.props.auth.id) {
                    profileAPI.getProfile(this.props.auth.id.toString())
                        .then(data => {
                            const fullName = data.fullName
                            const avatar = data.photos.small
                            setFullNameAndAvatar(fullName, avatar)
                        })
                }
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
    avatar: string | null
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



