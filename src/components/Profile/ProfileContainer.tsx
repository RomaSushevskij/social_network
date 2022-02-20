import React from "react";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {ProfileType, setProfile} from "../../redux/redusers/profileReducer/profileReducer";
import {Profile} from "./Profile";
import {Preloader} from "../generic/Preloader/Preloader";
import {withRouter} from "../../hoc/withRouter";
import {profileAPI} from "../../api/api";


class ProfileAPIContainer extends React.Component<ProfileAPIContainerPropsType> {

    refreshProfile = () => {
        const {setProfile, params} = this.props
        let userId = params["*"]
        if (!userId || userId === '*') {
            userId = '20392'
        }
        profileAPI.getProfile(userId)
            .then(data => {
                setProfile(data)
            })
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
}
type MapDispatchToPropsType = {
    setProfile: (profile: ProfileType) => void
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    profile: state.profilePage.profile
})


export const ProfileContainer = connect(mapStateToProps, {setProfile} as MapDispatchToPropsType)(withRouter(ProfileAPIContainer))


