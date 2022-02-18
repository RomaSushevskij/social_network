import React from "react";
import axios from "axios";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {ProfileType, setProfile} from "../../redux/redusers/profileReducer/profileReducer";
import {Profile} from "./Profile";
import {Preloader} from "../generic/Preloader/Preloader";


class ProfileAPIContainer extends React.Component<ProfileAPIContainerPropsType> {

    componentDidMount(): void {
        const {setProfile} = this.props
        axios.get<ProfileType>(`https://social-network.samuraijs.com/api/1.0/profile/${20392}`)
            .then(response => {
                setProfile(response.data)
            })
    }

    render() {

        return this.props.profile ? (
                <Profile {...this.props}/>) :
            (<Preloader size={'100px'} color={'#ffffff'}/>
            )
    }
}

export type ProfileAPIContainerPropsType = MapStateToPropsType & MapDispatchToPropsType

type MapStateToPropsType = {
    profile: ProfileType | null
}
type MapDispatchToPropsType = {
    setProfile: (profile: ProfileType) => void
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    profile: state.profilePage.profile
})


export const ProfileContainer = connect(mapStateToProps, {setProfile} as MapDispatchToPropsType)(ProfileAPIContainer)


