import React from "react";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {getProfile, getStatus, ProfileType, updateStatus} from "../../redux/redusers/profileReducer/profileReducer";
import {Profile} from "./Profile";
import {Preloader} from "../generic/Preloader/Preloader";
import {withRouter} from "../../hoc/withRouter";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {profileAPI} from "../../api/api";


class ProfileAPIContainer extends React.Component<ProfileAPIContainerPropsType> {

    refreshProfile = () => {
        const {getProfile, getStatus,  params} = this.props
        let userId = params["*"]
        if (!userId || userId === '*') {
            userId = '20392'
        }
        getProfile(Number(userId))
        getStatus(Number(userId))
    }

    componentDidMount(): void {
        this.refreshProfile()
    }

    //getting own profile after switching from someone profile to your own
    componentDidUpdate(prevProps: Readonly<ProfileAPIContainerPropsType>, prevState: Readonly<{}>, snapshot?: any): void {
        if (prevProps.params !== this.props.params) {
            this.refreshProfile()
        }
    }

    render() {
        return this.props.profile ? (
                <Profile {...this.props}/>) :
            (<Preloader size={'100px'} color={'#ffffff'}/>
            )
    }
}

export type ProfileAPIContainerPropsType =
    MapStateToPropsType &
    MapDispatchToPropsType &
    { params: { ['*']: string } } //... <= profile/*... => type for props

type MapStateToPropsType = {
    profile: ProfileType | null
    isAuth: boolean
    status:string
}
type MapDispatchToPropsType = {
    getProfile: (userId: number) => void
    getStatus: (userId: number) => void
    updateStatus: (status: string) => void
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    profile: state.profilePage.profile,
    isAuth: state.auth.isAuth,
    status: state.profilePage.status,
})


export const ProfileContainer = withAuthRedirect(connect(mapStateToProps, {getProfile, getStatus, updateStatus} as MapDispatchToPropsType)(withRouter(ProfileAPIContainer)))


