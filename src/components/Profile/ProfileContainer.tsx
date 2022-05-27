import React from "react";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {getProfile, getStatus, ProfileType, updateStatus} from "../../redux/redusers/profileReducer/profileReducer";
import {Profile} from "./Profile";
import {Preloader} from "../generic/Preloader/Preloader";
import {withRouter} from "../../hoc/withRouter";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {PATH} from '../../App';
import {getProfileSelector, getStatusSelector} from '../../redux/selectors/profileSelectors';
import {getAuthUserIDSelector, getIsAuthSelector} from '../../redux/selectors/authSelectors';


class ProfileAPIContainer extends React.Component<ProfileAPIContainerPropsType> {

    refreshProfile = () => {
        const {getProfile, getStatus, params, navigate, ...restProps} = this.props
        let userId = params["*"]
        if (!userId || userId === '*') {
            if (restProps.userId) {
                userId = restProps.userId.toString()
            } else {
                navigate(PATH.LOGIN)
            }
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
            (<Preloader size={'30px'} color={'#EC4899'}/>
            )
    }
}

export type ProfileAPIContainerPropsType =
    MapStateToPropsType &
    MapDispatchToPropsType &
    {
        params: {
            ['*']: string,
        }
        navigate: (path: string) => void
    } //... <= profile/*... => type for props

type MapStateToPropsType = {
    profile: ProfileType | null
    isAuth: boolean
    status: string
    userId: number | null
}
type MapDispatchToPropsType = {
    getProfile: (userId: number) => void
    getStatus: (userId: number) => void
    updateStatus: (status: string) => void
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    profile: getProfileSelector(state),
    isAuth: getIsAuthSelector(state),
    status: getStatusSelector(state),
    userId: getAuthUserIDSelector(state)
})


export const ProfileContainer = withAuthRedirect(connect(mapStateToProps, {
    getProfile,
    getStatus,
    updateStatus
} as MapDispatchToPropsType)(withRouter(ProfileAPIContainer)))


