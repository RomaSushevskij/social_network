import React from "react";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {getProfile, ProfileType} from "../../redux/redusers/profileReducer/profileReducer";
import {Profile} from "./Profile";
import {Preloader} from "../generic/Preloader/Preloader";
import {withRouter} from "../../hoc/withRouter";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";


class ProfileAPIContainer extends React.Component<ProfileAPIContainerPropsType> {

    refreshProfile = () => {
        const {getProfile, params} = this.props
        let userId = params["*"]
        if (!userId || userId === '*') {
            userId = '20392'
        }
        getProfile(Number(userId))
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
}
type MapDispatchToPropsType = {
    getProfile: (userId: number) => void
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    profile: state.profilePage.profile,
    isAuth: state.auth.isAuth
})


export const ProfileContainer = withAuthRedirect(connect(mapStateToProps, {getProfile} as MapDispatchToPropsType)(withRouter(ProfileAPIContainer)))


